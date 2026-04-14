import type { IconAttrs, IconDefinition, IconNode, IconState } from "@macos-traffic-light/svg";

export type SvgIconProps = {
  state?: IconState;
  color?: string;
  hoverColor?: string;
  activeColor?: string;
  width?: number | string;
  height?: number | string;
};

function toAttrValue(value: string | number | boolean): string {
  return typeof value === "boolean" ? (value ? "" : "false") : String(value);
}

function applyAttrs(el: Element, attrs: IconAttrs | undefined) {
  if (!attrs) return;
  for (const [key, value] of Object.entries(attrs)) {
    if (value === undefined) continue;
    el.setAttribute(key, toAttrValue(value));
  }
}

function renderIconNode(node: IconNode, doc: Document): SVGElement {
  const el = doc.createElementNS("http://www.w3.org/2000/svg", node.tag);
  applyAttrs(el, node.attrs);
  if (node.children) {
    for (const child of node.children) {
      el.appendChild(renderIconNode(child, doc));
    }
  }
  return el;
}

function resolveColor(
  icon: IconDefinition,
  state: IconState,
  props: SvgIconProps,
): string | undefined {
  if (state === "active")
    return props.activeColor ?? props.hoverColor ?? props.color ?? icon.colors?.active;
  if (state === "hover") return props.hoverColor ?? props.color ?? icon.colors?.hover;
  return props.color ?? icon.colors?.default;
}

export function createSvgIcon(icon: IconDefinition) {
  return function renderSvgIcon(props: SvgIconProps = {}, doc: Document = document): SVGSVGElement {
    const state = props.state ?? "default";
    const svg = doc.createElementNS("http://www.w3.org/2000/svg", "svg");

    applyAttrs(svg, icon.svg.attrs);
    if (props.width !== undefined) svg.setAttribute("width", String(props.width));
    if (props.height !== undefined) svg.setAttribute("height", String(props.height));

    const color = resolveColor(icon, state, props);
    if (color) svg.style.color = color;

    for (const node of icon.svg.children) {
      svg.appendChild(renderIconNode(node, doc));
    }

    if (state !== "default") {
      for (const node of icon.variants?.hover ?? []) {
        svg.appendChild(renderIconNode(node, doc));
      }
    }

    if (state === "active") {
      for (const node of icon.variants?.active ?? []) {
        svg.appendChild(renderIconNode(node, doc));
      }
    }

    return svg;
  };
}
