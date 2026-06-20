import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],

    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },

    build: {
      /* Raise warning threshold — three.js (~860KB min) is irreducible, lazy-loaded */
      chunkSizeWarningLimit: 1000,

      /* Target modern browsers — smaller, faster output */
      target: 'es2020',

      rollupOptions: {
        output: {
          manualChunks: {
            /* React core — tiny, always needed */
            'react-core': ['react', 'react-dom'],

            /* Motion — needed for animations across all sections */
            'motion': ['motion'],

            /* Three.js + R3F — heavy, lazy-loaded, isolated chunk */
            'three-fiber': ['three', '@react-three/fiber'],

            /* Lenis smooth scroll */
            'lenis': ['lenis'],

            /* Lucide icons — large icon library */
            'lucide': ['lucide-react'],
          },
        },
      },

      /* Minification */
      minify: 'esbuild' as const,

      /* Inline small assets instead of extra HTTP requests */
      assetsInlineLimit: 4096,
    },

    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
