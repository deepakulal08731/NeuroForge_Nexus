package com.neuroforge.cicd.bug.dto;

import jakarta.validation.constraints.NotBlank;

import jakarta.validation.constraints.Size;
import java.util.List;
import com.neuroforge.cicd.bug.Bug.Attachment;

import com.neuroforge.cicd.bug.Bug;

public class CreateBugRequest {

    @NotBlank(message = "Bug title is required")
    @Size(max = 200, message = "Title cannot exceed 200 characters")
    private String title;

    @Size(max = 2000, message = "Description cannot exceed 2000 characters")
    private String description;

    @Size(max = 100, message = "Module cannot exceed 100 characters")
    private String module;

    private Bug.Environment environment;

    private Bug.Severity severity;

    private Bug.Priority priority;

    @Size(max = 100)
    private String linkedTaskId;

    @Size(max = 2000)
    private String errorMessage;

    @Size(max = 20000)
    private String consoleLog;

    @Size(max = 10, message = "You can attach up to 10 files")
    private List<Attachment> attachments;

    public CreateBugRequest() {
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getModule() {
        return module;
    }

    public void setModule(String module) {
        this.module = module;
    }

    public Bug.Environment getEnvironment() {
        return environment;
    }

    public void setEnvironment(Bug.Environment environment) {
        this.environment = environment;
    }

    public Bug.Severity getSeverity() {
        return severity;
    }

    public void setSeverity(Bug.Severity severity) {
        this.severity = severity;
    }

    public Bug.Priority getPriority() {
        return priority;
    }

    public void setPriority(Bug.Priority priority) {
        this.priority = priority;
    }

    public String getLinkedTaskId() { return linkedTaskId; }
    public void setLinkedTaskId(String linkedTaskId) { this.linkedTaskId = linkedTaskId; }
    public String getErrorMessage() { return errorMessage; }
    public void setErrorMessage(String errorMessage) { this.errorMessage = errorMessage; }
    public String getConsoleLog() { return consoleLog; }
    public void setConsoleLog(String consoleLog) { this.consoleLog = consoleLog; }
    public List<Attachment> getAttachments() { return attachments; }
    public void setAttachments(List<Attachment> attachments) { this.attachments = attachments; }
}
