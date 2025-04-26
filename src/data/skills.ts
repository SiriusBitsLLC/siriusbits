import type { Skills } from './experience-schema';
import { skillCategoryMap } from './skill-categories';

export const skills: Skills[] = [
  {
    id: 1,
    name: 'Global Business Strategy',
    description: 'Team Alignment, Roadmap Development, P&L Budgeting',
    category: skillCategoryMap[1],
    proficiency: 5,
    iconName: 'globe'
  },
  {
    id: 2,
    name: 'Data Architecture',
    description: 'Data Modeling, Governance, Integration Patterns',
    category: skillCategoryMap[2],
    proficiency: 5,
    iconName: 'database'
  },
  {
    id: 3,
    name: 'Analytics & Insights',
    description: 'Dashboarding, KPI Development, Actionable Reporting',
    category: skillCategoryMap[3],
    proficiency: 4,
    iconName: 'bar-chart-3'
  },
  {
    id: 4,
    name: 'Project Management',
    description: 'Agile, Waterfall, Hybrid Methodologies',
    category: skillCategoryMap[4],
    proficiency: 5,
    iconName: 'clipboard-check'
  },
  {
    id: 5,
    name: 'Digital Transformation',
    description: 'Process Optimization, Change Management',
    category: skillCategoryMap[5],
    proficiency: 4,
    iconName: 'refresh-cw'
  },
  {
    id: 6,
    name: 'Data Engineering',
    description: 'ETL/ELT, Data Pipeline Development',
    category: skillCategoryMap[6],
    proficiency: 4,
    iconName: 'cpu'
  },
  {
    id: 7,
    name: 'Technology Strategy',
    description: 'Solution Architecture, Vendor Selection',
    category: skillCategoryMap[7],
    proficiency: 5,
    iconName: 'lightbulb'
  },
  {
    id: 8,
    name: 'Enterprise Architecture',
    description: 'Domain-Driven Design, Integration Patterns',
    category: skillCategoryMap[8],
    proficiency: 4,
    iconName: 'layout-dashboard'
  },
  {
    id: 9,
    name: 'Leadership & Talent Development',
    description: 'Knowledge Sharing, Team EQ Development',
    category: skillCategoryMap[9],
    proficiency: 5,
    iconName: 'users'
  }
];
