# **SiriusBits Consulting Website: Blueprint & Prompts**

Below is a **structured blueprint** for building the SiriusBits Consulting Website, presented in multiple levels of detail and **fully in Markdown format**. The final section provides **step-by-step code-generation prompts** (in code blocks using `text` syntax) that build on each other in a **test-driven** manner. Each prompt references the **previous** steps’ code, ensuring no orphaned code.

---

## **I. High-Level Project Blueprint**

1. **Initialize Project & Tooling**  
   - Create a new Astro project (`pnpm create astro@latest`) with the official Svelte integration.  
   - Set up a version control repository (GitHub, GitLab, etc.).  
   - Configure a basic CI/CD pipeline (e.g., GitHub Actions) for testing and deployment.

2. **Project Structure & Routing**  
   - Set up the Astro folder structure with pages, layouts, and assets.  
   - Create an initial layout (e.g., `src/layouts/BaseLayout.astro`) to include the site header and footer.  
   - Add a homepage (`src/pages/index.astro`) and routes for the dynamic “Skills and Experience” sub-page.

3. **Home Page**  
   - Implement sections for:
     1. Skills Matrix  
     2. Career Summary  
     3. Featured Projects/Accomplishments/Talks  
     4. Contact CTA

4. **Dynamic “Skills and Experience” Sub-Page**  
   - **Two Main Views (Tabs/Sub-Routes)**:  
     1. **Filter by Skill**  
        - Svelte component to list skills, filter roles/examples, and display matches.  
        - A sidebar to refine filters.  
     2. **Experience by Timeline**  
        - Svelte-based timeline component with expand/collapse entries for each role.

5. **Data Management**  
   - Store data (skills, roles, projects) in JSON or Markdown.  
   - Use Astro’s data loading and pass props to Svelte components for dynamic rendering.

6. **Styling & UI/UX**  
   - Use a modern sans-serif font (Inter, Poppins, etc.).  
   - Implement a responsive design with emphasis on whitespace and a modern aesthetic.  
   - Brand colors: Purple (`#9B51E0`), Blue (`#3498DB`), Black/White neutrals.

7. **Testing**  
   - **Unit Tests (Svelte Testing Library + Vitest/Jest)** for small pieces of logic.  
   - **Integration Tests** for Astro <-> Svelte data flows.  
   - **E2E Tests** with Cypress/Playwright for user-flow tests.

8. **Deployment**  
   - Deploy to Vercel or Netlify with Astro’s built-in adapters.  
   - Optimize images, caching, performance.

---

## **II. Breaking the Blueprint into Iterative Chunks**

Below is the same plan, sliced into logical stages for incremental progress and testing.

1. **Stage A: Project Setup & Baseline Layout**  
   - Create Astro project; install Svelte integration.  
   - Configure base layout with header, footer, global CSS.  
   - Verify the project builds and runs.

2. **Stage B: Basic Home Page**  
   - Implement a placeholder Home Page.  
   - Add minimal content: “Hello from SiriusBits.”  
   - Test that the page loads and is styled properly.

3. **Stage C: Data Structure & Basic Display**  
   - Create JSON (or Markdown) for skills, experience, etc.  
   - In Astro, fetch and display a simple list/table of that data.

4. **Stage D: Svelte Component Integration**  
   - Create a basic Svelte component that receives props from Astro.  
   - Write a simple test verifying prop passing.  
   - Display data inside the Svelte component.

5. **Stage E: Skills Filter Component**  
   - Create the “Filter by Skill” Svelte component.  
   - Implement multi-select filtering logic.  
   - Write unit tests for the filtering.

6. **Stage F: Timeline Component**  
   - Create a timeline Svelte component with expand/collapse entries.  
   - Add tests for expansions, collapses, and UI state.

7. **Stage G: Home Page Enhancements**  
   - Add a skills matrix, career summary, featured projects, contact CTA.  
   - Write integration tests ensuring correct content loads.

8. **Stage H: Final Integration, Polishing & Deployment**  
   - Combine the Filter by Skill and Timeline views on the sub-pages with tabs or separate routes.  
   - Fine-tune styling, animations, and accessibility.  
   - Run E2E tests, fix issues, and deploy.

---

## **III. Further Breakdown of Each Stage**

### **Stage A: Project Setup & Baseline Layout**

1. **Initialize Astro Project**  
   - `pnpm create astro@latest -- --template framework` (choose Svelte).  
