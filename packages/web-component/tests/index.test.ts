import { expect, test } from "vite-plus/test";
import { defineMacosTrafficLight, macosTrafficLightTagName } from "../src/index.ts";

test("defineMacosTrafficLight defines the custom element", () => {
  defineMacosTrafficLight();
  expect(customElements.get(macosTrafficLightTagName)).toBeTruthy();
});

test("macos-traffic-light renders enabled buttons", () => {
  defineMacosTrafficLight();

  const el = document.createElement(macosTrafficLightTagName);
  document.body.appendChild(el);

  const buttons = el.shadowRoot?.querySelectorAll("button");
  expect(buttons?.length).toBe(3);

  el.remove();
});

test("macos-traffic-light supports disabled", () => {
  defineMacosTrafficLight();

  const el = document.createElement(macosTrafficLightTagName);
  el.setAttribute("disabled", "");
  document.body.appendChild(el);

  const buttons = Array.from(el.shadowRoot?.querySelectorAll("button") ?? []);
  expect(buttons.length).toBe(3);
  expect(buttons.every((b) => b.hasAttribute("disabled"))).toBe(true);

  el.remove();
});

test("macos-traffic-light dispatches click events", () => {
  defineMacosTrafficLight();

  const el = document.createElement(macosTrafficLightTagName);
  document.body.appendChild(el);

  const received: string[] = [];
  el.addEventListener("close", () => received.push("close"));
  el.addEventListener("minimize", () => received.push("minimize"));
  el.addEventListener("maximize", () => received.push("maximize"));

  const buttons = Array.from(el.shadowRoot?.querySelectorAll("button") ?? []);
  (buttons[0] as HTMLButtonElement | undefined)?.click();
  (buttons[1] as HTMLButtonElement | undefined)?.click();
  (buttons[2] as HTMLButtonElement | undefined)?.click();

  expect(received).toEqual(["close", "minimize", "maximize"]);

  el.remove();
});
