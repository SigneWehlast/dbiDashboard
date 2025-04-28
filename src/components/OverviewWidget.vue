<script setup>
</script>

<template>
  <div class="WidgetMenu">
    <div class="WidgetMenuBox">
      <p class="p1">Opgaver</p>
      <h2>{{ taskCount }}</h2> <!-- Bruger props.taskCount her -->
    </div>
    <div class="divider"></div>

    <div class="WidgetMenuBox">
      <p class="p1">Deadlines</p>
      <h2>{{ deadlineCount }}</h2> <!-- Bruger props.deadlineCount her -->
    </div>
    <div class="divider"></div>
    <div class="WidgetMenuBox">
      <p class="p1">Rapporter</p>
      <h2>172</h2> <!-- Denne værdi er statisk, kan opdateres senere -->
    </div>
    <div class="divider"></div>

    <div class="WidgetMenuBox">
      <p class="p1">Objekter</p>
      <h2>19</h2> <!-- Denne værdi er statisk, kan opdateres senere -->
    </div>
  </div>
</template>

<style scoped lang="scss">
.WidgetMenu {
  align-items: center;
  background-color: #fff;
  border-radius: 25px;
  display: flex;
  height: 153px; //25% minus er 114.75px
  justify-content: space-between;
  padding: 0 70px;
}

.WidgetMenuBox {
  align-items: center;
  display: flex;
  gap: 2.5em;
  height: 1rem;
  justify-content: center;
  text-align: center;
}

.divider {
  height: 80px;
  width: 1px;
  background-color: #DADCDC;
}
</style>
