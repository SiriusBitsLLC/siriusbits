# SiriusBits Consulting Website Specification

## 1. Project Overview

**Purpose:**  
Build a professional website for SiriusBits (<www.siriusbits.com>) to manage your consulting practice. The site serves as a dynamic resume that demonstrates your skills, accomplishments, career history, and consulting work.

**Key Features:**

- **Home Page:**
  - A concise and compelling intro to SiriusBits LLC.
  - A matrix of consulting services.  
    - IT Strategy & Roadmapping
      With our expertise in both business and technology, our team helps align technology investments to your business strategy and drive top line growth while maximizing value as you bring your strategy to life.

    - Data Strategy & Governance
      Develop a flexible framework to improve the effectiveness of data assets without disrupting your business operations.

    - Vendor Advisory & Resource Planning
      Informed, independent, strategically planned solutions to your unique challenges using the best of breed tools and vendors.

    - AI/ML Ops Planning
      Enhance DataOps practices by combining Business Intelligence and Machine Learning Operations with purpose-specific AI solutions. Optimize decision-making, intelligent automation, and proactive insights.

    - Data Unification & Activation
      Unify and activate data from disparate sources to derive insights, inform decisions, and drive actions.

    - Strategy Alignment Workshops
      Leverage stakeholder interviews and appreciative inquiry to clarify goals and build a strategic roadmap for the business.

    - Digital Transformation
      Migrate from legacy systems and integrate new platforms to improve efficiency and productivity.

    - Web Development Services
      Modernize and enhance your website with responsive design, user-friendly interfaces, and fast performance.

    - Data Management & Operations
      Optimize data operations with observability and efficient workflows to support data-driven decision-making.

    - Digital Marketing
      Develop and execute marketing campaigns to improve brand awareness and drive traffic to your website.
  - Featured projects, accomplishments, and talks.
  - Featured articles/blog posts.
  - A prominent contact call-to-action (CTA).
  - A footer with site links and social media links.

- **Dynamic "Skills and Experience" Sub-Page:**
  - A introduction highlighting your career experience.
  - An in-page tabbed navigation for switching between the Skills and Experience views. This tab section should sit below the introduction and when the user scrolls, the section should "stick" to the top of the page under the main navigation.
  - **Two Main Views (Clicking a tab will scroll to the relevant section - Skills and Experience):**
    1. **Filter by Skill View:**
       - All skills are listed with a short description for each.
       - When a skill is selected, relevant examples from your roles are displayed.
       - A left sidebar appears to allow users to add or remove skills to refine the filter.
    2. **Experience by Timeline View:**
       - Timeline entries display:
         - Job title
         - Company name
         - Dates
         - A brief summary of the role
       - Each timeline entry will be a primary role at a specific company and expandable/collapsible with smooth animated transitions.
         - Expanding a timeline entry will show the role's duties and activities.
       - Multiple entries can be expanded simultaneously.
  - A prominent Hire Me call-to-action (CTA).

- **Additional Pages/Sections:**
  - Consulting Services: a single page with multiple sections for different types of consulting work.
  - Resources
    - Projects - A list of projects you have worked on.
    - Blog - (Should be called something else) but will display a list of blog posts.
    - Guides - How-To guides, best practices, and other resources.
    - Talks - Presentations and conference appearances.
  - Uses (SiriusBits Uses - gear/setup/tools): a single page with multiple sections for different types of gear and setup.
  - Contact - A page with a contact form, chatbot, email, and phone number.

---

## 2. Design & UI/UX

**Inspiration:**  

