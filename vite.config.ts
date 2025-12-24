import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "chess_game": path.resolve(__dirname, "./src/features/chess_game"),
      "landing": path.resolve(__dirname, "./src/features/landing"),
    },
  },
});
