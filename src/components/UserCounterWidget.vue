<script setup>
import { onMounted } from 'vue';
import { useAuthStore } from '@/stores/AuthStore';

const authStore = useAuthStore();


onMounted(() => {
  authStore.fetchUserCount();
});
</script>

<template>
  <div class="user-counter">
    <div class="user-counter__top-section">
      <h3>Tæller</h3>
      <p class="p1">...</p> <!--Indsæt icon her-->
    </div>
    <div class="user-counter__content">
      <h2>{{ authStore.userCount }}</h2>
      <p class="p1">Brugere</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/main.scss" as v;

.user-counter {
  align-items: center;
  background-color: v.$white;
  border-radius: 1.5em;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 25rem;
  padding: 2rem;
  width: 35%;

    &__top-section {
      display: flex;
      justify-content: space-between;
      width: 90%;
    }

    &__content {
      align-items: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-top: 7rem;
    }
}
</style>
