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
  // Concise summary of the duty based on related activities
  summary?: string;
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
  // Skill category ID (strategy, data, tech, leadership)
  category?: string;
  // Proficiency level (1-5)
  proficiency?: number;
  // Icon name for dynamic skill nav icons
  iconName?: string;
}
