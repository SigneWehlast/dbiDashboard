<script setup>
</script>
<template>
    <div class="object-overview">
        <h3>Objekt overblik</h3>
        <table>
            <thead>
                <tr>
                <th class="p2 heading-bar">Objekt</th>
                <th class="p2 heading-bar">Lokation</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="p1">1</td>
                <td class="p1">1</td>
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
  margin: 0;
}

.heading-bar {
  border-bottom: 1px solid #DADCDC;
  border-top: 1px solid #DADCDC;
  padding-bottom: 5px;
  padding-top: 5px;
}

</style>