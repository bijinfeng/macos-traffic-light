<script lang="ts">
  import type { IconNode as IconNodeType } from "@traffic-light/svg";

  export let node: IconNodeType;
</script>

<svelte:element this={node.tag} {...(node.attrs ?? {})}>
  {#each node.children ?? [] as child}
    <svelte:self node={child} />
  {/each}
</svelte:element>