2. **Project Skeleton**  
   - Commit initial code to version control.  
3. **Configure Base Layout**  
   - `src/layouts/BaseLayout.astro` with a header and footer.  
   - Import global CSS/SCSS.  
4. **Smoke Test**  
   - Confirm via dev server.

### **Stage B: Basic Home Page**

1. **Create `index.astro`**  
   - Reference `BaseLayout.astro`.  
   - Add placeholder text/hero.  
2. **Basic Style**  
   - Style heading with brand colors.  
3. **Quick Test**  
   - Verify page loads and shows expected content.

### **Stage C: Data Structure & Basic Display**

1. **Create Data File**  
   - `src/data/skills.json` (sample skill objects).  
2. **Fetch & Display**  
   - In `skills.astro`, import `skills.json`, loop, display.  
3. **Testing**  
   - Integration test verifying data is rendered.

### **Stage D: Svelte Component Integration**

1. **Create a Svelte Component**  
   - `SkillList.svelte` with `export let skills = [];`.  
2. **Render Skills**  
   - Loop in Svelte template.  
3. **Astro Integration**  
   - In `skills.astro`, import `SkillList.svelte`, pass data.  
4. **Unit Test**  
   - Confirm component receives props.

### **Stage E: Skills Filter Component**

1. **Create `FilterSkills.svelte`**  
   - Accept array of all skills.  
   - Track selected skills, filter displayed items.  
2. **Sidebar**  
   - Toggle checkboxes or buttons for each skill.  
3. **Tests**  
   - Check select/deselect behavior, UI updates.

### **Stage F: Timeline Component**

1. **Create `Timeline.svelte`**  
   - Accept array of experiences (title, company, dates, summary, keySkills).  
2. **Expand/Collapse**  
   - Use Svelte transitions or CSS.  
3. **Testing**  
   - Verify toggles for expand/collapse.

### **Stage G: Home Page Enhancements**

1. **Skills Matrix**  
   - `SkillsMatrix.svelte` in a grid.  
2. **Career Summary**  
   - Hard-coded or from data.  
3. **Featured Projects**  
   - From data if available.  
4. **Contact CTA**  
   - Email, form, or link.  
5. **Integration Tests**  
   - Check these new sections render properly.

### **Stage H: Final Integration, Polishing & Deployment**

1. **Tabs or Sub-Routes**  
   - FilterSkills + Timeline on separate pages or tabs.  
2. **Styling & Animations**  
   - Final polish, brand colors, transitions, hovers.  
3. **Accessibility & SEO**  
   - headings, aria-labels, meta tags.  
4. **E2E Testing**  
   - Confirm user flows.  
5. **Deploy**  
   - Astro’s Vercel/Netlify adapter.  
   - Check production build.

---

## **IV. Final: Code-Generation Prompts (Test-Driven)**

Below are **incremental prompts** to feed into a code-generation LLM. Each prompt references the previous steps’ code.

### **Prompt A: Project Initialization & Baseline Layout**

```text
You are a code-generation assistant. We’re building a new Astro + Svelte project. 
Using TDD, generate the following:

1. An Astro project initialization script/config that includes:
   - Astro
   - Svelte integration
   - Basic package.json with scripts for dev, build, preview
   - A .gitignore file
   - Possibly a minimal test setup (Vitest or Jest)

2. A `BaseLayout.astro` that provides a site-wide header and footer. 
   - The layout should accept children content.

3. A minimal test (using Vitest or Jest) to confirm that the project compiles 
   and that `BaseLayout.astro` renders without errors.
```

## **Prompt B: Basic Home Page**

```text
We have our `BaseLayout.astro`. 
Now:
1. Create `src/pages/index.astro` using `BaseLayout.astro` for layout.
2. Add a simple hero section or heading that says: “Welcome to SiriusBits Consulting” or similar. 
3. Write a quick test verifying that the home page loads and contains our heading text.
```

## **Prompt C: Data Structure & Basic Display**

```text
Now, we want to store skills data in `src/data/skills.json`.
1. Create `skills.json` with a few sample skill objects: 
   { "id": "1", "name": "Global Business Strategy", "description": " Team Alignment, Roadmap Development, P&L Budgeting" } etc.
2. In a new page `src/pages/skills.astro`, import `skills.json` and render the 
   list of skill names and descriptions.
3. Provide a test that verifies the JSON data is loaded and each skill is 
   rendered on the page.
```

