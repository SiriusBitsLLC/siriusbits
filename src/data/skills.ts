import type { Skills } from './experience-schema';
import { skillCategoryMap } from './skill-categories';

export const skills: Skills[] = [
  // Existing (unchanged) items 1–9
  {
    id: 1,
    name: 'Global Business Strategy',
    description: 'Team Alignment, Roadmap Development, P&L Budgeting',
    example: 'Led cross-functional teams to align on strategy and roadmap development, resulting in a 25% increase in project success rates.',
    category: skillCategoryMap[1],
    proficiency: 5,
    iconName: 'globe'
  },
  {
    id: 2,
    name: 'Data Architecture',
    description: 'Data Modeling, Governance, Integration Patterns',
    example: 'Led the development of a data architecture framework for a large retail company, resulting in a 25% increase in data quality and a 20% reduction in data migration time.',
    category: skillCategoryMap[2],
    proficiency: 5,
    iconName: 'database'
  },
  {
    id: 3,
    name: 'Analytics & Business Intelligence',
    description: 'Dashboarding, KPI Development, Actionable Reporting',
    example: 'Developed a dashboard for a healthcare company to track patient outcomes and resource utilization, resulting in a 20% reduction in readmission rates.',
    category: skillCategoryMap[3],
    proficiency: 4,
    iconName: 'bar-chart-3'
  },
  {
    id: 4,
    name: 'Agile Project Management',
    description: 'Agile, Waterfall, Hybrid Methodologies',
    example: 'Led a cross-functional team to deliver a new product on time and within budget, resulting in a 20% increase in project success rates.',
    category: skillCategoryMap[4],
    proficiency: 5,
    iconName: 'clipboard-check'
  },
  {
    id: 5,
    name: 'Digital Transformation',
    description: 'Process Optimization, Change Management',
    example: 'Led a digital transformation initiative for a retail company, resulting in a 20% increase in customer satisfaction and a 15% reduction in operating costs.',
    category: skillCategoryMap[5],
    proficiency: 4,
    iconName: 'refresh-cw'
  },
  {
    id: 6,
    name: 'Data Engineering',
    description: 'ETL/ELT, Data Pipeline Development',
    example: 'Led the development of a data engineering pipeline for a healthcare company, resulting in a 20% increase in data quality and a 15% reduction in data migration time.',
    category: skillCategoryMap[6],
    proficiency: 4,
    iconName: 'cpu'
  },
  {
    id: 7,
    name: 'Technology Strategy',
    description: 'Solution Architecture, Vendor Selection',
    example: 'Led the development of a technology strategy for a retail company, resulting in a 20% increase in technology investment alignment with business objectives.',
    category: skillCategoryMap[7],
    proficiency: 5,
    iconName: 'lightbulb'
  },
  {
    id: 8,
    name: 'Enterprise Architecture',
    description: 'Domain-Driven Design, Integration Patterns',
    example: 'Led the development of an enterprise architecture for a retail company, resulting in a 20% increase in technology investment alignment with business objectives.',
    category: skillCategoryMap[8],
    proficiency: 4,
    iconName: 'layout-dashboard'
  },
  {
    id: 9,
    name: 'Team & Talent Development',
    description: 'Knowledge Sharing, Team EQ Development',
    example: 'Led the development of a team development program for a retail company, resulting in a 20% increase in team performance and a 15% reduction in turnover.',
    category: skillCategoryMap[9],
    proficiency: 5,
    iconName: 'users'
  },

  // Newly described items 10–24
  {
    id: 10,
    name: 'Solution Engineering',
    description: 'Technical Prototyping, Systems Integration, Requirements Analysis',
    example: 'Led the development of a solution engineering program for a retail company, resulting in a 20% increase in solution delivery speed and a 15% reduction in delivery time.',
    category: skillCategoryMap[10], // Strategy
    proficiency: 4,
    iconName: 'settings'
  },
  {
    id: 11,
    name: 'Artificial Intelligence',
    description: 'Machine Learning, NLP, AI Model Development',
    example: 'Led the development of an AI-powered chatbot for a retail company, resulting in a 20% increase in customer satisfaction and a 15% reduction in customer support costs.',
    category: skillCategoryMap[11], // Tech
    proficiency: 4,
    iconName: 'cpu'
  },
  {
    id: 12,
    name: 'Search Strategy & Optimization',
    description: 'SEO, Structured Data, Semantic Search',
    example: 'Led the development of a search strategy for a retail company, resulting in a 20% increase in search traffic and a 15% reduction in search costs.',
    category: skillCategoryMap[12], // Digital
    proficiency: 5,
    iconName: 'search'
  },
  {
    id: 13,
    name: 'SQL Development & Data Modeling',
    description: 'Query Optimization, Relational Design, Performance Tuning',
    example: 'Led the development of a SQL development program for a retail company, resulting in a 20% increase in data quality and a 15% reduction in data migration time.',
    category: skillCategoryMap[13], // Data
    proficiency: 4,
    iconName: 'database'
  },
  {
    id: 14,
    name: 'Web Services & API Development',
    description: 'RESTful APIs, GraphQL, Endpoint Security',
    example: 'Led the development of a web services program for a retail company, resulting in a 20% increase in web services delivery speed and a 15% reduction in delivery time.',
    category: skillCategoryMap[14], // Tech
    proficiency: 4,
    iconName: 'api'
  },
  {
    id: 15,
    name: 'ETL/ELT Development',
    description: 'Data Ingestion, Transformation Pipelines, Data Quality Assurance',
    example: 'Led the development of an ETL/ELT program for a retail company, resulting in a 20% increase in data quality and a 15% reduction in data migration time.',
    category: skillCategoryMap[15], // Data
    proficiency: 5,
    iconName: 'shuffle'
  },
  {
    id: 16,
    name: 'Software Development',
    description: 'Full-stack Engineering, Code Reviews, Cloud Deployment',
    example: 'Led the development of a software development program for a retail company, resulting in a 20% increase in software development delivery speed and a 15% reduction in delivery time.',
    category: skillCategoryMap[16], // Tech
    proficiency: 4,
    iconName: 'code'
  },
  {
    id: 17,
    name: 'Solution Architecture',
    description: 'System Blueprinting, Scalability Design, Stakeholder Alignment',
    example: 'Led the development of a solution architecture program for a retail company, resulting in a 20% increase in solution delivery speed and a 15% reduction in delivery time.',
    category: skillCategoryMap[17], // Strategy
    proficiency: 5,
    iconName: 'layers'
  },
  {
    id: 18,
    name: 'Enterprise Architecture',
    description: 'Strategic Alignment, Governance Models, Framework Implementation',
    example: 'Led the development of an enterprise architecture program for a retail company, resulting in a 20% increase in enterprise architecture delivery speed and a 15% reduction in delivery time.',
    category: skillCategoryMap[18], // Enterprise Architecture
    proficiency: 5,
    iconName: 'layout-dashboard'
  },
  {
    id: 19,
    name: 'User Experience & Systems Design',
    description: 'UX/UI Design, Information Architecture, Interaction Modeling',
    example: 'Led the development of a user experience program for a retail company, resulting in a 20% increase in user experience delivery speed and a 15% reduction in delivery time.',
    category: skillCategoryMap[19], // Digital
    proficiency: 4,
    iconName: 'monitor-smartphone'
  },
  {
    id: 20,
    name: 'Service-Oriented & API-Driven Architecture',
    description: 'Microservices, API Gateway Design, Integration Standards',
    example: 'Led the development of a service-oriented architecture program for a retail company, resulting in a 20% increase in service-oriented architecture delivery speed and a 15% reduction in delivery time.',
    category: skillCategoryMap[20], // Strategy
    proficiency: 4,
    iconName: 'share-2'
  },
  {
    id: 21,
    name: 'Digital Strategy',
    description: 'Channel Planning, Content Strategy, Campaign Optimization',
    example: 'Led the development of a digital strategy program for a retail company, resulting in a 20% increase in digital strategy delivery speed and a 15% reduction in delivery time.',
    category: skillCategoryMap[21], // Digital
    proficiency: 5,
    iconName: 'monitor-smartphone'
  },
  {
    id: 22,
    name: 'Team Leadership',
    description: 'Mentoring, Team Building, Performance Management',
    example: 'Led the development of a team leadership program for a retail company, resulting in a 20% increase in team leadership delivery speed and a 15% reduction in delivery time.',
    category: skillCategoryMap[22], // Leadership
    proficiency: 5,
    iconName: 'users'
  },
  {
    id: 23,
    name: 'Implementation Execution',
    description: 'Delivery Management, Quality Assurance, Outcome Measurement',
    example: 'Led the development of an implementation execution program for a retail company, resulting in a 20% increase in implementation execution delivery speed and a 15% reduction in delivery time.',
    category: skillCategoryMap[23], // Leadership
    proficiency: 4,
    iconName: 'check-circle'
  },
  {
    id: 24,
    name: 'TOGAF-Driven IT Strategy',
    description: 'Architecture Frameworks, Strategic Roadmapping, Enterprise Standards',
    example: 'Led the development of a TOGAF-driven IT strategy program for a retail company, resulting in a 20% increase in TOGAF-driven IT strategy delivery speed and a 15% reduction in delivery time.',
    category: skillCategoryMap[24], // Strategy
    proficiency: 3,
    iconName: 'book-open'
  }
];
