import { defineConfig, type Plugin, build as viteBuild } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

const ROOT = fileURLToPath(new URL('.', import.meta.url))

function buildSwPlugin(): Plugin {
  return {
    name: 'demo-build-sw',
    apply: 'build',
    async closeBundle() {
      await viteBuild({
        configFile: false,
        root: ROOT,
        build: {
          outDir: 'dist',
          emptyOutDir: false,
          lib: {
            entry: fileURLToPath(new URL('./demo-mock/sw.ts', import.meta.url)),
            formats: ['es'],
            fileName: () => 'sw.js',
          },
        },
        resolve: { extensions: ['.ts', '.js'] },
      })
      const { copyFileSync } = await import('node:fs')
      const { join } = await import('node:path')
      try { copyFileSync(join(ROOT, 'dist', 'index.html'), join(ROOT, 'dist', '404.html')) } catch {}
    },
  }
}

function wsAliasPlugin(): Plugin {
  const mockWs = fileURLToPath(new URL('./demo-mock/useWebSocket.ts', import.meta.url))
  return {
    name: 'demo-ws-alias',
    enforce: 'pre',
    resolveId(id) {
      if (
        id === '@/composables/useWebSocket' ||
        id.endsWith('/composables/useWebSocket') ||
        id.endsWith('/composables/useWebSocket.ts')
      ) return mockWs
    },
  }
}

export default defineConfig(() => ({
  plugins: [vue(), wsAliasPlugin(), buildSwPlugin()],
  define: { __DEMO_MODE__: 'true' },
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  base: process.env.VITE_DEMO_BASE ?? '/',
  build: { outDir: 'dist' },
}))
