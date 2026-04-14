import type { IconState } from "@traffic-light/svg";
import { CloseIcon, MaximizeIcon, MinimizeIcon } from "./icons.ts";

export const macosTrafficLightTagName = "macos-traffic-light";

export type MacosTrafficLightButton = "close" | "minimize" | "maximize";

type ButtonRefs = Partial<Record<MacosTrafficLightButton, HTMLButtonElement>>;
type IconRefs = Partial<Record<MacosTrafficLightButton, SVGSVGElement>>;
type ButtonState = Partial<Record<MacosTrafficLightButton, IconState>>;

function parseBooleanAttribute(value: string | null, defaultValue: boolean): boolean {
  if (value === null) return defaultValue;
  if (value === "") return true;
  const normalized = value.trim().toLowerCase();
  if (normalized === "false" || normalized === "0" || normalized === "no") return false;
  return true;
}

function parseNumberAttribute(value: string | null, defaultValue: number): number {
  if (value === null) return defaultValue;
  const n = Number(value);
  return Number.isFinite(n) ? n : defaultValue;
}

function buildButtonStyle(disabled: boolean): string {
  const opacity = disabled ? 0.45 : 1;
  const cursor = disabled ? "default" : "pointer";
  return `border:none;padding:0;background:transparent;cursor:${cursor};display:inline-flex;align-items:center;justify-content:center;opacity:${opacity}`;
}

function renderContainerStyle(gap: number): string {
  return `display:flex;align-items:center;gap:${gap}px`;
}

function nextStateFromEvent(kind: "enter" | "leave" | "down" | "up" | "blur"): IconState {
  if (kind === "down") return "active";
  if (kind === "leave" || kind === "blur") return "default";
  return "hover";
}

export class MacosTrafficLightElement extends HTMLElement {
  static observedAttributes = ["close", "minimize", "maximize", "disabled", "size", "gap"];

  #buttons: ButtonRefs = {};
  #icons: IconRefs = {};
  #state: ButtonState = {};

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  get close(): boolean {
    return parseBooleanAttribute(this.getAttribute("close"), true);
  }
  set close(value: boolean) {
    this.setAttribute("close", value ? "true" : "false");
  }

  get minimize(): boolean {
    return parseBooleanAttribute(this.getAttribute("minimize"), true);
  }
  set minimize(value: boolean) {
    this.setAttribute("minimize", value ? "true" : "false");
  }

  get maximize(): boolean {
    return parseBooleanAttribute(this.getAttribute("maximize"), true);
  }
  set maximize(value: boolean) {
    this.setAttribute("maximize", value ? "true" : "false");
  }

  get disabled(): boolean {
    return parseBooleanAttribute(this.getAttribute("disabled"), false);
  }
  set disabled(value: boolean) {
    if (value) this.setAttribute("disabled", "");
    else this.removeAttribute("disabled");
  }

  get size(): number {
    return parseNumberAttribute(this.getAttribute("size"), 12);
  }
  set size(value: number) {
    this.setAttribute("size", String(value));
  }

  get gap(): number {
    return parseNumberAttribute(this.getAttribute("gap"), 8);
  }
  set gap(value: number) {
    this.setAttribute("gap", String(value));
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const root = this.shadowRoot;
    if (!root) return;

    root.replaceChildren();

    const style = document.createElement("style");
    style.textContent = `:host{display:inline-block}`;

    const container = document.createElement("div");
    container.className = "mac-traffic-light";
    container.setAttribute("style", renderContainerStyle(this.gap));

    const disabled = this.disabled;
    const size = this.size;

    this.#buttons = {};
    this.#icons = {};
    this.#state = {};

    const addButton = (kind: MacosTrafficLightButton) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `mac-btn mac-btn--${kind}`;
      button.setAttribute("style", buildButtonStyle(disabled));
      button.disabled = disabled;
      if (disabled) button.setAttribute("aria-disabled", "true");

      const iconFactory =
        kind === "close" ? CloseIcon : kind === "minimize" ? MinimizeIcon : MaximizeIcon;
      const initialState: IconState = disabled ? "default" : "default";
      this.#state[kind] = initialState;

      const svg = iconFactory({ state: initialState, width: size, height: size });
      this.#icons[kind] = svg;
      button.appendChild(svg);

      const update = (eventKind: Parameters<typeof nextStateFromEvent>[0]) => {
        if (this.disabled) return;
        const next = nextStateFromEvent(eventKind);
        this.#state[kind] = next;
        const current = this.#icons[kind];
        const nextSvg = iconFactory({ state: next, width: this.size, height: this.size });
        this.#icons[kind] = nextSvg;
        if (current) current.replaceWith(nextSvg);
        else button.appendChild(nextSvg);
      };

      button.addEventListener("mouseenter", () => update("enter"));
      button.addEventListener("mouseleave", () => update("leave"));
      button.addEventListener("mousedown", () => update("down"));
      button.addEventListener("mouseup", () => update("up"));
      button.addEventListener("blur", () => update("blur"));

      button.addEventListener("click", () => {
        if (this.disabled) return;
        this.dispatchEvent(new CustomEvent(kind, { bubbles: true, composed: true }));
      });

      this.#buttons[kind] = button;
      container.appendChild(button);
    };

    if (this.close) addButton("close");
    if (this.minimize) addButton("minimize");
    if (this.maximize) addButton("maximize");

    root.append(style, container);
  }
}

export function defineMacosTrafficLight(tagName: string = macosTrafficLightTagName) {
  if (customElements.get(tagName)) return;
  customElements.define(tagName, MacosTrafficLightElement);
}
