<script setup>
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '@/stores/AuthStore';
import { useTaskStore } from '@/stores/ScheduleStore';
import { storeToRefs } from 'pinia';
import SearchBar from '@/components/SearchBar.vue';

const authStore = useAuthStore();
const { user, isAuthReady } = storeToRefs(authStore);

const taskStore = useTaskStore();
const { overskredneTasks } = storeToRefs(taskStore);

onMounted(() => {
  taskStore.fetchTasks();
});

// Antal overskredne
const notificationCount = computed(() => overskredneTasks.value.length);

// Dropdown-visning
const showDropdown = ref(false);
function toggleDropdown() {
  showDropdown.value = !showDropdown.value;
}
</script>

<template>
  <div class="right-view">
    <div v-if="isAuthReady" class="profile-bar">
      <SearchBar />
      <div class="profile-bar__wrapper">
        <div class="notification-icon" @click="toggleDropdown">
  <img src="../assets/icons/bell-solid.svg" alt="profile icon" class="profile-bar__icon" />
  <span class="notification-count" v-if="notificationCount > 0">
    {{ notificationCount }}
  </span>

  <!-- DROPDOWN -->
  <div v-if="showDropdown" class="notification-dropdown">
    <p v-if="notificationCount === 0">Ingen overskredne opgaver</p>
    <ul v-else>
      <p>Overskredet deadline</p>
      <li v-for="task in overskredneTasks" :key="task.id">
        <strong>{{ task.title }}</strong><br />
        Deadline: {{ task.deadline }}
        <router-link class="routerlink" to="/Schedule">
        <button class="Nonifaktion-btn">Gå til Skeamer</button>
        </router-link>
        <hr>
      </li>
    </ul>
  </div>
</div>
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

  .right-view {
    display: flex;
    flex-direction: column;
  }

  .notification-icon {
    display: inline-block;
    position: relative;
  }

  .notification-count {
    background-color: v.$main-blue;
    color: v.$white;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    font-size: 12px;
    font-weight: bold;
    position: absolute;
    top: -5px;
    right: -5px;
  }

  .notification-icon:hover .notification-count {
    display: inline-block;
  }

  .notification-count[data-count="0"] {
    display: none;
  }
.Nonifaktion-btn{
  background-color: v.$main-blue;
  color: v.$white;
  border-radius: 1.5em;
  padding: .2em .5em;
  border-style: none;
  cursor: pointer;
}

  .notification-dropdown {
    position: absolute;
    top: 2.5em;
    right: 0;
    background-color: v.$white;
    border-radius: 0.5em;
    padding: 0.75em;
    width: 220px;
    z-index: 10;

    ul {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        margin-bottom: 0.75em;
        font-size: 0.9em;
        line-height: 1.2;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
}
</style>
