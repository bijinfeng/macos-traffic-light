import { defineConfig } from "vite-plus";
import { fileURLToPath } from "node:url";
import vue from "@vitejs/plugin-vue";

function r(path: string) {
  return fileURLToPath(new URL(path, import.meta.url));
}

export default defineConfig({
  define: {
    __VUE_OPTIONS_API__: false,
    __VUE_PROD_DEVTOOLS__: false,
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
  },
  plugins: [vue()],
  resolve: {
    alias: {
      "@traffic-light/vue": r("../../packages/vue/src/index.ts"),
    },
  },
});
