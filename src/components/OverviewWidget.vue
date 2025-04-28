<script setup>


</script>

<template>
<!-- Udskift til dymanisk text i p og h2 -->
    <div class="WidgetMenu">
        <div class="WidgetMenuBox">
            <p class="p1">Opgaver</p>
            <h2>3</h2>
        </div>

        <div class="WidgetMenuBox">
            <p class="p1">Deadlines</p>
            <h2>2</h2>
        </div>

        <div class="WidgetMenuBox">
            <p class="p1">Rapporter</p>
            <h2>172</h2>
        </div>

        <div class="WidgetMenuBox">
            <p class="p1">Objekter</p>
            <h2>19</h2>
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
}

.WidgetMenuBox {
  align-items: center;
  display: flex;
  gap: 2.5em;
  height: 1rem;
  justify-content: center;
  text-align: center;
  padding: 2rem;

  &:not(:last-child) {
      border-right: 1px solid #DADCDC;
  }
}
</style>
