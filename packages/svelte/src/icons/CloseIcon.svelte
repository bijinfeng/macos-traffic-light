<script lang="ts">
  import { closeIcon } from "@traffic-light/svg";
  import Icon from "../Icon.svelte";
  import type { IconState } from "@traffic-light/svg";

  export let state: IconState = "default";
  export let color: string | undefined = undefined;
  export let hoverColor: string | undefined = undefined;
  export let activeColor: string | undefined = undefined;
  export let width: number | string | undefined = undefined;
  export let height: number | string | undefined = undefined;
</script>

<Icon
  icon={closeIcon}
  {state}
  {color}
  {hoverColor}
  {activeColor}
  {width}
  {height}
  {...$$restProps}
/>
