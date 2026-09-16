

// /**
//  * ═══════════════════════════════════════════════════════════════
//  *  NeuroForge Nexus — UNIFIED DRY RUN CLIENT (TEAM-SYNCED)
//  * ═══════════════════════════════════════════════════════════════
//  *  - Automatically syncs Team rosters & Project counts for Teams.jsx
//  *  - Auto-hydrates Sprints when Projects are created for Sprints.jsx
//  *  - Full simulated JWT auth, RBAC scoping, and Kanban mutations
//  */

// const MOCK_DELAY = 120
// const sleep = (ms = MOCK_DELAY) => new Promise((resolve) => setTimeout(resolve, ms))

// // ── Domain Constants ────────────────────────────────────────────
// export const ROLES = ['ADMIN', 'PROJECT_LEAD', 'PROJECT_MANAGER', 'TEAM_LEAD', 'EMPLOYEE']
// export const EMPLOYEE_SUB_ROLES = ['Developer', 'Tester', 'Junior', 'Senior']
// export const PROJECT_STATUSES = ['PLANNING', 'ACTIVE', 'BLOCKED', 'COMPLETED']
// export const TASK_STATUSES = ['TODO', 'IN_PROGRESS', 'DONE']
// export const TASK_PRIORITIES = ['LOW', 'MEDIUM', 'HIGH', 'URGENT']
// export const ROLE_LABELS = {
//   ADMIN: 'Admin',
//   PROJECT_LEAD: 'Project Lead',
//   PROJECT_MANAGER: 'Project Manager',
//   TEAM_LEAD: 'Team Lead',
//   EMPLOYEE: 'Employee',
// }

// export const DEMO_CREDENTIALS = { email: 'admin@neuroforge.dev', password: 'password123' }

// // ── In-Memory Datasets ──────────────────────────────────────────
// let mockUsers = [
//   {
//     id: '6a9bc068625a0a9467b3983b',
//     name: 'Maneesh R',
//     email: 'admin@neuroforge.dev',
//     role: 'ADMIN',
//     subRole: 'Senior',
//     status: 'ACTIVE',
//     createdAt: '2026-08-10',
//   },
//   {
//     id: 'USR-0002',
//     name: 'Mir Mohammed Kazim',
//     email: 'kazim@neuroforge.dev',
//     role: 'PROJECT_LEAD',
//     subRole: 'Senior',
//     status: 'ACTIVE',
//     createdAt: '2026-08-12',
//   },
//   {
//     id: 'USR-0003',
//     name: 'Elena Vasquez',
//     email: 'elena@neuroforge.dev',
//     role: 'EMPLOYEE',
//     subRole: 'Developer',
//     status: 'ACTIVE',
//     createdAt: '2026-08-18',
//   },
//   {
//     id: 'USR-0004',
//     name: 'Marcus Lee',
//     email: 'marcus@neuroforge.dev',
//     role: 'EMPLOYEE',
//     subRole: 'Tester',
//     status: 'ACTIVE',
//     createdAt: '2026-08-20',
//   },
// ]

// let mockTeams = [
//   {
//     id: 'TEAM-001',
//     name: 'Core Infrastructure',
//     description: 'Cloud orchestration, Kafka telemetry, and high-performance microservices.',
//     leadId: '6a9bc068625a0a9467b3983b',
//     memberIds: ['6a9bc068625a0a9467b3983b', 'USR-0002'],
//   },
//   {
//     id: 'TEAM-002',
//     name: 'Product Engineering',
//     description: 'User-facing web platforms, design systems, and responsive client workflows.',
//     leadId: 'USR-0002',
//     memberIds: ['USR-0003', 'USR-0004'],
//   },
// ]

// let mockProjects = [
//   {
//     id: 'PRJ-93E6EA',
//     name: 'NeuroForge Nexus',
//     description: 'Local microservices and distributed workspace platform',
//     teamId: 'TEAM-001',
//     leadId: '6a9bc068625a0a9467b3983b',
//     status: 'ACTIVE',
//     sprint: 'Sprint 1',
//     dueDate: '2026-10-30',
//     memberIds: ['6a9bc068625a0a9467b3983b', 'USR-0002'],
//     createdAt: '2026-09-01',
//   },
//   {
//     id: 'PRJ-88A1B2',
//     name: 'Neural Pipeline Gateway',
//     description: 'Real-time telemetry event streaming and monitoring service',
//     teamId: 'TEAM-001',
//     leadId: '6a9bc068625a0a9467b3983b',
//     status: 'PLANNING',
//     sprint: 'Sprint 1',
//     dueDate: '2026-11-15',
//     memberIds: ['6a9bc068625a0a9467b3983b', 'USR-0003'],
//     createdAt: '2026-09-03',
//   },
//   {
//     id: 'PRJ-77C3D4',
//     name: 'Sentinel Access Shield',
//     description: 'Zero-trust JWT authentication and role-based policy enforcement',
//     teamId: 'TEAM-002',
//     leadId: 'USR-0002',
//     status: 'COMPLETED',
//     sprint: 'Sprint 12',
//     dueDate: '2026-08-30',
//     memberIds: ['USR-0002', 'USR-0003'],
//     createdAt: '2026-08-15',
//   },
//   {
//     id: 'PRJ-66E5F6',
//     name: 'Data Synapse Engine',
//     description: 'Low-latency analytics indexing and caching cluster',
//     teamId: 'TEAM-002',
//     leadId: 'USR-0002',
//     status: 'BLOCKED',
//     sprint: 'Sprint 3',
//     dueDate: '2026-12-01',
//     memberIds: ['USR-0003', 'USR-0004'],
//     createdAt: '2026-09-04',
//   },
// ]

// let mockSprints = [
//   {
//     id: '6a9bc6858a17bee1a6647174',
//     projectId: 'PRJ-93E6EA',
//     name: 'Sprint 1 - Foundation & Kafka Pipeline',
//     goal: 'Establish Kafka pipelines and core task workflows',
//     startDate: '2026-09-01',
//     endDate: '2026-09-15',
//     status: 'ACTIVE',
//   },
//   {
//     id: 'SPR-1002',
//     projectId: 'PRJ-88A1B2',
//     name: 'Sprint 1 - Gateway Ingestion',
//     goal: 'Configure WebSocket feeds and event schemas',
//     startDate: '2026-09-05',
//     endDate: '2026-09-20',
//     status: 'ACTIVE',
//   },
// ]

