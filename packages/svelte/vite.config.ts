import { defineConfig } from "vite-plus";
import { svelte } from "@sveltejs/vite-plugin-svelte";

export default defineConfig({
  plugins: [svelte()],
  resolve: {
    conditions: ["browser", "development", "svelte", "import"],
  },
  pack: {
    dts: {
      tsgo: true,
    },
    external: [/\.svelte(\?|$)/],
    copy: [
      { from: "src/*.svelte", to: "dist", flatten: true },
      { from: "src/icons/*.svelte", to: "dist/icons", flatten: true },
    ],
  },
  lint: {
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  test: {
    environment: "jsdom",
  },
  fmt: {},
});
