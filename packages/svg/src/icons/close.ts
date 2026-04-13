import { defineIcon } from "../icon.ts";

export const closeIcon = defineIcon({
  name: "macos-traffic-light-close",
  colors: {
    default: "#EC6A5E",
    active: "#F09389",
  },
  svg: {
    attrs: {
      width: 12,
      height: 12,
      viewBox: "0 0 85.4 85.4",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
    },
    children: [
      {
        tag: "path",
        attrs: {
          "fill-rule": "evenodd",
          "clip-rule": "evenodd",
          d: "M42.7 85.4C66.3 85.4 85.4 66.3 85.4 42.7C85.4 19.1 66.3 0 42.7 0C19.1 0 0 19.1 0 42.7C0 66.3 19.1 85.4 42.7 85.4Z",
          fill: "currentColor",
        },
      },
      {
        tag: "path",
        attrs: {
          "fill-rule": "evenodd",
          "clip-rule": "evenodd",
          d: "M42.7 81.8C64.3 81.8 81.8 64.3 81.8 42.7C81.8 21.1 64.3 3.59998 42.7 3.59998C21.1 3.59998 3.59998 21.1 3.59998 42.7C3.59998 64.3 21.1 81.8 42.7 81.8Z",
          fill: "currentColor",
        },
      },
    ],
  },
  variants: {
    hover: [
      {
        tag: "path",
        attrs: {
          "fill-rule": "evenodd",
          "clip-rule": "evenodd",
          d: "M22.5 57.7999L57.7999 22.5C59.1999 21.1 61.3999 21.1 62.7999 22.5L62.9 22.6C64.3 24 64.3 26.2 62.9 27.6L27.6 62.9C26.2 64.3 24 64.3 22.6 62.9L22.5 62.7999C21.1 61.3999 21.1 59.0999 22.5 57.7999Z",
          fill: "#8B1A0F",
        },
      },
      {
        tag: "path",
        attrs: {
          "fill-rule": "evenodd",
          "clip-rule": "evenodd",
          d: "M27.5 22.5L62.8 57.7999C64.2 59.1999 64.2 61.3999 62.8 62.7999L62.7 62.9C61.3 64.3 59.1 64.3 57.7 62.9L22.4 27.6C21 26.2 21 24 22.4 22.6L22.5 22.5C23.9 21.1 26.2 21.1 27.5 22.5Z",
          fill: "#8B1A0F",
        },
      },
    ],
  },
});