// let mockTasks = [
//   {
//     id: '6a9bc6c58a17bee1a6647175',
//     projectId: 'PRJ-93E6EA',
//     sprintId: '6a9bc6858a17bee1a6647174',
//     title: 'Integrate Kafka Broker & Task Events',
//     assigneeId: '6a9bc068625a0a9467b3983b',
//     assignedTo: '6a9bc068625a0a9467b3983b',
//     status: 'IN_PROGRESS',
//     priority: 'HIGH',
//     storyPoints: 5,
//   },
//   {
//     id: 'TSK-1002',
//     projectId: 'PRJ-93E6EA',
//     sprintId: '6a9bc6858a17bee1a6647174',
//     title: 'Wire up SprintBoard Kanban Status Controls',
//     assigneeId: 'USR-0002',
//     assignedTo: 'USR-0002',
//     status: 'TODO',
//     priority: 'MEDIUM',
//     storyPoints: 3,
//   },
//   {
//     id: 'TSK-1003',
//     projectId: 'PRJ-93E6EA',
//     sprintId: '6a9bc6858a17bee1a6647174',
//     title: 'Configure JWT Auth Filter in Spring Boot',
//     assigneeId: '6a9bc068625a0a9467b3983b',
//     assignedTo: '6a9bc068625a0a9467b3983b',
//     status: 'DONE',
//     priority: 'URGENT',
//     storyPoints: 5,
//   },
//   {
//     id: 'TSK-2001',
//     projectId: 'PRJ-88A1B2',
//     sprintId: 'SPR-1002',
//     title: 'Design Event Telemetry Protocol',
//     assigneeId: 'USR-0003',
//     assignedTo: 'USR-0003',
//     status: 'DONE',
//     priority: 'HIGH',
//     storyPoints: 8,
//   },
// ]

// let mockSeq = 9000

// // ── Hydration Helpers ───────────────────────────────────────────
// const hydrateSprint = (sprint) => {
//   const proj = mockProjects.find((p) => p.id === sprint.projectId)
//   const team = proj ? mockTeams.find((t) => t.id === proj.teamId) : null
//   return {
//     ...sprint,
//     project: proj ? (team ? `${proj.name} (${team.name})` : proj.name) : sprint.projectId || 'NeuroForge Nexus',
//     teamName: team ? team.name : 'Unassigned Team',
//   }
// }

// const hydrateTask = (task) => {
//   const assigneeId = task.assigneeId || task.assignedTo
//   const assigneeObj = mockUsers.find((u) => u.id === assigneeId)
//   return {
//     ...task,
//     assigneeId,
//     assignedTo: assigneeId,
//     assignee: assigneeObj || (assigneeId ? { id: assigneeId, name: assigneeId } : null),
//   }
// }

// const hydrateProject = (project) => {
//   const teamObj = mockTeams.find((t) => t.id === project.teamId)
//   const leadObj = mockUsers.find((u) => u.id === project.leadId)
//   const memberList = (project.memberIds || []).map(
//     (id) => mockUsers.find((u) => u.id === id) || { id, name: id, role: 'EMPLOYEE' }
//   )
//   return {
//     ...project,
//     team: teamObj ? teamObj.name : project.team || 'Unassigned',
//     lead: leadObj ? leadObj.name : project.lead || 'Unassigned',
//     members: memberList,
//   }
// }

// const hydrateTeam = (team) => {
//   const leadObj = mockUsers.find((u) => u.id === team.leadId)
//   const memberList = (team.memberIds || []).map(
//     (id) => mockUsers.find((u) => u.id === id) || { id, name: id, role: 'EMPLOYEE' }
//   )
//   return {
//     ...team,
//     lead: leadObj ? leadObj.name : 'Unassigned',
//     members: memberList,
//   }
// }

// /* ==================== AUTHENTICATION & USERS ==================== */

// export async function loginRequest({ email, password }) {
//   await sleep()
//   const user = mockUsers.find((u) => u.email.toLowerCase() === email.toLowerCase()) || mockUsers[0]
//   const mockToken = `dry-run-jwt-token-${Date.now()}`
//   sessionStorage.setItem('nf_token', mockToken)
//   sessionStorage.setItem('nf_user', JSON.stringify(user))
//   return { token: mockToken, user }
// }

// export async function registerRequest({ name, email, password, role, subRole = null }) {
//   await sleep()
//   const newUser = {
//     id: `USR-${++mockSeq}`,
//     name,
//     email,
//     role: role || 'EMPLOYEE',
//     subRole: role === 'EMPLOYEE' ? subRole || 'Developer' : null,
//     status: 'ACTIVE',
//     createdAt: new Date().toISOString().split('T')[0],
//   }
//   mockUsers.push(newUser)
//   const mockToken = `dry-run-jwt-token-${Date.now()}`
//   sessionStorage.setItem('nf_token', mockToken)
//   sessionStorage.setItem('nf_user', JSON.stringify(newUser))
//   return { token: mockToken, user: newUser }
// }

// export async function fetchUsers() {
//   await sleep()
//   return [...mockUsers]
// }

// /* ==================== DASHBOARD & STATS ==================== */

// export async function fetchDashboardStats(user) {
//   await sleep()
//   const isEmployee = user?.role === 'EMPLOYEE'
//   const myProjectsCount = mockProjects.filter(
//     (p) => Array.isArray(p.memberIds) && p.memberIds.includes(user?.id)
//   ).length

//   return {
//     scope: isEmployee ? 'personal' : 'organization',
//     activeProjects: mockProjects.filter((p) => p.status === 'ACTIVE').length,
//     myProjects: myProjectsCount,
//     totalUsers: mockUsers.length,
//     totalTeams: mockTeams.length,
//   }
// }

// /* ==================== TEAMS ==================== */

// export async function fetchTeams() {
//   await sleep()
//   return mockTeams.map(hydrateTeam)
// }

// /* ==================== PROJECTS ==================== */

// export async function fetchProjects(user = null) {
//   await sleep()
//   const isEmployee = user?.role === 'EMPLOYEE'
//   const visible = isEmployee
//     ? mockProjects.filter((p) => Array.isArray(p.memberIds) && p.memberIds.includes(user.id))
//     : mockProjects

//   return visible.map(hydrateProject)
// }

