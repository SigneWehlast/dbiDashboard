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
        position: relative;
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        align-items: center;
    }

    &__button {
      background-color: v.$main-blue;
      border-radius: 1em;
      border-style: none;
      color: v.$white;
      cursor: pointer;
      height: 3em;
      padding: 0.5em 1em;
      justify-content: center;
      display: flex;
      align-items: center;
      gap: 0.5em;

    &__icon {
        width: 1em;
        height: 1em;
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
  margin-top: 1.7em;
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
}

.object-list-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2.5em;
}
</style>