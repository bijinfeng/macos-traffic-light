# macos-traffic-light

一个可复用的 macOS 窗口控制按钮（Traffic Light）组件库：同一套结构化 SVG 数据，输出到五种框架/形态，并保持一致的交互状态（default / hover / active）。

## 包与目录

- `packages/svg`：结构化 SVG 图标数据（颜色 + 节点树 + hover/active 变体）
  - 包名：`@macos-traffic-light/svg`
- `packages/vue`：Vue 组件
  - 包名：`@traffic-light/vue`
- `packages/react`：React 组件
  - 包名：`@traffic-light/react`
- `packages/solid`：Solid 组件
  - 包名：`@traffic-light/solid`
- `packages/svelte`：Svelte 组件
  - 包名：`@traffic-light/svelte`
- `packages/web-component`：Web Component（自定义元素）
  - 包名：`@traffic-light/web-component`
- `apps/website`：Astro Demo 站点（五种实现实时切换 + props/usage/events）

## 安装

要求：Node `>= 22.12.0`，包管理器：`pnpm`

```bash
pnpm install
```

## 使用

### Vue

```vue
<script setup lang="ts">
import { TrafficLight } from "@traffic-light/vue";
</script>

<template>
  <TrafficLight
    :close="true"
    :minimize="true"
    :maximize="true"
    :disabled="false"
    :size="12"
    :gap="8"
    @close="() => {}"
    @minimize="() => {}"
    @maximize="() => {}"
  />
</template>
```

### React

```jsx
import { TrafficLight } from "@traffic-light/react";

export function App() {
  return (
    <TrafficLight
      close
      minimize
      maximize
      disabled={false}
      size={12}
      gap={8}
      onClose={() => {}}
      onMinimize={() => {}}
      onMaximize={() => {}}
    />
  );
}
```

### Solid

```jsx
import { TrafficLight } from "@traffic-light/solid";

export function App() {
  return (
    <TrafficLight
      close
      minimize
      maximize
      disabled={false}
      size={12}
      gap={8}
      onClose={() => {}}
      onMinimize={() => {}}
      onMaximize={() => {}}
    />
  );
}
```

### Svelte

```svelte
<script lang="ts">
  import { TrafficLight } from "@traffic-light/svelte";
</script>

<TrafficLight
  close
  minimize
  maximize
  disabled={false}
  size={12}
  gap={8}
  onClose={() => {}}
  onMinimize={() => {}}
  onMaximize={() => {}}
/>
```

### Web Component

```js
import { defineMacosTrafficLight } from "@traffic-light/web-component";

defineMacosTrafficLight();
```

```html
<macos-traffic-light close minimize maximize size="12" gap="8"></macos-traffic-light>
<script type="module">
  const el = document.querySelector("macos-traffic-light");
  el?.addEventListener("close", () => {});
  el?.addEventListener("minimize", () => {});
  el?.addEventListener("maximize", () => {});
</script>
```

## 开发与验证

### Demo 站点（Astro）

```bash
pnpm dev
```

### 一键检查（格式化 + lint + 测试 + 构建）

```bash
pnpm ready
```

### 单项任务

```bash
pnpm vp run -r check
pnpm vp run -r test
pnpm vp run -r build
```
