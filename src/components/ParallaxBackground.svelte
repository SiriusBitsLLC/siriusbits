<script lang="ts">
  import { onMount } from 'svelte';
  import type { Snippet } from 'svelte';
  
  // Using Svelte 5 runes API for props
  const props = $props<{
    speed?: number; // Parallax speed factor (0-1)
    direction?: 'vertical' | 'horizontal'; // vertical or horizontal
    reverse?: boolean; // reverse the direction
    maxOffset?: number; // maximum offset in pixels
    children?: Snippet; // Content to render
  }>();
  
  // Get props with defaults using local derived variables
  let speed = $derived(props.speed ?? 0.2);
  let direction = $derived(props.direction ?? 'vertical');
  let reverse = $derived(props.reverse ?? false);
  let maxOffset = $derived(props.maxOffset ?? 100);
  
  // Helper function to render content
  function renderContent() {
    // If children prop is provided, use it, otherwise return an empty function
    // This allows both slot-based and snippet-based usage
    return props.children ? props.children : () => '';
  }
  
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
  {@render renderContent()}
</div>

<style>
  .parallax-container {
    will-change: transform;
    overflow: hidden;
  }
</style>
