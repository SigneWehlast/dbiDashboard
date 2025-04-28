<script setup>
</script>

<template>
<div class="search-wrapper">
    <img src="../assets/icons/magnifying-glass-solid.svg" alt="search icon" class="search-icon">
    <input type="text" placeholder="Tryk for at søge" class="search-input p1">
  </div>
  </template>

<style scoped lang="scss">
.search {

  &-icon {
    height: 1.5em;
    width: 1.5em;
  }
  
  &-wrapper {
    align-items: center;
    display: flex;
    gap: 1.5em;
  }
  
  &-input {
    background: none;
    border: none;
    outline: none;
    width: 100%;
  }

}
</style>