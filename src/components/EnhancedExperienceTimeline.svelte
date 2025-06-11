<script lang="ts">
  import { onMount } from "svelte";
  import type {
    Roles,
    Companies,
    Duties,
    Activities,
  } from "../data/experience-schema";
  import AnimateOnScroll from "./AnimateOnScroll.svelte";
  import ParallaxBackground from "./ParallaxBackground.svelte";
  import Icon from "./Icon.svelte";

  // --- Legend filter state and logic ---
  import { onDestroy } from "svelte";
  import { tick } from "svelte";
  // Possible categories
  const CATEGORIES = ["consulting", "corporate"] as const;
  type Category = (typeof CATEGORIES)[number];
  // Both selected by default (reactive)
  let { selectedCategories } = $state({
    selectedCategories: [...CATEGORIES] as Category[],
  });

  // Temporary pointer-disable for hover fix
  let consultingRef: HTMLDivElement | null = null;
  let corporateRef: HTMLDivElement | null = null;

  function toggleCategory(category: Category) {
    if (selectedCategories.length === 2) {
      // Both selected, clicking one: filter to just that one
      selectedCategories = [category];
    } else if (selectedCategories.length === 1) {
      if (selectedCategories[0] === category) {
        // Clicking the already active one: reset to both
        selectedCategories = [...CATEGORIES];
        // Blur the legend item to force hover state reset
        if (category === "consulting" && consultingRef) consultingRef.blur();
        if (category === "corporate" && corporateRef) corporateRef.blur();
      } else {
        // Clicking the inactive one: switch to that
        selectedCategories = [category];
      }
    }
  }

  // Keyboard a11y for legend
  function handleLegendKey(event: KeyboardEvent, category: Category) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleCategory(category);
    }
  }

  // Click outside legend resets filter
  let legendRef: HTMLDivElement | null = null;
  function handleClickOutside(event: MouseEvent) {
    if (legendRef && !legendRef.contains(event.target as Node)) {
      selectedCategories = [...CATEGORIES];
    }
  }
  onMount(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  // Using Svelte 5 runes API for props
  const props = $props<{
    roles?: Roles[];
    companies?: Companies[];
    duties?: Duties[];
    activities?: Activities[];
  }>();

  // Set default values
  props.roles ??= [];
  props.companies ??= [];
  props.duties ??= [];
  props.activities ??= [];

  // Import the shared state from the store
  import {
    timelineState,
    updateTimelineState,
  } from "../lib/stores/skillsStore.svelte.ts";

  // Format date to display month and year
  function formatDate(dateString: string | null): string {
    if (!dateString) return "Present";

    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      year: "numeric",
    }).format(date);
  }

  // Calculate duration between two dates in years and months
  function calculateDuration(
    startDate: string | null,
    endDate: string | null
  ): string {
    if (!startDate) return "";

    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();

    const yearDiff = end.getFullYear() - start.getFullYear();
    const monthDiff = end.getMonth() - start.getMonth();

    let totalMonths = yearDiff * 12 + monthDiff;
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    let result = "";
    if (years > 0) {
      result += `${years} year${years > 1 ? "s" : ""}`;
    }

    if (months > 0) {
      result += result
        ? ` ${months} month${months > 1 ? "s" : ""}`
        : `${months} month${months > 1 ? "s" : ""}`;
    }

    return result;
  }

  // Get company details by ID
  function getCompany(companyId: number): Companies {
    return (
      props.companies.find((company: Companies) => company.id === companyId) ||
      ({} as Companies)
    );
  }

  // Get duties for a role
  function getDutiesForRole(roleId: number): Duties[] {
    return props.duties.filter(
      (duty: Duties) =>
        Array.isArray(duty.roleIds) && duty.roleIds.includes(roleId)
    );
  }

  // Get activities for a duty
  function getActivitiesForDuty(dutyId: number, roleId: number): Activities[] {
    return props.activities.filter(
      (activity: Activities) =>
        activity.dutyId === dutyId && activity.roleId === roleId
    );
  }

  // Create a local variable to store the current state
  let currentTimelineState: {
    timelineVisible: boolean;
    expandedRoles: number[];
    viewMode: "condensed" | "expanded";
  };

  // Subscribe to the store to keep the local state updated
  const unsubscribe = timelineState.subscribe(
    (value: {
      timelineVisible: boolean;
      expandedRoles: number[];
      viewMode: "condensed" | "expanded";
    }) => {
      currentTimelineState = value;
    }
  );

  // Clean up subscription when component is destroyed
  onMount(() => {
    return () => {
      unsubscribe();
    };
  });

  // Toggle expanded state for a role
  function toggleRoleExpanded(roleId: number): void {
    if (currentTimelineState.expandedRoles.includes(roleId)) {
      updateTimelineState({
        expandedRoles: currentTimelineState.expandedRoles.filter(
          (id: number) => id !== roleId
        ),
      });
    } else {
      updateTimelineState({
        expandedRoles: [...currentTimelineState.expandedRoles, roleId],
      });
    }
  }

  // Expand all roles
  function expandAllRoles(): void {
    updateTimelineState({
      viewMode: "expanded",
      expandedRoles: props.roles.map((role: Roles) => role.id),
    });
  }

  // Collapse all roles
  function collapseAllRoles(): void {
    updateTimelineState({
      viewMode: "condensed",
      expandedRoles: [],
    });
  }

  // Initialize animations on mount
  onMount(() => {
    // Set up intersection observer for animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            updateTimelineState({ timelineVisible: true });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe the timeline container
    const timelineEl = document.querySelector(".experience-timeline");
    if (timelineEl) {
      observer.observe(timelineEl);
    }
  });
