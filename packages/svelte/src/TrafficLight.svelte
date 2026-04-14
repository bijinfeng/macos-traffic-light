<script lang="ts">
  import type { IconState } from "@traffic-light/svg";
  import CloseIcon from "./icons/CloseIcon.svelte";
  import MaximizeIcon from "./icons/MaximizeIcon.svelte";
  import MinimizeIcon from "./icons/MinimizeIcon.svelte";

  export let close = true;
  export let minimize = true;
  export let maximize = true;
  export let disabled = false;
  export let size = 12;
  export let gap = 8;
  export let onClose: (() => void) | undefined = undefined;
  export let onMinimize: (() => void) | undefined = undefined;
  export let onMaximize: (() => void) | undefined = undefined;

  let closeState: IconState = "default";
  let minimizeState: IconState = "default";
  let maximizeState: IconState = "default";

  const buttonStyle = () => {
    const opacity = disabled ? 0.45 : 1;
    const cursor = disabled ? "default" : "pointer";
    return `border:none;padding:0;background:transparent;cursor:${cursor};display:inline-flex;align-items:center;justify-content:center;opacity:${opacity}`;
  };

  const containerStyle = () => `display:flex;align-items:center;gap:${gap}px`;

  const setState = (kind: "close" | "minimize" | "maximize", next: IconState) => {
    if (kind === "close") closeState = next;
    if (kind === "minimize") minimizeState = next;
    if (kind === "maximize") maximizeState = next;
  };

  const getState = (kind: "close" | "minimize" | "maximize") => {
    if (kind === "close") return closeState;
    if (kind === "minimize") return minimizeState;
    return maximizeState;
  };

  const onEnter = (kind: "close" | "minimize" | "maximize") => {
    if (!disabled) setState(kind, "hover");
  };
  const onLeave = (kind: "close" | "minimize" | "maximize") => {
    if (!disabled) setState(kind, "default");
  };
  const onDown = (kind: "close" | "minimize" | "maximize") => {
    if (!disabled) setState(kind, "active");
  };
  const onUp = (kind: "close" | "minimize" | "maximize") => {
    if (!disabled) setState(kind, "hover");
  };
  const onBlur = (kind: "close" | "minimize" | "maximize") => {
    if (!disabled) setState(kind, "default");
  };
</script>

<div class="mac-traffic-light" style={containerStyle()}>
  {#if close}
    <button
      type="button"
      class="mac-btn mac-btn--close"
      style={buttonStyle()}
      disabled={disabled}
      aria-disabled={disabled ? "true" : undefined}
      on:click={() => {
        if (!disabled) onClose?.();
      }}
      on:mouseenter={() => onEnter("close")}
      on:mouseleave={() => onLeave("close")}
      on:mousedown={() => onDown("close")}
      on:mouseup={() => onUp("close")}
      on:blur={() => onBlur("close")}
    >
      <CloseIcon state={disabled ? "default" : getState("close")} width={size} height={size} />
    </button>
  {/if}

  {#if minimize}
    <button
      type="button"
      class="mac-btn mac-btn--minimize"
      style={buttonStyle()}
      disabled={disabled}
      aria-disabled={disabled ? "true" : undefined}
      on:click={() => {
        if (!disabled) onMinimize?.();
      }}
      on:mouseenter={() => onEnter("minimize")}
      on:mouseleave={() => onLeave("minimize")}
      on:mousedown={() => onDown("minimize")}
      on:mouseup={() => onUp("minimize")}
      on:blur={() => onBlur("minimize")}
    >
      <MinimizeIcon state={disabled ? "default" : getState("minimize")} width={size} height={size} />
    </button>
  {/if}

  {#if maximize}
    <button
      type="button"
      class="mac-btn mac-btn--maximize"
      style={buttonStyle()}
      disabled={disabled}
      aria-disabled={disabled ? "true" : undefined}
      on:click={() => {
        if (!disabled) onMaximize?.();
      }}
      on:mouseenter={() => onEnter("maximize")}
      on:mouseleave={() => onLeave("maximize")}
      on:mousedown={() => onDown("maximize")}
      on:mouseup={() => onUp("maximize")}
      on:blur={() => onBlur("maximize")}
    >
      <MaximizeIcon state={disabled ? "default" : getState("maximize")} width={size} height={size} />
    </button>
  {/if}
</div>
