import type { Skills } from './experience-schema';
import { skillCategoryMap } from './skill-categories';

export const skills: Skills[] = [
  // Existing (unchanged) items 1–9
  {
    id: 1,
    name: 'Global Business Strategy',
    description: 'Team Alignment, Roadmap Development, P&L Budgeting',
    example: 'Spearheaded a series of high-impact data transformation efforts that significantly improved technology spend efficiency and contributed to over $1 billion in annual revenue by aligning marketing, sales, and customer engagement data into a unified digital ecosystem that continue to serve as foundational accelerators for personalized engagement and measurable growth.', //Hyland
    category: skillCategoryMap[1],
    proficiency: 5,
    proficiencyLabel: 'Authority',
    iconName: 'globe'
  },
  {
    id: 2,
    name: 'Data Architecture',
    description: 'Data Cataloging, Governance, Integration Patterns',
    example: 'Developed an ELT methodology using dbt to create a global semantic model using non-destructive data transformation pipelines, ensuring data integrity, lineage, and documentation.', //Hyland
    category: skillCategoryMap[2],
    proficiency: 5,
    proficiencyLabel: 'Authority',
    iconName: 'database'
  },
  {
    id: 3,
    name: 'Analytics & Business Intelligence',
    description: 'Dashboarding, KPI Development, Actionable Reporting',
    example: 'Identified and facilitated the creation of a customer segmentation dashboard resulting in a successful cross-department collaboration that pulled data from Azure Data Lake, Salesforce, GA4, Magento, and SAP.', //Nestlé
    category: skillCategoryMap[3],
    proficiency: 4,
    proficiencyLabel: 'Expert',
    iconName: 'bar-chart-3'
  },
  {
    id: 4,
    name: 'Agile Project Management',
    description: 'Agile, Waterfall, Hybrid Methodologies',
    example: 'Developed a Lean-Agile methodolgy utilizing kanban and a modified Scrum process to manage both planned project work and adhoc requests that capitalized on limiting WIP, successfully adopting this into standard project management across multiple teams.', //Hyland
    category: skillCategoryMap[4],
    proficiency: 5,
    proficiencyLabel: 'Authority',
    iconName: 'clipboard-check'
  },
  {
    id: 5,
    name: 'Digital Transformation',
    description: 'Process Optimization, Change Management',
    example: 'Guided the company\'s digital transformation to handle hundreds of millions of active data rows, meeting diverse business needs while improving data infrastructure and analytics capabilities.', //Hyland
    category: skillCategoryMap[5],
    proficiency: 4,
    proficiencyLabel: 'Expert',
    iconName: 'refresh-cw'
  },
  {
    id: 6,
    name: 'Data Engineering',
    description: 'ETL/ELT, Data Pipeline Development',
    example: 'Leveraged middle-ware data pipelines to sync and unify data from multiple marketing automation and CRM systems to support ongoing sales and marketing activities in live, production systems with zero-downtime.',
    category: skillCategoryMap[6],
    proficiency: 4,
    iconName: 'cpu'
  },
  {
    id: 7,
    name: 'Technology Strategy',
    description: 'Solution Architecture, Vendor Selection',
    example: 'Led a comprehsnsive RFP-driven vendor selection process to secure an enterprise customer data platform (CDP) to unify and integrate customer data capture and unification across web, marketing automation, CRM, ABM, and customer portal systems.', //Hyland
    category: skillCategoryMap[7],
    proficiency: 5,
    proficiencyLabel: 'Authority',
    iconName: 'lightbulb'
  },
  {
    id: 8,
    name: 'Enterprise Architecture',
    description: 'Strategic Alignment, Governance Models, Framework Implementation',
    example: 'Developed an enterprise wide reference architecture to capture current and future state EA solutions for CRM and B2B eCommerce. Worked with cross-functional teams and senior leadership to create a shared understanding and clear path for the development and implementation of connected systems.', //Sherwin-Williams
    category: skillCategoryMap[18], // Enterprise Architecture
    proficiency: 5,
    proficiencyLabel: 'Authority',
    iconName: 'layout-dashboard'
  },
  {
    id: 9,
    name: 'Team & Talent Development',
    description: 'Mentoring, Team Building, Performance Management',
    example: 'Built and led a team of data and business analyst experts to complete the integration and deployment of a unified data strategy. Recruited top talent and helped team members to expand skill sets, realize opportunities to achieve and present their ideas and accomplishments. Navigated complex and ambiguous business directives from senior leadership to ensure team members could remain focused and productive.', //Nestlé
    category: skillCategoryMap[9],
    proficiency: 5,
    iconName: 'users'
  },

  // Newly described items 10–24
  {
    id: 10,
    name: 'Solution Engineering',
    description: 'Technical Prototyping, Systems Integration, Requirements Analysis',
    example: 'Developed a dynamic web-based platform for promoting and demonstrating the unique capabilities of an AI powered knowledge base chat solution for short-term rental property operators.', //AMP42
    category: skillCategoryMap[10], // Strategy
    proficiency: 4,
    proficiencyLabel: 'Expert',
    iconName: 'settings'
  },
  {
    id: 11,
    name: 'Artificial Intelligence',
    description: 'Machine Learning, NLP, AI Model Development',
    example: 'Leveraged principled AI coding and multi-model architect coding patterns to prep and transform millions of rows of semi-structured datasets from nineteen different third-party data sources to conform to a unified schema for automated ingestion into the Nestlé USA Enterprise data lake.', //Nestlé
    category: skillCategoryMap[11], // Tech
    proficiency: 4,
    iconName: 'cpu'
  },
  {
    id: 12,
    name: 'Search Strategy & Optimization',
    description: 'SEO, Structured Data, Semantic Search',
    example: 'Managed digital marketing and web development teams to build search optimized websites with structured data maps for enriched search results on Google SERPs.', //Hyland
    category: skillCategoryMap[12], // Digital
    proficiency: 5,
    proficiencyLabel: 'Authority',
    iconName: 'search'
  },
  {
    id: 13,
    name: 'SQL Development & Data Modeling',
    description: 'Query Optimization, Relational Design, Performance Tuning',
    example: 'Demonstrated expert knowledge of SQL-based query and DDL to assume the data owner role for all of Nestlé Professional Solutions data assets and governance processes.', //Nestlé
    category: skillCategoryMap[13], // Data
    proficiency: 4,
    proficiencyLabel: 'Expert',
    iconName: 'database'
  },
  {
    id: 14,
    name: 'Web Services & API Development',
    description: 'RESTful APIs, GraphQL, Endpoint Security',
    example: 'Integrated RESTful APIs from Airtable and Botpress to create an automated Lead qualification chat bot to capture, enrich and qualify Leads from the AMP42 website.', //AMP42
    category: skillCategoryMap[14], // Tech
    proficiency: 4,
    proficiencyLabel: 'Expert',
    iconName: 'api'
  },
  {
    id: 15,
    name: 'ETL/ELT Development',
    description: 'Data Ingestion, Transformation Pipelines, Data Quality Assurance',
    example: 'Leveraged Python and R to build robust, repeatable data processing solutions for cleaning and ingesting multiple sources of third-party food service manufacturing data exports delivered at variable intervals - daily, weekly and monthly.', //Nestlé    
    category: skillCategoryMap[15], // Data
    proficiency: 5,
    proficiencyLabel: 'Authority',
    iconName: 'shuffle'
  },
  {
    id: 16,
    name: 'Software Development',
    description: 'Full-stack Engineering, Code Reviews, Cloud Deployment',
    example: 'Used JSP and the Java Spring framework to architect, build and launch a new dynamic and responsive website for Krylon.com. Worked with DevOps and Cyber teams to deploy a CI/CD process for releasing updates via the on-prem hosted instance of GitHub at Sherwin-Williams using the forking workflow pattern.',
    category: skillCategoryMap[16], // Tech
    proficiency: 4,
    proficiencyLabel: 'Expert',
    iconName: 'code'
  },
  {
    id: 17,
    name: 'Solution Architecture',
    description: 'System Blueprinting, Scalability Design, Stakeholder Alignment',
    example: 'Developed a multi-layered service architecture mapped across all relevant domains for customer community, customer support, learning management, IAM, and search with tiered options for short-medium term solutions and long term re-platforming solutions for Hyland\'s 50K+ active customer community.', //Hyland
    category: skillCategoryMap[17], // Strategy
    proficiency: 5,
    proficiencyLabel: 'Authority',
    iconName: 'layers'
  },
  {
    id: 19,
    name: 'User Experience & Systems Design',
    description: 'UX/UI Design, Information Architecture, Interaction Modeling',
    example: 'Designed and built the marketing website for chattykb.ai to ensure a modern look that was also dynamic and responsive for both mobile and desktop users.', //SiriusBits LLC
    category: skillCategoryMap[19], // Digital
    proficiency: 4,
    proficiencyLabel: 'Expert',
    iconName: 'monitor-smartphone'
  },
  {
    id: 20,
    name: 'Service-Oriented & API-Driven Architecture',
    description: 'Microservices, API Gateway Design, Integration Standards',
    example: 'Designed a micro services architecture for system-level API integration across enterprise systems including Salesforce (CRM), Okta (CIAM), Khoros (Community Management), Thought Industries (LMS), and Drift (Chatbot) platforms used collectively to manage customer success, tech support and training.', //Hyland
    category: skillCategoryMap[20], // Strategy
    proficiency: 4,
    proficiencyLabel: 'Expert',
    iconName: 'share-2'
  },
  {
    id: 21,
    name: 'Digital Strategy',
    description: 'Channel Planning, Content Strategy, Campaign Optimization',
    example: 'Devised an Account-Based Experience approach to integrated B2B Marketing and Sales that leveraged identity resolution and contact enrichment to support ideal customer profile targeting and personalization and a dynamic customer knowledge-graph to improve pipeline velocity and muti-step conversions across a connected customer journey.', //Hyland
    category: skillCategoryMap[21], // Digital
    proficiency: 5,
    proficiencyLabel: 'Authority',
    iconName: 'monitor-smartphone'
  },
  {
    id: 22,
    name: 'Team Leadership',
    description: 'Mentoring, Team Building, Performance Management',
    example: 'Built and led a team of data and business analyst experts to complete the integration and deployment of a unified data strategy. Recruited top talent and helped team members to expand skill sets, realize opportunities to achieve and present their ideas and accomplishments. Navigated complex and ambiguous business directives from senior leadership to ensure team members could remain focused and productive.', //Nestlé
    category: skillCategoryMap[22], // Leadership
    proficiency: 5,
    iconName: 'users'
  },
  {
    id: 23,
    name: 'Implementation Execution',
    description: 'Delivery Management, Quality Assurance, Outcome Measurement',
    example: 'Led the adoption and implementation of Okta\'s Community Identity Access Management (CIAM) solution to overhaul and replace the homegrown, on-prem OAuth solution that lacked necessary scalability and security requirements. Oversaw the successful launch of the implementation and presented the achievement in the company-wide monday morning meeting, inspiring other teams in R&D to pursue a similar implementation.', //Hyland
    category: skillCategoryMap[23], // Leadership
    proficiency: 4,
    proficiencyLabel: 'Expert',
    iconName: 'check-circle'
  },
  {
    id: 24,
    name: 'TOGAF-Driven IT Strategy',
    description: 'Architecture Frameworks, Strategic Roadmapping, Enterprise Standards',
    example: 'Worked with Sales, Digital and eCommerce teams to migrate and implement an enterprise data governance framework to manage a newly architected unified data asset library that included business process management and clearly defined roles and responsibilities.', //Nestlé
    category: skillCategoryMap[24], // Strategy
    proficiency: 3,
    proficiencyLabel: 'Skilled',
    iconName: 'book-open'
  }
];
