# SiriusBits Consulting Website — Todo Checklist

A step-by-step list of tasks for building the SiriusBits Consulting Website using Astro and Svelte.

---

## **Stage A: Project Setup & Baseline Layout**

- [ ] **Initialize Astro Project**  
  - [ ] Run `pnpm create astro@latest -- --template framework` (choose Svelte).
  - [ ] Create a new Git repository and commit initial files.

- [ ] **Project Skeleton**  
  - [ ] Confirm `package.json` scripts (`dev`, `build`, `preview`).
  - [ ] Add a `.gitignore` (node_modules, `.astro`, etc.).
  - [ ] Set up minimal test framework (Vitest or Jest).

- [ ] **Configure `BaseLayout.astro`**  
  - [ ] Create `src/layouts/BaseLayout.astro`.
  - [ ] Include a site-wide header and footer.
  - [ ] Import global CSS/SCSS for styling.

- [ ] **Smoke Test**  
  - [ ] Run `pnpm run dev` and confirm the site loads.
  - [ ] Write a minimal test to confirm the project compiles and `BaseLayout.astro` renders.

---

## **Stage B: Basic Home Page**

- [ ] **Create `index.astro`**  
  - [ ] Reference `BaseLayout.astro`.
  - [ ] Add a placeholder hero/heading (e.g., “Welcome to SiriusBits Consulting”).

- [ ] **Basic Style**  
  - [ ] Apply brand colors (Purple `#9B51E0`, Blue `#3498DB`, Black/White for text/bg).
  - [ ] Test the hero section styling in the browser.

- [ ] **Quick Test**  
  - [ ] Write a test verifying the home page loads and the heading is present.

---

## **Stage C: Data Structure & Basic Display**

- [ ] **Create Data File**  
  - [ ] `src/data/skills.json`: Add sample skills (ID, name, description).

- [ ] **Fetch & Display**  
  - [ ] Create `src/pages/skills.astro`.
  - [ ] Import `skills.json`.
  - [ ] Loop over data to display skill names/descriptions.

- [ ] **Testing**  
  - [ ] Write an integration test to confirm JSON data is loaded and displayed.

---

## **Stage D: Svelte Component Integration**

- [ ] **Create `SkillList.svelte`**  
  - [ ] `export let skills = [];`.
  - [ ] Loop through skills and render each in a list or div.

- [ ] **Astro Integration**  
  - [ ] In `skills.astro`, import `SkillList.svelte` and pass `skills` array.

- [ ] **Unit Test**  
  - [ ] Confirm `SkillList.svelte` receives props and displays the list.

---

## **Stage E: Skills Filter Component**

- [ ] **Create `FilterSkills.svelte`**  
  - [ ] Accept an array of all skills.
  - [ ] Maintain a reactive list/set of selected skills.
  - [ ] Filter displayed data based on selected skills.

- [ ] **UI Elements**  
  - [ ] Add a sidebar or section with checkboxes/buttons for each skill.
  - [ ] Show filtered results in a main display area.

- [ ] **Tests**  
  - [ ] Verify adding/removing selected skills updates the filtered list.
  - [ ] Check UI updates to match selections.

---

## **Stage F: Timeline Component**

- [ ] **Create `Timeline.svelte`**  
  - [ ] Accept array of “experience” objects (title, company, start/end dates, summary, keySkills).
  - [ ] Render each experience item.

- [ ] **Expand/Collapse**  
  - [ ] Implement a click to toggle expanded state.
  - [ ] Allow multiple items to expand simultaneously.
  - [ ] Use Svelte transitions or CSS animations.

- [x] **Testing**  
  - [x] Verify toggling expand/collapse works.
  - [x] Confirm multiple items can be open at once.

---

## **Stage G: Home Page Enhancements**

- [ ] **Skills Matrix**  
  - [ ] Create `SkillsMatrix.svelte` for a grid/tile layout of skills.
  - [ ] Optionally reuse data from `skills.json`.

- [ ] **Career Summary**  
  - [ ] Add a short narrative or bullet points.
  - [ ] Possibly load from a `career.md`.

- [ ] **Featured Projects**  
  - [ ] Create data file (e.g., `projects.json`).
  - [ ] Highlight 2-3 top projects or talks.

- [ ] **Contact CTA**  
  - [ ] Prominent button linking to a contact form or mailto link.

- [ ] **Integration Tests**  
  - [ ] Verify new sections appear.
  - [ ] Check basic responsiveness (desktop/mobile).

---

## **Stage H: Final Integration, Polishing & Deployment**

- [ ] **Tabs or Sub-Routes**  
  - [ ] `experience.astro` with tabs/links for FilterSkills and Timeline.
  - [ ] Ensure data is passed to each component properly.

- [ ] **Styling & Animations**  
  - [ ] Refine brand colors, spacing, typography.
  - [ ] Add hover effects and smooth transitions.

- [x] **Accessibility & SEO**  
  - [x] Include semantic HTML (landmark elements).
  - [x] Add alt text for images, aria-labels where needed.
  - [x] Set up meta tags for SEO (title, description, open graph).

- [x] **End-to-End Testing**  
  - [x] Use Cypress or Playwright for user flow tests.
  - [x] Confirm navigation, filtering, timeline expansions.

- [x] **Deploy**  
  - [x] Use Astro’s Vercel or Netlify adapter.
  - [x] Configure build settings.
  - [x] Verify site in production environment.

---

## **Additional Reminders**

- [ ] **Code Reviews & Merges**  
  - [ ] Use pull requests for each chunk.
- [ ] **Version Control**  
  - [ ] Keep commits atomic and well-documented.
- [ ] **Performance Optimization**  
  - [ ] Minimize JavaScript where possible (partial hydration).
  - [ ] Optimize images and static assets.

---
