import { useState } from "react";
import type { ComponentType, CSSProperties, MouseEventHandler } from "react";
import type { ReactIconProps } from "./createIcon.tsx";
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
  const [state, setState] = useState<TrafficLightState>("default");

  const onMouseEnter: MouseEventHandler = () => {
    setState((s) => (s === "default" ? "hover" : s));
  };

  const onMouseLeave: MouseEventHandler = () => {
    setState("default");
  };

  const onMouseDown: MouseEventHandler = () => {
    setState("active");
  };

  const onMouseUp: MouseEventHandler = () => {
    setState((s) => (s === "active" ? "hover" : s));
  };

  const onBlur = () => {
    setState("default");
  };

  return { state, onMouseEnter, onMouseLeave, onMouseDown, onMouseUp, onBlur };
}

export function TrafficLight({
  close = true,
  minimize = true,
  maximize = true,
  disabled = false,
  size = 12,
  gap = 8,
  onClose,
  onMinimize,
  onMaximize,
}: TrafficLightProps) {
  const closeBtn = useButtonState();
  const minimizeBtn = useButtonState();
  const maximizeBtn = useButtonState();

  const containerStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap,
  };

  function renderButton(
    kind: TrafficLightButton,
    Icon: ComponentType<ReactIconProps>,
    state: TrafficLightState,
    handlers: ReturnType<typeof useButtonState>,
  ) {
    const buttonStyle: CSSProperties = {
      border: "none",
      padding: 0,
      background: "transparent",
      cursor: disabled ? "default" : "pointer",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      opacity: disabled ? 0.45 : 1,
    };

    const clickHandler = kind === "close" ? onClose : kind === "minimize" ? onMinimize : onMaximize;

    return (
      <button
        key={kind}
        type="button"
        className={`mac-btn mac-btn--${kind}`}
        style={buttonStyle}
        disabled={disabled}
        aria-disabled={disabled ? "true" : undefined}
        onClick={() => {
          if (!disabled) clickHandler?.();
        }}
        onMouseEnter={disabled ? undefined : handlers.onMouseEnter}
        onMouseLeave={disabled ? undefined : handlers.onMouseLeave}
        onMouseDown={disabled ? undefined : handlers.onMouseDown}
        onMouseUp={disabled ? undefined : handlers.onMouseUp}
        onBlur={disabled ? undefined : handlers.onBlur}
      >
        <Icon state={disabled ? "default" : state} width={size} height={size} />
      </button>
    );
  }

  return (
    <div className="mac-traffic-light" style={containerStyle}>
      {close ? renderButton("close", CloseIcon, closeBtn.state, closeBtn) : null}
      {minimize ? renderButton("minimize", MinimizeIcon, minimizeBtn.state, minimizeBtn) : null}
      {maximize ? renderButton("maximize", MaximizeIcon, maximizeBtn.state, maximizeBtn) : null}
    </div>
  );
}
