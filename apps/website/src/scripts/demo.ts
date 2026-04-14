type Framework = "vue" | "react" | "solid" | "svelte" | "web-component";

export type PropsState = {
  framework: Framework;
  close: boolean;
  minimize: boolean;
  maximize: boolean;
  disabled: boolean;
  size: number;
  gap: number;
};

type MacosTrafficLightElement = HTMLElement & {
  close: boolean;
  minimize: boolean;
  maximize: boolean;
  disabled: boolean;
  size: number;
  gap: number;
};

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function highlightCode(value: string) {
  const escaped = escapeHtml(value);
  const tokenRe =
    /"(?:\\.|[^"\\])*"|(&lt;<\/?)([A-Za-z][\w-]*)|(\s)([:@]?[\w-]+)(=)|\b(import|from|const|function|return|true|false)\b|\b(\d+(?:\.\d+)?)\b|([[\]{}(),])/g;

  return escaped.replace(
    tokenRe,
    (
      match: string,
      tagPrefix: string | undefined,
      tagName: string | undefined,
      space: string | undefined,
      attrName: string | undefined,
      equals: string | undefined,
      keyword: string | undefined,
      number: string | undefined,
      punctuation: string | undefined,
    ) => {
      if (match.startsWith(`"`)) return `<span class="tok-str">${match}</span>`;
      if (tagPrefix && tagName) return `${tagPrefix}<span class="tok-tag">${tagName}</span>`;
      if (space && attrName && equals)
        return `${space}<span class="tok-attr">${attrName}</span>${equals}`;
      if (keyword) return `<span class="tok-kw">${keyword}</span>`;
      if (number) return `<span class="tok-num">${number}</span>`;
      if (punctuation) return `<span class="tok-punc">${punctuation}</span>`;
      return match;
    },
  );
}

function frameworkLabel(framework: Framework) {
  if (framework === "vue") return "Vue";
  if (framework === "react") return "React";
  if (framework === "solid") return "Solid";
  if (framework === "svelte") return "Svelte";
  return "Web Component";
}

function usageForFramework(state: PropsState) {
  if (state.framework === "vue") {
    return `import { TrafficLight } from "@traffic-light/vue";

<TrafficLight
  :close="${state.close}"
  :minimize="${state.minimize}"
  :maximize="${state.maximize}"
  :disabled="${state.disabled}"
  :size="${state.size}"
  :gap="${state.gap}"
  @close="onClose"
  @minimize="onMinimize"
  @maximize="onMaximize"
/>`;
  }

  if (state.framework === "react") {
    return `import { TrafficLight } from "@traffic-light/react";

export function App() {
  return (
    <TrafficLight
      close={${state.close}}
      minimize={${state.minimize}}
      maximize={${state.maximize}}
      disabled={${state.disabled}}
      size={${state.size}}
      gap={${state.gap}}
      onClose={() => {}}
      onMinimize={() => {}}
      onMaximize={() => {}}
    />
  );
}`;
  }

  if (state.framework === "solid") {
    return `import { TrafficLight } from "@traffic-light/solid";

export function App() {
  return (
    <TrafficLight
      close={${state.close}}
      minimize={${state.minimize}}
      maximize={${state.maximize}}
      disabled={${state.disabled}}
      size={${state.size}}
      gap={${state.gap}}
      onClose={() => {}}
      onMinimize={() => {}}
      onMaximize={() => {}}
    />
  );
}`;
  }

  if (state.framework === "svelte") {
    return `<script lang="ts">
  import { TrafficLight } from "@traffic-light/svelte";
<\\/script>

<TrafficLight
  close={${state.close}}
  minimize={${state.minimize}}
  maximize={${state.maximize}}
  disabled={${state.disabled}}
  size={${state.size}}
  gap={${state.gap}}
  onClose={() => {}}
  onMinimize={() => {}}
  onMaximize={() => {}}
/>`;
  }

  return `import { defineMacosTrafficLight } from "@traffic-light/web-component";

defineMacosTrafficLight();

const el = document.createElement("macos-traffic-light");
document.body.appendChild(el);

el.close = ${state.close};
el.minimize = ${state.minimize};
el.maximize = ${state.maximize};
el.disabled = ${state.disabled};
el.size = ${state.size};
el.gap = ${state.gap};

el.addEventListener("close", () => {});
el.addEventListener("minimize", () => {});
el.addEventListener("maximize", () => {});`;
}