// export async function createProject(projectData) {
//   await sleep()
//   const newProjectId = `PRJ-${Math.random().toString(36).substring(2, 8).toUpperCase()}`

//   const newProject = {
//     id: newProjectId,
//     status: 'PLANNING',
//     memberIds: [],
//     ...projectData,
//     createdAt: new Date().toISOString().split('T')[0],
//   }

//   mockProjects.unshift(newProject)

//   // 1. Synchronize project members & lead with the selected Team
//   if (projectData.teamId) {
//     const targetTeam = mockTeams.find((t) => t.id === projectData.teamId)
//     if (targetTeam) {
//       const allMembers = new Set([...(targetTeam.memberIds || []), ...(projectData.memberIds || [])])
//       if (projectData.leadId) allMembers.add(projectData.leadId)
//       targetTeam.memberIds = Array.from(allMembers)
//     }
//   }

//   // 2. Auto-generate linked Sprint for Sprints.jsx
//   if (projectData.sprint && String(projectData.sprint).trim()) {
//     const today = new Date().toISOString().split('T')[0]
//     const twoWeeksLater = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]

//     const newSprint = {
//       id: `SPR-${++mockSeq}`,
//       projectId: newProjectId,
//       name: String(projectData.sprint).trim(),
//       goal: projectData.description || `Initial sprint for ${projectData.name}`,
//       startDate: today,
//       endDate: projectData.dueDate || twoWeeksLater,
//       status: 'ACTIVE',
//     }
//     mockSprints.unshift(newSprint)
//   }

//   return hydrateProject(newProject)
// }

// /* ==================== SPRINTS ==================== */

// export async function fetchSprints(projectId = null) {
//   await sleep()
//   const visible = projectId ? mockSprints.filter((s) => s.projectId === projectId) : mockSprints
//   return visible.map(hydrateSprint)
// }

// export async function createSprint(projectId, sprintData) {
//   await sleep()
//   const newSprint = {
//     id: `SPR-${++mockSeq}`,
//     projectId,
//     status: 'PLANNED',
//     ...sprintData,
//   }
//   mockSprints.push(newSprint)
//   return hydrateSprint(newSprint)
// }

// export function isSprintActive(sprint, today = new Date()) {
//   if (!sprint?.startDate || !sprint?.endDate) return true
//   const start = new Date(`${sprint.startDate}T00:00:00`)
//   const end = new Date(`${sprint.endDate}T23:59:59`)
//   return today >= start && today <= end
// }

// /* ==================== TASKS ==================== */

// export async function fetchTasks(projectId = null) {
//   await sleep()
//   const list = projectId ? mockTasks.filter((t) => t.projectId === projectId) : mockTasks
//   return list.map(hydrateTask)
// }

// export async function fetchTasksBySprint(sprintId, projectId = null) {
//   await sleep()
//   const list = mockTasks.filter((t) => {
//     const matchSprint = sprintId ? t.sprintId === sprintId : true
//     const matchProj = projectId ? t.projectId === projectId : true
//     return matchSprint && matchProj
//   })
//   return list.map(hydrateTask)
// }

// export async function createTask({
//   sprintId,
//   projectId = 'PRJ-93E6EA',
//   title,
//   assigneeId = null,
//   assignedTo = null,
//   storyPoints = 3,
//   priority = 'MEDIUM',
//   status = 'TODO',
//   description = '',
// }) {
//   await sleep()
//   if (!String(title).trim()) throw new Error('Task title is required.')
//   if (!TASK_PRIORITIES.includes(priority)) throw new Error('Please choose a valid priority.')
//   if (!TASK_STATUSES.includes(status)) throw new Error('Invalid task status.')

//   const points = Number(storyPoints)
//   if (!Number.isInteger(points) || points < 1) {
//     throw new Error('Story points must be a positive integer.')
//   }

//   const effectiveSprintId = sprintId || '6a9bc6858a17bee1a6647174'
//   const effectiveAssignee = assigneeId || assignedTo || mockUsers[0].id

//   const task = {
//     id: `TSK-${++mockSeq}`,
//     sprintId: effectiveSprintId,
//     projectId,
//     title: String(title).trim(),
//     description,
//     assigneeId: effectiveAssignee,
//     assignedTo: effectiveAssignee,
//     storyPoints: points,
//     status,
//     priority,
//   }

//   mockTasks.push(task)
//   return hydrateTask(task)
// }

// export async function updateTask(projectId, taskId, updatedData) {
//   await sleep()
//   const index = mockTasks.findIndex((t) => t.id === taskId)
//   if (index === -1) throw new Error('Task not found.')
//   mockTasks[index] = { ...mockTasks[index], ...updatedData }
//   return hydrateTask(mockTasks[index])
// }

// export async function updateTaskStatus(taskId, newStatus, projectId = 'PRJ-93E6EA', existingTask = {}) {
//   await sleep()
//   const index = mockTasks.findIndex((t) => t.id === taskId)
//   if (index === -1) throw new Error('Task not found.')
//   if (!TASK_STATUSES.includes(newStatus)) throw new Error('Invalid task status.')

//   mockTasks[index] = { ...mockTasks[index], ...existingTask, status: newStatus }
//   return hydrateTask(mockTasks[index])
// }

// export async function deleteTask(taskId, projectId = 'PRJ-93E6EA') {
//   await sleep()
//   mockTasks = mockTasks.filter((t) => t.id !== taskId)
//   return { message: 'Task deleted successfully' }
// }

// /* ==================== SPRINT METRICS ==================== */

// export async function fetchSprintVelocity(projectId = 'PRJ-93E6EA', sprintId = '6a9bc6858a17bee1a6647174') {
//   await sleep()
//   const sprintTasks = mockTasks.filter((t) => t.sprintId === sprintId)
//   const velocity = sprintTasks
//     .filter((t) => t.status === 'DONE')
//     .reduce((acc, curr) => acc + (curr.storyPoints || 0), 0)
//   return { projectId, sprintId, velocity }
// }

