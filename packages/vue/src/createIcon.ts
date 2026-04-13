import type { IconDefinition, IconNode, IconState } from "@macos-traffic-light/svg";
import { computed, defineComponent, h, ref } from "vue";
import type { CSSProperties, PropType, SetupContext, StyleValue, VNode, VNodeChild } from "vue";

export type VueIconProps = {
  state?: IconState;
  color?: string;
  hoverColor?: string;
  activeColor?: string;
};

function renderIconNode(node: IconNode): VNode {
  const children = node.children?.map(renderIconNode) as VNode[] | undefined;
  return h(node.tag, node.attrs ?? {}, children);
}

function mergeStyle(
  base: StyleValue | undefined,
  override: StyleValue | undefined,
): StyleValue | undefined {
  if (override === undefined) return base;
  if (base === undefined) return override;
  if (typeof base === "string" || typeof override === "string") return [base, override];
  if (Array.isArray(base) || Array.isArray(override)) return [base, override];
  return { ...(base as CSSProperties), ...(override as CSSProperties) } as CSSProperties;
}

export function createVueIcon(icon: IconDefinition, componentName?: string) {
  return defineComponent({
    name: componentName,
    inheritAttrs: false,
    props: {
      state: {
        type: String as PropType<IconState | undefined>,
        required: false,
      },
      color: {
        type: String as PropType<string | undefined>,
        required: false,
      },
      hoverColor: {
        type: String as PropType<string | undefined>,
        required: false,
      },
      activeColor: {
        type: String as PropType<string | undefined>,
        required: false,
      },
    },
    setup(props: VueIconProps, { attrs }: SetupContext) {
      const hovered = ref(false);
      const pressed = ref(false);

      const derivedState = computed<IconState>(() => {
        if (props.state) return props.state;
        if (pressed.value) return "active";
        if (hovered.value) return "hover";
        return "default";
      });

      const resolvedColor = computed(() => {
        const state = derivedState.value;
        const c = props.color ?? icon.colors?.default;
        const hc = props.hoverColor ?? icon.colors?.hover ?? c;
        const ac = props.activeColor ?? icon.colors?.active ?? hc;

        if (state === "active") return ac;
        if (state === "hover") return hc;
        return c;
      });

      return () => {
        const state = derivedState.value;
        const baseStyle: StyleValue | undefined = resolvedColor.value
          ? { color: resolvedColor.value }
          : undefined;

        const mergedStyle = mergeStyle(attrs.style as StyleValue | undefined, baseStyle);
        const children: VNodeChild[] = [
          ...icon.svg.children.map(renderIconNode),
          ...(state !== "default" ? (icon.variants?.hover ?? []).map(renderIconNode) : []),
          ...(state === "active" ? (icon.variants?.active ?? []).map(renderIconNode) : []),
        ];

        return h(
          "svg",
          {
            ...icon.svg.attrs,
            ...attrs,
            style: mergedStyle,
            onMouseenter: () => {
              if (props.state === undefined) hovered.value = true;
            },
            onMouseleave: () => {
              if (props.state === undefined) {
                hovered.value = false;
                pressed.value = false;
              }
            },
            onMousedown: () => {
              if (props.state === undefined) pressed.value = true;
            },
            onMouseup: () => {
              if (props.state === undefined) pressed.value = false;
            },
          },
          children,
        );
      };
    },
  });
}
