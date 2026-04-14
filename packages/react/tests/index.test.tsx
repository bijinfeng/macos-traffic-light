import { expect, test } from "vite-plus/test";
import { renderToStaticMarkup } from "react-dom/server";
import { CloseIcon } from "../src/icons.tsx";
import { TrafficLight } from "../src/TrafficLight.tsx";

test("createReactIcon uses icon.colors defaults", () => {
  const html = renderToStaticMarkup(<CloseIcon state="active" />);
  expect(html).toMatch(/color:\s*#F09389/i);
});

test("TrafficLight renders enabled buttons", () => {
  const html = renderToStaticMarkup(<TrafficLight close minimize maximize />);
  expect((html.match(/<button\b/g) ?? []).length).toBe(3);
});

test("TrafficLight supports disabled", () => {
  const html = renderToStaticMarkup(<TrafficLight disabled />);
  expect((html.match(/<button\b[^>]*\sdisabled=""/g) ?? []).length).toBe(3);
});
