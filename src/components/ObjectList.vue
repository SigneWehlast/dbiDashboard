<script setup>
import { useObjectStore } from '@/stores/ObjectStore';

const objectStore = useObjectStore();

//henter alle objekter fra object store
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
  background-color: v.$white;
  border-radius: 1.5em;
  padding: 4.375em;
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
