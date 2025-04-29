<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/AuthStore'

const authStore = useAuthStore()


onMounted(() => {
  authStore.fetchUserCount()
})
</script>

<template>
  <div class="Counter">
    <div class="top-section">
      <p class="p1">Tæller</p>
      <p class="p1">...</p> <!--Indsæt icon her-->
    </div>
    <div class="content">
      <h2>{{ authStore.userCount }}</h2>
      <p class="p1">Brugere</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/main.scss" as v;

.Counter {
  background-color: v.$white;
  height: 25rem;
  width: 35%;
  border-radius: 1.5em;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  box-sizing: border-box;
}

.top-section {
  display: flex;
  justify-content: space-between;
  width: 90%;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 7rem;
}
</style>
