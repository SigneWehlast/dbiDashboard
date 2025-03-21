<script setup>

</script>

<template>
<div class="right-view">
    <div class="profile-bar">
      <div class="search-wrapper">
        <img src="../assets/icons/magnifying-glass-solid.svg" alt="search icon" class="search-icon">
        <input type="text" placeholder="Tryk for at søge" class="search-input p1">
      </div>
      <div class="profile-wrapper">
        <img src="../assets/icons/bell-solid.svg" alt="profile icon" class="profile-icon">
        <div class="profile-name-wrapper">
          <p class="h3">Allan Rasmussen</p>
          <p class="profile-company">Salling Group</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
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
