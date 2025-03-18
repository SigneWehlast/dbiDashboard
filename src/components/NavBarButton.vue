<script setup>
defineProps({
  imgSrc: {
    type: String,
    default: "../assets/icons/gauge-solid.svg"
  },
  imgAlt: {
    type: String,
    default: "icon"
  }
});
</script>

<template>
  <button>
    <slot>
      <img :src="imgSrc" :alt="imgAlt" class="button-icon">
      <p>Button</p>
    </slot>
  </button>
</template>

<style scoped lang="scss">

button {
  width: 100%;
  height: 70px;
  background-color: #2B7393;
  border: none;
  border-radius: 25px;
  padding: 0 28px;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 24px;
  font-size: 25px;
  font-weight: 100;
  color: #FFFFFF;

}
</style>