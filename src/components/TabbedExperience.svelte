<script lang="ts">
  import EnhancedExperienceTimeline from './EnhancedExperienceTimeline.svelte';
  import EnhancedFilterSkills from './EnhancedFilterSkills.svelte';
  import { fade } from 'svelte/transition';
  let { roles, companies, duties, activities, skills } = $props();
  let selectedTab = $state(1);
</script>

<style>
  .tabs {
    display: flex;
    justify-content: center;
    gap: 1rem;
    /* removed bottom padding */
    border-bottom: solid 1px var(--color-primary);
  }
  .tab-button {
    background: var(--color-bg-secondary);
    border: 1px solid var(--color-text-secondary);
    border-bottom: none;
    padding: 0.75rem 1.5rem;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    cursor: pointer;
    color: var(--neutral-gray);
    /* inner shadow for inactive tabs */
    box-shadow: inset 0 -2px 4px -2px rgb(0 0 0 / 5%);
    /* removed bottom margin for inactive tabs */
    margin-bottom: 0;
    font-size: 1.1rem;
    transition: all 0.3s ease;
  }
  .tab-button.active {
    background: var(--neutral-white);
    border-color: var(--color-primary);
    color: var(--color-primary);
    font-weight: bold;
    /* taller active tab, covers border, subtle white shadow */
    margin-top: -4px;
    margin-bottom: -1px;
    box-shadow: 0 8px 1px -1px #fff;
  }
  .tab-button:hover {
    background: var(--neutral-white);
  }
  .tab-subheading {
    text-align: center;
    color: var(--color-text-secondary);
    margin: 0.5rem 0 1rem;
    font-size: 1.1rem;
  }
  .tab-content {
    position: relative;
    padding: 1rem;
    /* border removed for cleaner look */
    background: var(--neutral-white);
    min-height: 200px;
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
<p class="tab-subheading">{selectedTab === 1
  ? 'Career highlights and key roles across consulting and corporate environments'
  : 'Filter professional experience by specific skills to see relevant projects and responsibilities'
}</p>
<div class="tab-content">
  {#if selectedTab === 1}
    <div transition:fade>
      <EnhancedExperienceTimeline
        {roles}
        {companies}
        {duties}
        {activities}
      />
    </div>
  {:else}
    <div transition:fade>
      <EnhancedFilterSkills
        {skills}
        {duties}
        {activities}
      />
    </div>
  {/if}
</div>
