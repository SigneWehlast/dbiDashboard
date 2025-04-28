<script setup>
</script>

<template>
<div class="search-wrapper">
    <img src="../assets/icons/magnifying-glass-solid.svg" alt="search icon" class="search-icon">
    <input type="text" placeholder="Tryk for at søge" class="search-input p1">
  </div>
  </template>

<style scoped lang="scss">
.search-icon {
    width: 24px;
    height: 24px;
  }
  
  .search-wrapper {
    display: flex;
    align-items: center;
    gap: 24px;
  }
  
  .search-input {
    border: none;
    background: none;
    outline: none;
    width: 100%;
  }
</style>