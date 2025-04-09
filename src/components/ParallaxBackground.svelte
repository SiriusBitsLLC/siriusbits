<script lang="ts">
  import { onMount } from 'svelte';
  
  export let speed = 0.2; // Parallax speed factor (0-1)
  export let direction = 'vertical'; // vertical or horizontal
  export let reverse = false; // reverse the direction
  export let maxOffset = 100; // maximum offset in pixels
  
  let container: HTMLElement;
  let initialY = 0;
  let initialX = 0;
  
  onMount(() => {
    if (!container) return;
    
    // Store initial position
    const rect = container.getBoundingClientRect();
    initialY = rect.top + window.scrollY;
    initialX = rect.left + window.scrollX;
    
    // Set up scroll handler
    const handleScroll = () => {
      if (!container) return;
      
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Calculate if element is in viewport
      const rect = container.getBoundingClientRect();
      const isInViewport = 
        rect.bottom > 0 &&
        rect.top < windowHeight;
      
      if (isInViewport) {
        // Calculate parallax offset
        const relativeScroll = scrollPosition - initialY + windowHeight;
        const factor = reverse ? -speed : speed;
        
        let offset = 0;
        if (direction === 'vertical') {
          offset = Math.min(Math.max(relativeScroll * factor, -maxOffset), maxOffset);
          container.style.transform = `translateY(${offset}px)`;
        } else {
          // For horizontal parallax, use scroll position directly
          offset = Math.min(Math.max(scrollPosition * factor, -maxOffset), maxOffset);
          container.style.transform = `translateX(${offset}px)`;
        }
      }
    };
    
    // Initial position update
    handleScroll();
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });
</script>

<div bind:this={container} class="parallax-container">
  <slot></slot>
</div>

<style>
  .parallax-container {
    will-change: transform;
    overflow: hidden;
  }
</style>
