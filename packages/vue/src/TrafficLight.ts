import type { IconState } from "@macos-traffic-light/svg";
import { defineComponent, h, ref } from "vue";
import type { Component, SetupContext, VNodeChild } from "vue";
import { CloseIcon, MaximizeIcon, MinimizeIcon } from "./icons.ts";

type TrafficLightState = IconState;

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
    isMaximized: {
      type: Boolean,
      default: false,
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
      isMaximized: boolean;
    },
    { emit }: SetupContext,
  ) {
    const emitTrafficLight = emit as (event: "close" | "minimize" | "maximize") => void;
    const closeBtn = useButtonState();
    const minimizeBtn = useButtonState();
    const maximizeBtn = useButtonState();

    const containerStyle = {
      display: "flex",
      "align-items": "center",
      gap: "8px",
    } as const;

    const buttonStyle = {
      width: "12px",
      height: "12px",
      "border-radius": "9999px",
      border: "none",
      padding: 0,
      cursor: "pointer",
      display: "flex",
      "align-items": "center",
      "justify-content": "center",
      background: "transparent",
      "flex-shrink": 0,
    } as const;

    function renderButton(
      kind: "close" | "minimize" | "maximize",
      title: string,
      icon: Component,
      state: TrafficLightState,
      handlers: ReturnType<typeof useButtonState>,
    ) {
      return h(
        "button",
        {
          type: "button",
          class: ["mac-btn", `mac-btn--${kind}`],
          title,
          style: buttonStyle,
          onClick: () => emitTrafficLight(kind),
          onMouseenter: handlers.onMouseEnter,
          onMouseleave: handlers.onMouseLeave,
          onMousedown: handlers.onMouseDown,
          onMouseup: handlers.onMouseUp,
          onBlur: handlers.onBlur,
        },
        [h(icon, { state })],
      );
    }

    return () => {
      const children: VNodeChild[] = [];

      if (props.close) {
        children.push(renderButton("close", "关闭", CloseIcon, closeBtn.state.value, closeBtn));
      }

      if (props.minimize) {
        children.push(
          renderButton("minimize", "最小化", MinimizeIcon, minimizeBtn.state.value, minimizeBtn),
        );
      }

      if (props.maximize) {
        children.push(
          renderButton(
            "maximize",
            props.isMaximized ? "还原" : "最大化",
            MaximizeIcon,
            maximizeBtn.state.value,
            maximizeBtn,
          ),
        );
      }

      return h("div", { class: "mac-traffic-light", style: containerStyle }, children);
    };
  },
});
