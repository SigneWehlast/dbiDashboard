<script setup>
import { ref } from 'vue';

defineProps({
  imgSrc: {
    type: String,
    required: true
  },
  hoverImgSrc: {
    type: String,
    required: true
  },
  imgAlt: {
    type: String,
    default: 'icon'
  },
  isActive: {
    type: Boolean,
    default: false
  }
});

const isHovered = ref(false);
</script>

<template>
  <button
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    :class="{ active: isActive }"
  >
    <img
      :src="(isHovered || isActive) ? hoverImgSrc : imgSrc"
      :alt="imgAlt"
      class="button-icon"
    >
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">
@import "@/assets/main.scss";

button {
  align-items: center;
  background-color: #F4F5F5;
  border: none;
  border-radius: 25px;
  color: $dark-grey;
  cursor: pointer;
  display: flex;
  gap: 1.5em;
  height: 5.2em;
  margin: 0;
  padding: 0 2em;
  width: 100%;

  &:hover {
    background-color: #A4CBE0;
    color: $white;
  }

  &.active {
    background-color: $main-blue;
    color: $white;
  }
}


.button-icon {
  width: 24px;
  height: 24px;
}

a.nav-button {
  color: inherit;
  text-decoration: none;
}

:deep(*) {
  color: inherit;
  text-decoration: none;
}
</style>
