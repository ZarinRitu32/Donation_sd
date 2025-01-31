import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as process from "process";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": process.env, // This makes process.env available
  },
});
