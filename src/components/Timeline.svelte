<script lang="ts">
  import type { Roles, Duties, Activities } from "../data/experience-schema";
  import { slide } from "svelte/transition";

  // Export the component for compatibility with existing imports
  export const Timeline = {};
  export { Timeline as default };

  // Define prop types using Svelte 5's $props rune
  type Props = {
    roles?: Roles[];
    duties?: Duties[];
    activities?: Activities[];
  };

  // Use $props() to get props and set defaults
  const { roles = [], duties = [], activities = [] }: Props = $props();

  // Use $state for reactive variables
  let expandedRoles = $state<number[]>([]);

  function toggleRole(roleId: number) {
    if (expandedRoles.includes(roleId)) {
      expandedRoles = expandedRoles.filter((id) => id !== roleId);
    } else {
      expandedRoles = [...expandedRoles, roleId];
    }
  }

  function isRoleExpanded(roleId: number) {
    return expandedRoles.includes(roleId);
  }

  function formatDate(dateString: string | null) {
    if (!dateString) return "Present";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  }

  // Sort roles by startDate in descending order (most recent first)
  const sortedRoles = $derived(
    [...roles].sort((a, b) => {
      const dateA = a.startDate ? new Date(a.startDate).getTime() : 0;
      const dateB = b.startDate ? new Date(b.startDate).getTime() : 0;
      return dateB - dateA;
    })
  );

  function getDutiesForRole(roleId: number) {
    return duties.filter(
      (duty) => duty.roleIds && duty.roleIds.includes(roleId)
    );
  }

  function getActivitiesForDuty(dutyId: number) {
    return activities.filter((activity) => activity.dutyId === dutyId);
  }
</script>

<div class="timeline-container">
  <h2>Professional Experience</h2>

  <div class="timeline">
    {#each sortedRoles as role}
      <div class="timeline-item {isRoleExpanded(role.id) ? 'expanded' : ''}">
        <button
          class="timeline-header"
          onclick={() => toggleRole(role.id)}
          onkeydown={(e) => e.key === "Enter" && toggleRole(role.id)}
          aria-expanded={isRoleExpanded(role.id)}
          aria-controls="content-{role.id}"
        >
          <div class="role-info">
            <h3>{role.title}</h3>
            <div class="company-info">
              <span class="company">{role.company}</span>
              <span class="dates"
                >{formatDate(role.startDate)} - {formatDate(role.endDate)}</span
              >
            </div>
          </div>
          <div class="expand-icon" aria-hidden="true">
            {isRoleExpanded(role.id) ? "−" : "+"}
          </div>
        </button>

        {#if isRoleExpanded(role.id)}
          <div
            id="content-{role.id}"
            class="timeline-content"
            transition:slide={{ duration: 300 }}
          >
            <div class="role-summary">
              <p>{role.summary}</p>
            </div>

            <div class="duties-list">
              {#each getDutiesForRole(role.id) as duty}
                <div class="duty-item">
                  <h4>{duty.duties}</h4>

                  {#if getActivitiesForDuty(duty.id).length > 0}
                    <ul class="activities-list">
                      {#each getActivitiesForDuty(duty.id) as activity}
                        <li>{activity.activity}</li>
                      {/each}
                    </ul>
                  {/if}
                </div>
              {/each}
            </div>
          </div>
        {/if}
      </div>
    {/each}
  </div>
</div>

<style>
  .timeline-container {
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
  }

  h2 {
    margin-bottom: 2rem;
    font-size: 1.75rem;
    color: var(--primary-purple);
  }

  .timeline {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .timeline-item {
    background-color: #f9f9f9;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    transition: box-shadow 0.3s ease;
  }

  .timeline-item:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .timeline-item.expanded {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  }

  .timeline-header {
    width: 100%;
    padding: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    border-bottom: 1px solid transparent;
    transition: background-color 0.2s ease;
    background: none;
    border: none;
    text-align: left;
  }

  .timeline-item.expanded .timeline-header {
    border-bottom-color: #eee;
    background-color: white;
  }

  .timeline-header:hover {
    background-color: white;
  }

  .role-info h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.25rem;
    color: var(--primary-purple);
  }

  .company-info {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    font-size: 0.95rem;
  }

  .company {
    font-weight: 500;
  }

  .dates {
    color: #666;
  }

  .expand-icon {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--primary-purple);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
  }

  .timeline-content {
    padding: 1.5rem;
    background-color: white;
  }

  .role-summary {
    margin-bottom: 1.5rem;
    line-height: 1.6;
  }

  .duties-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .duty-item h4 {
    margin: 0 0 0.75rem 0;
    color: var(--accent-blue);
    font-size: 1.1rem;
  }

  .activities-list {
    margin: 0;
    padding-left: 1.5rem;
  }

  .activities-list li {
    margin-bottom: 0.5rem;
    line-height: 1.5;
  }

  .activities-list li:last-child {
    margin-bottom: 0;
  }
</style>
