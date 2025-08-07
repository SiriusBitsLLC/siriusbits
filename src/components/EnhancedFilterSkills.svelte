<script lang="ts">
  // Import necessary Svelte functions and types
  import { onMount } from "svelte";
  import type { Snippet } from "svelte";
  import type {
    Skills as BaseSkill,
    Duties,
    Activities,
  } from "../data/experience-schema";
  // Extend base skill type to include iconName for nav
  type Skill = BaseSkill & { iconName: string };
  import AnimateOnScroll from "./AnimateOnScroll.svelte";
  // Static Lucide icon imports
  import IconGlobe from "~icons/lucide/globe"; // Global Business Strategy
  import IconDatabase from "~icons/lucide/database"; // Data
  import IconBarChart3 from "~icons/lucide/bar-chart-3"; // Analytics & Business Intelligence
  import IconClipboardCheck from "~icons/lucide/clipboard-check"; // Agile Project Management
  import IconRefreshCw from "~icons/lucide/refresh-cw"; // Digital Transformation
  import IconCpu from "~icons/lucide/cpu"; // Data Engineering
  import IconBrainCircuit from "~icons/lucide/brain-circuit"; // Artificial Intelligence
  import IconLightbulb from "~icons/lucide/lightbulb"; // Technology Strategy
  import IconLayoutDashboard from "~icons/lucide/layout-dashboard"; // Enterprise Architecture
  import IconUsers from "~icons/lucide/users"; // Leadership
  import IconLayers from "~icons/lucide/layers"; // Data Architecture
  import IconStrategy from "~icons/ph/strategy"; // Strategy
  import IconCode from "~icons/lucide/code"; // Technology
  import IconMonitorSmartphone from "~icons/lucide/monitor-smartphone"; // Digital
  import IconMonitorCog from "~icons/lucide/monitor-cog"; // Solution Engineering
  import IconNetwork from "~icons/lucide/network"; // Solution Architecture
  import IconShare2 from "~icons/lucide/share-2"; // Service-Oriented & API-Driven Architecture
  import IconLayoutTemplate from "~icons/lucide/layout-template"; // User Experience & Systems Design
  import IconFileSql from "~icons/ph/file-sql"; // SQL Development & Data Modeling
  import IconApi from "~icons/ph/webhooks-logo"; // Web Services & API Development
  import IconShuffle from "~icons/ph/shuffle"; // ETL/ELT Development
  import IconFileCode2 from "~icons/lucide/file-code-2"; // Software Development
  import IconBookOpen from "~icons/ph/book-open"; // Learning & Development
  import IconGraduationCap from "~icons/ph/graduation-cap"; // Learning & Development
  import IconGoal from "~icons/lucide/goal"; // Team Leadership
  import IconListChecks from "~icons/ph/list-checks"; // Implementation Execution
  import IconSearchCode from "~icons/lucide/search-code"; // Search Strategy & Optimization
  import IconRadioTower from "~icons/lucide/radio-tower"; // Digital Strategy

  const iconMap: Record<string, any> = {
    globe: IconGlobe,
    database: IconDatabase,
    "bar-chart-3": IconBarChart3,
    "clipboard-check": IconClipboardCheck,
    "refresh-cw": IconRefreshCw,
    cpu: IconCpu,
    lightbulb: IconLightbulb,
    "layout-dashboard": IconLayoutDashboard,
    users: IconUsers,
    layers: IconLayers,
    code: IconCode,
    "monitor-smartphone": IconMonitorSmartphone,
    goal: IconGoal,
    "list-checks": IconListChecks,
    "book-open": IconBookOpen,
    "graduation-cap": IconGraduationCap,
    "brain-circuit": IconBrainCircuit,
    strategy: IconStrategy,
    "layout-template": IconLayoutTemplate,
    "file-sql": IconFileSql,
    "webhooks-logo": IconApi,
    shuffle: IconShuffle,
    "file-code-2": IconFileCode2,
    "monitor-cog": IconMonitorCog,
    network: IconNetwork,
    "share-2": IconShare2,
    "search-code": IconSearchCode,
    "radio-tower": IconRadioTower,
  };

  // Export the component for compatibility with existing imports
  export const EnhancedFilterSkills = {};
  export { EnhancedFilterSkills as default };

  // --- Props ---
  // Define prop types with Skill including iconName
  type Props = {
    skills?: Skill[];
    duties?: Duties[];
    activities?: Activities[];
  };

  // Use $props() to get props and set defaults
  const { skills = [], duties = [], activities = [] }: Props = $props();

  import { skillCategories } from "../data/skill-categories";

  // Group skills by category
  function groupSkillsByCategory(skills: Skill[]) {
    const map: Record<string, Skill[]> = {};
    for (const cat of skillCategories) map[cat.id] = [];
    for (const skill of skills) {
      if (skill.category && map[skill.category]) {
        map[skill.category].push(skill);
      }
    }
    return map;
  }

  const groupedSkills = $derived(() => groupSkillsByCategory(skills));

  // Track expanded state for each category
  let expandedCategories = $state<Record<string, boolean>>({});

  function toggleCategory(catId: string) {
    expandedCategories = {
      ...expandedCategories,
      [catId]: !expandedCategories[catId],
    };
  }

  function showAllInCategory(catId: string) {
    expandedCategories = { ...expandedCategories, [catId]: true };
  }

  function showLessInCategory(catId: string) {
    expandedCategories = { ...expandedCategories, [catId]: false };
  }

  // --- State Management ---
  // Define the type for the filter state to avoid TypeScript errors
  type FilterSkillsStateType = {
    selectedSkillIds: number[];
    filteredRoles: any[];
    showFilterResults: boolean;
    isFilterVisible: boolean;
    viewMode: "detailed" | "concise";
    resultsVisible: boolean;
  };

  // --- Store Interaction Temporarily Disabled for Debugging ---
  // let initialFilterState = $state.snapshot(filterSkillsState) as unknown as FilterSkillsState; // Use the defined interface
  // let currentFilterState = $state<FilterSkillsState>(initialFilterState); // This would normally use the snapshot

  // Provide default values directly to the $state for debugging, using 'as' for empty arrays
  let localFilterState = $state({
    selectedSkillIds: [] as number[],
    filteredRoles: [] as any[], // Placeholder - TODO: Replace any with Role[] type if defined
    showFilterResults: false,
    isFilterVisible: false,
    viewMode: "concise" as "detailed" | "concise",
    resultsVisible: false,
  });

  // --- Store Subscription and Initialization Effects Temporarily Disabled ---
  // $effect(() => {
  //   const unsubscribe = filterSkillsState.subscribe(storeValue => {
  //     localFilterState = storeValue; // Renamed variable
  //   });
  //   return () => {
  //     unsubscribe();
  //   };
  // });
  // $effect(() => {
  //   if (!localFilterState || Object.keys(localFilterState).length === 0 || !localFilterState.selectedSkillIds) {
  //     // updateFilterSkillsState({...}); // Disabled
  //   }
  // });

  // Access state properties directly, removed intermediate derived variables

  // --- Computed Properties (Derived) ---
  const allDutiesMap = $derived(() => {
    const map = new Map<number, Duties>();
    duties.forEach((duty) => map.set(duty.id, duty));
    return map;
  });

  // Create a map of activities by duty ID that can be accessed directly
  let allActivitiesMap = $state(new Map<number, Activities[]>());

  // Update the activities map whenever the activities prop changes
  $effect(() => {
    const map = new Map<number, Activities[]>();
    if (activities && activities.length > 0) {
      activities.forEach((activity) => {
        if (activity && activity.dutyId && !map.has(activity.dutyId)) {
          map.set(activity.dutyId, []);
        }
        if (activity && activity.dutyId) {
          map.get(activity.dutyId)?.push(activity);
        }
      });
    }
    allActivitiesMap = map;
  });

  // Create a map of skills by ID that can be accessed directly
  let allSkillsMap = $state(new Map<number, Skill>());

  // Update the skills map whenever the skills prop changes
  $effect(() => {
    const map = new Map<number, Skill>();
    if (skills && skills.length > 0) {
      skills.forEach((skill) => skill && skill.id && map.set(skill.id, skill));
    }
    allSkillsMap = map;
  });

  // Filtered data based on selected skills
  const filteredDuties = $derived(
    localFilterState.selectedSkillIds &&
      localFilterState.selectedSkillIds.length > 0 &&
      duties &&
      duties.length > 0
      ? duties.filter((duty: Duties) => {
          if (!duty || !duty.relevantSkills) return false;
          const skillIds = duty.relevantSkills
            .split(",")
            .map((id) => parseInt(id.trim()));
          return localFilterState.selectedSkillIds.some((id) =>
            skillIds.includes(id)
          );
        })
      : duties || []
  );

  const filteredActivities = $derived(
    localFilterState.selectedSkillIds &&
      localFilterState.selectedSkillIds.length > 0 &&
      activities &&
      activities.length > 0
      ? activities.filter((activity: Activities) => {
          if (!activity || !activity.dutyId) return false;
          const duty =
            duties && duties.length > 0
              ? duties.find((d: Duties) => d && d.id === activity.dutyId)
              : undefined;
          if (!duty || !duty.relevantSkills) return false;
          const skillIds = duty.relevantSkills
            .split(",")
            .map((id) => parseInt(id.trim()));
          return localFilterState.selectedSkillIds.some((id) =>
            skillIds.includes(id)
          );
        })
      : activities || []
  );

  // --- Event Handlers ---
  function toggleSkill(skillId: number) {
    const currentIds = localFilterState.selectedSkillIds; // Use the renamed reactive state
    const newSelectedSkillIds = currentIds.includes(skillId)
      ? currentIds.filter((id) => id !== skillId)
      : [...currentIds, skillId];

    // Animate out results before changing
    // updateFilterSkillsState({ resultsVisible: false }); // Disabled
    localFilterState.resultsVisible = false; // Direct assignment for $state

    // Short delay for exit animation
    setTimeout(() => {
      // Update the local state (store update disabled)
      const newRoles = calculateFilteredRoles(newSelectedSkillIds);
      // Use direct assignment for $state
      localFilterState.selectedSkillIds = newSelectedSkillIds;
      localFilterState.filteredRoles = newRoles;
      localFilterState.showFilterResults = newSelectedSkillIds.length > 0;
      // updateFilterSkillsState({ selectedSkillIds: newSelectedSkillIds, filteredRoles: newRoles, showFilterResults: newSelectedSkillIds.length > 0 }); // Disabled

      // Trigger entrance animation for new results
      setTimeout(() => {
        // updateFilterSkillsState({ resultsVisible: true }); // Disabled
        localFilterState.resultsVisible = true; // Direct assignment for $state
      }, 50);
    }, 300);
  }

  // This function calculates filtered roles/duties based on selected skills
  function calculateFilteredRoles(selectedIds: number[]): any[] {
    if (
      !selectedIds ||
      selectedIds.length === 0 ||
      !duties ||
      duties.length === 0
    )
      return [];

    // Using duties as a placeholder for roles/experience entries
    return duties.filter((duty) => {
      if (!duty || !duty.relevantSkills) return false;
      const skillIds = duty.relevantSkills
        .split(",")
        .map((id) => parseInt(id.trim()));
      return selectedIds.some((id) => skillIds.includes(id));
    });
  }

  function toggleViewMode(mode: "detailed" | "concise") {
    if (localFilterState.viewMode === mode) return; // Access directly from renamed state

    // Animate out results before changing
    // updateFilterSkillsState({ resultsVisible: false }); // Disabled
    localFilterState.resultsVisible = false; // Direct assignment for $state

    // Short delay for exit animation
    setTimeout(() => {
      // Update local state (store update disabled)
      // Use direct assignment for $state
      localFilterState.viewMode = mode;
      localFilterState.resultsVisible = false; // Keep it false during mode change
      // updateFilterSkillsState({ viewMode: mode, resultsVisible: false }); // Disabled

      // Trigger entrance animation for new results
      setTimeout(() => {
        // updateFilterSkillsState({ resultsVisible: true }); // Disabled
        localFilterState.resultsVisible = true; // Direct assignment for $state
      }, 50);
    }, 300);
  }

  function clearFilters() {
    // Update local state (store update disabled) using direct assignment for $state
    localFilterState.selectedSkillIds = [];
    localFilterState.filteredRoles = [];
    localFilterState.showFilterResults = false;
    localFilterState.resultsVisible = false;
    // updateFilterSkillsState({ selectedSkillIds: [], filteredRoles: [], showFilterResults: false, resultsVisible: false }); // Disabled
  }

  // Toggle filter visibility on mobile
  function toggleFilterVisibility() {
    // Update local state (store update disabled)
    // We update the isFilterVisible property directly
    localFilterState.isFilterVisible = !localFilterState.isFilterVisible; // Direct assignment for $state
    // updateFilterSkillsState({ isFilterVisible: !isFilterVisible }); // Disabled
  }

  // --- Helper Functions ---
  function getSkillName(skillId: number): string {
    if (!allSkillsMap) return "Unknown Skill";
    return allSkillsMap.get(skillId)?.name ?? "Unknown Skill";
  }

  function getActivitiesForDuty(dutyId: number): Activities[] {
    if (!allActivitiesMap || !dutyId) return [];
    return allActivitiesMap.get(dutyId) ?? [];
  }

  // Initialize on mount
  onMount(() => {
    // Ensure we have proper default values in the store (Store update disabled)
    // updateFilterSkillsState({
    //   selectedSkillIds: [],
    //   filteredRoles: [],
    //   showFilterResults: false,
    //   isFilterVisible: false,
    //   viewMode: "detailed",
    //   resultsVisible: false
    // });
    // Local state is already initialized with defaults

    // Process initial data
    if (skills && skills.length > 0) {
      const map = new Map<number, Skill>();
      skills.forEach((skill) => skill && skill.id && map.set(skill.id, skill));
      allSkillsMap = map;
    }

    // Trigger initial animation after a delay
    setTimeout(() => {
      // updateFilterSkillsState({ resultsVisible: true }); // Store update disabled onMount
      localFilterState.resultsVisible = true; // Update local state instead
    }, 500);
  });
  // Close the sidebar (mobile)
  function closeSidebar() {
    localFilterState.isFilterVisible = false;
  }
