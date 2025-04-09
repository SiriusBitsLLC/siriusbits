<script lang="ts">
  import { onMount } from 'svelte';
  import type { Skills } from '../data/experience-schema';
  import AnimateOnScroll from './AnimateOnScroll.svelte';
  import Icon from './Icon.svelte';
  
  export let skills: Skills[] = [];
  
  // Group skills by categories
  const categories = [
    { id: 'strategy', name: 'Strategy', icon: 'layers' },
    { id: 'data', name: 'Data', icon: 'database' },
    { id: 'tech', name: 'Technology', icon: 'code' },
    { id: 'leadership', name: 'Leadership', icon: 'users' }
  ];
  
  // Assign categories to skills
  const skillCategories = {
    1: 'strategy', // Global Business Strategy
    2: 'data',     // Data Architecture
    3: 'data',     // Analytics & Insights
    4: 'strategy', // Project Management
    5: 'strategy', // Digital Transformation
    6: 'data',     // Data Engineering
    7: 'tech',     // Technology Strategy
    8: 'tech',     // Enterprise Architecture
    9: 'leadership' // Leadership & Talent Development
  };
  
  // Assign proficiency levels to skills (1-5)
  const skillProficiency = {
    1: 5, // Global Business Strategy
    2: 5, // Data Architecture
    3: 4, // Analytics & Insights
    4: 5, // Project Management
    5: 4, // Digital Transformation
    6: 4, // Data Engineering
    7: 5, // Technology Strategy
    8: 4, // Enterprise Architecture
    9: 5  // Leadership & Talent Development
  };
  
  // Group skills by category
  let groupedSkills = {};
  
  // Active category
  let activeCategory = 'strategy';
  
  // Animation flags
  let skillsVisible = false;
  
  // Process skills into groups
  function processSkills() {
    groupedSkills = {};
    
    // Initialize categories
    categories.forEach(cat => {
      groupedSkills[cat.id] = [];
    });
    
    // Group skills by category
    skills.forEach(skill => {
      const categoryId = skillCategories[skill.id] || 'strategy';
      const proficiency = skillProficiency[skill.id] || 3;
      
      groupedSkills[categoryId].push({
        ...skill,
        proficiency
      });
    });
  }
  
  // Handle category change
  function setActiveCategory(categoryId) {
    skillsVisible = false;
    
    // Short delay for exit animation
    setTimeout(() => {
      activeCategory = categoryId;
      
      // Trigger entrance animation
      setTimeout(() => {
        skillsVisible = true;
      }, 50);
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
      {#each categories as category, i}
        <AnimateOnScroll animation="fade-up" duration={600} delay={200 + (i * 100)}>
          <button 
            class="category-btn {activeCategory === category.id ? 'active' : ''}"
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
            <AnimateOnScroll animation="fade-up" duration={600} delay={400 + (i * 100)}>
              <div class="skill-card">
                <div class="skill-header">
                  <h3>{skill.name}</h3>
                  <div class="proficiency-meter">
                    {#each Array(5) as _, i}
                      <div class="proficiency-dot {i < skill.proficiency ? 'filled' : ''}"></div>
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
</div>

<style>
  .enhanced-skills-matrix {
    display: flex;
    flex-direction: column;
    gap: 2rem;
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
    background: linear-gradient(135deg, rgba(155, 81, 224, 0.1) 0%, rgba(52, 152, 219, 0.1) 100%);
    border: 2px solid transparent;
    background-origin: border-box;
    background-clip: padding-box, border-box;
    position: relative;
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(155, 81, 224, 0.15);
  }
  
  .category-btn.active::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 10px;
    padding: 2px;
    background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
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
    background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
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
    min-height: 400px;
  }
  
  .skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
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
  }
  
  .skill-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
    opacity: 0.7;
    transition: height 0.3s ease;
  }
  
  .skill-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(155, 81, 224, 0.1);
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
    background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
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
  
  @media (max-width: 768px) {
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
    }
  }
</style>
