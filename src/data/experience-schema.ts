
export interface Activities {
  id: number;
  // Descriptive task, project, or responsibility for a duty
  activity: string | null;
  dutyId: number;
}

export interface Companies {
  id: number;
  // Company name
  company: string;
  // Type of business
  companyType: string | null;
  // City, State 
  location: string;
}

export interface Duties {
  id: number;
  duties: string | null;
  roleId: number;
  // Zero or more related comma-separated skill ids
  relevantSkills: string | null;
}

export interface Roles {
  id: number;
  // Job title
  title: string | null;
  // Summary of the role.
  summary: string | null;
  // Date Only - yyyy-MM-dd
  startDate: string | null;
  // Date Only - yyyy-MM-dd
  endDate: string | null;
  companyId: number;
  // Company name
  company: string;
}

export interface Skills {
  id: number;
  // Skill name
  name: string | null;
  // Skill short description
  description: string | null;
}
