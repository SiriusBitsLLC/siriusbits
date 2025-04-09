<script lang="ts">
  import type { Skills } from '../data/experience-schema';
  
  export let skills: Skills[] = [];
</script>

<div class="skills-list">
  {#each skills as skill}
    <div class="skill-item">
      <h3>{skill.name}</h3>
      <p>{skill.description}</p>
    </div>
  {/each}
</div>

<style>
  .skills-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }
  
  .skill-item {
    padding: 1.5rem;
    background-color: #f9f9f9;
    border-radius: 8px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .skill-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
  
  h3 {
    color: var(--primary-purple);
    margin-bottom: 0.75rem;
    font-size: 1.25rem;
  }
  
  p {
    color: var(--neutral-black);
    font-size: 0.95rem;
  }
</style>
