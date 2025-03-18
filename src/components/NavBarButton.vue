<script setup>
import { ref } from "vue";

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
    default: "icon"
  }
});

const isHovered = ref(false);
</script>

<template>
  <button
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <img
      :src="isHovered ? hoverImgSrc : imgSrc"
      :alt="imgAlt"
      class="button-icon"
    >
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">
button {
  width: 100%;
  height: 70px;
  background-color: #F4F5F5;
  border: none;
  border-radius: 25px;
  padding: 0 28px;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 24px;
  font-size: 25px;
  font-weight: 100;
  color: #707070;
  cursor: pointer;
}

button:hover {
  background-color: #A4CBE0;
  color: #FFFFFF;
}

.button-icon {
  width: 24px;
  height: 24px;
}
</style>
