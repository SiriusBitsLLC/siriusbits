<script lang="ts">
  import { onMount } from "svelte";
  import type { Roles, Companies } from "../data/experience-schema";
  import AnimateOnScroll from "./AnimateOnScroll.svelte";
  import ParallaxBackground from "./ParallaxBackground.svelte";
  import Icon from "./Icon.svelte";

  export let roles: Roles[] = [];
  export let companies: Companies[] = [];

  let timelineVisible = false;

  // Format date to display month and year
  function formatDate(dateString) {
    if (!dateString) return "Present";

    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      year: "numeric",
    }).format(date);
  }

  // Calculate duration between two dates in years and months
  function calculateDuration(startDate, endDate) {
    if (!startDate) return "";

    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();

    const yearDiff = end.getFullYear() - start.getFullYear();
    const monthDiff = end.getMonth() - start.getMonth();

    let totalMonths = yearDiff * 12 + monthDiff;
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    let result = "";
    if (years > 0) {
      result += `${years} year${years > 1 ? "s" : ""}`;
    }

    if (months > 0) {
      result += result
        ? ` ${months} month${months > 1 ? "s" : ""}`
        : `${months} month${months > 1 ? "s" : ""}`;
    }

    return result;
  }

  // Get company details by ID
  function getCompany(companyId) {
    return companies.find((company) => company.id === companyId) || {};
  }

  // Initialize animations on mount
  onMount(() => {
    // Set up intersection observer for animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            timelineVisible = true;
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe the timeline container
    const timelineEl = document.querySelector(".experience-timeline");
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

  <div class="experience-timeline {timelineVisible ? 'visible' : ''}">
    <div class="timeline-line"></div>

    {#each roles as role, index}
      {@const company = getCompany(role.companyId)}
      <AnimateOnScroll
        animation="fade-left"
        duration={800}
        delay={300 + index * 150}
      >
        <div class="timeline-item">
          <div
            class="timeline-dot {company.companyType === 'Consulting'
              ? 'consulting'
              : 'corporate'}"
          ></div>

          <div class="timeline-content">
            <div class="timeline-date">
              <span
                >{formatDate(role.startDate)} - {formatDate(role.endDate)}</span
              >
              <span class="duration"
                >{calculateDuration(role.startDate, role.endDate)}</span
              >
            </div>

            <div class="timeline-card">
              <div class="timeline-card-header">
                <h3>{role.title}</h3>
                <div
                  class="company-badge {company.companyType === 'Consulting'
                    ? 'consulting'
                    : 'corporate'}"
                >
                  {company.company}
                </div>
              </div>

              <div class="timeline-location">
                <Icon name="map-pin" size={16} />
                <span>{company.location}</span>
              </div>

              <p class="timeline-summary">{role.summary}</p>

              <div class="timeline-card-footer">
                <button class="details-btn">
                  <span>View Details</span>
                  <Icon name="arrow-right" size={16} />
                </button>
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
    background: linear-gradient(
      135deg,
      rgba(155, 81, 224, 0.15),
      rgba(155, 81, 224, 0.05)
    );
  }

  .shape-2 {
    bottom: 20%;
    left: -10%;
    width: 400px;
    height: 400px;
    background: linear-gradient(
      135deg,
      rgba(52, 152, 219, 0.1),
      rgba(52, 152, 219, 0.03)
    );
  }

  .shape-3 {
    top: 40%;
    right: 20%;
    width: 200px;
    height: 200px;
    background: linear-gradient(
      135deg,
      rgba(46, 204, 113, 0.1),
      rgba(46, 204, 113, 0.03)
    );
  }

  .timeline-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    flex-wrap: wrap;
    gap: 1rem;
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
    background: linear-gradient(
      135deg,
      var(--color-primary),
      var(--color-accent)
    );
  }

  .legend-dot.corporate {
    background: linear-gradient(135deg, #3498db, #2ecc71);
  }

  .experience-timeline {
    position: relative;
    padding-left: 2rem;
  }

  .timeline-line {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 8px;
    width: 2px;
    background: linear-gradient(
      to bottom,
      rgba(155, 81, 224, 0.5) 0%,
      rgba(52, 152, 219, 0.5) 100%
    );
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
    background: linear-gradient(
      135deg,
      var(--color-primary),
      var(--color-accent)
    );
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
  }

  .timeline-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(155, 81, 224, 0.1);
  }

  .timeline-card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .timeline-card h3 {
    font-size: 1.2rem;
    margin: 0;
    color: var(--neutral-black);
  }

  .company-badge {
    font-size: 0.85rem;
    font-weight: 600;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    color: white;
  }

  .company-badge.consulting {
    background: linear-gradient(
      135deg,
      var(--color-primary),
      var(--color-accent)
    );
  }

  .company-badge.corporate {
    background: linear-gradient(135deg, #3498db, #2ecc71);
  }

  .timeline-location {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #666;
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }

  .timeline-summary {
    color: var(--neutral-black);
    font-size: 0.95rem;
    line-height: 1.6;
    margin: 0 0 1.5rem 0;
  }

  .timeline-card-footer {
    display: flex;
    justify-content: flex-end;
  }

  .details-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: none;
    border: none;
    color: var(--color-primary);
    font-weight: 600;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 4px;
    transition: all 0.2s ease;
  }

  .details-btn:hover {
    background-color: rgba(155, 81, 224, 0.1);
  }

  @media (max-width: 768px) {
    .timeline-header {
      flex-direction: column;
      align-items: flex-start;
    }

    .timeline-card-header {
      flex-direction: column;
    }

    .timeline-date {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.25rem;
    }
  }
</style>
