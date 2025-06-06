<script lang="ts">
  import { get } from "svelte/store";
  import { slide, fade } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import { onMount } from "svelte";
  import type { Skills, Duties, Activities } from "../data/experience-schema";
  import AnimateOnScroll from "./AnimateOnScroll.svelte";
  // Static Lucide icon imports for categories
  import IconLayers from "~icons/lucide/layers";
  import IconDatabase from "~icons/lucide/database";
  import IconCode from "~icons/lucide/code";
  import IconUsers from "~icons/lucide/users";
  import IconMonitorSmartphone from "~icons/lucide/monitor-smartphone";
  // Map category icon names to components
  const categoryIconMap: Record<string, any> = {
    layers: IconLayers,
    database: IconDatabase,
    code: IconCode,
    users: IconUsers,
    "monitor-smartphone": IconMonitorSmartphone,
  };
  import {
    skillCategories,
    type SkillCategory,
  } from "../data/skill-categories.ts";
  import {
    skillsMatrixState,
    updateSkillsMatrixState,
  } from "../lib/stores/skillsStore.svelte.ts";

  // Export the component for compatibility with existing imports
  export const EnhancedSkillsMatrix = {};
  export { EnhancedSkillsMatrix as default };

  // Using Svelte 5 runes API for props
  type Props = {
    skills?: Skills[];
    duties?: Duties[];
    activities?: Activities[];
  };

  // Use $props() to get props and set defaults
  const { skills = [], duties = [], activities = [] }: Props = $props();

  // --- State Management ---
  // Define the type for the store state to avoid TypeScript errors
  type SkillsMatrixStateType = {
    groupedSkills: Record<string, Skills[]>;
    activeCategory: string;
    selectedSkill: Skills | null;
    relatedDuties: Duties[];
    dutyActivitiesMap: Record<number, Activities[]>;
    skillsVisible: boolean;
    dutiesVisible: boolean;
  };

  // Create a local reactive variable initialized with the store's current value
  // and keep it synchronized using an effect below.
  let currentMatrixState = $state<SkillsMatrixStateType>(
    get(skillsMatrixState)
  );

  // Use $effect to subscribe to the external store and update the local state
  $effect(() => {
    const unsubscribe = skillsMatrixState.subscribe((storeValue) => {
      // Update the local reactive state when the store changes
      currentMatrixState = storeValue;
    });

    // The return function from $effect serves as the cleanup
    return () => {
      unsubscribe();
    };
  });

  // Add initialization effect to ensure we have default values
  $effect(() => {
    // Initialize the component with default values if the store is empty or missing properties
    if (
      !currentMatrixState ||
      Object.keys(currentMatrixState).length === 0 ||
      !currentMatrixState.groupedSkills
    ) {
      updateSkillsMatrixState({
        groupedSkills: {},
        activeCategory: "strategy",
        selectedSkill: null,
        relatedDuties: [],
        dutyActivitiesMap: {},
        skillsVisible: false,
        dutiesVisible: false,
      });
    }
  });

  // Use $derived runes to reactively compute values based on the synchronized state
  let groupedSkills = $derived(currentMatrixState.groupedSkills);
  let activeCategory = $derived(currentMatrixState.activeCategory);
  let selectedSkill = $derived(currentMatrixState.selectedSkill);
  let relatedDuties = $derived(currentMatrixState.relatedDuties);
  let dutyActivitiesMap = $derived(currentMatrixState.dutyActivitiesMap);
  let skillsVisible = $derived(currentMatrixState.skillsVisible);
  let dutiesVisible = $derived(currentMatrixState.dutiesVisible);


  // Process and group skills by category
  function processSkills(): void {
    // Group skills by category
    const newGroupedSkills: Record<string, Skills[]> = {};

    // Initialize categories
    skillCategories.forEach((category: SkillCategory) => {
      newGroupedSkills[category.id] = [];
    });

    // Group skills by their category - with null checks
    if (skills && skills.length > 0) {
      skills.forEach((skill) => {
        if (skill && skill.category && newGroupedSkills[skill.category]) {
          newGroupedSkills[skill.category].push(skill);
        }
      });
    }

    // Update the state using the update function
    updateSkillsMatrixState({
      groupedSkills: newGroupedSkills,
    });
  }

  // Handle category change
  function setActiveCategory(categoryId: string): void {
    // Update state properties using the update function
    updateSkillsMatrixState({
      skillsVisible: false,
      dutiesVisible: false,
      selectedSkill: null,
    });

    // Short delay for exit animation
    setTimeout(() => {
      // Update the active category
      updateSkillsMatrixState({
        activeCategory: categoryId,
      });

      // Trigger entrance animation
      setTimeout(() => {
        updateSkillsMatrixState({
          skillsVisible: true,
        });
      }, 50);
    }, 300);
  }

  // Handle skill click
  function handleSkillClick(skill: Skills): void {
    // Toggle selection if already selected
    if (selectedSkill && selectedSkill.id === skill.id) {
      // First hide duties with animation
      updateSkillsMatrixState({
        dutiesVisible: false,
      });

      // Then clear selection after animation completes
      setTimeout(() => {
        updateSkillsMatrixState({
          selectedSkill: null,
        });
      }, 300);
      return;
    }

    // Check if duties are already visible
    const isDutiesVisible = dutiesVisible;

    // Always hide duties first with animation
    if (isDutiesVisible) {
      updateSkillsMatrixState({
        dutiesVisible: false,
      });

      // After animation completes, update selection and show new duties
      setTimeout(() => {
        // Update selected skill
        updateSkillsMatrixState({
          selectedSkill: skill,
        });

        // Find related duties
        if (skill.id) {
          // Get duties that have this skill in their relevantSkills
          const filteredDuties = duties.filter((duty) => {
            if (!duty.relevantSkills) return false;
            const skillIds = duty.relevantSkills
              .split(",")
              .map((id) => parseInt(id.trim()));
            return skillIds.includes(skill.id!);
          });

          // Map duties to their activities
          const newDutyActivitiesMap: Record<number, Activities[]> = {};
          filteredDuties.forEach((duty: Duties) => {
            newDutyActivitiesMap[duty.id] = activities.filter(
              (activity) => activity.dutyId === duty.id
            );
          });

          // Update state with new duties and activities map
          updateSkillsMatrixState({
            relatedDuties: filteredDuties,
            dutyActivitiesMap: newDutyActivitiesMap,
          });

          // Show new duties with animation
          setTimeout(() => {
            updateSkillsMatrixState({
              dutiesVisible: true,
            });
          }, 50);
        }
      }, 300);
    } else {
      // If no duties are visible, just update immediately
      updateSkillsMatrixState({
        selectedSkill: skill,
      });

      // Find related duties
      if (skill.id) {
        // Get duties that have this skill in their relevantSkills
        const filteredDuties = duties.filter((duty) => {
          if (!duty.relevantSkills) return false;
          const skillIds = duty.relevantSkills
            .split(",")
            .map((id) => parseInt(id.trim()));
          return skillIds.includes(skill.id!);
        });

        // Map duties to their activities
        const newDutyActivitiesMap: Record<number, Activities[]> = {};
        filteredDuties.forEach((duty: Duties) => {
          newDutyActivitiesMap[duty.id] = activities.filter(
            (activity) => activity.dutyId === duty.id
          );
        });

        updateSkillsMatrixState({
          relatedDuties: filteredDuties,
          dutyActivitiesMap: newDutyActivitiesMap,
        });

        // Show duties with animation delay
        setTimeout(() => {
          updateSkillsMatrixState({
            dutiesVisible: true,
          });
        }, 300);
      }
    }
  }

  // Close duties section
  function closeDuties(): void {
    updateSkillsMatrixState({
      dutiesVisible: false,
    });

    // Short delay before removing selection
    setTimeout(() => {
      updateSkillsMatrixState({
        selectedSkill: null,
      });
    }, 300);
  }

  // Initialize on mount
  onMount(() => {
    // Process skills when component mounts
    processSkills();

    // Trigger initial animation
    setTimeout(() => {
      updateSkillsMatrixState({
        skillsVisible: true,
      });
    }, 500);
  });

  // --- Example container logic ---
  let openExampleSkillId = $state<number | null>(null);
  let showExampleSkillId = $state<number | null>(null);
  let exampleTimeout: ReturnType<typeof setTimeout> | null = null;

  function handleExampleClick(skillId: number) {
    if (openExampleSkillId === skillId) {
      openExampleSkillId = null;
      showExampleSkillId = null;
      if (exampleTimeout) clearTimeout(exampleTimeout);
    } else {
      openExampleSkillId = skillId;
      if (exampleTimeout) clearTimeout(exampleTimeout);
      exampleTimeout = setTimeout(() => {
        showExampleSkillId = skillId;
      }, 350); // Match card expansion duration
    }
  }

  $effect(() => {
    // If openExampleSkillId is cleared externally, also clear showExampleSkillId
    if (openExampleSkillId === null) {
      showExampleSkillId = null;
      if (exampleTimeout) clearTimeout(exampleTimeout);
    }
  });

  // Close example and deactivate card if click is outside the Skills Matrix
  let skillsMatrixRef: HTMLDivElement | null = null;
  onMount(() => {
    function handleDocumentClick(e: MouseEvent) {
      if (!skillsMatrixRef) return;
      if (!skillsMatrixRef.contains(e.target as Node)) {
        openExampleSkillId = null;
        updateSkillsMatrixState({ selectedSkill: null });
      }
    }
    document.addEventListener('click', handleDocumentClick);

    // IntersectionObserver for scroll-out-of-view
    let observer: IntersectionObserver | null = null;
    if (skillsMatrixRef) {
      observer = new window.IntersectionObserver(
        (entries) => {
          if (entries[0] && !entries[0].isIntersecting) {
            openExampleSkillId = null;
            updateSkillsMatrixState({ selectedSkill: null });
          }
        },
        { threshold: 0 }
      );
      observer.observe(skillsMatrixRef);
    }

    return () => {
      document.removeEventListener('click', handleDocumentClick);
      if (observer && skillsMatrixRef) observer.unobserve(skillsMatrixRef);
    };
  });

