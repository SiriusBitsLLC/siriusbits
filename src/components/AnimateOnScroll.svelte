<script lang="ts">
  import { onMount } from 'svelte';
  
  export let animation = 'fade-up'; // fade-up, fade-down, fade-left, fade-right, zoom-in, zoom-out
  export let delay = 0; // delay in ms
  export let duration = 800; // duration in ms
  export let threshold = 0.2; // intersection threshold (0-1)
  export let once = true; // only animate once
  export let stagger = 0; // stagger delay for children in ms
  export let rootMargin = '0px'; // root margin for intersection observer
  
  let element: HTMLElement;
  let visible = false;
  let children: HTMLElement[] = [];
  
  // Apply initial styles
  function applyInitialStyles() {
    if (!element) return;
    
    // Set initial styles based on animation type
    element.style.opacity = '0';
    element.style.transition = `transform ${duration}ms cubic-bezier(0.175, 0.885, 0.32, 1.275) ${delay}ms, opacity ${duration}ms ease ${delay}ms`;
    
    switch (animation) {
      case 'fade-up':
        element.style.transform = 'translateY(40px)';
        break;
      case 'fade-down':
        element.style.transform = 'translateY(-40px)';
        break;
      case 'fade-left':
        element.style.transform = 'translateX(40px)';
        break;
      case 'fade-right':
        element.style.transform = 'translateX(-40px)';
        break;
      case 'zoom-in':
        element.style.transform = 'scale(0.9)';
        break;
      case 'zoom-out':
        element.style.transform = 'scale(1.1)';
        break;
      default:
        element.style.transform = 'translateY(20px)';
    }
    
    // If stagger is set, prepare children
    if (stagger > 0) {
      children = Array.from(element.children) as HTMLElement[];
      
      children.forEach((child, index) => {
        child.style.opacity = '0';
        child.style.transition = `transform ${duration}ms cubic-bezier(0.175, 0.885, 0.32, 1.275) ${delay + (index * stagger)}ms, opacity ${duration}ms ease ${delay + (index * stagger)}ms`;
        
        switch (animation) {
          case 'fade-up':
            child.style.transform = 'translateY(40px)';
            break;
          case 'fade-down':
            child.style.transform = 'translateY(-40px)';
            break;
          case 'fade-left':
            child.style.transform = 'translateX(40px)';
            break;
          case 'fade-right':
            child.style.transform = 'translateX(-40px)';
            break;
          case 'zoom-in':
            child.style.transform = 'scale(0.9)';
            break;
          case 'zoom-out':
            child.style.transform = 'scale(1.1)';
            break;
          default:
            child.style.transform = 'translateY(20px)';
        }
      });
    }
  }
  
  // Show the element with animation
  function show() {
    if (!element) return;
    
    visible = true;
    element.style.opacity = '1';
    element.style.transform = 'translate(0) scale(1)';
    
    // Animate children if stagger is set
    if (stagger > 0 && children.length > 0) {
      children.forEach((child) => {
        child.style.opacity = '1';
        child.style.transform = 'translate(0) scale(1)';
      });
    }
  }
  
  // Hide the element
  function hide() {
    if (!element || once) return;
    
    visible = false;
    applyInitialStyles();
  }
  
  onMount(() => {
    if (!element) return;
    
    // Apply initial styles
    applyInitialStyles();
    
    // Set up intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            show();
            if (once) observer.disconnect();
          } else if (!once) {
            hide();
          }
        });
      },
      { threshold, rootMargin }
    );
    
    // Start observing
    observer.observe(element);
    
    // Cleanup
    return () => {
      observer.disconnect();
    };
  });
</script>

<div bind:this={element} class="animate-on-scroll {visible ? 'visible' : ''}">
  <slot></slot>
</div>

<style>
  .animate-on-scroll {
    will-change: transform, opacity;
  }
  
  .animate-on-scroll.visible {
    will-change: auto;
  }
</style>
