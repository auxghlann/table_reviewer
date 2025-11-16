import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import mdx from '@mdx-js/rollup'
import remarkGfm from 'remark-gfm'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    { 
      enforce: 'pre',
      ...mdx({ 
        remarkPlugins: [remarkGfm]
      }),
      // Override the transform to skip files with ?raw query
      transform(code, id) {
        // Skip MDX transformation if the file is imported with ?raw
        if (id.includes('?raw')) {
          return null; // Let Vite handle it as raw text
        }
        // Otherwise, let the MDX plugin handle it
        return undefined;
      }
    },
    react(),
    tailwindcss()
  ],
})
