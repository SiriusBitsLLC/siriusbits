import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import Icons from 'unplugin-icons/vite';

// https://astro.build/config
export default defineConfig({
  // Primary domain with www
  site: 'https://www.siriusbits.com',
  
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
  
  // Static site generation (default) - works great with Netlify Forms
  output: 'static',
  
  // Vite configuration
  vite: {
    plugins: [
      // Register unplugin-icons for Svelte components
      Icons({ compiler: 'svelte' }),
      // Register unplugin-icons for Astro components
      Icons({ compiler: 'astro' })
    ]
  },
  
  // Development server configuration
  server: {
    port: 4321, // Standard Astro dev port
    host: true // Listen on all network interfaces
  },
  
  // Build output configuration
  build: {
    // This is the default and recommended setting for static sites
    format: 'directory',
    
    // Enable sourcemaps in development
    sourcemap: 'inline'
  }
});
