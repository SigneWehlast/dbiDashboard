<script setup>
import UserList from '@/components/UserList.vue';
</script>

<template>
    <div class="user-container">
        <h1>Brugere</h1>
        <UserList />
    </div>
</template>

<style scoped lang="scss">

.user-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2.5em;

}
</style>