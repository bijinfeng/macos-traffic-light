<script lang="ts">
  import type { IconDefinition, IconState } from "@traffic-light/svg";
  import IconNode from "./IconNode.svelte";

  export let icon: IconDefinition = undefined as unknown as IconDefinition;
  export let state: IconState = "default";
  export let color: string | undefined = undefined;
  export let hoverColor: string | undefined = undefined;
  export let activeColor: string | undefined = undefined;
  export let width: number | string | undefined = undefined;
  export let height: number | string | undefined = undefined;

  const rest = $$restProps as Record<string, unknown>;

  $: c = color ?? icon.colors?.default;
  $: hc = hoverColor ?? icon.colors?.hover ?? c;
  $: ac = activeColor ?? icon.colors?.active ?? hc;
  $: resolvedColor = state === "active" ? ac : state === "hover" ? hc : c;

  $: styleAttr = (() => {
    const existing = typeof rest.style === "string" ? rest.style : "";
    if (!resolvedColor) return existing || undefined;
    if (!existing) return `color: ${resolvedColor};`;
    return `color: ${resolvedColor}; ${existing}`;
  })();
</script>

<svg {...(icon.svg.attrs ?? {})} {...$$restProps} {width} {height} style={styleAttr}>
  {#each icon.svg.children as node}
    <IconNode {node} />
  {/each}

  {#if state !== "default"}
    {#each icon.variants?.hover ?? [] as node}
      <IconNode {node} />
    {/each}
  {/if}

  {#if state === "active"}
    {#each icon.variants?.active ?? [] as node}
      <IconNode {node} />
    {/each}
  {/if}
</svg>
