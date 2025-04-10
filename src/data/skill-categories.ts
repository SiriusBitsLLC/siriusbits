export interface SkillCategory {
  id: string;
  name: string;
  icon: string;
}

export const skillCategories: SkillCategory[] = [
  { id: 'strategy', name: 'Strategy', icon: 'layers' },
  { id: 'data', name: 'Data', icon: 'database' },
  { id: 'tech', name: 'Technology', icon: 'code' },
  { id: 'leadership', name: 'Leadership', icon: 'users' }
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
  9: 'leadership' // Leadership & Talent Development
};