</script>

<div class="enhanced-skills-matrix" bind:this={skillsMatrixRef}>
  <AnimateOnScroll animation="fade-up" duration={800} delay={200}>
    <div class="categories-nav">
      {#each skillCategories as category, i}
        {@const CategoryIcon = categoryIconMap[category.iconName]}
        <div class="animate-item" style="animation-delay: {200 + i * 100}ms">
          <button
            class="category-btn {activeCategory === category.id
              ? 'active'
              : ''}"
            onclick={() => setActiveCategory(category.id)}
            aria-pressed={activeCategory === category.id}
          >
            <span
              class="category-icon {activeCategory === category.id
                ? 'active'
                : ''}"
            >
              <CategoryIcon width="1.2em" height="1.2em" />
            </span>
            <span class="category-name">{category.name}</span>
          </button>
        </div>
      {/each}
    </div>
  </AnimateOnScroll>

  <div class="skills-container">
    <AnimateOnScroll animation="fade-up" duration={800} delay={400}>
      <div
        class="skills-grid {skillsVisible ? 'visible' : ''}"
      >
        {#if groupedSkills && activeCategory && groupedSkills[activeCategory]}
          {#each groupedSkills[activeCategory] as skill, i}
            <div
              class="animate-item {selectedSkill && selectedSkill.id === skill.id ? 'selected-parent' : ''}"
              style="animation-delay: {400 + i * 100}ms"
            >
              <div class="skill-card-wrapper">
                <div
                  class="skill-card {selectedSkill && selectedSkill.id === skill.id ? 'selected' : ''} animate-item"
                  tabindex="0"
                  role="button"
                  aria-pressed={selectedSkill && selectedSkill.id === skill.id}
                  onclick={() => {
                    handleSkillClick(skill);
                    handleExampleClick(skill.id);
                  }}
                  onkeydown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleSkillClick(skill);
                      handleExampleClick(skill.id as number);
                    }
                  }}
                >
                  <div class="skill-header">
                    <span class="skill-name">{skill.name}</span>
                  </div>
                  <div class="skill-description">{skill.description}</div>
                  <div class="proficiency-bar-container">
                    <div
                      class="proficiency-bar"
                      style="width: {skill.proficiency * 20}%"
                    ></div>
                  </div>
                  <div class="skill-proficiency-label">
                    Proficiency: {typeof skill.proficiency === 'number' ? skill.proficiency : 0}/5
                  </div>
                  {#if openExampleSkillId === skill.id && showExampleSkillId === skill.id}
                    <div class="example-container" transition:slide={{ duration: 350, easing: cubicOut }}>
                      <strong>Applied Example:</strong>
                      <div class="example-content">{skill.example}</div>
                    </div>
                  {/if}
                </div>
              </div>
            </div>
          {/each}
        {/if}
      </div>
    </AnimateOnScroll>
  </div>
</div>

{#if false}
  {#if selectedSkill && relatedDuties && relatedDuties.length > 0}
    <div class="duties-section {dutiesVisible ? 'visible' : ''}">
      <AnimateOnScroll animation="fade-up" duration={800} delay={200}>
        <div class="duties-container" data-skill={selectedSkill?.name}>
          <!-- Duties content here (deactivated as requested) -->
          <div class="duties-grid">
            {#each relatedDuties.filter(Boolean) as duty, i}
              <AnimateOnScroll
                animation="fade-up"
                duration={600}
                delay={300 + i * 100}
              >
                <div class="duty-card">
                  <div class="duty-header">
                    <h4>{duty.duties}</h4>
                  </div>

                  <p class="duty-summary">{duty.summary}</p>
                </div>
              </AnimateOnScroll>
            {/each}
          </div>
        </div>
      </AnimateOnScroll>
    </div>
  {/if}
{/if}

<style>
  .enhanced-skills-matrix {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .categories-nav {
    display: flex;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .category-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem 1.5rem;
    border-radius: 10px;
    background-color: white;
    border: 1px solid var(--neutral-light-gray);
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 500;
    color: var(--neutral-dark-gray);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem; /* Spacing between icon and name */
  }

  .category-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  }

  .category-btn.active {
    background: linear-gradient(to bottom right, white, white);
    border: 2px solid transparent;
    background-origin: border-box;
    background-clip: padding-box, border-box;
    position: relative;
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(155, 81, 224, 0.15);
  }

  .category-btn.active::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 10px;
    padding: 2px;
    background: linear-gradient(
      135deg,
      var(--color-primary),
      var(--color-accent)
    );
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }

  .category-icon {
    width: 44px; /* Adjust size as needed */
    height: 44px;
    border-radius: 50%;
    background-color: var(--neutral-light-gray); /* Inactive background */
    color: var(--color-primary); /* Inactive icon color */
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    flex-shrink: 0; /* Prevent shrinking */
  }

  .category-icon.active {
    background: linear-gradient(
      135deg,
      var(--color-primary),
      var(--color-accent)
    );
    color: white; /* Active icon color */
    box-shadow: 0 3px 6px rgba(155, 81, 224, 0.15);
  }

  .category-name {
    font-size: 1rem;
    font-weight: 600;
    transition: color 0.3s ease;
  }

  .category-btn.active .category-name {
    color: var(--color-primary);
  }

  .skills-container {
    position: relative;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  }

  .skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    align-items: stretch;
    margin-top: 1.5rem;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    width: 100%;
  }

  .skills-grid.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .skill-card {
    background-color: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    height: 100%;
    display: flex;
    flex-direction: column;
    border: 1px solid var(--neutral-light-gray);
    min-width: 280px;
    max-width: 300px;
  }

  .skill-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(155, 81, 224, 0.1);
  }

  .skill-card.selected {
    border-color: var(--color-primary);
    box-shadow: 0 15px 30px rgba(155, 81, 224, 0.15);
  }

  .skill-card-indicator {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%) scale(0);
    width: 50px;
    height: 5px;
    border-radius: 5px 5px 0 0;
    background: linear-gradient(
      90deg,
      var(--color-primary),
      var(--color-accent)
    );
    transition: all 0.3s ease;
  }

  .skill-card.selected .skill-card-indicator {
    transform: translateX(-50%) scale(1);
  }

  .skill-card::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(
      90deg,
      var(--color-primary),
      var(--color-accent)
    );
    opacity: 0.7;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }

  .skill-card:hover::before,
  .skill-card.selected::before {
    transform: scaleX(1);
  }

  .skill-name {
    font-size: 1.1rem;
    color: var(--color-primary);
    margin: 0 0 1rem 0;
    font-weight: 600;
  }

  .skill-proficiency {
    height: 5px;
    background-color: var(--neutral-light-gray);
    border-radius: 10px;
    margin-top: auto;
    margin-bottom: 0.5rem;
    overflow: hidden;
  }

  .proficiency-bar {
    height: 100%;
    border-radius: 10px;
    background: linear-gradient(
      135deg,
      var(--color-primary),
      var(--color-accent)
    );
  }

  .skill-description {
    color: var(--neutral-black);
    font-size: 0.95rem;
    line-height: 1.5;
    flex-grow: 1;
    margin: 0 0 1rem 0;
  }

  .skill-proficiency-label {
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--color-primary);
    text-align: right;
    opacity: 0.8;
  }

  /* Duties section */
  .duties-section {
    margin-top: 0.25rem;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .duties-section.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .duties-container {
    background-color: white;
    border-radius: 16px;
    padding: 2rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    position: relative;
    border: 1px solid var(--neutral-light-gray);
  }

  .close-duties-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: white;
    border: 1px solid var(--neutral-light-gray);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    cursor: pointer;
    transition: all 0.2s ease;
    opacity: 0.8;
    z-index: 5;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .close-duties-btn:hover {
    background-color: rgba(155, 81, 224, 0.1);
    opacity: 1;
  }

  .duties-container::before {
    content: attr(data-skill);
    position: absolute;
    top: -10px;
    left: 20px;
    background: white;
    padding: 0 10px;
    font-size: 0.8rem;
    color: var(--color-primary);
    font-weight: 500;
  }

  .duties-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
    align-items: stretch;
    margin-top: 1.5rem;
  }

  .duty-card {
    background: var(--neutral-white);
    border-radius: 1rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    padding: 1.5rem 1.25rem 1.25rem 1.25rem;
    transition: box-shadow 0.2s;
    position: relative;
    height: 100%; /* Stretch to fill grid cell */
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  .duty-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  }

  .duty-header {
    margin-bottom: 1rem;
  }

  .duty-header h4 {
    font-size: 1rem;
    color: var(--color-accent);
    margin: 0;
    font-weight: 600;
  }

  .duty-summary {
    color: var(--neutral-black);
    font-size: 0.95rem;
    line-height: 1.5;
    margin: 0 0 1rem 0;
    font-style: italic;
    opacity: 0.9;
  }

  @media (max-width: 992px) {
    .skills-grid {
      grid-template-columns: 1fr 1fr;
    }

    .duties-grid {
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    }

    .duties-container {
      padding: 1.25rem;
    }
  }

  @media (max-width: 768px) {
    .skills-grid {
      grid-template-columns: 1fr;
    }

    .duties-grid {
      grid-template-columns: 1fr;
    }

    .category-btn {
      padding: 0.5rem 1rem;
      font-size: 0.9rem;
    }

    .skill-card {
      padding: 1.25rem;
    }

    .skill-name {
      font-size: 1rem;
    }

    .skill-description {
      font-size: 0.9rem;
    }
  }

  .no-skills-message {
    grid-column: 1 / -1;
    text-align: center;
    padding: 2rem;
    color: var(--neutral-gray);
    font-style: italic;
  }

  /* Animation styles for animated items */
  .animate-item {
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.6s ease forwards;
  }

  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Skip first column to center under nav */
  
  /* Center cards in each cell */
  .animate-item {
    display: flex;
    justify-content: center;
  }
  .skill-card {
    max-width: 300px;
    width: 100%;
  }
