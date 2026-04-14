import type { IconDefinition, IconNode, IconState } from "@traffic-light/svg";
import { createSignal, mergeProps, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import type { JSX } from "solid-js";

export type SolidIconProps = Omit<JSX.SvgSVGAttributes<SVGSVGElement>, "color" | "style"> & {
  state?: IconState;
  color?: string;
  hoverColor?: string;
  activeColor?: string;
  style?: JSX.CSSProperties;
};

function renderIconNode(node: IconNode): JSX.Element {
  const children = node.children?.map((child) => renderIconNode(child));
  return <Dynamic component={node.tag} {...(node.attrs ?? {})} children={children} />;
}

export function createSolidIcon(icon: IconDefinition, componentName?: string) {
  function SolidIcon(rawProps: SolidIconProps) {
    const props = mergeProps({ state: undefined }, rawProps);
    const [local, rest] = splitProps(props, [
      "state",
      "color",
      "hoverColor",
      "activeColor",
      "style",
      "onMouseEnter",
      "onMouseLeave",
      "onMouseDown",
      "onMouseUp",
    ]);

    const [hovered, setHovered] = createSignal(false);
    const [pressed, setPressed] = createSignal(false);

    const derivedState = () =>
      local.state ?? (pressed() ? "active" : hovered() ? "hover" : "default");

    const resolvedColor = () => {
      const state = derivedState();
      const c = local.color ?? icon.colors?.default;
      const hc = local.hoverColor ?? icon.colors?.hover ?? c;
      const ac = local.activeColor ?? icon.colors?.active ?? hc;

      return state === "active" ? ac : state === "hover" ? hc : c;
    };

    const mergedStyle = () => {
      const rc = resolvedColor();
      return rc ? { ...local.style, color: rc } : local.style;
    };

    const handleMouseEnter: JSX.EventHandlerUnion<SVGSVGElement, MouseEvent> = (e) => {
      setHovered(true);
      if (typeof local.onMouseEnter === "function") local.onMouseEnter(e);
      else if (Array.isArray(local.onMouseEnter)) local.onMouseEnter[0](local.onMouseEnter[1], e);
    };

    const handleMouseLeave: JSX.EventHandlerUnion<SVGSVGElement, MouseEvent> = (e) => {
      setHovered(false);
      setPressed(false);
      if (typeof local.onMouseLeave === "function") local.onMouseLeave(e);
      else if (Array.isArray(local.onMouseLeave)) local.onMouseLeave[0](local.onMouseLeave[1], e);
    };

    const handleMouseDown: JSX.EventHandlerUnion<SVGSVGElement, MouseEvent> = (e) => {
      setPressed(true);
      if (typeof local.onMouseDown === "function") local.onMouseDown(e);
      else if (Array.isArray(local.onMouseDown)) local.onMouseDown[0](local.onMouseDown[1], e);
    };

    const handleMouseUp: JSX.EventHandlerUnion<SVGSVGElement, MouseEvent> = (e) => {
      setPressed(false);
      if (typeof local.onMouseUp === "function") local.onMouseUp(e);
      else if (Array.isArray(local.onMouseUp)) local.onMouseUp[0](local.onMouseUp[1], e);
    };

    const internalHandlers = () =>
      local.state === undefined
        ? {
            onMouseEnter: handleMouseEnter,
            onMouseLeave: handleMouseLeave,
            onMouseDown: handleMouseDown,
            onMouseUp: handleMouseUp,
          }
        : {
            onMouseEnter: local.onMouseEnter,
            onMouseLeave: local.onMouseLeave,
            onMouseDown: local.onMouseDown,
            onMouseUp: local.onMouseUp,
          };

    return (
      <svg {...(icon.svg.attrs ?? {})} {...rest} {...internalHandlers()} style={mergedStyle()}>
        {icon.svg.children.map((node) => renderIconNode(node))}
        {derivedState() !== "default"
          ? (icon.variants?.hover ?? []).map((node) => renderIconNode(node))
          : null}
        {derivedState() === "active"
          ? (icon.variants?.active ?? []).map((node) => renderIconNode(node))
          : null}
      </svg>
    );
  }

  // To mimic React's displayName for devtools
  Object.defineProperty(SolidIcon, "name", { value: componentName ?? icon.name });
  return SolidIcon;
}
