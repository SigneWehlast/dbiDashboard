<script setup>
import ObjectList from '@/components/ObjectList.vue';

</script>

<template>
    <div class="object-list-wrapper">
        <div class="object-top-wrapper">
            <h1>Objekter</h1>
            <button class="object__button p1">Opret objekt</button>
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
      border-radius: 15px;
      border-style: none;
      color: v.$white;
      cursor: pointer;
      height: 100%;
      padding: 0.5em 1em;
      justify-content: center;
      }
}

.object-list-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2.5em;
}
</style>