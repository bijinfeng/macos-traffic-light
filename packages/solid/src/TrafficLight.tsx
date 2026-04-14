import { createSignal, mergeProps, Show } from "solid-js";
import type { Component, JSX } from "solid-js";
import type { SolidIconProps } from "./createIcon.tsx";
import { CloseIcon, MaximizeIcon, MinimizeIcon } from "./icons.tsx";

type TrafficLightState = "default" | "hover" | "active";
type TrafficLightButton = "close" | "minimize" | "maximize";

export type TrafficLightProps = {
  close?: boolean;
  minimize?: boolean;
  maximize?: boolean;
  disabled?: boolean;
  size?: number;
  gap?: number;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
};

function useButtonState() {
  const [state, setState] = createSignal<TrafficLightState>("default");

  const onMouseEnter: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent> = () => {
    setState((s) => (s === "default" ? "hover" : s));
  };

  const onMouseLeave: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent> = () => {
    setState("default");
  };

  const onMouseDown: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent> = () => {
    setState("active");
  };

  const onMouseUp: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent> = () => {
    setState((s) => (s === "active" ? "hover" : s));
  };

  const onBlur: JSX.EventHandlerUnion<HTMLButtonElement, FocusEvent> = () => {
    setState("default");
  };

  return { state, onMouseEnter, onMouseLeave, onMouseDown, onMouseUp, onBlur };
}

export function TrafficLight(rawProps: TrafficLightProps) {
  const props = mergeProps(
    {
      close: true,
      minimize: true,
      maximize: true,
      disabled: false,
      size: 12,
      gap: 8,
    },
    rawProps,
  );

  const closeBtn = useButtonState();
  const minimizeBtn = useButtonState();
  const maximizeBtn = useButtonState();

  const containerStyle = (): JSX.CSSProperties => ({
    display: "flex",
    "align-items": "center",
    gap: `${props.gap}px`,
  });

  function renderButton(
    kind: TrafficLightButton,
    Icon: Component<SolidIconProps>,
    state: () => TrafficLightState,
    handlers: ReturnType<typeof useButtonState>,
  ) {
    const buttonStyle = (): JSX.CSSProperties => ({
      border: "none",
      padding: 0,
      background: "transparent",
      cursor: props.disabled ? "default" : "pointer",
      display: "inline-flex",
      "align-items": "center",
      "justify-content": "center",
      opacity: props.disabled ? 0.45 : 1,
    });

    const clickHandler =
      kind === "close" ? props.onClose : kind === "minimize" ? props.onMinimize : props.onMaximize;

    return (
      <button
        type="button"
        class={`mac-btn mac-btn--${kind}`}
        style={buttonStyle()}
        disabled={props.disabled}
        aria-disabled={props.disabled ? "true" : undefined}
        onClick={() => {
          if (!props.disabled) clickHandler?.();
        }}
        onMouseEnter={props.disabled ? undefined : handlers.onMouseEnter}
        onMouseLeave={props.disabled ? undefined : handlers.onMouseLeave}
        onMouseDown={props.disabled ? undefined : handlers.onMouseDown}
        onMouseUp={props.disabled ? undefined : handlers.onMouseUp}
        onBlur={props.disabled ? undefined : handlers.onBlur}
      >
        <Icon state={props.disabled ? "default" : state()} width={props.size} height={props.size} />
      </button>
    );
  }

  return (
    <div class="mac-traffic-light" style={containerStyle()}>
      <Show when={props.close}>{renderButton("close", CloseIcon, closeBtn.state, closeBtn)}</Show>
      <Show when={props.minimize}>
        {renderButton("minimize", MinimizeIcon, minimizeBtn.state, minimizeBtn)}
      </Show>
      <Show when={props.maximize}>
        {renderButton("maximize", MaximizeIcon, maximizeBtn.state, maximizeBtn)}
      </Show>
    </div>
  );
}
