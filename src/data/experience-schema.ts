export interface Activities {
  id: number;
  // Descriptive task, project, or responsibility for a duty
  activity: string | null;
  dutyId: number;
  roleId: number; // Now required: the role this activity is for
  // Short area of focus label for this activity
  focus?: string;
}

export interface Companies {
  id: number;
  // Company name
  company: string;
  // Type of business
  companyType: string | null;
  // City, State 
  location: string;
  // Company category: 'corporate' or 'consulting'
  companyCategory: "corporate" | "consulting";
}

export interface Duties {
  id: number;
  duties: string | null;
  roleIds: number[]; // Associated roles
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
  // Applied Example of Skill
  example: string | null;
  // Skill category ID (strategy, data, tech, leadership)
  category?: string;
  // Proficiency level (1-5)
  proficiency?: number;
  // Proficiency label (Emerging, Developing, Professional, Expert, Worldclass)
  proficiencyLabel?: string;
  // Icon name for dynamic skill nav icons
  iconName?: string;
}
