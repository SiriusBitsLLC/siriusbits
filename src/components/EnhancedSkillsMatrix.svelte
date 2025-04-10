<script lang="ts">
  import { onMount } from "svelte";
  import type { Skills, Duties, Activities } from "../data/experience-schema";
  import { skillCategories, skillCategoryMap } from "../data/skill-categories";
  import { duties } from "../data/duties";
  import { activities } from "../data/activities";
  import AnimateOnScroll from "./AnimateOnScroll.svelte";
  import Icon from "./Icon.svelte";

  export let skills: Skills[] = [];

  // Group skills by category
  let groupedSkills: Record<string, Skills[]> = {};

  // Active category
  let activeCategory = "strategy";

  // Selected skill
  let selectedSkill: Skills | null = null;

  // Related duties and activities
  let relatedDuties: Duties[] = [];
  let dutyActivitiesMap: Record<number, Activities[]> = {};

  // Animation flags
  let skillsVisible = false;
  let dutiesVisible = false;

  // Process skills into groups
  function processSkills() {
    groupedSkills = {};

    // Initialize categories
    skillCategories.forEach((cat) => {
      groupedSkills[cat.id] = [];
    });

    // Group skills by category
    skills.forEach((skill) => {
      const categoryId =
        skill.category || skillCategoryMap[skill.id] || "strategy";

      groupedSkills[categoryId].push(skill);
    });
  }

  // Handle category change
  function setActiveCategory(categoryId: string): void {
    skillsVisible = false;
    dutiesVisible = false;
    selectedSkill = null;

    // Short delay for exit animation
    setTimeout(() => {
      activeCategory = categoryId;

      // Trigger entrance animation
      setTimeout(() => {
        skillsVisible = true;
      }, 50);
    }, 300);
  }

  // Handle skill click
  function handleSkillClick(skill: Skills): void {
    // Toggle selection if already selected
    if (selectedSkill && selectedSkill.id === skill.id) {
      // First hide duties with animation
      dutiesVisible = false;
      
      // Then clear selection after animation completes
      setTimeout(() => {
        selectedSkill = null;
      }, 300);
      return;
    }

    // Check if duties are already visible
    const isDutiesVisible = dutiesVisible;
    
    // Always hide duties first with animation
    if (isDutiesVisible) {
      dutiesVisible = false;
      
      // After animation completes, update selection and show new duties
      setTimeout(() => {
        // Update selected skill
        selectedSkill = skill;
        
        // Find related duties
        if (skill.id) {
          // Get duties that have this skill in their relevantSkills
          relatedDuties = duties.filter((duty) => {
            if (!duty.relevantSkills) return false;
            const skillIds = duty.relevantSkills
              .split(",")
              .map((id) => parseInt(id.trim()));
            return skillIds.includes(skill.id!);
          });

          // Map duties to their activities
          dutyActivitiesMap = {};
          relatedDuties.forEach((duty) => {
            dutyActivitiesMap[duty.id] = activities.filter(
              (activity) => activity.dutyId === duty.id
            );
          });
          
          // Show new duties with animation
          setTimeout(() => {
            dutiesVisible = true;
          }, 50);
        }
      }, 300);
    } else {
      // If no duties are visible, just update immediately
      selectedSkill = skill;
      
      // Find related duties
      if (skill.id) {
        // Get duties that have this skill in their relevantSkills
        relatedDuties = duties.filter((duty) => {
          if (!duty.relevantSkills) return false;
          const skillIds = duty.relevantSkills
            .split(",")
            .map((id) => parseInt(id.trim()));
          return skillIds.includes(skill.id!);
        });

        // Map duties to their activities
        dutyActivitiesMap = {};
        relatedDuties.forEach((duty) => {
          dutyActivitiesMap[duty.id] = activities.filter(
            (activity) => activity.dutyId === duty.id
          );
        });
        
        // Show duties with animation delay
        setTimeout(() => {
          dutiesVisible = true;
        }, 300);
      }
    }
  }
  
  // Close duties section
  function closeDuties(): void {
    dutiesVisible = false;
    
    // Short delay before removing selection
    setTimeout(() => {
      selectedSkill = null;
    }, 300);
  }

  // Initialize on mount
  onMount(() => {
    processSkills();

    // Trigger initial animation
    setTimeout(() => {
      skillsVisible = true;
    }, 500);
  });
</script>

