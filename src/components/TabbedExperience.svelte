<script lang="ts">
  import EnhancedExperienceTimeline from './EnhancedExperienceTimeline.svelte';
  import EnhancedFilterSkills from './EnhancedFilterSkills.svelte';
  let { roles, companies, duties, activities, skills } = $props();
  let selectedTab = $state(1);
</script>

<style>
  .tabs {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
  .tab-button {
    background: none;
    border: none;
    font-size: 1.1rem;
    padding: 0.5rem 1rem;
    cursor: pointer;
    color: var(--neutral-gray);
    border-bottom: 2px solid transparent;
  }
  .tab-button.active {
    color: var(--color-primary);
    border-color: var(--color-primary);
    font-weight: bold;
  }
  .tab-content {
    margin-top: 2rem;
  }
</style>

<div class="tabs">
  <button class="tab-button" class:active={selectedTab === 1} onclick={() => selectedTab = 1}>
    Professional Journey
  </button>
  <button class="tab-button" class:active={selectedTab === 2} onclick={() => selectedTab = 2}>
    Experience Explorer
  </button>
</div>

<div class="tab-content">
  {#if selectedTab === 1}
    <h2>Professional Journey</h2>
    <p>Career highlights and key roles across consulting and corporate environments</p>
    <EnhancedExperienceTimeline
      {roles}
      {companies}
      {duties}
      {activities}
    />
  {:else}
    <h2>Experience Explorer</h2>
    <p>Filter professional experience by specific skills to see relevant projects and responsibilities</p>
    <EnhancedFilterSkills
      {skills}
      {duties}
      {activities}
    />
  {/if}
</div>
