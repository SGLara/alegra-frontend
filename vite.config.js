import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  watch: {
    usePolling: true
  },
  server: {
    host: true,
    strictPort: true,
    port: 4173
  }
})
