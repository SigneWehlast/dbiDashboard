<script setup>
import ObjectList from '@/components/ObjectList.vue';
import PlusIcon from '../assets/icons/plus-solid.svg';

</script>

<template>
    <div class="object-list-wrapper">
        <div class="object-top-wrapper">
            <h1>Objekter</h1>
            <button class="object__button p1">         
                <img :src="PlusIcon" alt="Plus" class="object__button__icon">
                Opret objekt</button>
        </div>
        <ObjectList />
    </div>
</template>

<style scoped lang="scss">
@use "@/assets/main.scss" as v;

.object{
    &-top-wrapper {
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

.object-list-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2.5em;
}
</style>