.skill-card.selected {
  grid-column: span 2;
  min-width: 500px;
  z-index: 2;
  box-shadow: 0 4px 32px rgba(155, 81, 224, 0.07), 0 1.5px 4px rgba(0,0,0,0.08);
  background: #fff;
  position: relative;
}

@media (max-width: 768px) {
  .skill-card.selected {
    min-width: unset;
    width: 100%;
    grid-column: span 1;
  }
}

.example-container {
  margin-top: 1.25rem;
  background: var(--neutral-white, #fff);
  border: 1px solid var(--neutral-light-gray, #eee);
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(155,81,224,0.08);
  padding: 1.25rem 1rem;
  z-index: 10;
  position: relative;
  font-size: 1rem;
  color: var(--neutral-black, #222);
}

.example-content {
  margin-top: 0.5rem;
  font-size: 0.97rem;
  line-height: 1.6;
  color: var(--neutral-black, #222);
}

.skill-card .skill-description {
  margin-bottom: 0.75rem;
}

.skill-card.selected .skill-description {
  margin-bottom: 0.5rem;
}

/* Remove extra vertical space for selected card */
.skill-card.selected .proficiency-bar-container {
  margin-top: 0.25rem;
}

.animate-item.selected-parent {
  z-index: 20;
  position: relative;
}

</style>
