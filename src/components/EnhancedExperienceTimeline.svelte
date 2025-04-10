<script lang="ts">
  import { onMount } from 'svelte';
  import type { Roles, Companies, Duties, Activities } from '../data/experience-schema';
  import AnimateOnScroll from './AnimateOnScroll.svelte';
  import ParallaxBackground from './ParallaxBackground.svelte';
  import Icon from './Icon.svelte';
  
  // Export the component for compatibility with existing imports
  export const EnhancedExperienceTimeline = {};
  export { EnhancedExperienceTimeline as default };

  // Using Svelte 5 runes API for props
  const props = $props<{
    roles?: Roles[];
    companies?: Companies[];
    duties?: Duties[];
    activities?: Activities[];
  }>();
  
  // Set default values
  props.roles ??= [];
  props.companies ??= [];
  props.duties ??= [];
  props.activities ??= [];
  
  // Import the shared state from the store
  import { timelineState, updateTimelineState } from '../lib/stores/skillsStore.svelte.ts';
  
  // Format date to display month and year
  function formatDate(dateString: string | null): string {
    if (!dateString) return 'Present';
    
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' }).format(date);
  }
  
  // Calculate duration between two dates in years and months
  function calculateDuration(startDate: string | null, endDate: string | null): string {
    if (!startDate) return '';
    
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    
    const yearDiff = end.getFullYear() - start.getFullYear();
    const monthDiff = end.getMonth() - start.getMonth();
    
    let totalMonths = (yearDiff * 12) + monthDiff;
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;
    
    let result = '';
    if (years > 0) {
      result += `${years} year${years > 1 ? 's' : ''}`;
    }
    
    if (months > 0) {
      result += result ? ` ${months} month${months > 1 ? 's' : ''}` : `${months} month${months > 1 ? 's' : ''}`;
    }
    
    return result;
  }
  
  // Get company details by ID
  function getCompany(companyId: number): Companies {
    return props.companies.find((company: Companies) => company.id === companyId) || {} as Companies;
  }
  
  // Get duties for a role
  function getDutiesForRole(roleId: number): Duties[] {
    return props.duties.filter((duty: Duties) => duty.roleId === roleId);
  }
  
  // Get activities for a duty
  function getActivitiesForDuty(dutyId: number): Activities[] {
    return props.activities.filter((activity: Activities) => activity.dutyId === dutyId);
  }
  
  // Create a local variable to store the current state
  let currentTimelineState: {
    timelineVisible: boolean;
    expandedRoles: number[];
    viewMode: 'condensed' | 'expanded';
  };
  
  // Subscribe to the store to keep the local state updated
  const unsubscribe = timelineState.subscribe((value: {
    timelineVisible: boolean;
    expandedRoles: number[];
    viewMode: 'condensed' | 'expanded';
  }) => {
    currentTimelineState = value;
  });
  
  // Clean up subscription when component is destroyed
  onMount(() => {
    return () => {
      unsubscribe();
    };
  });
  
  // Toggle expanded state for a role
  function toggleRoleExpanded(roleId: number): void {
    if (currentTimelineState.expandedRoles.includes(roleId)) {
      updateTimelineState({
        expandedRoles: currentTimelineState.expandedRoles.filter((id: number) => id !== roleId)
      });
    } else {
      updateTimelineState({
        expandedRoles: [...currentTimelineState.expandedRoles, roleId]
      });
    }
  }
  
  // Expand all roles
  function expandAllRoles(): void {
    updateTimelineState({
      viewMode: 'expanded',
      expandedRoles: props.roles.map((role: Roles) => role.id)
    });
  }
  
  // Collapse all roles
  function collapseAllRoles(): void {
    updateTimelineState({
      viewMode: 'condensed',
      expandedRoles: []
    });
  }
  
  // Initialize animations on mount
  onMount(() => {
    // Set up intersection observer for animation
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          updateTimelineState({ timelineVisible: true });
          observer.disconnect();
        }
      });
    }, { threshold: 0.1 });
    
    // Observe the timeline container
    const timelineEl = document.querySelector('.experience-timeline');
    if (timelineEl) {
      observer.observe(timelineEl);
    }
  });
</script>

