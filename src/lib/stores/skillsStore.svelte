<script lang="ts">
  import { writable } from 'svelte/store';
  import type { Skills, Duties, Activities, Roles } from '../../data/experience-schema';

  // Create stores using Svelte's writable store API
  // Skills matrix state
  export const skillsMatrixState = writable({
    groupedSkills: {} as Record<string, Skills[]>,
    activeCategory: "strategy",
    selectedSkill: null as Skills | null,
    relatedDuties: [] as Duties[],
    dutyActivitiesMap: {} as Record<number, Activities[]>,
    skillsVisible: false,
    dutiesVisible: false
  });

  // Filter skills state
  export const filterSkillsState = writable({
    selectedSkillIds: [] as number[],
    filteredRoles: [] as any[],
    showFilterResults: false
  });
  
  // Timeline state
  export const timelineState = writable({
    timelineVisible: false,
    expandedRoles: [] as number[],
    viewMode: 'condensed' as 'condensed' | 'expanded'
  });

  // Helper functions to update specific parts of the state
  export function updateSkillsMatrixState(newState: Partial<{
    groupedSkills: Record<string, Skills[]>,
    activeCategory: string,
    selectedSkill: Skills | null,
    relatedDuties: Duties[],
    dutyActivitiesMap: Record<number, Activities[]>,
    skillsVisible: boolean,
    dutiesVisible: boolean
  }>) {
    skillsMatrixState.update(state => ({...state, ...newState}));
  }

  export function updateFilterSkillsState(newState: Partial<{
    selectedSkillIds: number[],
    filteredRoles: any[],
    showFilterResults: boolean
  }>) {
    filterSkillsState.update(state => ({...state, ...newState}));
  }

  export function updateTimelineState(newState: Partial<{
    timelineVisible: boolean,
    expandedRoles: number[],
    viewMode: 'condensed' | 'expanded'
  }>) {
    timelineState.update(state => ({...state, ...newState}));
  }
</script>