// export async function fetchSprintBurndown(projectId = 'PRJ-93E6EA', sprintId = '6a9bc6858a17bee1a6647174') {
//   await sleep()
//   const sprintTasks = mockTasks.filter((t) => t.sprintId === sprintId)
//   const total = sprintTasks.reduce((acc, curr) => acc + (curr.storyPoints || 0), 0)
//   const completed = sprintTasks
//     .filter((t) => t.status === 'DONE')
//     .reduce((acc, curr) => acc + (curr.storyPoints || 0), 0)
//   return {
//     projectId,
//     sprintId,
//     totalStoryPoints: total,
//     completedStoryPoints: completed,
//     remainingStoryPoints: total - completed,
//     completionPercentage: total > 0 ? Math.round((completed / total) * 100) : 0,
//   }
// }






/**
 * NeuroForge Nexus - API Client & Constants
 * Base URL: http://localhost:8081
 */







/**
 * NeuroForge Nexus - API Client, Constants & Utilities
 * Base URL: http://localhost:8081
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8081';

// =========================================================
// CONSTANTS & ENUMS
// =========================================================

export const USER_ROLES = [
  'ADMIN',
  'PROJECT_MANAGER',
  'PROJECT_LEAD',
  'DEVELOPER',
  'DESIGNER',
  'QA',
  'EMPLOYEE',
];

// ROLES is an array for .map() in UI forms, with static keys for object lookups (e.g. ROLES.ADMIN)
export const ROLES = [
  'ADMIN',
  'PROJECT_MANAGER',
  'PROJECT_LEAD',
  'DEVELOPER',
  'DESIGNER',
  'QA',
  'EMPLOYEE',
];

ROLES.ADMIN = 'ADMIN';
ROLES.PROJECT_MANAGER = 'PROJECT_MANAGER';
ROLES.PROJECT_LEAD = 'PROJECT_LEAD';
ROLES.DEVELOPER = 'DEVELOPER';
ROLES.DESIGNER = 'DESIGNER';
ROLES.QA = 'QA';
ROLES.EMPLOYEE = 'EMPLOYEE';

export const EMPLOYEE_SUB_ROLES = [
  'FRONTEND_DEVELOPER',
  'BACKEND_DEVELOPER',
  'FULLSTACK_DEVELOPER',
  'DEVOPS_ENGINEER',
  'UI_UX_DESIGNER',
  'QA_TESTER',
  'DATA_ENGINEER',
  'SCRUM_MASTER',
];

export const ROLE_LABELS = {
  ADMIN: 'Administrator',
  PROJECT_MANAGER: 'Project Manager',
  PROJECT_LEAD: 'Project Lead',
  DEVELOPER: 'Developer',
  DESIGNER: 'UI/UX Designer',
  QA: 'QA Engineer',
  EMPLOYEE: 'Team Member',
};

export const SUB_ROLE_LABELS = {
  FRONTEND_DEVELOPER: 'Frontend Developer',
  BACKEND_DEVELOPER: 'Backend Developer',
  FULLSTACK_DEVELOPER: 'Full Stack Developer',
  DEVOPS_ENGINEER: 'DevOps Engineer',
  UI_UX_DESIGNER: 'UI/UX Designer',
  QA_TESTER: 'QA Tester',
  DATA_ENGINEER: 'Data Engineer',
  SCRUM_MASTER: 'Scrum Master',
};

export const PROJECT_STATUSES = [
  'PLANNING',
  'ACTIVE',
  'ON_HOLD',
  'COMPLETED',
  'ARCHIVED',
];

export const STATUS_LABELS = {
  PLANNING: 'Planning',
  ACTIVE: 'Active',
  ON_HOLD: 'On Hold',
  COMPLETED: 'Completed',
  ARCHIVED: 'Archived',
  TODO: 'To Do',
  IN_PROGRESS: 'In Progress',
  IN_REVIEW: 'In Review',
  BLOCKED: 'Blocked',
  DONE: 'Done',
};

export const TASK_STATUSES = [
  'TODO',
  'IN_PROGRESS',
  'IN_REVIEW',
  'BLOCKED',
  'DONE',
];

export const TASK_PRIORITIES = [
  'LOW',
  'MEDIUM',
  'HIGH',
  'CRITICAL',
];

export const PRIORITY_LABELS = {
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
  CRITICAL: 'Critical',
};

export const SPRINT_STATUSES = [
  'PLANNED',
  'ACTIVE',
  'COMPLETED',
  'CANCELLED',
];

// =========================================================
// HELPER UTILITY FUNCTIONS
// =========================================================

// Defensive ID extractor for both string IDs and MongoDB objects { id, _id }
export const extractId = (val) => {
  if (!val) return null;
  if (typeof val === 'object') {
    return val.id || val._id || null;
  }
  const str = String(val).trim();
  return str === 'undefined' || str === 'null' || str === '' ? null : str;
};

export const isSprintActive = (sprint) => {
  if (!sprint) return false;
  if (typeof sprint === 'string') {
    return sprint.toUpperCase() === 'ACTIVE';
  }
  if (sprint.status) {
    return sprint.status.toUpperCase() === 'ACTIVE';
  }
  if (sprint.startDate && sprint.endDate) {
    const now = new Date();
    const start = new Date(sprint.startDate);
    const end = new Date(sprint.endDate);
    return now >= start && now <= end;
  }
  return false;
};

export const calculateSprintProgress = (tasks = []) => {
  if (!tasks || tasks.length === 0) return 0;
  const doneTasks = tasks.filter((t) => t.status === 'DONE');
  return Math.round((doneTasks.length / tasks.length) * 100);
};

export const formatStatus = (status) => {
  if (!status) return '';
  return status.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
};

// =========================================================
// CORE FETCH WRAPPER
// =========================================================

export async function request(endpoint, options = {}) {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
  };

  if (config.body && typeof config.body === 'object' && !(config.body instanceof FormData)) {
    config.body = JSON.stringify(config.body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    if (response.status === 204) {
      return null;
    }

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const errorMessage =
        data?.message ||
        data?.error ||
        `Request to ${endpoint} failed with status ${response.status}`;
      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    console.error(`[API Error] ${options.method || 'GET'} ${endpoint}:`, error.message);
    throw error;
  }
}

// =========================================================
// 1. AUTHENTICATION
// =========================================================

export const loginRequest = (credentials) =>
  request('/auth/login', {
    method: 'POST',
    body: credentials,
  });

export const registerRequest = (userData) =>
  request('/auth/register', {
    method: 'POST',
    body: userData,
  });

export const logoutRequest = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('user');
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user') || sessionStorage.getItem('user');
  try {
    return userStr ? JSON.parse(userStr) : null;
  } catch {
    return null;
  }
};

export const authApi = {
  login: loginRequest,
  register: registerRequest,
  logout: logoutRequest,
  getCurrentUser,
};

// =========================================================
// 2. DASHBOARD & STATS
// =========================================================

export const fetchDashboardStats = () => request('/dashboard/stats');
export const getDashboardStats = fetchDashboardStats;

export const dashboardApi = {
  getStats: fetchDashboardStats,
  fetchDashboardStats,
};

// =========================================================
// 3. USERS
// =========================================================

export const fetchUsers = () => request('/users');
export const getUsers = fetchUsers;
export const getAllUsers = fetchUsers;

export const userApi = {
  getAllUsers: fetchUsers,
  getUsers: fetchUsers,
  fetchUsers,
};

// =========================================================
// 4. TEAMS
// =========================================================

export const fetchTeams = () => request('/teams');
export const getTeams = fetchTeams;

export const fetchTeamById = (id) => {
  const tId = extractId(id);
  if (!tId) return Promise.resolve(null);
  return request(`/teams/${tId}`);
};
export const getTeamById = fetchTeamById;

export const createTeam = (teamData) =>
  request('/teams', {
    method: 'POST',
    body: teamData,
  });

export const teamApi = {
  getTeams: fetchTeams,
  fetchTeams,
  getTeamById: fetchTeamById,
  fetchTeamById,
  createTeam,
};

// =========================================================
// 5. PROJECTS
// =========================================================

export const fetchProjects = () => request('/projects');
export const getProjects = fetchProjects;

export const fetchProjectById = (id) => {
  const pId = extractId(id);
  if (!pId) return Promise.resolve(null);
  return request(`/projects/${pId}`);
};
export const getProjectById = fetchProjectById;

export const createProject = (projectData) =>
  request('/projects', {
    method: 'POST',
    body: projectData,
  });

export const updateProject = (id, projectData) => {
  const pId = extractId(id);
  if (!pId) return Promise.reject(new Error('Project ID is required.'));
  return request(`/projects/${pId}`, {
    method: 'PUT',
    body: projectData,
  });
};

export const deleteProject = (id) => {
  const pId = extractId(id);
  if (!pId) return Promise.reject(new Error('Project ID is required.'));
  return request(`/projects/${pId}`, {
    method: 'DELETE',
  });
};

export const projectApi = {
  getProjects: fetchProjects,
  fetchProjects,
  getProjectById: fetchProjectById,
  fetchProjectById,
  createProject,
  updateProject,
  deleteProject,
};

// =========================================================
// 6. SPRINTS (Flexible ID & Single/Double Argument Support)
// =========================================================

export const fetchSprints = (projectId) => {
  const pId = extractId(projectId);
  if (!pId) return Promise.resolve([]);
  return request(`/projects/${pId}/sprints`);
};
export const getSprints = fetchSprints;

export const fetchSprintById = async (arg1, arg2) => {
  const id1 = extractId(arg1);
  const id2 = extractId(arg2);

  // If called with two args: (projectId, sprintId)
  if (id1 && id2) {
    return request(`/projects/${id1}/sprints/${id2}`);
  }

  // If called with a single arg (just sprintId), we query all projects or use direct lookup
  if (id1 && !id2) {
    try {
      // Try direct sprint endpoint if available, or search across projects
      const projects = await request('/projects').catch(() => []);
      for (const p of projects) {
        const pId = p.id || p._id;
        try {
          const sprints = await request(`/projects/${pId}/sprints`);
          const found = (sprints || []).find(s => (s.id || s._id) === id1);
          if (found) return found;
        } catch {
          // continue searching
        }
      }
    } catch {
      // fallback
    }
  }
  return null;
};
export const getSprintById = fetchSprintById;

export const createSprint = (projectId, sprintData) => {
  const pId = extractId(projectId);
  if (!pId) return Promise.reject(new Error('Project ID is required to create a sprint.'));
  return request(`/projects/${pId}/sprints`, {
    method: 'POST',
    body: sprintData,
  });
};

export const updateSprint = (projectId, sprintId, sprintData) => {
  const pId = extractId(projectId);
  const sId = extractId(sprintId);
  if (!pId || !sId) return Promise.reject(new Error('Project ID and Sprint ID are required.'));
  return request(`/projects/${pId}/sprints/${sId}`, {
    method: 'PUT',
    body: sprintData,
  });
};

export const deleteSprint = (projectId, sprintId) => {
  const pId = extractId(projectId);
  const sId = extractId(sprintId);
  if (!pId || !sId) return Promise.reject(new Error('Project ID and Sprint ID are required.'));
  return request(`/projects/${pId}/sprints/${sId}`, {
    method: 'DELETE',
  });
};

export const sprintApi = {
  getSprints: fetchSprints,
  fetchSprints,
  getSprintById: fetchSprintById,
  fetchSprintById,
  createSprint,
  updateSprint,
  deleteSprint,
};
// =========================================================
// 7. TASKS & KANBAN (Defensive against undefined IDs)
// =========================================================

export const fetchTasksByProject = (projectId) => {
  const pId = extractId(projectId);
  if (!pId) return Promise.resolve([]);
  return request(`/projects/${pId}/tasks`);
};
export const getTasksByProject = fetchTasksByProject;

export const fetchTasksBySprint = (projectId, sprintId) => {
  const pId = extractId(projectId);
  const sId = extractId(sprintId);
  if (!pId || !sId) return Promise.resolve([]);
  return request(`/projects/${pId}/tasks/sprint/${sId}`);
};
export const getTasksBySprint = fetchTasksBySprint;

export const fetchTaskById = (projectId, taskId) => {
  const pId = extractId(projectId);
  const tId = extractId(taskId);
  if (!pId || !tId) return Promise.resolve(null);
  return request(`/projects/${pId}/tasks/${tId}`);
};
export const getTaskById = fetchTaskById;

export const fetchSubtasks = (projectId, taskId) => {
  const pId = extractId(projectId);
  const tId = extractId(taskId);
  if (!pId || !tId) return Promise.resolve([]);
  return request(`/projects/${pId}/tasks/${tId}/subtasks`);
};
export const getSubtasks = fetchSubtasks;

export const createTask = (projectId, taskData) => {
  const pId = extractId(projectId);
  if (!pId) return Promise.reject(new Error('Project ID is required to create a task.'));
  return request(`/projects/${pId}/tasks`, {
    method: 'POST',
    body: taskData,
  });
};

export const updateTask = (projectId, taskId, taskData) => {
  const pId = extractId(projectId);
  const tId = extractId(taskId);
  if (!pId || !tId) return Promise.reject(new Error('Project ID and Task ID are required.'));
  return request(`/projects/${pId}/tasks/${tId}`, {
    method: 'PUT',
    body: taskData,
  });
};

/**
 * Handles status and progress mutations during Kanban drag-and-drop actions.
 */
