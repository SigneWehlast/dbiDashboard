<script setup>
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '@/stores/AuthStore';
import { useScheduleStore } from '@/stores/ScheduleStore';
import { storeToRefs } from 'pinia';
import SearchBar from '@/components/SearchBar.vue';

const authStore = useAuthStore();
//gør at user og isAuthReady også er refs i denne fil
const { user, isAuthReady } = storeToRefs(authStore);

const scheduleStore = useScheduleStore();

//gør at overdueTasks også er refs i denne fil
const { overdueTasks } = storeToRefs(scheduleStore);

onMounted(() => {
  scheduleStore.fetchTasks();
});

// Antal overskredne skemaer vises i notifikationer
const notificationCount = computed(() => overdueTasks.value.length);

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

  <div v-if="showDropdown" class="notification-dropdown">
    <p class="p1" v-if="notificationCount === 0">Ingen overskredne opgaver</p>
    <ul v-else>
      <p class="p1 notification-dropdown__headline">Overskredet deadlines</p>
      <hr>
      <li v-for="task in overdueTasks" :key="task.id" class="notification-item">
        <router-link class="routerlink" to="/Schedule">
          <p class="notification-dropdown__title">{{ task.title }}</p>
          <p class="notification-dropdown__deadline">Deadline: {{ task.deadline }}</p>
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
  border-radius: 50%;
  color: v.$white;
  font-size: 12px;
  font-weight: bold;
  height: 20px;
  line-height: 20px;
  position: absolute;
  right: -5px;
  text-align: center;
  top: -5px;
  width: 20px;
}

.notification-icon:hover .notification-count {
  display: inline-block;
}

.notification-count[data-count="0"] {
  display: none;
}

.notification-dropdown {
    background-color: v.$white;
    border: 0.1em solid v.$main-blue;
    border-radius: 1em;
    min-width: 17em;
    padding: 0.75em;
    position: absolute;
    right: 0;
    top: 2.5em;
    z-index: 10;

    ul {
      list-style: none;
      margin: 0;
      padding: 0;

      li {
        font-size: 0.9em;

        &:hover {
          background-color: rgba(v.$main-blue, 0.2);
        }
      }
    }
    &__title {
      color: v.$main-blue;
      font-size: 1.2em;
      font-weight: bold;
    }

    &__deadline {
      color: v.$deadline;
      font-weight: 700;
    }
  }

  hr {
    background-color: v.$dark-grey;
    border: none;
    height: 1px;
  }
</style>
