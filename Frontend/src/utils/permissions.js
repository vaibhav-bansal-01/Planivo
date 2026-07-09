export const canUpdateProject = (role) => role === "admin"; //done

export const canDeleteProject = (role) => role === "admin"; //done

export const canManageMembers = (role) => role === "admin"; //done

export const canCreateTask = (role) =>
  ["admin", "project_admin", "member"].includes(role); //done

export const canUpdateTask = (role) =>
  ["admin", "project_admin"].includes(role); //done

export const canDeleteTask = (role) =>
  ["admin", "project_admin"].includes(role); //done

export const canViewTask = (role) =>
  ["admin", "project_admin", "member"].includes(role); //done

export const canUpdateSubtaskStatus = (role) =>
  ["admin", "project_admin", "member"].includes(role); //done

export const canCreateSubtask = (role) =>
  ["admin", "project_admin", "member"].includes(role); //done

export const canDeleteSubtask = (role) =>
  ["admin", "project_admin", "member"].includes(role); //done

export const canCreateNote = (role) =>
  ["admin", "project_admin"].includes(role); //done

export const canUpdateNote = (role) =>
  ["admin", "project_admin"].includes(role); //done

export const canDeleteNote = (role) =>
  ["admin", "project_admin"].includes(role); //done

export const canViewNote = (role) =>
  ["admin", "project_admin", "member"].includes(role); //done
