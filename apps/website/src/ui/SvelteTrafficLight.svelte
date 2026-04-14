<script lang="ts">
  import { TrafficLight } from "@traffic-light/svelte";
  import { onDestroy, onMount } from "svelte";

  type PropsState = {
    close?: boolean;
    minimize?: boolean;
    maximize?: boolean;
    disabled?: boolean;
    size?: number;
    gap?: number;
  };

  let close = true;
  let minimize = true;
  let maximize = true;
  let disabled = false;
  let size = 12;
  let gap = 8;

  const isBrowser = typeof window !== "undefined";

  const dispatch = (name: "close" | "minimize" | "maximize") => {
    if (!isBrowser) return;
    window.dispatchEvent(new CustomEvent("traffic-light:event", { detail: name }));
  };

  const onProps = (event: Event) => {
    if (!(event instanceof CustomEvent)) return;
    const detail = event.detail as PropsState | undefined;
    if (!detail) return;
    if (typeof detail.close === "boolean") close = detail.close;
    if (typeof detail.minimize === "boolean") minimize = detail.minimize;
    if (typeof detail.maximize === "boolean") maximize = detail.maximize;
    if (typeof detail.disabled === "boolean") disabled = detail.disabled;
    if (typeof detail.size === "number") size = detail.size;
    if (typeof detail.gap === "number") gap = detail.gap;
  };

  onMount(() => {
    if (!isBrowser) return;
    window.addEventListener("traffic-light:props", onProps);
  });

  onDestroy(() => {
    if (!isBrowser) return;
    window.removeEventListener("traffic-light:props", onProps);
  });
</script>

<TrafficLight
  {close}
  {minimize}
  {maximize}
  {disabled}
  {size}
  {gap}
  onClose={() => dispatch("close")}
  onMinimize={() => dispatch("minimize")}
  onMaximize={() => dispatch("maximize")}
/>
