<script setup>
import { computed } from "vue";
import icon0 from "./icons/search.svg?raw";
import icon1 from "./icons/arrow-up-right.svg?raw";
import icon2 from "./icons/arrow-right.svg?raw";
import icon3 from "./icons/arrow-left.svg?raw";
import icon4 from "./icons/chevron-right.svg?raw";
import icon5 from "./icons/monitor.svg?raw";
import icon6 from "./icons/menu.svg?raw";
import icon7 from "./icons/x.svg?raw";
// Trusted, bundled Lucide SVGs only. No remote or user-generated SVG markup.
const props = defineProps({ name: { type: String, required: true } });
const icons = {
  "search": icon0,
  "arrow-up-right": icon1,
  "arrow-right": icon2,
  "arrow-left": icon3,
  "chevron-right": icon4,
  "monitor": icon5,
  "menu": icon6,
  "x": icon7
};
const shape = computed(() => (icons[props.name] || icons["arrow-right"]).match(/<svg[^>]*>([\s\S]*?)<\/svg>/)[1]);
</script>
<template>
  <svg class="site-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false" v-html="shape"></svg>
</template>
