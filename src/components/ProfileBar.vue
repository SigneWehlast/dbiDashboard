<script setup>
import OverviewWidget from "./OverviewWidget.vue";


</script>

<template>
<div class="right-view">
    <div class="profile-bar">
      <div class="search-wrapper">
        <img src="../assets/icons/magnifying-glass-solid.svg" alt="search icon" class="search-icon">
        <input type="text" placeholder="Tryk for at søge" class="search-input">
      </div>
      <div class="profile-wrapper">
        <img src="../assets/icons/bell-solid.svg" alt="profile icon" class="profile-icon">
        <div class="profile-name-wrapper">
          <p class="heading-medium">Allan Rasmussen</p>
          <p class="profile-company">Salling Group</p>
        </div>
      </div>
    </div>
  
  <OverviewWidget />
  </div>
</template>

<style scoped lang="scss">
@import '../assets/main.scss';

.profile-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: fit-content;
}

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
  @include body-text;

  &::placeholder {
    @include body-text;
  }
}

.profile-wrapper {
  display: flex;
  align-items: center;
  gap: 24px;
}

.profile-icon {
  width: 32px;
  height: 32px;
}

.profile-company {
  font-size: 20px;
  font-weight: 200;
  line-height: 1.4;
  margin: 0;
  letter-spacing: 0.01em;
  color: #5F6B6C;
}

.right-view{
  display: flex;
  flex-direction: column;
}
</style>
