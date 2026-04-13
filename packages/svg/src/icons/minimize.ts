import { defineIcon } from "../icon.ts";

export const minimizeIcon = defineIcon({
  name: "macos-traffic-light-minimize",
  colors: {
    default: "#F4BF4F",
    active: "#FBEB74",
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
          d: "M17.7 39.1H67.5999C69.4999 39.1 71.0999 40.7 71.0999 42.6V42.7C71.0999 44.6 69.4999 46.2 67.5999 46.2H17.7C15.8 46.2 14.2 44.6 14.2 42.7V42.6C14.2 40.7 15.8 39.1 17.7 39.1Z",
          fill: "#A87229",
        },
      },
    ],
  },
});
