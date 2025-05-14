<script setup>
import { useObjectStore } from '@/stores/ObjectStore';

const objectStore = useObjectStore();

objectStore.fetchObjects();
</script>

<template>
  <div class="object-overview">
    <h3 class="h3">Objekt overblik</h3>

    <table>
      <thead>
        <tr>
          <th class="p2 heading-bar">Objekt</th>
          <th class="p2 heading-bar">Lokation</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="objectStore.isLoading">
          <td colspan="2" class="p1">Indlæser...</td>
        </tr>

        <tr v-else-if="objectStore.isError">
          <td colspan="2" class="p1">Kunne ikke hente data.</td>
        </tr>

        <tr v-if="!objectStore.isLoading && !objectStore.isError && objectStore.objects.length === 0">
          <td colspan="2" class="p1">Ingen objekter fundet.</td>
        </tr>

        <tr v-for="object in objectStore.objects" :key="object.id">
          <td class="p1">{{ object.object }}</td>
          <td class="p1">{{ object.location }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/main.scss" as v;

table {
  background-color: v.$white;
  border-collapse: collapse;
  margin-top: 1em;
  text-align: left;
  width: 100%;
}

.object-overview {
  padding: 4.375em;
  background-color: v.$white;
  border-radius: 1.5em;
}

th, td {
  padding: 0.75em 0;
}

.h3 {
  color: v.$dark-grey;
  font-size: 25px;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: -0.01em;
  margin: 0 0 1em 0;
}
</style>
