import type { IconDefinition, IconNode, IconState } from "@macos-traffic-light/svg";
import { createElement, useState } from "react";
import type { CSSProperties, MouseEventHandler, ReactNode, SVGProps } from "react";

export type ReactIconProps = Omit<SVGProps<SVGSVGElement>, "color"> & {
  state?: IconState;
  color?: string;
  hoverColor?: string;
  activeColor?: string;
};

function camelizeAttrName(name: string) {
  if (name === "class") return "className";
  return name.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
}

function toReactAttrs(attrs: Record<string, unknown> | undefined) {
  if (!attrs) return undefined;

  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(attrs)) {
    out[camelizeAttrName(key)] = value;
  }
  return out;
}

function renderIconNode(node: IconNode, key: number): ReactNode {
  const children = node.children?.map((child, index) => renderIconNode(child, index));
  return createElement(node.tag, { ...toReactAttrs(node.attrs), key }, children);
}

export function createReactIcon(icon: IconDefinition, componentName?: string) {
  function ReactIcon({
    state,
    color,
    hoverColor,
    activeColor,
    style,
    onMouseEnter: onMouseEnterProp,
    onMouseLeave: onMouseLeaveProp,
    onMouseDown: onMouseDownProp,
    onMouseUp: onMouseUpProp,
    ...restProps
  }: ReactIconProps) {
    const [hovered, setHovered] = useState(false);
    const [pressed, setPressed] = useState(false);

    const derivedState: IconState = state ?? (pressed ? "active" : hovered ? "hover" : "default");

    const c = color ?? icon.colors?.default;
    const hc = hoverColor ?? icon.colors?.hover ?? c;
    const ac = activeColor ?? icon.colors?.active ?? hc;

    const resolvedColor = derivedState === "active" ? ac : derivedState === "hover" ? hc : c;
    const mergedStyle: CSSProperties | undefined = resolvedColor
      ? { ...style, color: resolvedColor }
      : style;

    const children: ReactNode[] = [
      ...icon.svg.children.map((node, index) => renderIconNode(node, index)),
      ...(derivedState !== "default"
        ? (icon.variants?.hover ?? []).map((node, index) => renderIconNode(node, index + 1000))
        : []),
      ...(derivedState === "active"
        ? (icon.variants?.active ?? []).map((node, index) => renderIconNode(node, index + 2000))
        : []),
    ];

    const internalHandlers: {
      onMouseEnter?: MouseEventHandler<SVGSVGElement>;
      onMouseLeave?: MouseEventHandler<SVGSVGElement>;
      onMouseDown?: MouseEventHandler<SVGSVGElement>;
      onMouseUp?: MouseEventHandler<SVGSVGElement>;
    } =
      state === undefined
        ? {
            onMouseEnter: (e) => {
              setHovered(true);
              onMouseEnterProp?.(e);
            },
            onMouseLeave: (e) => {
              setHovered(false);
              setPressed(false);
              onMouseLeaveProp?.(e);
            },
            onMouseDown: (e) => {
              setPressed(true);
              onMouseDownProp?.(e);
            },
            onMouseUp: (e) => {
              setPressed(false);
              onMouseUpProp?.(e);
            },
          }
        : {
            onMouseEnter: onMouseEnterProp,
            onMouseLeave: onMouseLeaveProp,
            onMouseDown: onMouseDownProp,
            onMouseUp: onMouseUpProp,
          };

    return (
      <svg
        {...(toReactAttrs(icon.svg.attrs) ?? {})}
        {...restProps}
        {...internalHandlers}
        style={mergedStyle}
      >
        {children}
      </svg>
    );
  }

  ReactIcon.displayName = componentName ?? icon.name;
  return ReactIcon;
}
