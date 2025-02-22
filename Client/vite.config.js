import { defineConfig } from "vite";
import process from "process";

export default defineConfig({
  define: {
    process: process,
  },
});
