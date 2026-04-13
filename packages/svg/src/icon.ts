export type IconAttrValue = string | number | boolean;

export type IconAttrs = Record<string, IconAttrValue | undefined>;

export type IconNode = {
  tag: string;
  attrs?: IconAttrs;
  children?: IconNode[];
};

export type IconState = "default" | "hover" | "active";

export type IconVariants = Partial<Record<Exclude<IconState, "default">, IconNode[]>>;

export type IconColors = {
  default?: string;
  hover?: string;
  active?: string;
};

export type IconDefinition = {
  name: string;
  svg: {
    attrs?: IconAttrs;
    children: IconNode[];
  };
  variants?: IconVariants;
  colors?: IconColors;
};

export function defineIcon(definition: IconDefinition): IconDefinition {
  return definition;
}
