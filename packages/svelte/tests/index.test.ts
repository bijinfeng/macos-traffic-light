import { expect, test } from "vite-plus/test";
import { mount, unmount } from "svelte";
import { CloseIcon, TrafficLight } from "../src/index.ts";

test("CloseIcon uses icon.colors defaults", async () => {
  const target = document.createElement("div");
  document.body.appendChild(target);

  const app = mount(CloseIcon as unknown as Parameters<typeof mount>[0], {
    target,
    props: { state: "active", width: 12, height: 12 },
  });

  expect(target.innerHTML).toMatch(/color:\s*(#F09389|rgb\(240,\s*147,\s*137\))/i);

  await unmount(app);
  target.remove();
});

test("TrafficLight renders enabled buttons", async () => {
  const target = document.createElement("div");
  document.body.appendChild(target);

  const app = mount(TrafficLight as unknown as Parameters<typeof mount>[0], {
    target,
    props: { close: true, minimize: true, maximize: true },
  });

  expect(target.querySelectorAll("button").length).toBe(3);

  await unmount(app);
  target.remove();
});

test("TrafficLight supports disabled", async () => {
  const target = document.createElement("div");
  document.body.appendChild(target);

  const app = mount(TrafficLight as unknown as Parameters<typeof mount>[0], {
    target,
    props: { disabled: true },
  });

  const buttons = Array.from(target.querySelectorAll("button"));
  expect(buttons.length).toBe(3);
  expect(buttons.every((b) => b.hasAttribute("disabled"))).toBe(true);

  await unmount(app);
  target.remove();
});

test("TrafficLight supports click callbacks", async () => {
  const target = document.createElement("div");
  document.body.appendChild(target);

  const received: string[] = [];
  const app = mount(TrafficLight as unknown as Parameters<typeof mount>[0], {
    target,
    props: {
      onClose: () => received.push("close"),
      onMinimize: () => received.push("minimize"),
      onMaximize: () => received.push("maximize"),
    },
  });

  const buttons = Array.from(target.querySelectorAll("button"));
  (buttons[0] as HTMLButtonElement | undefined)?.click();
  (buttons[1] as HTMLButtonElement | undefined)?.click();
  (buttons[2] as HTMLButtonElement | undefined)?.click();

  expect(received).toEqual(["close", "minimize", "maximize"]);

  await unmount(app);
  target.remove();
});
