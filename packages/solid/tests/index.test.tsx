import { expect, test } from "vite-plus/test";
import { render } from "solid-testing-library";
import { CloseIcon } from "../src/icons.tsx";
import { TrafficLight } from "../src/TrafficLight.tsx";

test("createSolidIcon uses icon.colors defaults", () => {
  const { container } = render(() => <CloseIcon state="active" />);
  expect(container.innerHTML).toMatch(/color:\s*(#F09389|rgb\(240,\s*147,\s*137\))/i);
});

test("TrafficLight renders enabled buttons", () => {
  const { container } = render(() => <TrafficLight close minimize maximize />);
  expect((container.innerHTML.match(/<button\b/g) ?? []).length).toBe(3);
});

test("TrafficLight supports disabled", () => {
  const { container } = render(() => <TrafficLight disabled />);
  expect((container.innerHTML.match(/<button\b[^>]*\sdisabled=""/g) ?? []).length).toBe(3);
});
