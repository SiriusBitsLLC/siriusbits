<script lang="ts">
  import { onMount } from 'svelte';
  
  // Export the component for compatibility with existing imports
  export const AnimateOnScroll = {};
  export { AnimateOnScroll as default };
  
  // Note: We're using a simplified approach for Svelte 5 compatibility
  
  // Using Svelte 5 runes API for props
  const props = $props<{
    animation?: string; // fade-up, fade-down, fade-left, fade-right, zoom-in, zoom-out
    delay?: number; // delay in ms
    duration?: number; // duration in ms
    threshold?: number; // intersection threshold (0-1)
    once?: boolean; // only animate once
    stagger?: number; // stagger delay for children in ms
    rootMargin?: string; // root margin for intersection observer
    children?: any; // Destructure children for Svelte 5 content rendering
  }>();
  
  // During the transition to Svelte 5, we're using a simplified approach
  // that works reliably with nested components
  // This approach prioritizes runtime stability over linting warnings
  
  // Access props with defaults
  const animation = $derived(props.animation ?? 'fade-up');
  const delay = $derived(props.delay ?? 0);
  const duration = $derived(props.duration ?? 800);
  const threshold = $derived(props.threshold ?? 0.2);
  const once = $derived(props.once ?? true);
  const children = $derived(props.children);
  const stagger = $derived(props.stagger ?? 0);
  const rootMargin = $derived(props.rootMargin ?? '0px');
  
  // State using individual state variables
  let visible = $state(false);
  let element = $state<HTMLElement | null>(null);
  let animationChildren = $state<HTMLElement[]>([]);
  
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
      // Update children array
      if (element) {
        animationChildren = Array.from(element.children) as HTMLElement[];
      }
      
      animationChildren.forEach((child, index) => {
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
    
    // Update state value
    visible = true;
    
    element.style.opacity = '1';
    element.style.transform = 'translate(0) scale(1)';
    
    // Animate children if stagger is set
    if (stagger > 0 && animationChildren.length > 0) {
      animationChildren.forEach((child) => {
        child.style.opacity = '1';
        child.style.transform = 'translate(0) scale(1)';
      });
    }
  }
  
  // Hide the element
  function hide() {
    if (!element || once) return;
    
    // Update state value
    visible = false;
    applyInitialStyles();
  }
  
  function handleElementRef(node: HTMLElement) {
    element = node;
    return {
      destroy() {
        element = null;
      }
    };
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

<div use:handleElementRef class="animate-on-scroll {visible ? 'visible' : ''}">
  {@render children?.()}
</div>

<style>
  .animate-on-scroll {
    will-change: transform, opacity;
  }
  
  .animate-on-scroll.visible {
    will-change: auto;
  }
</style>
