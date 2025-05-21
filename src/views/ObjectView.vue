<script setup>
import ObjectList from '@/components/ObjectList.vue';
import PlusIcon from '../assets/icons/plus-solid.svg';

</script>

<template>
    <div class="object-list-wrapper">
        <div class="object-top-wrapper">
            <h1>Objekter</h1>
            <div class="dropdown">
        <div class="dropdown__icon-container" @click="toggleDropdown" :class="{ 'dropdown__icon-container--open': isDropdownOpen }">
          <img :src="PlusIcon" alt="Plus" class="dropdown__icon">
          <p class="p1 p-white">Nyt Objekt</p>
        </div>
        </div>

        </div>
        <ObjectList />
    </div>
</template>

<style scoped lang="scss">
@use "@/assets/main.scss" as v;

.object{
    &-top-wrapper {
        align-items: center;
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        position: relative;
    }

    &__button {
      align-items: center;
      background-color: v.$main-blue;
      border-radius: 1em;
      border-style: none;
      color: v.$white;
      cursor: pointer;
      display: flex;
      gap: 0.5em;
      height: 3em;
      justify-content: center;
      padding: 0.5em 1em;

    &__icon {
        height: 1em;
        width: 1em;
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
  width: 160px;

  &__icon-container {
    align-items: center;
    display: flex;
    gap: 1em;
  }

  &__icon {
    width: 1.5em;
    height: 1.5em;
  }
}

.object-list-wrapper {
  display: flex;
  flex-direction: column;
  gap: 2.5em;
  justify-content: center;
}
</style>