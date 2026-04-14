import { TrafficLight } from "@traffic-light/react";
import { useEffect, useMemo, useState } from "react";

type PropsState = {
  close: boolean;
  minimize: boolean;
  maximize: boolean;
  disabled: boolean;
  size: number;
  gap: number;
};

function dispatch(name: "close" | "minimize" | "maximize") {
  window.dispatchEvent(new CustomEvent("traffic-light:event", { detail: name }));
}

export default function ReactTrafficLight() {
  const [props, setProps] = useState<PropsState>({
    close: true,
    minimize: true,
    maximize: true,
    disabled: false,
    size: 12,
    gap: 8,
  });

  useEffect(() => {
    function onProps(event: Event) {
      if (!(event instanceof CustomEvent)) return;
      const detail = event.detail as Partial<PropsState> | undefined;
      if (!detail) return;
      setProps((prev) => ({ ...prev, ...detail }));
    }

    window.addEventListener("traffic-light:props", onProps);
    return () => window.removeEventListener("traffic-light:props", onProps);
  }, []);

  const callbacks = useMemo(
    () => ({
      onClose: () => dispatch("close"),
      onMinimize: () => dispatch("minimize"),
      onMaximize: () => dispatch("maximize"),
    }),
    [],
  );

  return <TrafficLight {...props} {...callbacks} />;
}
