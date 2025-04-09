<script lang="ts">
  import type { Skills } from '../data/experience-schema';
  
  export let skills: Skills[] = [];
</script>

<div class="skills-matrix">
  {#each skills as skill}
    <div class="skill-tile">
      <h3>{skill.name}</h3>
      <p>{skill.description}</p>
    </div>
  {/each}
</div>

<style>
  .skills-matrix {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
  }
  
  .skill-tile {
    background-color: white;
    border: 1px solid #eee;
    border-radius: 8px;
    padding: 1.25rem;
    transition: all 0.3s ease;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  
  .skill-tile:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    border-color: var(--primary-purple);
  }
  
  h3 {
    color: var(--primary-purple);
    margin-bottom: 0.75rem;
    font-size: 1.1rem;
  }
  
  p {
    color: var(--neutral-black);
    font-size: 0.9rem;
    line-height: 1.5;
    flex-grow: 1;
  }
</style>
