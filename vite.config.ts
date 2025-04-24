import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

// https://vite.dev/config/
const externals = [
  'react',
  'react-dom',
  '@mui/material',
  '@mui/styled-engine',
  '@emotion/react',
  '@emotion/cache',
  '@emotion/sheet',
  'faster-router-pwa'
]

export default defineConfig({
  plugins: [react(), dts({ insertTypesEntry: true, tsconfigPath: './tsconfig.app.json' })],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'Sidebar',
      fileName: (format) => `faster-sidebar.${format}.js`,
      formats: ['es', 'umd']
    },
    rollupOptions: {
      external: (id) => externals.some((pkg) => id === pkg || id.startsWith(pkg + '/')) ||
        id.startsWith('__vite-optional-peer-dep'),
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@mui/material': 'Mui',
          '@emotion/react': 'emotionReact',
          '@emotion/cache': 'emotionCache',
          '@emotion/sheet': 'emotionSheet',
          '@mui/styled-engine': 'MuiStyledEngine',
          'faster-router-pwa': 'FasterRouterPWA'
        }
      }
    }
  }
})
