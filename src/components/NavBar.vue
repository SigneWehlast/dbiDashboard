<script setup>

import NavBarButton from "./NavBarButton.vue";
</script>

<template>
  <div class="nav-bar">
    <img src="../assets/icons/DBI_logo.svg" alt="logo" class="logo">

    <NavBarButton>
      <img src="../assets/icons/gauge-solid.svg" alt="navbar icon" class="button-icon">
      <p>Forside</p>
    </NavBarButton>
  </div>
</template>

<style scoped lang="scss">

.logo {
  width: 200px;
}

.nav-bar {
  width: 300px;
  height: 100%;
}

.button-icon {
  width: 20px;
  height: 20px;
}

</style>
