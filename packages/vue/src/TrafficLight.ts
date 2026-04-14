import type { IconState } from "@macos-traffic-light/svg";
import { defineComponent, h, ref } from "vue";
import type { Component, SetupContext, VNodeChild } from "vue";
import { CloseIcon, MaximizeIcon, MinimizeIcon } from "./icons.ts";

type TrafficLightState = IconState;
type TrafficLightButton = "close" | "minimize" | "maximize";

function useButtonState() {
  const state = ref<TrafficLightState>("default");

  function onMouseEnter() {
    if (state.value === "default") state.value = "hover";
  }

  function onMouseLeave() {
    state.value = "default";
  }

  function onMouseDown() {
    state.value = "active";
  }

  function onMouseUp() {
    if (state.value === "active") state.value = "hover";
  }

  function onBlur() {
    state.value = "default";
  }

  return {
    state,
    onMouseEnter,
    onMouseLeave,
    onMouseDown,
    onMouseUp,
    onBlur,
  };
}

export const TrafficLight = defineComponent({
  name: "TrafficLight",
  props: {
    close: {
      type: Boolean,
      default: true,
    },
    minimize: {
      type: Boolean,
      default: true,
    },
    maximize: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    size: {
      type: Number,
      default: 12,
    },
    gap: {
      type: Number,
      default: 8,
    },
  },
  emits: {
    close: () => true,
    minimize: () => true,
    maximize: () => true,
  },
  setup(
    props: {
      close: boolean;
      minimize: boolean;
      maximize: boolean;
      disabled: boolean;
      size: number;
      gap: number;
    },
    { emit }: SetupContext,
  ) {
    const emitTrafficLight = emit as (event: TrafficLightButton) => void;
    const closeBtn = useButtonState();
    const minimizeBtn = useButtonState();
    const maximizeBtn = useButtonState();

    function renderButton(
      kind: TrafficLightButton,
      icon: Component,
      state: TrafficLightState,
      handlers: ReturnType<typeof useButtonState>,
    ) {
      const disabled = props.disabled;
      return h(
        "button",
        {
          type: "button",
          class: ["mac-btn", `mac-btn--${kind}`],
          style: {
            border: "none",
            padding: 0,
            background: "transparent",
            cursor: disabled ? "default" : "pointer",
            display: "inline-flex",
            "align-items": "center",
            "justify-content": "center",
            opacity: disabled ? 0.45 : 1,
          } as const,
          disabled,
          "aria-disabled": disabled ? "true" : undefined,
          onClick: () => {
            if (!disabled) emitTrafficLight(kind);
          },
          onMouseenter: disabled ? undefined : handlers.onMouseEnter,
          onMouseleave: disabled ? undefined : handlers.onMouseLeave,
          onMousedown: disabled ? undefined : handlers.onMouseDown,
          onMouseup: disabled ? undefined : handlers.onMouseUp,
          onBlur: disabled ? undefined : handlers.onBlur,
        },
        [h(icon, { state: disabled ? "default" : state, width: props.size, height: props.size })],
      );
    }

    return () => {
      const children: VNodeChild[] = [];
      const containerStyle = {
        display: "flex",
        "align-items": "center",
        gap: `${props.gap}px`,
      } as const;

      if (props.close) {
        children.push(renderButton("close", CloseIcon, closeBtn.state.value, closeBtn));
      }

      if (props.minimize) {
        children.push(renderButton("minimize", MinimizeIcon, minimizeBtn.state.value, minimizeBtn));
      }

      if (props.maximize) {
        children.push(renderButton("maximize", MaximizeIcon, maximizeBtn.state.value, maximizeBtn));
      }

      return h("div", { class: "mac-traffic-light", style: containerStyle }, children);
    };
  },
});
