import { defineConfig } from 'vite'
// Example with Vue
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
  plugins: [
    svelte({})
  ],
  
  meteor: {
    clientEntry: 'imports/ui/App.svelte',
  },
})