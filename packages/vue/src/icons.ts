import { closeIcon, maximizeIcon, minimizeIcon } from "@traffic-light/svg";
import { createVueIcon } from "./createIcon.ts";

export const CloseIcon = createVueIcon(closeIcon, "CloseIcon");
export const MinimizeIcon = createVueIcon(minimizeIcon, "MinimizeIcon");
export const MaximizeIcon = createVueIcon(maximizeIcon, "MaximizeIcon");
