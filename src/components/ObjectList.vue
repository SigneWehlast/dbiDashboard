<script setup>
</script>
<template>
    <table class="object-overview">
        <thead>
            <tr>
                <th class="h3">Objekt</th>
                <th class="h3">Lokation</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="p1">1</td>
                <td class="p1">1</td>
            </tr>
        </tbody>
    </table>
</template>
<style scoped lang="scss">
@use "@/assets/main.scss" as v;

table {
  background-color: v.$white;
  border-collapse: collapse;
  border-left: 1px solid v.$main-blue;
  border-right: 1px solid v.$main-blue;
  margin-top: 1em;
  text-align: left;
  width: 100%;

}

th, td {
  border-bottom: 1px solid v.$main-blue;
  border-top: 1px solid v.$main-blue;
  padding: 0.75em;
}

.h3 {
  color: v.$dark-grey;
  font-size: 25px;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: -0.01em;
  margin: 0;
}

</style>