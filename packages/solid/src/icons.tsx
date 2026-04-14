import { closeIcon, maximizeIcon, minimizeIcon } from "@traffic-light/svg";
import { createSolidIcon } from "./createIcon.tsx";

export const CloseIcon = createSolidIcon(closeIcon, "CloseIcon");
export const MinimizeIcon = createSolidIcon(minimizeIcon, "MinimizeIcon");
export const MaximizeIcon = createSolidIcon(maximizeIcon, "MaximizeIcon");
