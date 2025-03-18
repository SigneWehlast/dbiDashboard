<script setup>
import NavBarButton from "./NavBarButton.vue";
import ForsideIcon from "../assets/icons/gauge-solid-2.svg";
import ForsideHoverIcon from "../assets/icons/gauge-solid.svg";
import SkemaerIcon from "../assets/icons/calendar-check-solid-2.svg";
import SkemaerHoverIcon from "../assets/icons/calendar-check-solid.svg";
import ObjekterIcon from "../assets/icons/qrcode-solid-2.svg";
import ObjekterHoverIcon from "../assets/icons/qrcode-solid.svg";
import RapporterIcon from "../assets/icons/chart-line-solid-2.svg";
import RapporterHoverIcon from "../assets/icons/chart-line-solid.svg";
import DokumenterIcon from "../assets/icons/file-solid-2.svg";
import DokumenterHoverIcon from "../assets/icons/file-solid.svg";
import PlanlægningIcon from "../assets/icons/calendar-days-solid-2.svg";
import PlanlægningHoverIcon from "../assets/icons/calendar-days-solid.svg";
import BrugereIcon from "../assets/icons/user-group-solid-2.svg";
import BrugereHoverIcon from "../assets/icons/user-group-solid.svg";
</script>

<template>
  <div class="nav-bar">
    <img src="../assets/icons/DBI_logo.svg" alt="logo" class="logo">
    <nav>
      <NavBarButton
        :imgSrc="ForsideIcon"
        :hoverImgSrc="ForsideHoverIcon"
        imgAlt="forside icon"
      >
        <p>Forside</p>
      </NavBarButton>

      <NavBarButton
        :imgSrc="SkemaerIcon"
        :hoverImgSrc="SkemaerHoverIcon"
        imgAlt="skemaer icon"
      >
        <p>Skemaer</p>
      </NavBarButton>

      <NavBarButton
        :imgSrc="ObjekterIcon"
        :hoverImgSrc="ObjekterHoverIcon"
        imgAlt="objekter icon"
      >
        <p>Objekter</p>
      </NavBarButton>

      <NavBarButton
        :imgSrc="RapporterIcon"
        :hoverImgSrc="RapporterHoverIcon"
        imgAlt="rapporter icon"
      >
        <p>Rapporter</p>
      </NavBarButton>

      <NavBarButton
        :imgSrc="DokumenterIcon"
        :hoverImgSrc="DokumenterHoverIcon"
        imgAlt="dokumenter icon"
      >
        <p>Dokumenter</p>
      </NavBarButton>

      <NavBarButton
        :imgSrc="PlanlægningIcon"
        :hoverImgSrc="PlanlægningHoverIcon"
        imgAlt="planlægning icon"
      >
        <p>Planlægning</p>
      </NavBarButton>

      <NavBarButton
        :imgSrc="BrugereIcon"
        :hoverImgSrc="BrugereHoverIcon"
        imgAlt="brugere icon"
      >
        <p>Brugere</p>
      </NavBarButton>
    </nav>
  </div>
</template>

<style scoped lang="scss">

nav {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.logo {
  width: 200px;
}

.nav-bar {
  width: 300px;
  height: 100%;
}

.button-icon {
  width: 24px;
  height: 24px;
}

</style>
