import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import vercel from '@astrojs/vercel';
import Icons from 'unplugin-icons/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://siriusbits.vercel.app',
  integrations: [
    svelte({
      // Configure for Svelte 5 compatibility
      emitCss: true, // Enable CSS emission for proper styling
      prebundleSvelteLibraries: true,
      compilerOptions: {
        // Enable runes for Svelte 5 components
        runes: true,
        // Use number 5 for Svelte 5 compatibility
        compatibility: {
          componentApi: 5
        }
      }
    })
  ],
  vite: {
    plugins: [
      // Register unplugin-icons for Svelte components:
      Icons({ compiler: 'svelte' }),
      // Register unplugin-icons for Astro components:
      Icons({ compiler: 'astro' })
    ],
  },
  output: 'static',
  adapter: vercel(),
  server: {
    port: 4337
  }
});
