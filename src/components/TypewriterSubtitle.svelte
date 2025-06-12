<script lang="ts">
  // Svelte 5 runes mode
  import type { IconName } from "./DynamicIcon.svelte";
  const roles: { role: string; icon: IconName }[] = [
    { role: "Data Strategist", icon: "bar-chart-3" as IconName },
    { role: "AI Engineer", icon: "brain-circuit" as IconName },
    { role: "Digital Architect", icon: "layout-dashboard" as IconName },
    { role: "Web Developer", icon: "code" as IconName },
    { role: "Information Architect", icon: "layers" as IconName },
    { role: "Cloud Data Engineer", icon: "cloud" as IconName },
    { role: "Public Speaker", icon: "mic" as IconName },
    { role: "Ecosystem Builder", icon: "network" as IconName },
    { role: "Technology Strategist", icon: "strategy" as IconName },
    { role: "Machine Learning Engineer", icon: "cpu" as IconName },
    { role: "Digital Marketer", icon: "megaphone" as IconName },
    { role: "Data Governance Advisor", icon: "shield-check" as IconName },
    { role: "Business Technologist", icon: "briefcase" as IconName },
    { role: "Team Leader", icon: "users" as IconName },
    { role: "Product Owner", icon: "package" as IconName },
    { role: "Innovation Coach", icon: "lightbulb" as IconName },
  ];

  let currentRoleIdx = $state(0);
  let displayText = $state("");
  let isDeleting = false;
  let typingSpeed = 80;
  let pauseTime = 1200;
  let started = false;

  function typeLoop() {
    const role = roles[currentRoleIdx];
    if (isDeleting) {
      displayText = roles[currentRoleIdx].role.slice(0, displayText.length - 1);
      typingSpeed = 40;
    } else {
      displayText = roles[currentRoleIdx].role.slice(0, displayText.length + 1);
      typingSpeed = 80;
    }

    if (!isDeleting && displayText === roles[currentRoleIdx].role) {
      setTimeout(() => {
        isDeleting = true;
        typeLoop();
      }, pauseTime);
      return;
    }
    if (isDeleting && displayText === "") {
      isDeleting = false;
      currentRoleIdx = (currentRoleIdx + 1) % roles.length;
      typingSpeed = 300;
    }
    setTimeout(typeLoop, typingSpeed);
  }

  function getArticle(word: string): string {
    if (!word) return "";
    const vowels = ["a", "e", "i", "o", "u"];
    return vowels.includes(word[0].toLowerCase()) ? "an" : "a";
  }

  $effect(() => {
    if (!started) {
      started = true;
      typeLoop();
    }
  });
  import DynamicIcon from "./DynamicIcon.svelte";
</script>

<span class="typewriter">
  <DynamicIcon
    iconName={roles[currentRoleIdx].icon}
    size="1.2em"
    color="var(--color-primary, #9b51e0)"
  />
  I'm {getArticle(roles[currentRoleIdx].role)}<br class="mobile-only" />
  <span>{displayText}</span><span class="cursor">|</span>
</span>

<style>
  .typewriter {
    display: inline-block;
    font-family: inherit;
    font-size: 2.25rem;
    color: var(--color-accent, #3498db);
    position: relative;
  }
  .mobile-only {
    display: none;
  }
  @media (max-width: 600px) {
    .typewriter {
      min-height: 8.5rem;
      font-size: 1.75rem;
    }
    .mobile-only {
      display: inline;
    }
    /* If h1 is styled elsewhere, recommend user to set h1 { font-size: 1.75rem; } in mobile */
  }
  .typewriter .cursor {
    display: inline-block;
    width: 1ch;
    color: var(--color-primary, #9b51e0);
    animation: blink 1s steps(1) infinite;
  }
  @keyframes blink {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
  }
</style>
