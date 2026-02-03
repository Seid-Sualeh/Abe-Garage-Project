import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// change localhost to 3000

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
