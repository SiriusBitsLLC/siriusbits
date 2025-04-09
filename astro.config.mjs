import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://siriusbits.vercel.app',
  integrations: [svelte()],
  output: 'static',
  adapter: vercel()
});
