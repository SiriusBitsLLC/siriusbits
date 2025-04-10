<script lang="ts">
  import { onMount } from 'svelte';
  import type { Skills, Duties, Activities } from '../data/experience-schema';
  
  // Using Svelte 5 runes API for props
  const props = $props<{
    skills?: Skills[];
    duties?: Duties[];
    activities?: Activities[];
  }>();
  
  // Access props with defaults
  const skills = $derived(props.skills ?? []);
  const duties = $derived(props.duties ?? []);
  const activities = $derived(props.activities ?? []);
  
  const selectedSkillIds = $state<number[]>([]);
  
  const filteredDuties = $derived(
    selectedSkillIds.length > 0 
      ? duties.filter((duty: Duties) => {
          if (!duty.relevantSkills) return false;
          const skillIdStrings = duty.relevantSkills.split(',');
          return selectedSkillIds.some(id => 
            skillIdStrings.includes(id.toString())
          );
        })
      : duties
  );
    
  const filteredActivities = $derived(
    selectedSkillIds.length > 0
      ? activities.filter((activity: Activities) => {
          const duty = duties.find((d: Duties) => d.id === activity.dutyId);
          if (!duty || !duty.relevantSkills) return false;
          const skillIdStrings = duty.relevantSkills.split(',');
          return selectedSkillIds.some(id => 
            skillIdStrings.includes(id.toString())
          );
        })
      : activities
  );
    
  function toggleSkill(skillId: number) {
    if (selectedSkillIds.includes(skillId)) {
      // With $state, we can directly mutate the array
      selectedSkillIds.splice(selectedSkillIds.indexOf(skillId), 1);
    } else {
      // Or we can use push to add items
      selectedSkillIds.push(skillId);
    }
  }
  
  function isSkillSelected(skillId: number) {
    return selectedSkillIds.includes(skillId);
  }
  
  // Type for filtered activities to avoid implicit any
  type FilteredActivity = Activities;
</script>

<div class="filter-skills-container">
  <div class="skills-sidebar">
    <h2>Filter by Skills</h2>
    <div class="skill-filters">
      {#each skills as skill}
        <button 
          class="skill-filter-btn {isSkillSelected(skill.id) ? 'selected' : ''}"
          onclick={() => toggleSkill(skill.id)}
        >
          {skill.name}
        </button>
      {/each}
    </div>
  </div>
  
  <div class="filtered-content">
    <h2>Experience & Activities</h2>
    {#if selectedSkillIds.length === 0}
      <p class="instruction">Select one or more skills to filter experience</p>
    {:else if filteredDuties.length === 0}
      <p class="no-results">No experience found for the selected skills</p>
    {:else}
      {#each filteredDuties as duty}
        <div class="duty-item">
          <h3>{duty.duties}</h3>
          <div class="activities">
            {#each filteredActivities.filter((a: FilteredActivity) => a.dutyId === duty.id) as activity}
              <div class="activity-item">
                <p>{activity.activity}</p>
              </div>
            {/each}
          </div>
        </div>
      {/each}
    {/if}
  </div>
</div>

<style>
  .filter-skills-container {
    display: grid;
    grid-template-columns: 250px 1fr;
    gap: 2rem;
  }
  
  .skills-sidebar {
    background-color: #f9f9f9;
    padding: 1.5rem;
    border-radius: 8px;
    height: fit-content;
  }
  
  .skills-sidebar h2 {
    margin-bottom: 1rem;
    font-size: 1.25rem;
    color: var(--primary-purple);
  }
  
  .skill-filters {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .skill-filter-btn {
    padding: 0.5rem 1rem;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    text-align: left;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .skill-filter-btn:hover {
    border-color: var(--primary-purple);
  }
  
  .skill-filter-btn.selected {
    background-color: var(--primary-purple);
    color: white;
    border-color: var(--primary-purple);
  }
  
  .filtered-content {
    padding: 1.5rem;
    background-color: #f9f9f9;
    border-radius: 8px;
  }
  
  .filtered-content h2 {
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
    color: var(--primary-purple);
  }
  
  .instruction, .no-results {
    text-align: center;
    padding: 2rem;
    color: #666;
    font-style: italic;
  }
  
  .duty-item {
    margin-bottom: 2rem;
    padding: 1.5rem;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }
  
  .duty-item h3 {
    margin-bottom: 1rem;
    color: var(--neutral-black);
  }
  
  .activities {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .activity-item {
    padding: 0.75rem;
    background-color: #f3f3f3;
    border-radius: 4px;
  }
  
  .activity-item p {
    margin: 0;
  }
  
  @media (max-width: 768px) {
    .filter-skills-container {
      grid-template-columns: 1fr;
    }
  }
</style>
