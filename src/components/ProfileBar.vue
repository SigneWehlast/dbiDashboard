<script setup>
import { useAuthStore } from '@/stores/AuthStore';
import { storeToRefs } from 'pinia';
import SearchBar from '@/components/SearchBar.vue';

const authStore = useAuthStore();
const { user, isAuthReady } = storeToRefs(authStore);
</script>

<template>
  <div class="right-view">
    <div v-if="isAuthReady" class="profile-bar">
      <SearchBar />
      <div class="profile-bar__wrapper">
        <img src="../assets/icons/bell-solid.svg" alt="profile icon" class="profile-bar__icon" />
        <div class="profile-bar__wrapper-name">
          <h3>{{ user.firstName }} {{ user.lastName }}</h3>
          <p class="profile-bar__wrapper-company">{{ user.companyName }}</p>
        </div>
      </div>
    </div>
    <div v-else class="profile-bar">
      <p>Indlæser brugerdata...</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/main.scss" as v;

.profile-bar {
  align-items: center;
  display: flex;
  height: fit-content;
  justify-content: space-between;
  width: 100%;

  &__wrapper {
    align-items: center;
    display: flex;
    gap: 1.5em;

    &-company {
      color: v.$dark-grey;
      font-size: 20px;
      font-weight: 200;
      letter-spacing: 0.01em;
      line-height: 1.4;
      margin: 0;
    }
  }

  &__icon {
    height: 2em;
    width: 2em;
  }
}

.right-view {
  display: flex;
  flex-direction: column;
}
</style>
