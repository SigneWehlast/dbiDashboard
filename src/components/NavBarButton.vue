<script setup>
import { ref } from 'vue';

//props der anvendes i navbar
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
@use "@/assets/main.scss" as v;

button {
  align-items: center;
  background-color: v.$background-color;
  border: none;
  border-radius: 25px;
  color: v.$dark-grey;
  cursor: pointer;
  display: flex;
  gap: 1.5em;
  height: 5.2em;
  margin: 0;
  padding: 0 2em;
  width: 100%;

  &:hover {
    background-color: v.$button-hover;
    color: v.$white;
    
    :deep(.p1) {
      color: v.$white;
    }
  }

  &.active {
    background-color: v.$main-blue;
    color: v.$white;

    :deep(.p1) {
      color: v.$white;
    }
  }
}


.button-icon {
  height: 24px;
  width: 24px;
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
