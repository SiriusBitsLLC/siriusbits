import type { Duties } from './experience-schema';

export const duties: Duties[] = [
  {
    id: 1,
    duties: 'Systems Integration & Planning',
    roleIds: [1],
    relevantSkills: '1,2,4,6,7,8,10,15,17,18,20,24',
    summary: 'Designs and implements comprehensive data integration strategies to connect disparate systems and migrate data between platforms.'
  },
  {
    id: 2,
    duties: 'Data Governance',
    roleIds: [1],
    relevantSkills: '2,6,7,8,13,18',
    summary: 'Establishes policies, frameworks, and organizational structures to ensure data quality, security, and compliance across the organization.'
  },
  {
    id: 3,
    duties: 'Analytics & Insights',
    roleIds: [1,8,9],
    relevantSkills: '3,6,13,19',
    summary: 'Performs deep-dive analysis of business performance and creates dashboards to provide actionable insights for senior leadership.'
  },
  {
    id: 4,
    duties: 'Data Strategy & Enablement',
    roleIds: [1],
    relevantSkills: '1,2,7,8,17,22',
    summary: 'Develops data strategy roadmaps and literacy programs to align data capabilities with business objectives and empower users.'
  },
  {
    id: 5,
    duties: 'Technology & Business Enablement',
    roleIds: [2, 4],
    relevantSkills: '1,2,7,8,10,17',
    summary: 'Leads architecture initiatives to re-platform critical business systems and develop reference architectures for digital integration.'
  },
  {
    id: 6,
    duties: 'Data Engineering & Execution',
    roleIds: [2],
    relevantSkills: '2,6,8,13,15,16',
    summary: 'Advises on modern data stack tools and develops maturity models to accelerate data access and enhance team capabilities.'
  },
  {
    id: 7,
    duties: 'Data Architecture & Integration',
    roleIds: [3],
    relevantSkills: '2,7,8,13,17,20',
    summary: 'Develops unified data architecture and integration plans that align business goals with scalable data infrastructure and modern analytics platforms.'
  },
  {
    id: 8,
    duties: 'New Product Development & Go-To-Market Strategy',
    roleIds: [3],
    relevantSkills: '1,10,16,19,21',
    summary: 'Collaborates with stakeholders to design, build, and launch innovative digital products, while shaping go-to-market strategies that accelerate adoption and growth.'
  },
  {
    id: 9,
    duties: 'Website Migration, Design & Development',
    roleIds: [4],
    relevantSkills: '14,16,19,21',
    summary: 'Manages end-to-end website redesigns and platform migrations, ensuring seamless transitions, modern UX/UI, and performance optimization.'
  },
  {
    id: 10,
    duties: 'IT Consulting & Planning',
    roleIds: [4, 6],
    relevantSkills: '1,7,17,24',
    summary: 'Advises clients on IT strategy and roadmapping, aligning technology investments with operational goals and long-term digital transformation initiatives.'
  },
  {
    id: 11,
    duties: 'Data Modernization & Digital Transformation',
    roleIds: [5],
    relevantSkills: '5,6,10,13,15',
    summary: 'Leads modernization of legacy data infrastructure by implementing cloud-native data warehouses and automating pipeline orchestration for scalable insights.'
  },
  {
    id: 12,
    duties: 'M&A Systems Consolidation & Data Migration',
    roleIds: [5, 6],
    relevantSkills: '2,6,8,10,13',
    summary: 'Oversees technology consolidation and data migration efforts during mergers and acquisitions, ensuring continuity, integrity, and stakeholder alignment.'
  },
  {
    id: 13,
    duties: 'Data Unification & Activation',
    roleIds: [5],
    relevantSkills: '2,6,13,15',
    summary: 'Unifies data from multiple sources into centralized platforms and enables downstream activation for analytics, personalization, and campaign targeting.'
  },
  {
    id: 14,
    duties: 'Team Leadership & Development',
    roleIds: [1,5,6,7,9,10],
    relevantSkills: '9,22,23',
    summary: 'Builds and mentors high-performing technical teams, fostering growth, collaboration, and continuous learning to meet evolving business demands.'
  },
  {
    id: 15,
    duties: 'Technical Consulting & Capacity Management',
    roleIds: [5],
    relevantSkills: '1,7,10,23',
    summary: 'Provides strategic technical guidance while assessing and optimizing system capacity, performance, and scalability across platforms.'
  },
  {
    id: 16,
    duties: 'Technology Strategy & Planning',
    roleIds: [7,8,9,10],
    relevantSkills: '1,7,17,24',
    summary: 'Defines and prioritizes technology roadmaps, balancing innovation with risk management to meet both immediate and long-term business needs.'
  },
  {
    id: 17,
    duties: 'Digital Marketing Strategy & Execution',
    roleIds: [6],
    relevantSkills: '3,5,21',
    summary: 'Designs and executes data-informed digital marketing strategies, optimizing channel performance across paid, organic, and owned media.'
  },
  {
    id: 18,
    duties: 'New Business Development',
    roleIds: [9],
    relevantSkills: '1,21',
    summary: 'Identifies opportunities and builds relationships to secure new business, driving revenue growth through consultative selling and solution alignment.'
  },
  {
    id: 19,
    duties: 'Agile Project Management & Estimation',
    roleIds: [10,9],
    relevantSkills: '4,22,23',
    summary: 'Leads agile teams through iterative delivery cycles, leveraging estimation frameworks and velocity tracking to ensure on-time, on-budget execution.'
  },
  {
    id: 20,
    duties: 'Information Architecture & User Experience Design',
    roleIds: [11,7,8,9,11], 
    relevantSkills: '14,16,19', // 
    summary: 'Crafts intuitive navigation structures and design systems to enhance usability, accessibility, and content discoverability across digital experiences.'
  },
  {
    id: 21,
    duties: 'Software Engineering & Systems Integration',
    roleIds: [13,11,12,13],
    relevantSkills: '10,13,14,15,16,20',
    summary: 'Develops custom software solutions and integrates enterprise systems to streamline workflows, increase automation, and support digital initiatives.'
  }
];
