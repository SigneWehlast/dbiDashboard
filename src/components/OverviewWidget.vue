<script setup>


</script>

<template>
<!-- Udskift til dymanisk text i p og h2 -->
    <div class="widget-menu">
        <div class="widget-menu__box">
            <p class="p1">Opgaver</p>
            <h2>3</h2>
        </div>
        <div class="divider"></div>

        <div class="widget-menu__box">
            <p class="p1">Deadlines</p>
            <h2>2</h2>
        </div>
        <div class="divider"></div>
        <div class="widget-menu__box">
            <p class="p1">Rapporter</p>
            <h2>172</h2>
        </div>
        <div class="divider"></div>

        <div class="widget-menu__box">
            <p class="p1">Objekter</p>
            <h2>19</h2>
        </div>

    </div>
</template>

<style scoped lang="scss">
@use "@/assets/main.scss" as v;

.widget-menu {
  align-items: center;
  background-color: v.$white;
  border-radius: 1.5em;
  display: flex;
  justify-content: space-between;
  padding: 1.5em 4.3em;

  &__box {
    align-items: center;
    display: flex;
    gap: 2.5em;
    height: 1em;
    justify-content: center;
    text-align: center;
  }
}

.divider {
  height: 5em;
  width: 0.06em;
  background-color: #DADCDC;
}
</style>
