<script setup>
import TaskOverviewData from '@/components/TaskOverviewData.vue';
import SearchBar from '@/components/SearchBar.vue';
import FilterIcon from '../assets/icons/sliders-solid.svg';
import PlusIcon from '../assets/icons/plus-solid.svg';
import { ref } from 'vue';

const isDropdownOpen = ref(false);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};
</script>

<template>
    <div class="schedule-overview">
    <h1>Skemaer</h1>
    <div class="dropdown">
      <div class="dropdown__icon-container" @click="toggleDropdown">
        <img :src="PlusIcon" alt="Plus" class="dropdown__icon">
        <p class="p1 p-white">Nyt Skema</p>
      </div>
      <div class="dropdown__content" :style="{ display: isDropdownOpen ? 'flex' : 'none' }">
        <p class="p1 p-white">Skemabibliotek</p>
        <router-link class="routerlink" to="/CompleteSchedule">
        <p class="p1 p-white">Nyt skema</p>
        </router-link>
      </div>
    </div>

    </div>

    <div class="task-overview">
        <div class="task-overview__information">
            <!-- Navigation øverst -->
            <div class="task-overview__information__nav">
            <SearchBar />
            </div>
            <!-- Indhold opdelt i tre kolonner -->
            <div class="task-overview__information__content">
              <TaskOverviewData :onlyToday="true" />
            </div>
        </div>
    </div>
</template>



<style scoped lang="scss">
@use "@/assets/main.scss" as v;

.task-overview {
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;
  border-radius: 1.5em;

  &__information {
    border-radius: 1.5em;
    background-color: v.$white;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 90%;
    padding: 1.5em 3em 1em 3em;

    &__nav {
      display: flex;
      justify-content: space-between;
      padding-bottom: 0.6em;
    }

    &__content {
      display: flex;
      flex: 1;
      flex-direction: row;
    }
  }
}

.dropdown {
  position: absolute;
  right: 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: v.$main-blue;
  border-radius: 1.5em;
  padding: 1em 1.5em;
  width: 160px;
  cursor: pointer;

  &__icon-container {
    display: flex;
    align-items: center;
    gap: 1em;
  }

    &__icon {
      width: 1.5em;
      height: 1.5em;
    }

  &__content {
    display: none;
    flex-direction: column;
    gap: 1.5em;
  }
}

.schedule-overview {
  position: relative;
  display: flex;
  align-items:center;
  justify-content: space-between;
  height: 100%;
}

.filter-container {
  display: flex;
  align-items: center;
  gap: 1.5em;


  &__icon {
    width: 1.5em;
    height: 1.5em;
  }
}
.routerlink {
  text-decoration: none;
}
</style>
