<script lang="ts">
  import { onMount } from 'svelte';
  import type { Skills, Duties, Activities } from '../data/experience-schema';
  
  export let skills: Skills[] = [];
  export let duties: Duties[] = [];
  export let activities: Activities[] = [];
  
  let selectedSkillIds: number[] = [];
  let isFilterVisible = false;
  let resultsVisible = false;
  
  // Filtered data based on selected skills
  $: filteredDuties = selectedSkillIds.length > 0 
    ? duties.filter(duty => {
        if (!duty.relevantSkills) return false;
        const skillIdStrings = duty.relevantSkills.split(',');
        return selectedSkillIds.some(id => 
          skillIdStrings.includes(id.toString())
        );
      })
    : duties;
    
  $: filteredActivities = selectedSkillIds.length > 0
    ? activities.filter(activity => {
        const duty = duties.find(d => d.id === activity.dutyId);
        if (!duty || !duty.relevantSkills) return false;
        const skillIdStrings = duty.relevantSkills.split(',');
        return selectedSkillIds.some(id => 
          skillIdStrings.includes(id.toString())
        );
      })
    : activities;
  
  // Toggle skill selection
  function toggleSkill(skillId: number) {
    // Animate out results before changing
    resultsVisible = false;
    
    // Short delay for exit animation
    setTimeout(() => {
      if (selectedSkillIds.includes(skillId)) {
        selectedSkillIds = selectedSkillIds.filter(id => id !== skillId);
      } else {
        selectedSkillIds = [...selectedSkillIds, skillId];
      }
      
      // Trigger entrance animation for new results
      setTimeout(() => {
        resultsVisible = true;
      }, 50);
    }, 300);
  }
  
  // Check if skill is selected
  function isSkillSelected(skillId: number) {
    return selectedSkillIds.includes(skillId);
  }
  
  // Clear all selected skills
  function clearFilters() {
    // Animate out results before clearing
    resultsVisible = false;
    
    // Short delay for exit animation
    setTimeout(() => {
      selectedSkillIds = [];
      
      // Trigger entrance animation for new results
      setTimeout(() => {
        resultsVisible = true;
      }, 50);
    }, 300);
  }
  
  // Toggle filter visibility on mobile
  function toggleFilterVisibility() {
    isFilterVisible = !isFilterVisible;
  }
  
  // Initialize animations on mount
  onMount(() => {
    // Trigger initial animation
    setTimeout(() => {
      resultsVisible = true;
    }, 500);
  });
</script>

