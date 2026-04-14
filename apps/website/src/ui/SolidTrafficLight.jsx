import { TrafficLight } from "@traffic-light/solid";
import { createSignal, onCleanup, onMount } from "solid-js";

function dispatch(name) {
  window.dispatchEvent(new CustomEvent("traffic-light:event", { detail: name }));
}

export default function SolidTrafficLight() {
  const [props, setProps] = createSignal({
    close: true,
    minimize: true,
    maximize: true,
    disabled: false,
    size: 12,
    gap: 8,
  });

  onMount(() => {
    const onProps = (event) => {
      if (!(event instanceof CustomEvent)) return;
      const detail = event.detail;
      if (!detail) return;
      setProps((prev) => ({ ...prev, ...detail }));
    };

    window.addEventListener("traffic-light:props", onProps);
    onCleanup(() => window.removeEventListener("traffic-light:props", onProps));
  });

  return (
    <TrafficLight
      {...props()}
      onClose={() => dispatch("close")}
      onMinimize={() => dispatch("minimize")}
      onMaximize={() => dispatch("maximize")}
    />
  );
}