### Example skills.json

```json
{
  "skills": [
    { "id": 1, "name": "Global Business Strategy", "description": "Team Alignment, Roadmap Development, P&L Budgeting" },
    { "id": 2, "name": "Data Analytics", "description": "Data Analysis, Data Visualization, Data-driven decision making" },
    { "id": 3, "name": "Web & Digital", "description": "Web development, IA & UX, Digital marketing, SEO" },
    { "id": 4, "name": "Applied AI/ML", "description": "LLM Training & Deployment, ML Engineering, Predictive Modeling" },
    { "id": 5, "name": "Web & Platform Development", "description": "Web, API, & DB programming, M&A systems integration" },
    { "id": 6, "name": "Data Unification & Activation", "description": "Semantic Modeling, Reverse ETL, Personalization" },
    { "id": 7, "name": "Data Governance", "description": "Data Security, Data Privacy, Data Compliance" },
    { "id": 8, "name": "Enterprise Data Strategy", "description": "Observability & Cataloging, BI Ops, DAG-Driven MDM" },
    { "id": 9, "name": "Leadership & Talent Development", "description": "Knowledge Sharing, Team EQ Development" }
  ]
}
```

## **Prompt D: Svelte Component Integration**

```text
Next, let’s build an interactive “Filter by Skill” component.
1. Create `FilterSkills.svelte`. It should:
   - Accept an array of all skills.
   - Maintain a reactive list/set of selected skills.
   - Filter a list of keyAccomplishments based on the user’s selected skills and the corresponding skill ids tagged for each accomplishment.
2. Add a sidebar or section where each skill can be toggled (checkbox or button).
3. Provide test coverage for:
   - Selecting/deselecting a skill updates the filter.
   - The UI updates accordingly.

```

### Example duties and activities objects

```json
{
  "duties": [
    {
      "id": 1,
      "duties": "Systems Integration & Planning",
      "roleId": 1,
      "relevantSkills": "1,7,8"
    },
    {
      "id": 2,
      "duties": "Data Governance",
      "roleId": 1,
      "relevantSkills": "6,7,8"
    },
    {
      "id": 3,
      "duties": "Data Insights & Analysis",
      "roleId": 1,
      "relevantSkills": "2,8"
    },
    {
      "id": 4,
      "duties": "Team Development",
      "roleId": 1,
      "relevantSkills": "1,9"
    },
    {
      "id": 5,
      "duties": "Technology & Business Enablement",
      "roleId": 2,
      "relevantSkills": "1,2,8"
    },
    {
      "id": 6,
      "duties": "Data Strategy & Execution Advisor",
      "roleId": 2,
      "relevantSkills": "1,8,9"
    }
  ],
  "activities": [
    {
      "id": 1,
      "activity": "Led the comprehensive integration of end-to-end sales and finance reporting data migration from a legacy on-prem SQL Server data warehouse to the global Azure Data Lake.",
      "dutyId": 1
    },
    {
      "id": 2,
      "activity": "Developed a unified data strategy to harmonize customer contact and account data for a comprehensive 360 view of the customer.",
      "dutyId": 1
    },
    {
      "id": 3,
      "activity": "Defined key data assets from the heritage Nestlé Coffee Partners Solutions Lab and Nestlé Professional for consolidated sales across both businesses.",
      "dutyId": 1
    },
    {
      "id": 4,
      "activity": "Performed a comprehensive audit of 70+ data sources from flat file EDI processing, batch load data exports, on-prem SQL databases, Azure Data Lake OLAP cubes and application specific CRM, ERP, E-Commerce and Web systems.",
      "dutyId": 2
    },
    {
      "id": 5,
      "activity": "Built an organizational-wide data hub for cataloging and documenting data sources and repositories, key terminology, and dashboards and reporting across sales, marketing, logistics and finance.",
      "dutyId": 2
    },
    {
      "id": 6,
      "activity": "Formed the data insights and analysis function to perform deep-dive analysis of business performance by category, brand, and market to provide actionable insights and drive decisions by senior leadership.",
      "dutyId": 3
    },
    {
      "id": 7,
      "activity": "Identified the opportunity to create a customer segmentation dashboard and delegated the task to the newly formed team resulting in a successful cross-department collaboration that pulled data from Azure Datalake, Salesforce, GA4, Magento and SAP.",
      "dutyId": 3
    },
    {
      "id": 8,
      "activity": "Integrated a disparate team of five remote data analysts, analytics engineers and data infrastructure managers and hired top-talent to fill key roles and leadership in Data Analytics and the Data Analysis and Insights team.",
      "dutyId": 4
    },
    {
      "id": 9,
      "activity": "Developed a comprehensive data strategy and activation plan across three phases over eighteen months.",
      "dutyId": 4
    },
    {
      "id": 10,
      "activity": "Led architecture initiative to re-platform CRM and B2B E-Commerce for the global performance coatings division.",
      "dutyId": 5
    },
    {
      "id": 11,
      "activity": "Developed reference architecture to align current state with a domain-driven digital integration layer designed to integrate data flow for both internal and external business applications.",
      "dutyId": 5
    },
    {
      "id": 12,
      "activity": "Developed a business data maturity model and training to level-up data architecture and engineering team capabilities.",
      "dutyId": 6
    },
    {
      "id": 13,
      "activity": "Advised on modern data stack tools and systems to help accelerate the access to and activation of business system datasets.",
      "dutyId": 6
    }
  ]
}
```