export const updateTaskStatus = (projectId, taskId, statusOrData, maybeProgress) => {
  const pId = extractId(projectId);
  const tId = extractId(taskId);
  if (!pId || !tId) return Promise.reject(new Error('Project ID and Task ID are required.'));

  const payload =
    typeof statusOrData === 'object' && statusOrData !== null
      ? statusOrData
      : {
          status: statusOrData,
          ...(maybeProgress !== undefined ? { progress: maybeProgress } : {}),
        };

  return updateTask(pId, tId, payload);
};

export const deleteTask = (projectId, taskId) => {
  const pId = extractId(projectId);
  const tId = extractId(taskId);
  if (!pId || !tId) return Promise.reject(new Error('Project ID and Task ID are required.'));
  return request(`/projects/${pId}/tasks/${tId}`, {
    method: 'DELETE',
  });
};

export const fetchSprintVelocity = (projectId, sprintId) => {
  const pId = extractId(projectId);
  const sId = extractId(sprintId);
  if (!pId || !sId) return Promise.resolve(null);
  return request(`/projects/${pId}/tasks/sprint/${sId}/velocity`);
};
export const getSprintVelocity = fetchSprintVelocity;

export const fetchSprintBurndown = (projectId, sprintId) => {
  const pId = extractId(projectId);
  const sId = extractId(sprintId);
  if (!pId || !sId) return Promise.resolve([]);
  return request(`/projects/${pId}/tasks/sprint/${sId}/burndown`);
};
export const getSprintBurndown = fetchSprintBurndown;