- Sites like [Lightning AI](https://lightning.ai/), [Linear](https://linear.app/), and [Technically.dev](https://technically.dev/).

**Visual Style:**

- **Overall Look:**  
  - Clean, minimal, and modern design with generous whitespace.
  - Crisp lines and subtle hover/animated transitions.

- **Color Palette:**  
  - Derived from the SiriusBits logo (sample approximate hex values):
    - **Primary Purple:** `#9B51E0`
    - **Accent Blue:** `#3498DB`
    - **Neutral Colors:** Black (e.g., `#000000` or `#111111` for text) and white (`#FFFFFF`) for backgrounds.

- **Typography:**  
  - Modern sans-serif fonts. Consider **Inter**, **Poppins**, **Montserrat**, or **IBM Plex Sans**.

- **Layout & Navigation:**  
  - Responsive design with a clean navigation bar and footer.
  - Tabs for switching between "Filter by Skill" and "Experience by Timeline" views on the sub-page, with additional separate sub-pages for each view.

---

## 3. Technical Architecture

### Frameworks & Libraries

- **Astro:**  
  - Primary framework for server-side rendering (SSR) and static site generation.
- **Svelte:**  
  - For dynamic, client-side interactive components (filtering UI, timeline interactions).

### Component Structure

- **Home Page Components:**
  - **Skills Matrix Component:** Displays a grid of skills.
  - **Career Summary Component:** A short narrative of your career.
  - **Featured Projects Component:** Highlights selected projects, accomplishments, and talks.
  - **Contact CTA Component:** Prominent contact options (contact form, chatbot, email, phone).

- **Dynamic "Skills and Experience" Sub-Page Components:**
  - **Filter by Skill View:**
    - **Skill List Component:** Displays all skills with descriptions.
    - **Filtered Examples Display Component:** Shows examples and roles relevant to the selected skills.
    - **Sidebar Filter Refinement Component:** Enables adding/deselecting skills.
  - **Experience by Timeline View:**
    - **Timeline Component:** Displays timeline entries.
    - **Timeline Entry Component:** Includes job title, company name, dates, summary, and key skills/projects.
      - Supports expand/collapse with smooth animated transitions (multiple entries can be open simultaneously).

### Data Handling

- **Data Source:**  
  - Store skills, career history, projects, and portfolio examples in JSON or Markdown files.
- **Data Flow:**  
  - Astro’s data fetching and props system will pass data to Svelte components.
  - Svelte’s reactivity will update the UI based on filtering selections in real time.

### SSR vs. Client-Side

- **Static/SSR Content:**  
  - Astro pre-renders most content for fast initial loads and SEO benefits.
- **Dynamic Interactions:**  
  - Svelte components hydrate on the client for filtering and interactive timeline behaviors.

---

## 4. Error Handling Strategies

### Client-Side (Svelte)

- **Error Boundaries:**  
  - Use Svelte’s error handling or custom error boundaries within interactive components.
- **User Feedback:**  
  - Display user-friendly error messages if data fails to load or if interactions encounter issues.

### Server-Side (Astro)

- **Built-in Error Handling:**  
  - Utilize Astro’s native error pages and logging.
- **Logging & Monitoring:**  
  - Implement logging (e.g., via Vercel's logging tools) to capture and monitor errors.

---

## 5. Testing Plan

### Unit Testing

- **Framework:**  
  - Use Jest or Vitest with Svelte Testing Library.
- **Scope:**  
  - Test filtering logic in the Svelte filtering component.
  - Test expand/collapse functionality and animations in timeline components.

### Integration Testing

- **Astro-Svelte Integration:**  
  - Verify that Astro pages correctly pass data to Svelte components.
  - Test that dynamic interactions update as expected when data changes.

### End-to-End Testing

- **Tools:**  
  - Use Cypress or Playwright.
- **Scenarios:**  
  - Navigation between pages and tabs.
  - Selecting and deselecting skills to filter examples.
  - Expanding and collapsing timeline entries.
  - Responsive behavior across multiple devices and browsers.

### Performance & Accessibility Testing

- **Audits:**  
  - Run Lighthouse audits for performance, SEO, and accessibility.
- **Accessibility:**  
  - Use tools like axe-core to ensure interactive elements meet accessibility standards.

---

## 6. Deployment

- **Hosting:**  
  - Deploy on Vercel using Astro’s Vercel adapter.
- **Build Process:**  
  - Astro handles SSR and static content generation.
  - Svelte components are built and hydrated on the client-side.
- **Caching & Optimization:**  
  - Utilize Vercel’s built-in caching for static assets.
  - Optimize images and bundle sizes during the build process.
- **Monitoring:**  
  - Set up error logging and performance monitoring through Vercel or third-party tools.

---

## 7. Additional Considerations

- **SEO & Performance:**  
  - Use Astro’s static rendering to maximize page speed and SEO.
  - Hydrate only necessary components to minimize JavaScript payload.
- **Security:**  
  - Implement HTTPS and secure form handling.
- **Maintainability & Scalability:**  
  - Follow a modular component-based architecture.
  - Document code and maintain a clear separation between Astro pages and Svelte components.
- **Future Enhancements:**  
  - Integrate a blog or portfolio management system.
  - Expand interactive features as needed for your consulting practice.

---

## Summary

This specification outlines:

- **Core Pages & Features:**  
  - A Home Page with a skills matrix, career summary, featured projects, and contact CTA.
  - A dynamic "Skills and Experience" sub-page with two views (Filter by Skill and Experience by Timeline) accessible via tabs (and separate sub-pages).

- **Design & Aesthetic Guidelines:**  
  - Clean, modern design inspired by Linear and Lightning.ai.
  - Brand colors and modern sans-serif typography based on your SiriusBits logo.

- **Technical Stack:**  
  - Astro for SSR and static content generation.
  - Svelte for dynamic, client-side interactions.

- **Data, Error Handling & Testing:**  
  - A comprehensive plan for managing data flow, error handling, and testing at multiple levels (unit, integration, end-to-end).

- **Deployment & Future Considerations:**  
  - Deployment on Vercel with performance and security optimizations in mind.
