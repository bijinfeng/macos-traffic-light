import { closeIcon, maximizeIcon, minimizeIcon } from "@macos-traffic-light/svg";
import { createReactIcon } from "./createIcon.tsx";

export const CloseIcon = createReactIcon(closeIcon, "CloseIcon");
export const MinimizeIcon = createReactIcon(minimizeIcon, "MinimizeIcon");
export const MaximizeIcon = createReactIcon(maximizeIcon, "MaximizeIcon");
