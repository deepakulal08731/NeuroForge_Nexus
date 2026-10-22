package com.neuroforge.cicd.bug.controller;

import com.fasterxml.jackson.databind.JsonNode;
// import com.fasterxml.jackson.databind.ObjectMapper;
import com.neuroforge.cicd.bug.Bug;
import com.neuroforge.cicd.bug.dto.AssignBugRequest;
import com.neuroforge.cicd.bug.dto.CreateBugRequest;
import com.neuroforge.cicd.bug.dto.UpdateBugStatusRequest;
import com.neuroforge.cicd.bug.service.BugService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.client.RestClientException;

import java.util.List;

@RestController
public class BugController {

    private final BugService bugService;
    private final RestTemplate restTemplate;
    

    @Value("${user-service.base-url:http://localhost:8081}")
    private String userServiceBaseUrl;

    public BugController(
        BugService bugService,
        RestTemplate restTemplate) {

    this.bugService = bugService;
    this.restTemplate = restTemplate;
}

    // Create a new bug
    @PostMapping("/projects/{projectId}/bugs")
    @PreAuthorize("hasAnyRole('ADMIN','PROJECT_LEAD','PROJECT_MANAGER','TEAM_LEAD','DEVELOPER','DESIGNER','QA','EMPLOYEE')")
    public ResponseEntity<Bug> createBug(
            @PathVariable String projectId,
            @Valid @RequestBody CreateBugRequest request) {

        Bug bug = new Bug();

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null
                && authentication.isAuthenticated()
                && authentication.getName() != null
                && !authentication.getName().equals("anonymousUser")) {

            String userId = authentication.getName();

            bug.setReportedBy(userId);

            // Retrieve the reporter's name using the current JWT.
            String reportedByName = fetchReporterName();

            if (reportedByName != null && !reportedByName.isBlank()) {
                bug.setReportedByName(reportedByName);
            }
        }

        bug.setProjectId(projectId);
        bug.setTitle(request.getTitle());
        bug.setDescription(request.getDescription());
        bug.setModule(request.getModule());
        bug.setLinkedTaskId(request.getLinkedTaskId());
        bug.setErrorMessage(request.getErrorMessage());
        bug.setConsoleLog(request.getConsoleLog());
        if (request.getAttachments() != null) {
            bug.setAttachments(request.getAttachments());
        }
        bug.setEnvironment(request.getEnvironment());
        bug.setSeverity(request.getSeverity());
        bug.setPriority(request.getPriority());

        Bug createdBug = bugService.createBug(bug);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(createdBug);
    }

    // Fetch the current user's name from user-service.
    private String fetchReporterName() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null
                || !authentication.isAuthenticated()) {
            return null;
        }

        Object credentials = authentication.getCredentials();

        // The JWT filter may not retain the token in credentials.
        // In that case, this method returns null instead of failing
        // the bug creation request.
        if (!(credentials instanceof String token)
                || token.isBlank()) {
            return null;
        }

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setBearerAuth(token);

            HttpEntity<Void> entity = new HttpEntity<>(headers);

            ResponseEntity<JsonNode> response =
                    restTemplate.exchange(
                            userServiceBaseUrl + "/auth/me",
                            HttpMethod.GET,
                            entity,
                            JsonNode.class);

            if (response.getBody() != null) {
                JsonNode body = response.getBody();

                if (body.hasNonNull("name")) {
                    return body.get("name").asText();
                }
            }

        } catch (RestClientException exception) {
            // Do not fail bug creation if user-service is unavailable.
            System.err.println(
                    "Unable to retrieve reporter name: "
                            + exception.getMessage());
        }

        return null;
    }

    // Get all bugs for a project
    @GetMapping("/projects/{projectId}/bugs")
    @PreAuthorize("hasAnyRole('ADMIN','PROJECT_LEAD','PROJECT_MANAGER','TEAM_LEAD','DEVELOPER','DESIGNER','QA','EMPLOYEE')")
    public ResponseEntity<List<Bug>> getBugsByProject(
            @PathVariable String projectId) {

        return ResponseEntity.ok(
                bugService.getBugsByProject(projectId));
    }

    // Get a bug by ID
    @GetMapping("/bugs/{bugId}")
    @PreAuthorize("hasAnyRole('ADMIN','PROJECT_LEAD','PROJECT_MANAGER','TEAM_LEAD','DEVELOPER','DESIGNER','QA','EMPLOYEE')")
    public ResponseEntity<Bug> getBugById(
            @PathVariable String bugId) {

        return ResponseEntity.ok(
                bugService.getBugById(bugId));
    }

    // Update bug status
    @PatchMapping("/bugs/{bugId}/status")
    @PreAuthorize("hasAnyRole('ADMIN','PROJECT_LEAD','PROJECT_MANAGER','TEAM_LEAD','DEVELOPER','DESIGNER','QA','EMPLOYEE')")
    public ResponseEntity<Bug> updateStatus(
            @PathVariable String bugId,
            @Valid @RequestBody UpdateBugStatusRequest request) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Bug currentBug = bugService.getBugById(bugId);
        boolean manager = hasAnyRole(authentication, "ADMIN", "PROJECT_LEAD", "PROJECT_MANAGER");
        boolean assignee = authentication != null
                && authentication.getName() != null
                && authentication.getName().equals(currentBug.getAssignedTo());
        boolean qaRetest = hasAnyRole(authentication, "QA")
                && currentBug.getStatus() == Bug.Status.RETEST
                && (request.getStatus() == Bug.Status.CLOSED
                    || request.getStatus() == Bug.Status.REOPENED);
        if (!manager && !assignee && !qaRetest) {
            throw new AccessDeniedException("Only a manager, the assigned user, or QA during retest can change this bug status");
        }
        return ResponseEntity.ok(bugService.updateBugStatus(bugId, request.getStatus()));
    }

    // Assign a bug
    @PatchMapping("/bugs/{bugId}/assign")
    @PreAuthorize("hasAnyRole('ADMIN','PROJECT_LEAD','PROJECT_MANAGER')")
    public ResponseEntity<Bug> assignBug(
            @PathVariable String bugId,
            @RequestBody AssignBugRequest request) {

        return ResponseEntity.ok(
                bugService.assignBug(
                        bugId,
                        request.getAssignedTo()));
    }

    private boolean hasAnyRole(Authentication authentication, String... roles) {
        if (authentication == null) return false;
        return authentication.getAuthorities().stream()
                .anyMatch(authority -> {
                    for (String role : roles) {
                        if (authority.getAuthority().equals("ROLE_" + role)) return true;
                    }
                    return false;
                });
    }

}
