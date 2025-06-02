export interface SkillCategory {
  id: string;
  name: string;
  iconName: string;
}

export const skillCategories: SkillCategory[] = [
  { id: 'strategy', name: 'Strategy', iconName: 'layers' },
  { id: 'data', name: 'Data', iconName: 'database' },
  { id: 'tech', name: 'Technology', iconName: 'code' },
  { id: 'leadership', name: 'Leadership', iconName: 'users' },
  { id: 'digital', name: 'Digital', iconName: 'monitor-smartphone' }
];

// Map skill IDs to category IDs
export const skillCategoryMap: Record<number, string> = {
  1: 'strategy', // Global Business Strategy
  2: 'data',     // Data Architecture
  3: 'data',     // Analytics & Insights
  4: 'strategy', // Project Management
  5: 'strategy', // Digital Transformation
  6: 'data',     // Data Engineering
  7: 'tech',     // Technology Strategy
  8: 'tech',     // Enterprise Architecture
  9: 'leadership', // Leadership & Talent Development
  10: 'strategy', // Solution Engineering
  11: 'tech', // Artificial Intelligence
  12: 'digital', // Search Strategy & Optimization
  13: 'data', // SQL Development & Data Modeling
  14: 'tech', // Web Services & API Development
  15: 'data', // ETL/ELT Development
  16: 'tech', // Software Development
  17: 'strategy', // Solution Architecture
  18: 'tech', // Enterprise Architecture
  19: 'digital', // Experience & Systems Design
  20: 'strategy', // Service-Oriented & API-Driven Architecture
  21: 'digital', // Digital Strategy
  22: 'leadership', // Team Leadership
  23: 'leadership', // Implementation Execution
  24: 'strategy' // TOGAF-Driven IT Strategy
};