</script>

<div class="enhanced-filter-skills">
  <div class="filter-header">
    <h2>Filter Experience by Skills</h2>
    <button class="mobile-filter-toggle" onclick={toggleFilterVisibility}>
      <span>Filter</span>
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path
          d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  </div>

  <div class="filter-skills-container">
    <div
      class="skills-sidebar {localFilterState.isFilterVisible ? 'visible' : ''}"
    >
      <div class="sidebar-header">
        <h3>Skills</h3>

        <div class="sidebar-header-center">
          {#if localFilterState.selectedSkillIds.length > 0}
            <button class="clear-all-btn" onclick={clearFilters}>
              Clear All ×
            </button>
          {/if}
        </div>
        {#if localFilterState.isFilterVisible}
          <button
            type="button"
            class="view-selection-link"
            onclick={closeSidebar}
            tabindex="0">View Selection</button
          >
        {/if}
      </div>

      {#if localFilterState.selectedSkillIds.length > 0}
        <div class="selected-skills-bar" aria-label="Selected Skills">
          {#each localFilterState.selectedSkillIds as skillId (skillId)}
            {#if allSkillsMap.get(skillId)}
              <span class="selected-skill-chip">
                {allSkillsMap.get(skillId)?.name}
                <button
                  class="remove-skill-btn"
                  aria-label={`Remove ${allSkillsMap.get(skillId)?.name}`}
                  onclick={() => toggleSkill(skillId)}
                >
                  ×
                </button>
              </span>
            {/if}
          {/each}
        </div>
      {/if}

      <div class="skills-grouped-list">
        {#each skillCategories as category}
          <div class="skill-category-block">
            <button
              type="button"
              class="skill-category-header"
              onclick={() => toggleCategory(category.id)}
              aria-expanded={!!expandedCategories[category.id]}
            >
              <span class="category-icon">
                {#if iconMap[category.iconName]}
                  {@const CatIcon = iconMap[category.iconName]}
                  <CatIcon width="1.2em" height="1.2em" />
                {/if}
              </span>
              <span class="category-name">{category.name}</span>
              <span class="category-toggle"
                >{expandedCategories[category.id] ? "▲" : "▼"}</span
              >
            </button>
            <div
              class="category-skills-list {expandedCategories[category.id]
                ? 'expanded'
                : ''}"
            >
              {#each (groupedSkills()[category.id] || []).filter((skill: Skill) => !localFilterState.selectedSkillIds.includes(skill.id)) as skill: Skill, i (skill.id)}
                {#if expandedCategories[category.id] || i < 3}
                  {@const IconComponent = iconMap[skill.iconName]}
                  <button
                    class="skill-btn"
                    onclick={() => {
                      if (!expandedCategories[category.id]) {
                        showAllInCategory(category.id);
                      } else {
                        toggleSkill(skill.id);
                      }
                    }}
                    aria-pressed="false"
                  >
                    <span class="skill-icon">
                      <IconComponent width="1.2em" height="1.2em" />
                    </span>
                    <span class="skill-name">{skill.name}</span>
                  </button>
                {/if}
              {/each}
              {#if (groupedSkills()[category.id] || []).filter((skill: Skill) => !localFilterState.selectedSkillIds.includes(skill.id)).length > 3}
                {#if !expandedCategories[category.id]}
                  <button
                    class="show-more-btn"
                    onclick={(e) => {
                      e.stopPropagation();
                      showAllInCategory(category.id);
                    }}
                    aria-label={`Show all skills in ${category.name}`}
                    >More…</button
                  >
                {:else}
                  <button
                    class="show-more-btn"
                    onclick={(e) => {
                      e.stopPropagation();
                      showLessInCategory(category.id);
                    }}
                    aria-label={`Show fewer skills in ${category.name}`}
                    >Show Less</button
                  >
                {/if}
              {/if}
            </div>
          </div>
        {/each}
      </div>

      <div class="close-filter-mobile">
        <button onclick={toggleFilterVisibility}>
          <span>Close Filters</span>
        </button>
      </div>
    </div>

    <div class="filtered-content">
      <div class="results-header">
        <h3>
          {#if localFilterState.selectedSkillIds.length === 0}
            All Experience
          {:else}
            Filtered Experience ({filteredDuties.length} items)
          {/if}
        </h3>

        <div class="view-mode-toggle" role="radiogroup" aria-label="View Mode">
          <button
            type="button"
            class="view-mode-btn {localFilterState.viewMode === 'concise' ? 'active' : ''}"
            aria-checked={localFilterState.viewMode === 'concise'}
            onclick={() => toggleViewMode('concise')}
            role="radio"
          >
            Concise
          </button>
          <button
            type="button"
            class="view-mode-btn {localFilterState.viewMode === 'detailed' ? 'active' : ''}"
            aria-checked={localFilterState.viewMode === 'detailed'}
            onclick={() => toggleViewMode('detailed')}
            role="radio"
          >
            Detailed
          </button>
        </div>
      </div>

      <div
        class="results-container {localFilterState.resultsVisible
          ? 'visible'
          : ''}"
      >
        {#if !localFilterState.selectedSkillIds || localFilterState.selectedSkillIds.length === 0}
          <div class="instruction-card">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
            </svg>
            <p>
              Select one or more skills from the sidebar to filter experience
            </p>
          </div>
        {:else if !filteredDuties || filteredDuties.length === 0}
          <div class="no-results-card">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
              <line x1="9" y1="9" x2="9.01" y2="9" />
              <line x1="15" y1="9" x2="15.01" y2="9" />
            </svg>
            <p>No experience found matching the selected skills</p>
            <button class="try-again-btn" onclick={clearFilters}>
              Clear Filters & Try Again
            </button>
          </div>
        {:else}
          <div
            class="duties-grid"
            class:detailed={localFilterState.viewMode === "detailed"}
            class:concise={localFilterState.viewMode === "concise"}
          >
            {#each filteredDuties as duty, i (duty.id)}
              <div class="duty-card" style="--delay: {i * 0.05}s">
                <h4>{duty.duties}</h4>
                <div class="content-container">
                  {#if localFilterState.viewMode === "detailed"}
                    <p class="duty-summary">{duty.summary}</p>
                    <div class="activities-list">
                      {#each getActivitiesForDuty(duty.id) as activity (activity.id)}
                        <div class="activity-item">
                          <div class="activity-bullet"></div>
                          <p>{activity.activity}</p>
                        </div>
                      {/each}
                    </div>
                    {#if duty.relevantSkills}
                      <div class="related-skills">
                        <span class="related-skills-label">Related Skills:</span
                        >
                        <div class="skill-tags">
                          {#each duty.relevantSkills.split(",") as skillIdStr}
                            {@const skillId = parseInt(skillIdStr.trim())}
                            {#if !isNaN(skillId)}
                              <span class="skill-tag"
                                >{getSkillName(skillId)}</span
                              >
                            {/if}
                          {/each}
                        </div>
                      </div>
                    {/if}
                  {:else}
                    <p>
                      {duty.summary ?? "Details available in detailed view."}
                    </p>
                    {#if duty.relevantSkills}
                      <div class="related-skills">
                        <span class="related-skills-label">Skills:</span>
                        <div class="skill-tags">
                          {#each duty.relevantSkills.split(",") as skillIdStr}
                            {@const skillId = parseInt(skillIdStr.trim())}
                            {#if !isNaN(skillId)}
                              <span class="skill-tag"
                                >{getSkillName(skillId)}</span
                              >
                            {/if}
                          {/each}
                        </div>
                      </div>
                    {/if}
                  {/if}
                </div>
              </div>
            {/each}
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
  /* Component styles */
  .enhanced-filter-skills {
    background-color: var(--neutral-white);
    padding: 2rem;
    border-radius: 16px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
    margin-bottom: 2rem;
  }

  .filter-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  .filter-header h2 {
    font-size: 1.8rem;
    color: var(--color-primary);
    margin: 0;
  }

  .mobile-filter-toggle {
    display: none;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: linear-gradient(
      135deg,
      var(--color-primary),
      var(--color-accent)
    );
    color: white;
    border: none;
    border-radius: 25px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .filter-skills-container {
    display: grid;
    grid-template-columns: 250px 1fr;
    gap: 2rem;
  }

  .skills-sidebar {
    position: sticky;
    top: 2rem;
    align-self: start;
    background-color: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    height: fit-content;
  }

  .sidebar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 1.25rem 0;
  }

  .sidebar-header-center {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .view-selection-link {
    background: none;
    border: none;
    color: var(--color-primary);
    font-size: 0.95rem;
    text-decoration: underline;
    cursor: pointer;
    padding: 0;
    transition: color 0.15s;
  }
  .view-selection-link:hover,
  .view-selection-link:focus {
    color: var(--color-accent);
    outline: none;
  }

  .sidebar-header h3 {
    font-size: 1.2rem;
    color: var(--color-primary);
    margin: 0;
  }

  .clear-all-btn {
    font-size: 0.85rem;
    color: var(--color-error);
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    transition: all 0.2s ease;
  }

  .clear-all-btn:hover {
    text-decoration: underline;
  }

  .skill-btn {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0.5rem;
    background-color: #f9f9f9;
    border: 1px solid #eee;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    text-align: left;
  }

  .skill-icon {
    display: flex;
    align-items: center;
    margin-right: 0.5rem;
  }

  .skill-btn:hover {
    background-color: #f0f0f0;
  }

  .close-filter-mobile {
    display: none;
    margin-top: 1.5rem;
    text-align: center;
  }

  .close-filter-mobile button {
    width: 100%;
    padding: 0.75rem;
    background-color: #f0f0f0;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 500;
  }

  .filtered-content {
    flex: 1;
  }

  .results-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  .results-header h3 {
    font-size: 1.4rem;
    color: var(--neutral-black);
    margin: 0;
  }

  .view-mode-toggle {
    display: flex;
    gap: 0.5rem;
  }

  .view-mode-btn {
    padding: 0.5rem 1rem;
    background-color: #f9f9f9;
    border: 1px solid #eee;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 0.9rem;
  }

  .view-mode-btn:hover {
    background-color: #f0f0f0;
  }

  .view-mode-btn.active {
    background: linear-gradient(
      135deg,
      var(--color-primary),
      var(--color-accent)
    );
    color: white;
    border-color: transparent;
  }

  .duties-grid {
    display: grid;
    gap: 1.5rem;
  }

  .duties-grid.detailed {
    grid-template-columns: 1fr;
  }

  .duties-grid.concise {
    grid-template-columns: repeat(2, 1fr);
  }

  .results-container {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .results-container.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .instruction-card,
  .no-results-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 3rem;
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    color: #666;
    gap: 1rem;
  }

  .instruction-card svg,
  .no-results-card svg {
    color: var(--color-primary);
    opacity: 0.7;
  }

  .try-again-btn {
    margin-top: 1rem;
    padding: 0.5rem 1.5rem;
    background: linear-gradient(
      135deg,
      var(--color-primary),
      var(--color-accent)
    );
    color: white;
    border: none;
    border-radius: 25px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .try-again-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(155, 81, 224, 0.2);
  }

  .duty-card {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
    opacity: 0;
    transform: translateY(20px);
    animation: fadeIn 0.5s forwards;
    animation-delay: var(--delay, 0s);
  }

  @keyframes fadeIn {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .duty-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(155, 81, 224, 0.1);
  }

  .duty-card h4 {
    font-size: 1.1rem;
    color: var(--neutral-black);
    margin: 0 0 1.25rem 0;
  }

  .content-container {
    min-height: 80px; /* Ensures consistent card height during transitions */
    transition:
      opacity 0.3s ease,
      transform 0.3s ease;
  }

  .duty-summary {
    color: var(--neutral-black);
    font-size: 0.95rem;
    line-height: 1.5;
    margin: 0 0 1.5rem 0;
    font-style: italic;
    opacity: 0.9;
    animation: fadeIn 0.4s ease forwards;
  }

  .activities-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
    animation: fadeIn 0.4s ease forwards;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .activity-item {
    display: flex;
    gap: 0.75rem;
    align-items: flex-start;
  }

  .activity-bullet {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: linear-gradient(
      135deg,
      var(--color-primary),
      var(--color-accent)
    );
    margin-top: 0.5rem;
    flex-shrink: 0;
  }

  .activity-item p {
    margin: 0;
    font-size: 0.95rem;
    line-height: 1.5;
    color: var(--neutral-black);
  }

  .related-skills {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    border-top: 1px solid #f0f0f0;
    padding-top: 1rem;
  }

  .related-skills-label {
    font-size: 0.85rem;
    color: #666;
  }

  .skill-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .skill-tag {
    font-size: 0.8rem;
    padding: 0.25rem 0.75rem;
    background: linear-gradient(
      135deg,
      rgba(155, 81, 224, 0.1) 0%,
      rgba(52, 152, 219, 0.1) 100%
    );
    color: var(--color-primary);
    border-radius: 20px;
    font-weight: 500;
  }

  @media (max-width: 768px) {
    .enhanced-filter-skills {
      padding: 1rem;
    }
    .sidebar-header {
      padding: 1.25rem;
      margin-top: 0;
      position: sticky;
      top: 0;
      z-index: 1;
      background-color: white;
    }
    .filter-header h2 {
      font-size: 1.2rem;
    }

    .mobile-filter-toggle {
      display: flex;
    }

    .results-header {
      flex-direction: column;
      gap: 1rem;
      align-items: flex-start;
    }

    .results-header h3 {
      font-size: 1rem;
    }

    .filter-skills-container {
      grid-template-columns: 1fr;
    }

    .skills-sidebar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1001; /* Ensure it's above other content */
      border-radius: 0;
      transform: translateX(-100%);
      transition: transform 0.3s ease;
      overflow-y: auto;
      padding: 0 0 1.25rem;
      max-height: 100vh;
      overscroll-behavior-y: contain;
    }

    .skills-sidebar.visible {
      transform: translateX(0);
    }

    .close-filter-mobile {
      display: block;
    }
    .skills-grouped-list,
    .selected-skills-bar,
    .close-filter-mobile {
      margin: 1.25rem;
    }

    .duties-grid.concise {
      grid-template-columns: 1fr;
    }
    .duty-card {
      padding: 1rem 0.5rem 1rem 1rem;
    }
  }
  .skills-grouped-list {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    margin-bottom: 1rem;
  }
  .skill-category-block {
    background: #fafbfc;
    border-radius: 10px;
    padding: 0.5rem 0.75rem 0.75rem 0.75rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
  }
  .skill-category-header {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-weight: 600;
    font-size: 1.05rem;
    color: var(--color-primary);
    cursor: pointer;
    user-select: none;
    margin-bottom: 0.5rem;
    outline: none;
    width: 100%;
    border: none;
    background: none;
  }
  .skill-category-header:focus {
    box-shadow: 0 0 0 2px var(--color-primary-light);
  }
  .category-icon {
    display: flex;
    align-items: center;
  }
  .category-name {
    flex: 1;
    text-align: left;
  }
  .category-toggle {
    font-size: 0.9em;
    color: #aaa;
    margin-left: 0.5em;
  }
  .category-skills-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    transition: max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    max-height: 5em;
    overflow: hidden;
  }
  .category-skills-list.expanded {
    max-height: 1000px;
    overflow: visible;
  }
  .show-more-btn {
    background: none;
    border: none;
    color: var(--color-primary);
    font-size: 0.9em;
    margin-left: 0.25em;
    cursor: pointer;
    padding: 0.1em 0.5em;
    border-radius: 6px;
    transition: background 0.15s;
  }
  .show-more-btn:hover,
  .show-more-btn:focus {
    background: rgba(155, 81, 224, 0.08);
    outline: none;
  }

  .selected-skills-bar {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
    margin-top: 0.5rem;
  }
  .selected-skill-chip {
    display: flex;
    align-items: center;
    background: linear-gradient(
      135deg,
      rgba(155, 81, 224, 0.14) 0%,
      rgba(52, 152, 219, 0.14) 100%
    );
    color: var(--color-primary);
    border-radius: 20px;
    font-weight: 500;
    font-size: 0.82rem;
    padding: 0.25rem 0.75rem 0.25rem 0.75rem;
    margin-right: 0.15rem;
  }
  .remove-skill-btn {
    background: none;
    border: none;
    color: var(--color-error);
    font-size: 1.1em;
    margin-left: 0.4em;
    cursor: pointer;
    line-height: 1;
    padding: 0 0.1em;
    border-radius: 50%;
    transition: background 0.15s;
  }
  .remove-skill-btn:hover,
  .remove-skill-btn:focus {
    background: rgba(155, 81, 224, 0.08);
    outline: none;
  }
</style>
