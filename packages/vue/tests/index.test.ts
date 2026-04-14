import { expect, test } from "vite-plus/test";
import { closeIcon } from "@macos-traffic-light/svg";
import { createVueIcon } from "../src/createIcon.ts";
import { TrafficLight } from "../src/TrafficLight.ts";

test("createVueIcon uses icon.colors defaults", () => {
  const CloseIcon = createVueIcon(closeIcon, "CloseIcon");
  const render = (CloseIcon as unknown as { setup: unknown }).setup as (
    props: { state?: "default" | "hover" | "active" },
    ctx: { attrs: Record<string, unknown> },
  ) => () => { type: unknown; props?: Record<string, unknown> };

  const vnode = render({ state: "active" }, { attrs: {} })();
  expect(vnode.type).toBe("svg");
  expect(vnode.props?.style).toEqual({ color: "#F09389" });
});

test("TrafficLight renders enabled buttons", () => {
  const render = (TrafficLight as unknown as { setup: unknown }).setup as (
    props: {
      close: boolean;
      minimize: boolean;
      maximize: boolean;
      disabled?: boolean;
      size?: number;
      gap?: number;
    },
    ctx: { emit: unknown },
  ) => () => { type: unknown; children?: unknown };

  const vnode = render({ close: true, minimize: true, maximize: true }, { emit: () => {} })();

  expect(vnode.type).toBe("div");
  expect(Array.isArray(vnode.children)).toBe(true);
  expect((vnode.children as unknown[]).length).toBe(3);
});

test("TrafficLight supports disabled", () => {
  const render = (TrafficLight as unknown as { setup: unknown }).setup as (
    props: {
      close: boolean;
      minimize: boolean;
      maximize: boolean;
      disabled?: boolean;
      size?: number;
      gap?: number;
    },
    ctx: { emit: unknown },
  ) => () => { type: unknown; children?: unknown };

  const vnode = render(
    {
      close: true,
      minimize: true,
      maximize: true,
      disabled: true,
    },
    { emit: () => {} },
  )();

  const children = vnode.children as unknown as Array<{ props?: Record<string, unknown> }>;
  expect(children[0]?.props?.disabled).toBe(true);
});
