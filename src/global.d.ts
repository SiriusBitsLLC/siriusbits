/// <reference types="svelte" />

// This file is used to provide TypeScript with information about Svelte files
declare module "*.svelte" {
  import type { ComponentType, SvelteComponent } from "svelte";
  
  // Default export for Svelte components
  const component: ComponentType<SvelteComponent>;
  export default component;
  
  // Allow for named exports from Svelte files
  export * from "svelte";
  
  // Support for store exports
  import { Writable } from "svelte/store";
  export const filterSkillsState: Writable<any>;
  export const skillsMatrixState: Writable<any>;
  export const timelineState: Writable<any>;
  export function updateFilterSkillsState(newState: any): void;
  export function updateSkillsMatrixState(newState: any): void;
  export function updateTimelineState(newState: any): void;
}