export const taskApi = {
  getTasksByProject: fetchTasksByProject,
  fetchTasksByProject,
  getTasksBySprint: fetchTasksBySprint,
  fetchTasksBySprint,
  getTaskById: fetchTaskById,
  fetchTaskById,
  getSubtasks: fetchSubtasks,
  fetchSubtasks,
  createTask,
  updateTask,
  updateTaskStatus,
  deleteTask,
  getSprintVelocity: fetchSprintVelocity,
  fetchSprintVelocity,
  getSprintBurndown: fetchSprintBurndown,
  fetchSprintBurndown,
};

// =========================================================
// 8. CI/CD PIPELINES — MILESTONE 3 (SELF-CONTAINED MOCK)
// =========================================================
// NOTE(backend-team): No pipeline endpoints exist yet. Everything below runs
// on independent in-memory arrays — the same pattern as the original
// Sprint/Task mock data — and never touches the live auth / user / team /
// project / sprint / task calls. Swap these three bodies for real requests
// once the backend ships:
//   fetchPipelines      → GET  /projects/{projectId}/pipelines
//   fetchPipelineStats  → GET  /projects/{projectId}/pipelines/stats
//   triggerRollback     → POST /pipelines/{buildId}/rollback

const PIPELINE_MOCK_DELAY = 150;
const pipelineSleep = (ms = PIPELINE_MOCK_DELAY) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const PIPELINE_STAGES = ["Build", "Test", "Sonar", "Docker", "Deploy"];
export const BUILD_STATUSES = ["SUCCESS", "FAILED", "RUNNING"];

// Independent in-memory dataset (resets on page refresh, like the old mocks).
let mockPipelines = [];

// ── Deterministic PRNG helpers ──────────────────────────────
// Seeding from the projectId keeps every project's demo build history stable
// across re-fetches within a session.
const hashSeed = (str) => {
  let h = 2166136261;
  const s = String(str);
  for (let i = 0; i < s.length; i += 1) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
};

