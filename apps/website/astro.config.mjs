import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import solid from "@astrojs/solid-js";
import svelte from "@astrojs/svelte";
import vue from "@astrojs/vue";

export default defineConfig({
  base:
    process.env.ASTRO_BASE ??
    (() => {
      const repo = process.env.GITHUB_REPOSITORY?.split("/")[1];
      return repo ? `/${repo}` : "/";
    })(),
  integrations: [
    vue({ include: ["**/VueTrafficLight.vue"] }),
    react({ include: ["**/ReactTrafficLight.tsx"] }),
    solid({ include: ["**/SolidTrafficLight.jsx"] }),
    svelte({ include: ["**/*.svelte"] }),
  ],
});