<div class="enhanced-experience-timeline">
  <ParallaxBackground speed={0.05} direction="vertical" maxOffset={30}>
    <div class="timeline-background-shapes">
      <div class="bg-shape shape-1"></div>
      <div class="bg-shape shape-2"></div>
      <div class="bg-shape shape-3"></div>
    </div>
  </ParallaxBackground>
  
  <AnimateOnScroll animation="fade-up" duration={800} delay={200}>
    <div class="timeline-header">
      <h2>Professional Journey</h2>
      <div class="view-mode-controls">
        <button 
          class="view-mode-btn {$timelineState.viewMode === 'condensed' ? 'active' : ''}" 
          onclick={collapseAllRoles}
          aria-pressed={$timelineState.viewMode === 'condensed'}
        >
          Condensed
        </button>
        <button 
          class="view-mode-btn {$timelineState.viewMode === 'expanded' ? 'active' : ''}" 
          onclick={expandAllRoles}
          aria-pressed={$timelineState.viewMode === 'expanded'}
        >
          Expanded
        </button>
      </div>
      <div class="timeline-legend">
        <div class="legend-item">
          <div class="legend-dot consulting"></div>
          <span>Consulting</span>
        </div>
        <div class="legend-item">
          <div class="legend-dot corporate"></div>
          <span>Corporate</span>
        </div>
      </div>
    </div>
  </AnimateOnScroll>
  
  <div class="experience-timeline {$timelineState.timelineVisible ? 'visible' : ''}">
    <div class="timeline-line"></div>
    
    {#each props.roles as role, index}
      {@const company = getCompany(role.companyId)}
      <AnimateOnScroll animation="fade-left" duration={800} delay={300 + (index * 150)}>
        <div class="timeline-item">
          <div class="timeline-dot {company.companyType === 'Consulting' ? 'consulting' : 'corporate'}"></div>
          
          <div class="timeline-content">
            <div class="timeline-date">
              <span>{formatDate(role.startDate)} - {formatDate(role.endDate)}</span>
              <span class="duration">{calculateDuration(role.startDate, role.endDate)}</span>
            </div>
            
            <div class="timeline-card" onclick={() => toggleRoleExpanded(role.id)} onkeydown={(e) => e.key === 'Enter' && toggleRoleExpanded(role.id)} tabindex="0" role="button" aria-expanded={$timelineState.expandedRoles.includes(role.id)}>
              <div class="timeline-card-content">
                <div class="timeline-card-left">
                  <h3 class="timeline-title">{role.title}</h3>
                  <p class="timeline-summary">{role.summary}</p>
                </div>
                
                <div class="timeline-card-right">
                  <div class="company-badge {company.companyType === 'Consulting' ? 'consulting' : 'corporate'}">
                    {company.company}
                  </div>
                  <div class="company-type">{company.companyType}</div>
                  <div class="timeline-location">
                    <Icon name="map-pin" size={16} />
                    <span>{company.location}</span>
                  </div>
                </div>
              </div>
              
              <div class="timeline-details" class:expanded={$timelineState.expandedRoles.includes(role.id)}>
                <div class="timeline-details-content">
                  {#each getDutiesForRole(role.id) as duty}
                    <div class="duty-section">
                      <h4 class="duty-title">{duty.duties}</h4>
                      <ul class="activities-list">
                        {#each getActivitiesForDuty(duty.id) as activity}
                          <li>{activity.activity}</li>
                        {/each}
                      </ul>
                    </div>
                  {/each}
                </div>
              </div>
              
              <div class="timeline-card-footer">
                <div class="details-indicator">
                  <span>{$timelineState.expandedRoles.includes(role.id) ? 'Hide Details' : 'View Details'}</span>
                  {#if $timelineState.expandedRoles.includes(role.id)}
                    <Icon name="arrow-down" size={16} />
                  {:else}
                    <Icon name="arrow-right" size={16} />
                  {/if}
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimateOnScroll>
    {/each}
  </div>
</div>

<style>
  .enhanced-experience-timeline {
    padding: 2rem 0;
    position: relative;
    overflow: hidden;
  }
  
  .timeline-background-shapes {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0.5;
  }
  
  .bg-shape {
    position: absolute;
    border-radius: 50%;
    filter: blur(50px);
  }
  
  .shape-1 {
    top: 10%;
    right: -5%;
    width: 300px;
    height: 300px;
    background: linear-gradient(135deg, rgba(155, 81, 224, 0.15), rgba(155, 81, 224, 0.05));
  }
  
  .shape-2 {
    bottom: 20%;
    left: -10%;
    width: 400px;
    height: 400px;
    background: linear-gradient(135deg, rgba(52, 152, 219, 0.1), rgba(52, 152, 219, 0.03));
  }
  
  .shape-3 {
    top: 40%;
    right: 20%;
    width: 200px;
    height: 200px;
    background: linear-gradient(135deg, rgba(46, 204, 113, 0.1), rgba(46, 204, 113, 0.03));
  }
  
  .timeline-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    flex-wrap: wrap;
    gap: 1rem;
  }
  
  .view-mode-controls {
    display: flex;
    align-items: center;
    margin: 0 auto;
  }
  
  .view-mode-btn {
    background-color: white;
    border: 1px solid var(--color-primary);
    color: var(--color-primary);
    font-weight: 600;
    padding: 0.5rem 1rem;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .view-mode-btn:first-child {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    border-right: none;
  }
  
  .view-mode-btn:last-child {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
  
  .view-mode-btn.active {
    background-color: var(--color-primary);
    color: white;
  }
  
  .view-mode-btn:hover:not(.active) {
    background-color: rgba(155, 81, 224, 0.1);
  }
  
  .timeline-header h2 {
    font-size: 1.75rem;
    color: var(--color-primary);
    margin: 0;
  }
  
  .timeline-legend {
    display: flex;
    gap: 1.5rem;
  }
  
  .legend-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .legend-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }
  
  .legend-dot.consulting {
    background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  }
  
  .legend-dot.corporate {
    background: linear-gradient(135deg, #3498db, #2ecc71);
  }
  
  .experience-timeline {
    position: relative;
    padding-left: 2rem;
    padding-right: 1rem;
    max-width: 100%;
  }
  
  .timeline-line {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 8px;
    width: 2px;
    background: linear-gradient(to bottom, 
      rgba(155, 81, 224, 0.5) 0%, 
      rgba(52, 152, 219, 0.5) 100%);
    transform: scaleY(0);
    transform-origin: top;
    transition: transform 1s ease;
  }
  
  .experience-timeline.visible .timeline-line {
    transform: scaleY(1);
  }
  
  .timeline-item {
    position: relative;
    margin-bottom: 2.5rem;
  }
  
  .timeline-dot {
    position: absolute;
    left: -2rem;
    top: 1.5rem;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    z-index: 2;
    box-shadow: 0 0 0 4px white;
  }
  
  .timeline-dot.consulting {
    background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  }
  
  .timeline-dot.corporate {
    background: linear-gradient(135deg, #3498db, #2ecc71);
  }
  
  .timeline-content {
    display: flex;
    flex-direction: column;
  }
  
  .timeline-date {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
    color: var(--color-primary);
    font-weight: 600;
  }
  
  .duration {
    font-size: 0.85rem;
    opacity: 0.8;
  }
  
  .timeline-card {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
    cursor: pointer;
    position: relative;
    width: 100%;
    box-sizing: border-box;
  }
  
  .timeline-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(155, 81, 224, 0.1);
  }
  
  .timeline-card:focus {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }
  
  .timeline-card-content {
    display: flex;
    justify-content: space-between;
    gap: 1.5rem;
  }
  
  .timeline-card-left {
    flex: 1.618;  /* Golden ratio */
  }
  
  .timeline-card-right {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.75rem;
  }
  
  .timeline-title {
    font-size: 1.2rem;
    margin: 0 0 0.75rem 0;
    color: var(--neutral-black);
  }
  
  .company-badge {
    font-size: 0.85rem;
    font-weight: 600;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    color: white;
    text-align: center;
  }
  
  .company-badge.consulting {
    background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  }
  
  .company-badge.corporate {
    background: linear-gradient(135deg, #3498db, #2ecc71);
  }
  
  .company-type {
    font-size: 0.85rem;
    color: #666;
    text-align: right;
  }
  
  .timeline-location {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #666;
    font-size: 0.9rem;
    margin-top: 0.5rem;
  }
  
  .timeline-summary {
    color: var(--neutral-black);
    font-size: 0.95rem;
    line-height: 1.6;
    margin: 0 0 1rem 0;
  }
  
  .timeline-card-footer {
    display: flex;
    justify-content: flex-end;
  }
  
  .details-indicator {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--color-primary);
    font-weight: 600;
    padding: 0.5rem;
    border-radius: 4px;
    transition: all 0.2s ease;
  }
  
  .timeline-details {
    margin-top: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    padding-top: 0;
    width: 100%;
    max-height: 0;
    overflow: hidden;
    opacity: 0;
    transition: all 0.4s ease-in-out;
  }
  
  .timeline-details.expanded {
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    max-height: 2000px; /* Large enough to fit all content */
    opacity: 1;
  }
  
  .timeline-details-content {
    max-width: 61.8%;  /* Golden ratio percentage */
  }
  
  .duty-section {
    margin-bottom: 1.5rem;
  }
  
  .duty-section:last-child {
    margin-bottom: 0;
  }
  
  .duty-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--color-primary);
    margin: 0 0 0.75rem 0;
  }
  
  .activities-list {
    margin: 0;
    padding-left: 1.5rem;
  }
  
  .activities-list li {
    margin-bottom: 0.5rem;
    line-height: 1.5;
    color: var(--neutral-black);
  }
  
  @media (max-width: 768px) {
    .timeline-header {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
    
    .timeline-header h2 {
      width: 100%;
      text-align: center;
    }
    
    .view-mode-controls {
      margin: 1rem 0;
      width: 100%;
      justify-content: center;
    }
    
    .timeline-card-content {
      flex-direction: column;
    }
    
    .timeline-card-right {
      align-items: flex-start;
    }
    
    .timeline-details-content {
      max-width: 100%;
    }
    
    .timeline-date {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.25rem;
    }
    
    .company-badge, .company-type {
      text-align: left;
    }
  }
</style>