<div class="enhanced-skills-matrix">
  <AnimateOnScroll animation="fade-up" duration={800} delay={200}>
    <div class="categories-nav">
      {#each skillCategories as category, i}
        <AnimateOnScroll
          animation="fade-up"
          duration={600}
          delay={200 + i * 100}
        >
          <button
            class="category-btn {activeCategory === category.id
              ? 'active'
              : ''}"
            on:click={() => setActiveCategory(category.id)}
          >
            <span class="category-icon">
              <Icon name={category.icon} size={24} />
            </span>
            <span class="category-name">{category.name}</span>
          </button>
        </AnimateOnScroll>
      {/each}
    </div>
  </AnimateOnScroll>

  <div class="skills-container">
    <AnimateOnScroll animation="fade-up" duration={800} delay={400}>
      <div class="skills-grid {skillsVisible ? 'visible' : ''}">
        {#if groupedSkills[activeCategory]}
          {#each groupedSkills[activeCategory] as skill, i}
            <AnimateOnScroll
              animation="fade-up"
              duration={600}
              delay={400 + i * 100}
            >
              <div
                class="skill-card {selectedSkill &&
                selectedSkill.id === skill.id
                  ? 'selected'
                  : ''}"
                on:click={() => handleSkillClick(skill)}
                on:keydown={(e) => e.key === "Enter" && handleSkillClick(skill)}
                tabindex="0"
                role="button"
                aria-pressed={selectedSkill && selectedSkill.id === skill.id
                  ? "true"
                  : "false"}
                aria-label="View related duties for {skill.name}"
              >
                <div class="skill-card-indicator"></div>
                <div class="skill-header">
                  <h3>{skill.name}</h3>
                  <div class="proficiency-meter">
                    {#each Array(5) as _, i}
                      <div
                        class="proficiency-dot {i < (skill.proficiency || 3)
                          ? 'filled'
                          : ''}"
                      ></div>
                    {/each}
                  </div>
                </div>
                <p class="skill-description">{skill.description}</p>
                <div class="skill-proficiency-label">
                  {#if skill.proficiency === 5}
                    Expert
                  {:else if skill.proficiency === 4}
                    Advanced
                  {:else if skill.proficiency === 3}
                    Intermediate
                  {:else if skill.proficiency === 2}
                    Basic
                  {:else}
                    Beginner
                  {/if}
                </div>
              </div>
            </AnimateOnScroll>
          {/each}
        {/if}
      </div>
    </AnimateOnScroll>
  </div>

  {#if selectedSkill && relatedDuties.length > 0}
    <div class="duties-section {dutiesVisible ? 'visible' : ''}">
      <AnimateOnScroll animation="fade-up" duration={800} delay={200}>
        <div
          class="duties-container"
          data-skill="Related to {selectedSkill.name}"
        >
          <button
            class="close-duties-btn"
            on:click={closeDuties}
            aria-label="Close related duties"
          >
            <span aria-hidden="true">×</span>
          </button>
          <div class="duties-grid">
            {#each relatedDuties as duty, i}
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
</div>

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
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem;
    background: white;
    border: 2px solid transparent;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    min-width: 100px;
  }

  .category-btn:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px rgba(155, 81, 224, 0.1);
  }

  .category-btn.active {
    background: linear-gradient(
      135deg,
      rgba(155, 81, 224, 0.1) 0%,
      rgba(52, 152, 219, 0.1) 100%
    );
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
    -webkit-mask-composite: xor;
    mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    mask-composite: exclude;
  }

  .category-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: #f5f5f5;
    color: var(--color-primary);
    transition: all 0.3s ease;
  }

  .category-btn.active .category-icon {
    background: linear-gradient(
      135deg,
      var(--color-primary),
      var(--color-accent)
    );
    color: white;
  }

  .category-name {
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
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1.25rem;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    justify-content: center;
    width: 100%;
  }

  /* All categories use the same grid layout regardless of item count */

  /* Set a minimum width for skill cards */
  .skill-card {
    min-width: 280px;
  }

  .skills-grid.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .skill-card {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
    cursor: pointer;
  }

  .skill-card-indicator {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%) scale(0);
    width: 8px;
    height: 8px;
    border-radius: 50%;
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
    transition: height 0.3s ease;
  }

  .skill-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(155, 81, 224, 0.1);
  }

  .skill-card.selected {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(155, 81, 224, 0.2);
    border: 1px solid rgba(155, 81, 224, 0.3);
  }

  .skill-card:hover::before {
    height: 7px;
  }

  .skill-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
  }

  .skill-card h3 {
    font-size: 1.2rem;
    color: var(--color-primary);
    margin: 0;
  }

  .proficiency-meter {
    display: flex;
    gap: 3px;
  }

  .proficiency-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #e0e0e0;
    transition: all 0.3s ease;
  }

  .proficiency-dot.filled {
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
    width: 100%;
  }

  .duties-section.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .duties-container {
    position: relative;
    background-color: rgba(155, 81, 224, 0.03);
    border-radius: 16px;
    padding: 1.25rem 1.5rem;
    border-left: 3px solid var(--color-primary);
    max-width: 1200px;
    margin: 0 auto;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  }
  
  .close-duties-btn {
    position: absolute;
    top: -10px;
    right: 15px;
    background: white;
    border: none;
    color: var(--color-primary);
    font-size: 1.25rem;
    line-height: 1;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
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
    grid-template-columns: 1fr 1fr;
    gap: 1.25rem;
    width: 100%;
    justify-content: center;
  }

  /* All categories use the same grid layout regardless of item count */

  /* Set a minimum width for duty cards */
  .duty-card {
    min-width: 280px;
  }

  .duty-card {
    background: rgba(255, 255, 255, 0.8);
    border-radius: 10px;
    padding: 1.25rem;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
    border-left: 3px solid var(--color-accent);
    height: 100%;
  }
  
  .duty-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 15px rgba(52, 152, 219, 0.1);
  }

  .duty-header {
    margin-bottom: 0.75rem;
  }

  .duty-header h4 {
    font-size: 1.1rem;
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
      grid-template-columns: 1fr 1fr;
    }
    
    .duties-container {
      padding: 1.25rem;
    }
  }
  
  @media (max-width: 768px) {
    .enhanced-skills-matrix {
      gap: 1.25rem;
    }
    
    .categories-nav {
      gap: 0.5rem;
    }

    .category-btn {
      min-width: 80px;
      padding: 0.75rem;
    }

    .category-icon {
      width: 36px;
      height: 36px;
    }

    .category-name {
      font-size: 0.9rem;
    }

    .skills-grid {
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    .duties-grid {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
    
    .skill-card,
    .duty-card {
      min-width: unset;
      width: 100%;
    }
    
    .duty-card {
      padding: 1rem;
    }
  }
  
  @media (max-width: 480px) {
    .enhanced-skills-matrix {
      gap: 1rem;
    }
    
    .skills-grid {
      grid-template-columns: 1fr;
    }
    
    .duties-container {
      padding: 1rem;
      border-radius: 12px;
    }
    
    .skill-card {
      padding: 1.25rem;
    }
  }
</style>
