<script setup lang="ts">
import { TrafficLight } from "@traffic-light/vue";
import { computed, ref } from "vue";

const showClose = ref(true);
const showMinimize = ref(true);
const showMaximize = ref(true);
const isMaximized = ref(false);

const title = computed(() => (isMaximized.value ? "Maximized" : "Normal"));

const usage = computed(
  () => `import { TrafficLight } from "@traffic-light/vue";

<TrafficLight
  :close="${showClose.value}"
  :minimize="${showMinimize.value}"
  :maximize="${showMaximize.value}"
  :isMaximized="${isMaximized.value}"
  @close="onClose"
  @minimize="onMinimize"
  @maximize="onMaximize"
/>`,
);

function onToggleMaximized() {
  isMaximized.value = !isMaximized.value;
}

function onMaximize() {
  onToggleMaximized();
}

function onClose() {}
function onMinimize() {}
</script>

<template>
  <main class="page">
    <header class="hero">
      <div class="hero-top">
        <div class="badge">Vue Demo</div>
        <a class="hero-link" href="https://github.com" target="_blank" rel="noreferrer"> GitHub </a>
      </div>

      <h1 class="hero-title">
        macos-traffic-light
        <span class="hero-title-accent">for Vue</span>
      </h1>

      <p class="hero-subtitle">
        从结构化 SVG 数据生成组件：交互状态（default / hover / active）和默认颜色都来自图标数据。
      </p>
    </header>

    <section class="grid">
      <div class="card">
        <div class="card-title">Preview</div>
        <div class="window">
          <div class="titlebar">
            <TrafficLight
              :close="showClose"
              :minimize="showMinimize"
              :maximize="showMaximize"
              :isMaximized="isMaximized"
              @close="onClose"
              @minimize="onMinimize"
              @maximize="onMaximize"
            />
            <div class="window-title">{{ title }}</div>
            <button type="button" class="pill" @click="onToggleMaximized">
              Toggle isMaximized
            </button>
          </div>
          <div class="window-content">
            <p class="hint">把鼠标移到按钮上查看 hover，按下查看 active。</p>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-title">Controls</div>
        <div class="controls">
          <label class="switch">
            <input v-model="showClose" type="checkbox" />
            <span class="track" />
            <span class="label">close</span>
          </label>

          <label class="switch">
            <input v-model="showMinimize" type="checkbox" />
            <span class="track" />
            <span class="label">minimize</span>
          </label>

          <label class="switch">
            <input v-model="showMaximize" type="checkbox" />
            <span class="track" />
            <span class="label">maximize</span>
          </label>
        </div>

        <div class="divider" />

        <div class="card-title">Usage</div>
        <pre class="code"><code>{{ usage }}</code></pre>
      </div>
    </section>
  </main>
</template>
