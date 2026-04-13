import { expect, test } from "vite-plus/test";
import { closeIcon, maximizeIcon, minimizeIcon } from "../src/index.ts";

test("closeIcon structure", () => {
  expect(closeIcon.colors?.default).toBe("#EC6A5E");
  expect(closeIcon.colors?.active).toBe("#F09389");
  expect(closeIcon.svg.attrs?.width).toBe(12);
  expect(closeIcon.svg.children.length).toBeGreaterThanOrEqual(2);
  expect(closeIcon.variants?.hover?.length).toBeGreaterThanOrEqual(1);
});

test("minimizeIcon structure", () => {
  expect(minimizeIcon.colors?.default).toBe("#F4BF4F");
  expect(minimizeIcon.colors?.active).toBe("#FBEB74");
  expect(minimizeIcon.variants?.hover?.[0]?.attrs?.fill).toBe("#A87229");
});

test("maximizeIcon structure", () => {
  expect(maximizeIcon.colors?.default).toBe("#62C554");
  expect(maximizeIcon.colors?.active).toBe("#86F37E");
  expect(maximizeIcon.variants?.hover?.[0]?.attrs?.fill).toBe("#286017");
});
