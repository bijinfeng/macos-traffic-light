<script setup lang="ts">
import { TrafficLight } from "@traffic-light/vue";
import { onBeforeUnmount, onMounted, ref } from "vue";

type PropsState = {
  close?: boolean;
  minimize?: boolean;
  maximize?: boolean;
  disabled?: boolean;
  size?: number;
  gap?: number;
};

const close = ref(true);
const minimize = ref(true);
const maximize = ref(true);
const disabled = ref(false);
const size = ref(12);
const gap = ref(8);

function dispatch(name: "close" | "minimize" | "maximize") {
  window.dispatchEvent(new CustomEvent("traffic-light:event", { detail: name }));
}

function apply(detail: PropsState) {
  if (typeof detail.close === "boolean") close.value = detail.close;
  if (typeof detail.minimize === "boolean") minimize.value = detail.minimize;
  if (typeof detail.maximize === "boolean") maximize.value = detail.maximize;
  if (typeof detail.disabled === "boolean") disabled.value = detail.disabled;
  if (typeof detail.size === "number") size.value = detail.size;
  if (typeof detail.gap === "number") gap.value = detail.gap;
}

function onProps(event: Event) {
  if (!(event instanceof CustomEvent)) return;
  const detail = event.detail as PropsState | undefined;
  if (!detail) return;
  apply(detail);
}

onMounted(() => {
  window.addEventListener("traffic-light:props", onProps);
});

onBeforeUnmount(() => {
  window.removeEventListener("traffic-light:props", onProps);
});
</script>

<template>
  <TrafficLight
    :close="close"
    :minimize="minimize"
    :maximize="maximize"
    :disabled="disabled"
    :size="size"
    :gap="gap"
    @close="dispatch('close')"
    @minimize="dispatch('minimize')"
    @maximize="dispatch('maximize')"
  />
</template>
