<script setup>
import TaskOverviewData from '@/components/TaskOverviewData.vue';
import SearchBar from '@/components/SearchBar.vue';
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
        <div class="dropdown__icon-container" @click="toggleDropdown" :class="{ 'dropdown__icon-container--open': isDropdownOpen }">
          <img :src="PlusIcon" alt="Plus" class="dropdown__icon">
          <p class="p1 p-white">Nyt Skema</p>
        </div>
        <transition name="dropdown">
          <div class="dropdown__content" v-show="isDropdownOpen">
            <p class="p1 p-white">Skemabibliotek</p>
            <router-link class="routerlink" to="/CompleteSchedule">
              <p class="p1 p-white">Nyt skema</p>
            </router-link>
          </div>
        </transition>
      </div>

    </div>

    <div class="task-overview">
        <div class="task-overview__information">
            <div class="task-overview__information__nav">
            <SearchBar />
            </div>
            <div class="task-overview__information__content">
              <TaskOverviewData :onlyToday="true" />
            </div>
        </div>
    </div>
</template>


<style scoped lang="scss">
@use "@/assets/main.scss" as v;

.task-overview {
  border-radius: 1.5em;
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;

  &__information {
    border-radius: 1.5em;
    background-color: v.$white;
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 1.5em 3em 1em 3em;
    width: 100%;

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
  background-color: v.$main-blue;
  border-radius: 1.5em;
  cursor: pointer;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: 1.7em;
  padding: 1em 1.5em;
  position: absolute;
  right: 0;
  width: 170px;

  &__icon-container {
    align-items: center;
    display: flex;
    gap: 1em;

    p, img {
      transition: opacity 0.2s ease;
    }

    &--open {
      p, img {
        opacity: 0.5;
      }
    }
  }

  &__icon {
    height: 1.5em;
    width: 1.5em;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 1.5em;
    margin-top: 1.5em;

    p {
      cursor: pointer;
      transition: transform 0.2s ease, opacity 0.2s ease;

      &:hover {
        opacity: 0.8;
        transform: translateX(10px);
      }
    }
  }
}

.schedule-overview {
  align-items: top;
  display: flex;
  height: 100%;
  justify-content: space-between;
  position: relative;
}

.filter-container {
  align-items: center;
  display: flex;
  gap: 1.5em;


  &__icon {
    height: 1.5em;
    width: 1.5em;
  }
}
.routerlink {
  text-decoration: none;
}

.dropdown-enter-active,
.dropdown-leave-active {
  max-height: 200px;
  opacity: 1;
  transition: all 0.3s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  margin-top: 0;
  max-height: 0;
  opacity: 0;
}
</style>
