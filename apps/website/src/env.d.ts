/// <reference types="astro/client" />
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent;
  export default component;
}

declare module "*.svelte" {
  const component: any;
  export default component;
}