const mulberry32 = (seed) => {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const BRANCH_POOL = [
  "main",
  "develop",
  "feature/ci-pipeline",
  "feature/auth-refactor",
  "release/v2.4",
  "hotfix/token-expiry",
  "feature/kanban-drag",
];
const COMMIT_MESSAGE_POOL = [
  "feat: wire pipeline stage runner to queue",
  "fix: flaky checkout integration test",
  "chore: bump node to 22.4 in CI image",
  "feat: sonar gate blocks deploy on hotspots",
  "refactor: extract docker build layer cache",
  "fix: rollback grabs last green build",
  "feat: parallel test shards for build stage",
  "docs: add pipeline runbook",
];
const TRIGGER_POOL = [
  "Maneesh R",
  "Mir Mohammed Kazim",
  "Elena Vasquez",
  "Marcus Lee",
  "Tomiwa Okafor",
  "Ravi Menon",
];

const buildStages = (rand, buildStatus) => {
  if (buildStatus === "SUCCESS") {
    return PIPELINE_STAGES.map((name) => ({ name, status: "PASSED" }));
  }
  if (buildStatus === "FAILED") {
    const failedAt = Math.floor(rand() * PIPELINE_STAGES.length);
    return PIPELINE_STAGES.map((name, i) => ({
      name,
      status: i < failedAt ? "PASSED" : i === failedAt ? "FAILED" : "PENDING",
    }));
  }
  // RUNNING — every stage up to the current one passed, the rest is pending.
  const currentAt = Math.floor(rand() * PIPELINE_STAGES.length);
  return PIPELINE_STAGES.map((name, i) => ({
    name,
    status: i < currentAt ? "PASSED" : "PENDING",
  }));
};

// Lazily populates the mock dataset the first time a project is queried, so
// any real (backend-seeded) projectId gets a plausible recent build history.
const seedPipelinesForProject = (projectId) => {
  if (mockPipelines.some((b) => b.projectId === projectId)) return;

  const rand = mulberry32(hashSeed(projectId));
  const buildCount = 4 + Math.floor(rand() * 3); // 4–6 recent builds
  const now = Date.now();
  let activeDeploymentAssigned = false;

  for (let i = 0; i < buildCount; i += 1) {
    const roll = rand();
    let status;
    if (i === 0 && roll < 0.35) {
      status = "RUNNING"; // only the newest build may still be in flight
    } else {
      status = roll < 0.82 ? "SUCCESS" : "FAILED";
    }

    const hoursAgo = 1.5 + i * (16 + rand() * 26);
    const startedAt = new Date(now - hoursAgo * 3600 * 1000).toISOString();

    const durationSeconds =
      status === "FAILED"
        ? 60 + Math.floor(rand() * 440) // failed builds stop partway through
        : 180 + Math.floor(rand() * 720);

    const build = {
      id: `BLD-${projectId}-${i + 1}`,
      projectId,
      branch: BRANCH_POOL[Math.floor(rand() * BRANCH_POOL.length)],
      commitMessage:
        COMMIT_MESSAGE_POOL[Math.floor(rand() * COMMIT_MESSAGE_POOL.length)],
      commitHash: Math.floor(rand() * 0xfffffff)
        .toString(16)
        .padStart(7, "0"),
      status,
      triggeredBy: TRIGGER_POOL[Math.floor(rand() * TRIGGER_POOL.length)],
      startedAt,
      durationSeconds,
      stages: buildStages(rand, status),
      // The newest SUCCESS build serves traffic; Rollback flips this flag.
      isActiveDeployment: false,
    };

    if (status === "SUCCESS" && !activeDeploymentAssigned) {
      build.isActiveDeployment = true;
      activeDeploymentAssigned = true;
    }

    mockPipelines.push(build);
  }
};

export async function fetchPipelines(projectId) {
  const pId = extractId(projectId);
  await pipelineSleep();
  if (!pId) return [];
  seedPipelinesForProject(pId);
  return mockPipelines
    .filter((b) => b.projectId === pId)
    .sort((a, b) => new Date(b.startedAt) - new Date(a.startedAt))
    .map((b) => ({ ...b, stages: b.stages.map((s) => ({ ...s })) }));
}

export async function fetchPipelineStats(projectId) {
  const pId = extractId(projectId);
  await pipelineSleep();
  if (!pId) {
    return { buildsToday: 0, successRatePercent: 0, avgDeploySeconds: 0 };
  }
  seedPipelinesForProject(pId);

  const builds = mockPipelines.filter((b) => b.projectId === pId);
  const today = new Date().toDateString();
  const finished = builds.filter((b) => b.status !== "RUNNING");
  const successes = finished.filter((b) => b.status === "SUCCESS");

  return {
    buildsToday: builds.filter(
      (b) => new Date(b.startedAt).toDateString() === today,
    ).length,
    successRatePercent: finished.length
      ? Math.round((successes.length / finished.length) * 100)
      : 0,
    avgDeploySeconds: successes.length
      ? Math.round(
          successes.reduce((sum, b) => sum + b.durationSeconds, 0) /
            successes.length,
        )
      : 0,
  };
}

export async function triggerRollback(buildId) {
  const bId = extractId(buildId);
  await pipelineSleep();

  const build = mockPipelines.find((b) => b.id === bId);
  if (!build) throw new Error("Build not found.");
  if (build.status !== "SUCCESS") {
    throw new Error("Only successful builds can be rolled back to.");
  }
  if (build.isActiveDeployment) {
    throw new Error("This build is already the active deployment.");
  }

  // Flip: the chosen build becomes the active deployment; its project's
  // previous deployment stands down.
  mockPipelines.forEach((b) => {
    if (b.projectId === build.projectId) {
      b.isActiveDeployment = b.id === bId;
    }
  });

  return {
    ...build,
    stages: build.stages.map((s) => ({ ...s })),
    isActiveDeployment: true,
    message: `Rolled back to build ${build.commitHash} on ${build.branch}.`,
  };
}

export const pipelineApi = {
  getPipelines: fetchPipelines,
  fetchPipelines,
  getPipelineStats: fetchPipelineStats,
  fetchPipelineStats,
  triggerRollback,
};

// =========================================================
// 9. AI ASSISTANT — HEURISTIC PLACEHOLDER (NO REAL AI YET)
// =========================================================
// NOTE(backend-team): Same pattern as the Milestone 3 pipeline mock.
// `askAssistant` runs entirely in the browser on already-fetched data.
// Swap its body for one POST to your AI endpoint when it ships — the
// reply shape below is already final, so nothing else needs to change:
//   { type: 'CREATE_PROJECT', reply, prefill?: { name, teamId, dueDate } }
//   { type: 'ANSWER', reply }

/** Escapes a string for safe use inside a case-insensitive RegExp. */
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Date as a local YYYY-MM-DD string (matches <input type="date">). */
const toIsoDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/** Parses "in N days/weeks/months" into a due-date ISO string (local time). */
const parseDueDate = (message) => {
  const match = message.match(/\bin\s+(\d+)\s+(days?|weeks?|months?)\b/i);
  if (!match) return '';
  const amount = parseInt(match[1], 10);
  const unit = match[2].toLowerCase();
  if (!Number.isFinite(amount) || amount < 0) return '';
  const days = unit.startsWith('day') ? amount : unit.startsWith('week') ? amount * 7 : amount * 30;
  const due = new Date();
  due.setDate(due.getDate() + days);
  return toIsoDate(due);
};

/** Longest team whose name literally appears in the message → its id. */
const matchTeamId = (message, teams) => {
  const lower = message.toLowerCase();
  let best = null;
  let bestLength = 0;
  for (const team of teams || []) {
    const name = String(team?.name || '').trim().toLowerCase();
    if (name.length > bestLength && lower.includes(name)) {
      best = team;
      bestLength = name.length;
    }
  }
  return best ? extractId(best) || '' : '';
};

/**
 * Project name from a CREATE command: quoted text → after "called"/"named" →
 * fallback to the longest run of capitalized words that isn't a team name or
 * generic filler.
 */
const parseProjectName = (message, teams) => {
  // 1) Quoted: "Phoenix Recovery" / 'Phoenix Recovery'
  const quoted = message.match(/["'“”]([^"'“”]{2,})["'“”]/);
  if (quoted?.[1]?.trim()) return quoted[1].trim();

  // 2) "…called Apollo for team X…", "…named …", "…titled …"
  const called = message.match(
    /\b(?:called|named|titled)\s+(.+?)(?=\s+\b(?:for|with|due|in|under|by|team|that|which)\b|[,.!?;:]|$)/i,
  );
  if (called?.[1]?.trim()) return called[1].replace(/\s+/g, ' ').trim();

  // 3) Fallback: longest capitalized run after scrubbing known noise.
  let scrubbed = message;
  for (const team of teams || []) {
    const name = String(team?.name || '').trim();
    if (name) scrubbed = scrubbed.replace(new RegExp(escapeRegExp(name), 'gi'), ' ');
  }
  scrubbed = scrubbed
    .replace(/\b(?:in|due(?:\s+in)?)\s+(?:\d+|a|an)\s+(?:days?|weeks?|months?)\b/gi, ' ')
    .replace(
      /\b(?:please|can|could|you|create|add|make|new|a|an|the|project|called|named|titled|for|with|under|by|team|due|in|on|at)\b/gi,
      ' ',
    )
    .replace(/[^\w\s'-]/g, ' ');
  const runs = (scrubbed.match(/[A-Z][\w'-]*(?:\s+[A-Z][\w'-]*)*/g) || []).map((run) => run.trim());
  const bestRun = runs.sort((a, b) => b.split(/\s+/).length - a.split(/\s+/).length)[0];
  return bestRun || '';
};

/**
 * REAL AI: Replace this heuristic function with a call to the backend's
 * AI endpoint once available, e.g.:
 *   const { data } = await http.post('/ai/assistant', { message: text, context: {...} });
 *   return data; // same shape: { type, reply, prefill? }
 * Backend team will wire this to their LLM API key.
 */
export async function askAssistant(text, { projects = [], teams = [] } = {}) {
  const message = String(text ?? '').trim();
  const lower = message.toLowerCase();

  if (!message) {
    return {
      type: 'ANSWER',
      reply: 'Type a request and I\'ll do my best — e.g. "Create a project called X for team Y, due in 3 weeks".',
    };
  }

  // ── 1. CREATE_PROJECT — starts with "create / add / make / new …" ─────
  if (/^\s*(?:please\s+)?(?:can you\s+|could you\s+)?(?:create|add|make|new)\b/i.test(message)) {
    return {
      type: 'CREATE_PROJECT',
      reply: 'Got it — opening the project form with what I understood.',
      prefill: {
        name: parseProjectName(message, teams),
        teamId: matchTeamId(message, teams),
        dueDate: parseDueDate(message),
      },
    };
  }

  // ── 2. SPRINT_RISK — mentions "risk" / "behind" / "delayed" ───────────
  if (/\b(?:risk|behind|delayed)\b/i.test(lower)) {
    const atRisk = [];

    for (const project of projects || []) {
      const pId = extractId(project);
      if (!pId) continue;
      const sprints = await fetchSprints(pId).catch(() => []);

      for (const sprint of sprints || []) {
        const sId = extractId(sprint);
        if (!sId || !sprint.startDate || !sprint.endDate) continue;

        const start = new Date(`${sprint.startDate}T00:00:00`);
        const end = new Date(`${sprint.endDate}T23:59:59`);
        const now = new Date();
        if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end <= start) continue;
        if (now < start) continue; // not started yet — can't be behind schedule

        // How much of the sprint window has elapsed (capped at 100%).
        const elapsedFraction = Math.min(1, (now - start) / (end - start));

        // How much of the sprint's story points are done.
        const tasks = await fetchTasksBySprint(pId, sId).catch(() => []);
        const pointOf = (t) => t.storyPoints || t.points || 1;
        const totalPoints = (tasks || []).reduce((sum, t) => sum + pointOf(t), 0);
        if (totalPoints <= 0) continue;
        const donePoints = (tasks || [])
          .filter((t) => t.status === 'DONE')
          .reduce((sum, t) => sum + pointOf(t), 0);
        const doneFraction = donePoints / totalPoints;

        // Behind by more than 15 percentage points → at risk.
        if (doneFraction < elapsedFraction - 0.15) {
          atRisk.push({ sprint, project, elapsedFraction, doneFraction });
        }
      }
    }

    if (atRisk.length === 0) {
      return {
        type: 'ANSWER',
        reply: "Nothing looks at risk right now — everything's tracking fine.",
      };
    }

    const lines = atRisk.map(({ sprint, project, elapsedFraction, doneFraction }) => {
      const percentElapsed = Math.round(elapsedFraction * 100);
      const percentDone = Math.round(doneFraction * 100);
      return `• "${sprint.name || 'Untitled sprint'}" on ${project?.name || 'a project'} — ${percentDone}% of story points done vs ${percentElapsed}% of the schedule elapsed (${percentElapsed - percentDone} points behind).`;
    });

    return {
      type: 'ANSWER',
      reply:
        atRisk.length === 1
          ? `1 sprint looks at risk:\n${lines[0]}`
          : `${atRisk.length} sprints look at risk:\n${lines.join('\n')}`,
    };
  }

  // ── 3. Active project count ────────────────────────────────────────────
  if (lower.includes('active projects') || lower.includes('how many projects')) {
    const count = (projects || []).filter(
      (p) => String(p?.status || '').toUpperCase() === 'ACTIVE',
    ).length;
    return {
      type: 'ANSWER',
      reply: `You have ${count} active ${count === 1 ? 'project' : 'projects'} right now.`,
    };
  }

  // ── 4. Fallback — describe what the assistant can do ───────────────────
  return {
    type: 'ANSWER',
    reply:
      'I can help with things like: "Create a project called X for team Y, due in 3 weeks", "Which sprints are at risk?", or "How many active projects do we have?"',
  };
}

export const assistantApi = { askAssistant };

// =========================================================
// DEFAULT BUNDLED EXPORT
// =========================================================

const client = {
  USER_ROLES,
  EMPLOYEE_SUB_ROLES,
  ROLES,
  ROLE_LABELS,
  SUB_ROLE_LABELS,
  PROJECT_STATUSES,
  STATUS_LABELS,
  TASK_STATUSES,
  TASK_PRIORITIES,
  PRIORITY_LABELS,
  SPRINT_STATUSES,
  extractId,
  isSprintActive,
  calculateSprintProgress,
  formatStatus,
  request,
  auth: authApi,
  dashboard: dashboardApi,
  user: userApi,
  team: teamApi,
  project: projectApi,
  sprint: sprintApi,
  task: taskApi,
  pipeline: pipelineApi,
  assistant: assistantApi,
};

export default client;