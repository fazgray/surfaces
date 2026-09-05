import { svelte } from "@sveltejs/vite-plugin-svelte"
import { resolve } from "node:path"
import { defineConfig } from "vite"

const root = import.meta.dirname

export default defineConfig({
  root,
  base: "./",
  plugins: [svelte()],
  resolve: {
    alias: {
      "@fazgray/surfaces": resolve(root, "../../src"),
    },
  },
  build: {
    outDir: resolve(root, "dist"),
    emptyOutDir: true,
  },
})
