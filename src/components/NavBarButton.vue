<script setup>

</script>

<template>
  <button>
    <slot>
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
  padding: 0;
  margin: 0;
}

</style>