## **Prompt E: Timeline Component**

```text
Now we need a timeline to display experience items. 
1. Create `Timeline.svelte` that accepts an array of “experience” objects, each with:
   - title
   - company
   - company business type
   - startDate
   - endDate
   - summary
   - key accomplishments
2. Implement an expand/collapse feature for each experience item. 
3. Write tests verifying that:
   - Clicking an item toggles its expanded state.
   - Multiple items can be expanded at once.
```

### Example companies and roles objects

```json
{
  "companies": [
    {
      "id": 1,
      "company": "Nestlé",
      "companyType": "Food Service Supplier",
      "location": "Solon, OH"
    },
    {
      "id": 2,
      "company": "Sherwin Williams",
      "companyType": "Global Retail and Manufacturing",
      "location": "Cleveland, OH"
    }
  ],
  "roles": [
    {
      "id": 1,
      "title": "Sr. Mgr, Data Strategy & Governance",
      "summary": "Established the Data Strategy and Governance practice for the newly formed (April 2024) Nestlé Professional Solutions OpCo. Led a cross-functional team to build an integrated data governance and enablement service for the entire organization.",
      "startDate": "2024-04-01",
      "endDate": "2025-01-01",
      "companyId": 1,
      "company": "Nestlé"
    },
    {
      "id": 2,
      "title": "Sr. Enterprise Information Architect",
      "summary": "Led strategic architecture initiatives to re-platform CRM and B2B E-Commerce. Served as a data strategy advisor, focusing on business data maturity and recommending modern data stack tools.",
      "startDate": "2024-01-01",
      "endDate": "2024-03-01",
      "companyId": 2,
      "company": "Sherwin Williams"
    }
  ]}
```

## **Prompt G: Home Page Enhancements**

```text
Now we need to add a skills matrix, career summary, featured projects, and a contact CTA.
1. Add a skills matrix component that displays a grid of skills with descriptions.
2. Add a career summary section with a short narrative or bullet points.
3. Add a featured projects section that displays a list of your top projects or talks (from data if available).
4. Add A prominent “Contact Me” CTA that links to a contact form or email.
5. Write integration tests ensuring correct content loads.

In code:
- Create a Svelte component for the skills matrix (e.g., `SkillsMatrix.svelte`) 
  that arranges skills in tiles or a grid. 
- Insert a short summary in the `index.astro` and highlight a few projects.

Testing:
- Ensure each new component has at least a basic test verifying it renders 
  and the content is correct.
```

## **Prompt H: Final Integration, Polishing & Deployment**

```text
Finally, let’s tie it all together.
1. In `src/pages/experience.astro`, create a tabbed or two-page setup:
   - One page for FilterSkills.svelte
   - Another for Timeline.svelte
   - Provide navigation (tabs or links) to switch between them.
2. Polish the styling with a bit of CSS transitions, hover states, and brand colors. 
3. Ensure accessibility best practices: alt text, aria-labels, semantic HTML. 
4. Write end-to-end tests (Cypress/Playwright) to confirm:
   - The site loads, 
   - Navigation works, 
   - Filters function,
   - Timelines expand/collapse.
5. Provide the final deploy script to Vercel or Netlify, ensuring each route 
   and dynamic component is built correctly.
```