export function setupTrafficLightDemo() {
  const state: PropsState = {
    framework: "vue",
    close: true,
    minimize: true,
    maximize: true,
    disabled: false,
    size: 12,
    gap: 8,
  };

  const tabs = Array.from(document.querySelectorAll<HTMLButtonElement>("[data-framework]"));
  const previews = Array.from(document.querySelectorAll<HTMLElement>("[data-preview]"));

  const title = document.getElementById("preview-title");
  const usage = document.getElementById("usage-code");
  const eventsEmpty = document.getElementById("events-empty");
  const eventsList = document.getElementById("events-list");
  const eventsHint = document.getElementById("events-hint");

  const wc = document.getElementById("wc-preview") as MacosTrafficLightElement | null;

  const closeEl = document.getElementById("ctl-close") as HTMLInputElement | null;
  const minimizeEl = document.getElementById("ctl-minimize") as HTMLInputElement | null;
  const maximizeEl = document.getElementById("ctl-maximize") as HTMLInputElement | null;
  const disabledEl = document.getElementById("ctl-disabled") as HTMLInputElement | null;
  const sizeEl = document.getElementById("ctl-size") as HTMLInputElement | null;
  const gapEl = document.getElementById("ctl-gap") as HTMLInputElement | null;
  const sizeValue = document.getElementById("ctl-size-value");
  const gapValue = document.getElementById("ctl-gap-value");

  const lines: string[] = [];

  function updateUsage() {
    if (!usage) return;
    usage.innerHTML = highlightCode(usageForFramework(state));
  }

  function dispatchProps() {
    window.dispatchEvent(
      new CustomEvent<PropsState>("traffic-light:props", { detail: { ...state } }),
    );
  }

  function updatePreviews() {
    for (const el of previews) {
      const id = el.getAttribute("data-preview");
      if (id === state.framework) el.removeAttribute("hidden");
      else el.setAttribute("hidden", "");
    }
    if (title) title.textContent = `${frameworkLabel(state.framework)} / TrafficLight`;
  }

  function updateEventsHint() {
    if (!eventsHint) return;
    if (state.framework === "vue") {
      eventsHint.innerHTML = `事件：<code>@close</code> / <code>@minimize</code> / <code>@maximize</code>`;
      return;
    }
    if (state.framework === "web-component") {
      eventsHint.innerHTML = `事件：<code>close</code> / <code>minimize</code> / <code>maximize</code>`;
      return;
    }
    eventsHint.innerHTML = `回调：<code>onClose</code> / <code>onMinimize</code> / <code>onMaximize</code>`;
  }

  async function ensureWebComponent() {
    if (!wc) return;
    const mod = await import("@traffic-light/web-component");
    mod.defineMacosTrafficLight();

    wc.addEventListener("close", () =>
      window.dispatchEvent(new CustomEvent("traffic-light:event", { detail: "close" })),
    );
    wc.addEventListener("minimize", () =>
      window.dispatchEvent(new CustomEvent("traffic-light:event", { detail: "minimize" })),
    );
    wc.addEventListener("maximize", () =>
      window.dispatchEvent(new CustomEvent("traffic-light:event", { detail: "maximize" })),
    );
  }

  function syncWebComponentProps() {
    if (!wc) return;
    wc.close = state.close;
    wc.minimize = state.minimize;
    wc.maximize = state.maximize;
    wc.disabled = state.disabled;
    wc.size = state.size;
    wc.gap = state.gap;
  }

  function updateAll() {
    updatePreviews();
    updateEventsHint();
    updateUsage();
    dispatchProps();
    syncWebComponentProps();
  }

  function renderEvents() {
    if (!eventsEmpty || !eventsList) return;

    if (lines.length === 0) {
      eventsEmpty.removeAttribute("hidden");
      eventsList.setAttribute("hidden", "");
      eventsList.replaceChildren();
      return;
    }

    eventsEmpty.setAttribute("hidden", "");
    eventsList.removeAttribute("hidden");
    eventsList.replaceChildren(
      ...lines.map((line) => {
        const li = document.createElement("li");
        li.className = "log-item";
        li.textContent = line;
        return li;
      }),
    );
  }

  function wireEvents() {
    window.addEventListener("traffic-light:event", (e: Event) => {
      if (!(e instanceof CustomEvent)) return;
      const detail = String(e.detail);
      const now = new Date();
      const timestamp = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(
        now.getSeconds(),
      ).padStart(2, "0")}`;
      lines.unshift(`${timestamp} ${detail}`);
      if (lines.length > 12) lines.length = 12;
      renderEvents();
    });

    renderEvents();
  }

  function wireControls() {
    if (closeEl) {
      closeEl.addEventListener("change", () => {
        state.close = closeEl.checked;
        updateAll();
      });
    }
    if (minimizeEl) {
      minimizeEl.addEventListener("change", () => {
        state.minimize = minimizeEl.checked;
        updateAll();
      });
    }
    if (maximizeEl) {
      maximizeEl.addEventListener("change", () => {
        state.maximize = maximizeEl.checked;
        updateAll();
      });
    }
    if (disabledEl) {
      disabledEl.addEventListener("change", () => {
        state.disabled = disabledEl.checked;
        updateAll();
      });
    }
    if (sizeEl) {
      sizeEl.addEventListener("input", () => {
        state.size = Number(sizeEl.value);
        if (sizeValue) sizeValue.textContent = String(state.size);
        updateAll();
      });
    }
    if (gapEl) {
      gapEl.addEventListener("input", () => {
        state.gap = Number(gapEl.value);
        if (gapValue) gapValue.textContent = String(state.gap);
        updateAll();
      });
    }
  }

  function wireTabs() {
    for (const btn of tabs) {
      btn.addEventListener("click", () => {
        const next = btn.getAttribute("data-framework") as Framework | null;
        if (!next || next === state.framework) return;

        state.framework = next;
        for (const tab of tabs) {
          const isActive = tab.getAttribute("data-framework") === next;
          tab.classList.toggle("tab--active", isActive);
          tab.setAttribute("aria-selected", isActive ? "true" : "false");
        }

        updateAll();
      });
    }
  }

  void (async () => {
    await ensureWebComponent();
    wireTabs();
    wireControls();
    wireEvents();
    updateAll();
  })();
}