<div class="enhanced-filter-skills">
  <div class="filter-header">
    <h2>Filter Experience by Skills</h2>
    <button class="mobile-filter-toggle" on:click={toggleFilterVisibility}>
      <span>Filter</span>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  </div>
  
  <div class="filter-skills-container">
    <div class="skills-sidebar {isFilterVisible ? 'visible' : ''}">
      <div class="sidebar-header">
        <h3>Skills</h3>
        {#if selectedSkillIds.length > 0}
          <button class="clear-filters" on:click={clearFilters}>
            Clear All
          </button>
        {/if}
      </div>
      
      <div class="skill-filters">
        {#each skills as skill}
          <button 
            class="skill-filter-btn {isSkillSelected(skill.id) ? 'selected' : ''}"
            on:click={() => toggleSkill(skill.id)}
          >
            <span class="skill-name">{skill.name}</span>
            <span class="skill-check">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
          </button>
        {/each}
      </div>
      
      <div class="close-filter-mobile">
        <button on:click={toggleFilterVisibility}>
          <span>Close Filters</span>
        </button>
      </div>
    </div>
    
    <div class="filtered-content">
      <div class="results-header">
        <h3>
          {#if selectedSkillIds.length === 0}
            All Experience
          {:else}
            Filtered Experience ({filteredDuties.length} results)
          {/if}
        </h3>
      </div>
      
      <div class="results-container {resultsVisible ? 'visible' : ''}">
        {#if selectedSkillIds.length === 0}
          <div class="instruction-card">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12 16v-4M12 8h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <p>Select one or more skills from the sidebar to filter experience</p>
          </div>
        {:else if filteredDuties.length === 0}
          <div class="no-results-card">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 3H3v7M21 14v7h-7M3.51 9A9 9 0 0 0 5.64 19M18.36 5a9 9 0 0 1 2.13 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <p>No experience found matching the selected skills</p>
            <button class="try-again-btn" on:click={clearFilters}>
              Clear Filters & Try Again
            </button>
          </div>
        {:else}
          {#each filteredDuties as duty, index}
            <div 
              class="duty-card" 
              style="--delay: {index * 0.1}s"
            >
              <h4>{duty.duties}</h4>
              <div class="activities-list">
                {#each filteredActivities.filter(a => a.dutyId === duty.id) as activity}
                  <div class="activity-item">
                    <div class="activity-bullet"></div>
                    <p>{activity.activity}</p>
                  </div>
                {/each}
              </div>
              
              <div class="related-skills">
                <div class="related-skills-label">Related Skills:</div>
                <div class="skill-tags">
                  {#if duty.relevantSkills}
                    {#each duty.relevantSkills.split(',') as skillId}
                      {@const skill = skills.find(s => s.id === parseInt(skillId))}
                      {#if skill}
                        <div class="skill-tag">{skill.name}</div>
                      {/if}
                    {/each}
                  {/if}
                </div>
              </div>
            </div>
          {/each}
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
  .enhanced-filter-skills {
    margin: 2rem 0;
  }
  
  .filter-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }
  
  .filter-header h2 {
    font-size: 1.75rem;
    color: var(--color-primary);
    margin: 0;
  }
  
  .mobile-filter-toggle {
    display: none;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
    color: white;
    border: none;
    border-radius: 25px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .filter-skills-container {
    display: grid;
    grid-template-columns: 280px 1fr;
    gap: 2rem;
  }
  
  .skills-sidebar {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    height: fit-content;
    position: sticky;
    top: 100px;
  }
  
  .sidebar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }
  
  .sidebar-header h3 {
    font-size: 1.2rem;
    color: var(--color-primary);
    margin: 0;
  }
  
  .clear-filters {
    font-size: 0.85rem;
    color: #666;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    transition: all 0.2s ease;
  }
  
  .clear-filters:hover {
    background-color: rgba(0, 0, 0, 0.05);
    color: var(--color-primary);
  }
  
  .skill-filters {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .skill-filter-btn {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1rem;
    background-color: #f9f9f9;
    border: 1px solid transparent;
    border-radius: 8px;
    text-align: left;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .skill-filter-btn:hover {
    background-color: #f0f0f0;
    transform: translateX(3px);
  }
  
  .skill-filter-btn.selected {
    background: linear-gradient(135deg, rgba(155, 81, 224, 0.1) 0%, rgba(52, 152, 219, 0.1) 100%);
    border: 1px solid transparent;
    background-origin: border-box;
    background-clip: padding-box, border-box;
    position: relative;
    transform: translateX(5px);
  }
  
  .skill-filter-btn.selected::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 7px;
    padding: 1px;
    background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: exclude;
  }
  
  .skill-name {
    font-weight: 500;
    transition: color 0.2s ease;
  }
  
  .skill-filter-btn.selected .skill-name {
    color: var(--color-primary);
    font-weight: 600;
  }
  
  .skill-check {
    opacity: 0;
    transition: all 0.2s ease;
    color: var(--color-primary);
  }
  
  .skill-filter-btn.selected .skill-check {
    opacity: 1;
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
    font-weight: 500;
    cursor: pointer;
  }
  
  .filtered-content {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .results-header h3 {
    font-size: 1.2rem;
    color: var(--color-primary);
    margin: 0;
  }
  
  .results-container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
  
  .results-container.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .instruction-card, .no-results-card {
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
  
  .instruction-card svg, .no-results-card svg {
    color: var(--color-primary);
    opacity: 0.7;
  }
  
  .try-again-btn {
    margin-top: 1rem;
    padding: 0.5rem 1.5rem;
    background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
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
  
  .activities-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
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
    background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
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
    background: linear-gradient(135deg, rgba(155, 81, 224, 0.1) 0%, rgba(52, 152, 219, 0.1) 100%);
    color: var(--color-primary);
    border-radius: 20px;
    font-weight: 500;
  }
  
  @media (max-width: 768px) {
    .filter-header h2 {
      font-size: 1.5rem;
    }
    
    .mobile-filter-toggle {
      display: flex;
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
      z-index: 100;
      border-radius: 0;
      transform: translateX(-100%);
      transition: transform 0.3s ease;
      overflow-y: auto;
    }
    
    .skills-sidebar.visible {
      transform: translateX(0);
    }
    
    .close-filter-mobile {
      display: block;
    }
  }
</style>