</script>

<div class="enhanced-experience-timeline">
  <ParallaxBackground speed={0.05} direction="vertical" maxOffset={30}>
    <div class="timeline-background-shapes">
      <div class="bg-shape shape-1"></div>
      <div class="bg-shape shape-2"></div>
      <div class="bg-shape shape-3"></div>
    </div>
  </ParallaxBackground>

  <AnimateOnScroll animation="fade-up" duration={800} delay={200}>
    <div class="timeline-header">
      <h2>Professional Journey</h2>
      <div class="view-mode-controls">
        <button
          class="view-mode-btn {$timelineState.viewMode === 'condensed'
            ? 'active'
            : ''}"
          onclick={collapseAllRoles}
          aria-pressed={$timelineState.viewMode === "condensed"}
        >
          Condensed
        </button>
        <button
          class="view-mode-btn {$timelineState.viewMode === 'expanded'
            ? 'active'
            : ''}"
          onclick={expandAllRoles}
          aria-pressed={$timelineState.viewMode === "expanded"}
        >
          Expanded
        </button>
      </div>
      <div class="timeline-legend" bind:this={legendRef}>
        <div
          class="legend-item consulting {selectedCategories.length === 1 &&
          selectedCategories[0] === 'consulting'
            ? 'active'
            : selectedCategories.length === 1
              ? 'inactive'
              : ''}"
          bind:this={consultingRef}
          tabindex="0"
          role="button"
          aria-pressed={selectedCategories.includes("consulting")}
          onclick={() => toggleCategory("consulting")}
          onkeydown={(e) => handleLegendKey(e, "consulting")}
        >
          <div class="legend-dot consulting"></div>
          <span>Consulting</span>
        </div>
        <div
          class="legend-item corporate {selectedCategories.length === 1 &&
          selectedCategories[0] === 'corporate'
            ? 'active'
            : selectedCategories.length === 1
              ? 'inactive'
              : ''}"
          bind:this={corporateRef}
          tabindex="0"
          role="button"
          aria-pressed={selectedCategories.includes("corporate")}
          onclick={() => toggleCategory("corporate")}
          onkeydown={(e) => handleLegendKey(e, "corporate")}
        >
          <div class="legend-dot corporate"></div>
          <span>Corporate</span>
        </div>
      </div>
    </div>
  </AnimateOnScroll>

  <div
    class="experience-timeline {$timelineState.timelineVisible
      ? 'visible'
      : ''}"
  >
    <div class="timeline-line"></div>

    {#each props.roles.filter((role: Roles) => {
      const company = getCompany(role.companyId);
      return selectedCategories.includes(company.companyCategory);
    }) as role, index}
      {@const company = getCompany(role.companyId)}
      <AnimateOnScroll
        animation="fade-left"
        duration={800}
        delay={300 + Math.floor(index * 80 * Math.exp(-index / 8))}
      >
        <div class="timeline-item">
          <div class="timeline-row">
            <div class="timeline-date out-of-card">
              <span class="date-text"
                >{formatDate(role.startDate)} - {formatDate(role.endDate)}</span
              >
              <span class="duration"
                >{calculateDuration(role.startDate, role.endDate)}</span
              >
            </div>
            <div class="timeline-center">
              <div
                class="timeline-dot {company.companyCategory === 'consulting'
                  ? 'consulting'
                  : 'corporate'}"
              ></div>
            </div>
            <div
              class="timeline-card"
              onclick={() => toggleRoleExpanded(role.id)}
              onkeydown={(e) =>
                e.key === "Enter" && toggleRoleExpanded(role.id)}
              tabindex="0"
              role="button"
              aria-expanded={$timelineState.expandedRoles.includes(role.id)}
            >
              <div class="timeline-date in-card">
                <span class="date-text"
                  >{formatDate(role.startDate)} - {formatDate(
                    role.endDate
                  )}</span
                >
                <span class="duration"
                  >{calculateDuration(role.startDate, role.endDate)}</span
                >
              </div>
              <div class="timeline-card-content">
                <div class="timeline-card-left">
                  <h3 class="timeline-title">{role.title}</h3>
                  <p class="timeline-summary">{role.summary}</p>
                </div>

                <div class="timeline-card-right">
                  <div
                    class="company-badge {company.companyCategory ===
                    'consulting'
                      ? 'consulting'
                      : 'corporate'}"
                  >
                    {company.company}
                  </div>
                  <div class="company-type">
                    {company.companyCategory.charAt(0).toUpperCase() +
                      company.companyCategory.slice(1)}
                  </div>
                  <div class="timeline-location">
                    <Icon name="map-pin" size={16} />
                    <span>{company.location}</span>
                  </div>
                </div>
              </div>

              <div
                class="timeline-details"
                class:expanded={$timelineState.expandedRoles.includes(role.id)}
              >
                <div class="timeline-details-content">
                  {#each getDutiesForRole(role.id) as duty}
                    <div class="duty-section">
                      <h4 class="duty-title">{duty.duties}</h4>
                      <ul class="activities-list">
                        {#each getActivitiesForDuty(duty.id, role.id) as activity}
                          <li>{activity.activity}</li>
                        {/each}
                      </ul>
                    </div>
                  {/each}
                </div>
              </div>

              <div class="timeline-card-footer">
                <div class="details-indicator">
                  <span
                    >{$timelineState.expandedRoles.includes(role.id)
                      ? "Hide Details"
                      : "View Details"}</span
                  >
                  {#if $timelineState.expandedRoles.includes(role.id)}
                    <Icon name="arrow-down" size={16} />
                  {:else}
                    <Icon name="arrow-right" size={16} />
                  {/if}
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimateOnScroll>
    {/each}
  </div>
</div>

<style>
  .enhanced-experience-timeline {
    padding: 2rem 0;
    position: relative;
    overflow: hidden;
  }

  .timeline-background-shapes {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0.5;
  }

  .bg-shape {
    position: absolute;
    border-radius: 50%;
    filter: blur(50px);
  }

  .shape-1 {
    top: 10%;
    right: -5%;
    width: 300px;
    height: 300px;
    background: linear-gradient(
      135deg,
      rgba(155, 81, 224, 0.15),
      rgba(155, 81, 224, 0.05)
    );
  }

  .shape-2 {
    bottom: 20%;
    left: -10%;
    width: 400px;
    height: 400px;
    background: linear-gradient(
      135deg,
      rgba(52, 152, 219, 0.1),
      rgba(52, 152, 219, 0.03)
    );
  }

  .shape-3 {
    top: 40%;
    right: 20%;
    width: 200px;
    height: 200px;
    background: linear-gradient(
      135deg,
      rgba(46, 204, 113, 0.1),
      rgba(46, 204, 113, 0.03)
    );
  }

  .timeline-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .view-mode-controls {
    display: flex;
    align-items: center;
    margin: 0 auto;
  }

  .view-mode-btn {
    background-color: white;
    border: 1px solid var(--color-primary);
    color: var(--color-primary);
    font-weight: 600;
    padding: 0.5rem 1rem;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .view-mode-btn:first-child {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    border-right: none;
  }

  .view-mode-btn:last-child {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  .view-mode-btn.active {
    background-color: var(--color-primary);
    color: white;
  }

  .view-mode-btn:hover:not(.active) {
    background-color: rgba(155, 81, 224, 0.1);
  }

  .timeline-header h2 {
    font-size: 1.75rem;
    color: var(--color-primary);
    margin: 0;
  }

  .timeline-legend {
    display: flex;
    gap: 1.5rem;
    margin-top: 1.5rem;
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.35rem 1.1rem 0.35rem 0.7rem;
    border-radius: 20px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    user-select: none;
    border: 2px solid transparent;
    transition:
      background 0.18s,
      border 0.18s,
      color 0.18s,
      box-shadow 0.18s,
      opacity 0.18s;
  }

  .legend-item:hover,
  .legend-item:focus {
    background: rgba(52, 152, 219, 0.08);
    border-color: var(--color-primary, #9b51e0);
    box-shadow: 0 2px 8px rgba(155, 81, 224, 0.09);
    outline: none;
  }

  .legend-item.active.consulting {
    background: linear-gradient(
      90deg,
      var(--color-primary, #9b51e0) 60%,
      var(--color-accent, #f2994a) 100%
    );
    color: #fff;
    border-color: var(--color-primary, #9b51e0);
    box-shadow: 0 4px 16px rgba(155, 81, 224, 0.13);
    opacity: 1;
  }

  .legend-item.active.corporate {
    background: linear-gradient(90deg, #3498db 60%, #2ecc71 100%);
    color: #fff;
    border-color: #3498db;
    box-shadow: 0 4px 16px rgba(52, 152, 219, 0.13);
    opacity: 1;
  }

  .legend-item.inactive {
    background: none;
    color: #bbb;
    border-color: #e0e0e0;
    opacity: 0.55;
  }

  .legend-item.inactive.consulting:hover {
    background: linear-gradient(
      90deg,
      var(--color-primary, #9b51e0) 20%,
      var(--color-accent, #f2994a) 80%
    );
    color: #fff;
    opacity: 0.85;
  }

  .legend-item.inactive.corporate:hover {
    background: linear-gradient(90deg, #3498db 20%, #2ecc71 80%);
    color: #fff;
    opacity: 0.85;
  }

  .legend-dot {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    display: inline-block;
    margin-right: 0.5rem;
    border: 2px solid #fff;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.07);
  }

  .legend-dot.consulting {
    background: linear-gradient(
      135deg,
      var(--color-primary, #9b51e0),
      var(--color-accent, #f2994a)
    );
  }

  .legend-dot.corporate {
    background: linear-gradient(135deg, #3498db, #2ecc71);
  }

  .experience-timeline {
    position: relative;
    padding-left: 2rem;
    padding-right: 1rem;
    max-width: 100%;
  }

  .timeline-line {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 8px;
    width: 2px;
    background: linear-gradient(
      to bottom,
      rgba(155, 81, 224, 0.5) 0%,
      rgba(52, 152, 219, 0.5) 100%
    );
    transform: scaleY(0);
    transform-origin: top;
    transition: transform 1s ease;
  }

  @media (min-width: 80rem) {
    .timeline-line {
      left: 11.5rem;
    }
  }

  .experience-timeline.visible .timeline-line {
    transform: scaleY(1);
  }

  .timeline-item {
    position: relative;
    margin-bottom: 2.5rem;
  }

  .timeline-row {
    display: flex;
    align-items: center;
  }

  .timeline-date {
    color: var(--color-primary);
    font-weight: 600;
    gap: 0.25rem;
  }

  .timeline-date.out-of-card {
    display: none;
    flex-direction: column;
    align-items: flex-end;
    min-width: 120px;
    padding-top: 1.5rem;
    padding-right: 1.5rem;
    justify-content: flex-start;
    align-self: flex-start;
  }

  @media (min-width: 80rem) {
    .timeline-date.out-of-card {
      margin-right: 1.5rem;
      max-width: 100%;
    }
  }

  .timeline-date.in-card {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }

  .timeline-date .date-text {
    white-space: nowrap;
  }

  .timeline-date .duration {
    white-space: nowrap;
  }

  @media (min-width: 80rem) {
    .timeline-date.out-of-card {
      display: flex;
    }
    .timeline-date.in-card {
      display: none;
    }
  }

  @media (max-width: 80rem) {
    .timeline-date.out-of-card {
      display: none;
    }
    .timeline-date.in-card {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      margin-bottom: 0.5rem;
    }
    .timeline-date .date-text {
      flex: 1;
      text-align: left;
    }
    .timeline-date .duration {
      flex: 0 0 auto;
      text-align: right;
      margin-left: 1.5rem;
    }
  }

  .timeline-dot {
    position: absolute;
    left: -2rem;
    top: 1.5rem;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    z-index: 2;
    box-shadow: 0 0 0 4px white;
    border: 2px solid #fff;
  }

  @media (min-width: 80rem) {
    .timeline-dot {
      left: 9rem;
      top: 1.75rem;
    }
  }

  .timeline-dot.consulting {
    background: linear-gradient(
      135deg,
      var(--color-primary),
      var(--color-accent)
    );
  }

  .timeline-dot.corporate {
    background: linear-gradient(135deg, #3498db, #2ecc71);
  }

  .timeline-card {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
    cursor: pointer;
    position: relative;
    width: 100%;
    box-sizing: border-box;
  }

  .timeline-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(155, 81, 224, 0.1);
  }

  .timeline-card:focus {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }

  .timeline-card-content {
    display: flex;
    justify-content: space-between;
    gap: 1.5rem;
  }

  .timeline-card-left {
    flex: 1.618; /* Golden ratio */
  }

  .timeline-card-right {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.75rem;
  }

  .timeline-title {
    font-size: 1.2rem;
    margin: 0 0 0.75rem 0;
    color: var(--neutral-black);
  }

  .company-badge {
    font-size: 0.85rem;
    font-weight: 600;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    color: white;
    text-align: center;
  }

  .company-badge.consulting {
    background: linear-gradient(
      135deg,
      var(--color-primary),
      var(--color-accent)
    );
  }

  .company-badge.corporate {
    background: linear-gradient(135deg, #3498db, #2ecc71);
  }

  .company-type {
    font-size: 0.85rem;
    color: #666;
    text-align: right;
  }

  .timeline-location {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #666;
    font-size: 0.9rem;
    margin-top: 0.5rem;
  }

  .timeline-summary {
    color: var(--neutral-black);
    font-size: 0.95rem;
    line-height: 1.6;
    margin: 0 0 1rem 0;
  }

  .timeline-card-footer {
    display: flex;
    justify-content: flex-end;
  }

  .details-indicator {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--color-primary);
    font-weight: 600;
    padding: 0.5rem;
    border-radius: 4px;
    transition: all 0.2s ease;
  }

  .timeline-details {
    margin-top: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    padding-top: 0;
    width: 100%;
    max-height: 0;
    overflow: hidden;
    opacity: 0;
    transition: all 0.4s ease-in-out;
  }

  .timeline-details.expanded {
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    max-height: 2000px; /* Large enough to fit all content */
    opacity: 1;
  }

  .timeline-details-content {
    max-width: 61.8%; /* Golden ratio percentage */
  }

  .duty-section {
    margin-bottom: 1.5rem;
  }

  .duty-section:last-child {
    margin-bottom: 0;
  }

  .duty-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--color-primary);
    margin: 0 0 0.75rem 0;
  }

  .activities-list {
    margin: 0;
    padding-left: 1.5rem;
  }

  .activities-list li {
    margin-bottom: 0.5rem;
    line-height: 1.5;
    color: var(--neutral-black);
  }

  @media (max-width: 768px) {
    .timeline-header {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .timeline-header h2 {
      width: 100%;
      text-align: center;
    }

    .view-mode-controls {
      margin: 1rem 0;
      width: 100%;
      justify-content: center;
    }

    .timeline-card-content {
      flex-direction: column;
    }

    .timeline-card-right {
      align-items: flex-start;
    }

    .timeline-details-content {
      max-width: 100%;
    }

    .timeline-date {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.25rem;
    }

    .company-badge,
    .company-type {
      text-align: left;
    }
  }
</style>
