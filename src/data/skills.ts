import type { Skills } from './experience-schema';
import { skillCategoryMap } from './skill-categories';

export const skills: Skills[] = [
  // Existing (unchanged) items 1–9
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
  },

  // Newly described items 10–24
  {
    id: 10,
    name: 'Solution Engineering',
    description: 'Technical Prototyping, Systems Integration, Requirements Analysis',
    category: skillCategoryMap[10], // Strategy
    proficiency: 4,
    iconName: 'settings'
  },
  {
    id: 11,
    name: 'Artificial Intelligence',
    description: 'Machine Learning, NLP, AI Model Development',
    category: skillCategoryMap[11], // Tech
    proficiency: 4,
    iconName: 'cpu'
  },
  {
    id: 12,
    name: 'Search Strategy & Optimization',
    description: 'SEO, Structured Data, Semantic Search',
    category: skillCategoryMap[12], // Digital
    proficiency: 5,
    iconName: 'search'
  },
  {
    id: 13,
    name: 'SQL Development & Data Modeling',
    description: 'Query Optimization, Relational Design, Performance Tuning',
    category: skillCategoryMap[13], // Data
    proficiency: 4,
    iconName: 'database'
  },
  {
    id: 14,
    name: 'Web Services & API Development',
    description: 'RESTful APIs, GraphQL, Endpoint Security',
    category: skillCategoryMap[14], // Tech
    proficiency: 4,
    iconName: 'api'
  },
  {
    id: 15,
    name: 'ETL/ELT Development',
    description: 'Data Ingestion, Transformation Pipelines, Data Quality Assurance',
    category: skillCategoryMap[15], // Data
    proficiency: 5,
    iconName: 'shuffle'
  },
  {
    id: 16,
    name: 'Software Development',
    description: 'Full-stack Engineering, Code Reviews, Cloud Deployment',
    category: skillCategoryMap[16], // Tech
    proficiency: 4,
    iconName: 'code'
  },
  {
    id: 17,
    name: 'Solution Architecture',
    description: 'System Blueprinting, Scalability Design, Stakeholder Alignment',
    category: skillCategoryMap[17], // Strategy
    proficiency: 5,
    iconName: 'layers'
  },
  {
    id: 18,
    name: 'Enterprise Architecture',
    description: 'Strategic Alignment, Governance Models, Framework Implementation',
    category: skillCategoryMap[18], // Enterprise Architecture
    proficiency: 5,
    iconName: 'layout-dashboard'
  },
  {
    id: 19,
    name: 'Experience & Systems Design',
    description: 'UX/UI Design, Information Architecture, Interaction Modeling',
    category: skillCategoryMap[19], // Digital
    proficiency: 4,
    iconName: 'monitor-smartphone'
  },
  {
    id: 20,
    name: 'Service-Oriented & API-Driven Architecture',
    description: 'Microservices, API Gateway Design, Integration Standards',
    category: skillCategoryMap[20], // Strategy
    proficiency: 4,
    iconName: 'share-2'
  },
  {
    id: 21,
    name: 'Digital Strategy',
    description: 'Channel Planning, Content Strategy, Campaign Optimization',
    category: skillCategoryMap[21], // Digital
    proficiency: 5,
    iconName: 'monitor-smartphone'
  },
  {
    id: 22,
    name: 'Team Leadership',
    description: 'Mentoring, Team Building, Performance Management',
    category: skillCategoryMap[22], // Leadership
    proficiency: 5,
    iconName: 'users'
  },
  {
    id: 23,
    name: 'Implementation Execution',
    description: 'Delivery Management, Quality Assurance, Outcome Measurement',
    category: skillCategoryMap[23], // Leadership
    proficiency: 4,
    iconName: 'check-circle'
  },
  {
    id: 24,
    name: 'TOGAF-Driven IT Strategy',
    description: 'Architecture Frameworks, Strategic Roadmapping, Enterprise Standards',
    category: skillCategoryMap[24], // Strategy
    proficiency: 3,
    iconName: 'book-open'
  }
];
