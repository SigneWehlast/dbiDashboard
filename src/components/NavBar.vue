<script setup>
import NavBarButton from './NavBarButton.vue';
import ForsideIcon from '../assets/icons/gauge-solid-2.svg';
import ForsideHoverIcon from '../assets/icons/gauge-solid.svg';
import SkemaerIcon from '../assets/icons/calendar-check-solid-2.svg';
import SkemaerHoverIcon from '../assets/icons/calendar-check-solid.svg';
import ObjekterIcon from '../assets/icons/qrcode-solid-2.svg';
import ObjekterHoverIcon from '../assets/icons/qrcode-solid.svg';
import RapporterIcon from '../assets/icons/chart-line-solid-2.svg';
import RapporterHoverIcon from '../assets/icons/chart-line-solid.svg';
import DokumenterIcon from '../assets/icons/file-solid-2.svg';
import DokumenterHoverIcon from '../assets/icons/file-solid.svg';
import PlanlægningIcon from '../assets/icons/calendar-days-solid-2.svg';
import PlanlægningHoverIcon from '../assets/icons/calendar-days-solid.svg';
import BrugereIcon from '../assets/icons/user-group-solid-2.svg';
import BrugereHoverIcon from '../assets/icons/user-group-solid.svg';
import SignOutIcon from '@/assets/icons/arrow-right-from-bracket-solid.svg';
import SignOutHoverIcon from '@/assets/icons/arrow-right-from-bracket-solid2.svg';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/AuthStore';
import { useRouter } from 'vue-router';

const route = useRoute();
const authStore = useAuthStore();
const router = useRouter();

const logoutAndRedirect = async () => {
  await authStore.logout();
  router.push({ name: 'login' });
};
</script>


<template>
  <div class="nav-bar">
    <img src="../assets/icons/DBI_logo.svg" alt="logo" class="logo">
    <nav>
      <router-link class="routerlink" to="/">
        <NavBarButton
          :imgSrc="ForsideIcon"
          :hoverImgSrc="ForsideHoverIcon"
          imgAlt="forside icon"
          :isActive="route.path === '/'"
        >
          <p class="p1">Forside</p>
        </NavBarButton>
      </router-link>

      <router-link class="routerlink" to="/Schedule">
        <NavBarButton
          :imgSrc="SkemaerIcon"
          :hoverImgSrc="SkemaerHoverIcon"
          imgAlt="skemaer icon"
          :isActive="route.path === '/Schedule'"
        >
          <p class="p1">Skemaer</p>
        </NavBarButton>
      </router-link>

      <router-link class="routerlink" to="/Object">
        <NavBarButton
          :imgSrc="ObjekterIcon"
          :hoverImgSrc="ObjekterHoverIcon"
          imgAlt="objekter icon"
          :isActive="route.path === '/Object'"
        >
          <p class="p1">Objekter</p>
        </NavBarButton>
      </router-link>

      <router-link class="routerlink" to="/Report">
        <NavBarButton
          :imgSrc="RapporterIcon"
          :hoverImgSrc="RapporterHoverIcon"
          imgAlt="rapporter icon"
          :isActive="route.path === '/Report'"
        >
          <p class="p1">Rapporter</p>
        </NavBarButton>
      </router-link>

      <NavBarButton
        :imgSrc="DokumenterIcon"
        :hoverImgSrc="DokumenterHoverIcon"
        imgAlt="dokumenter icon"
        :isActive="route.path === '/Documents'"
      >
        <p class="p1">Dokumenter</p>
      </NavBarButton>

      <NavBarButton
        :imgSrc="PlanlægningIcon"
        :hoverImgSrc="PlanlægningHoverIcon"
        imgAlt="planlægning icon"
        :isActive="route.path === '/Planning'"
      >
        <p class="p1">Planlægning</p>
      </NavBarButton>

      <router-link class="routerlink" to="/Users">
        <NavBarButton
          :imgSrc="BrugereIcon"
          :hoverImgSrc="BrugereHoverIcon"
          imgAlt="brugere icon"
          :isActive="route.path === '/Users'"
        >
          <p class="p1">Brugere</p>
        </NavBarButton>
      </router-link>

      <NavBarButton
  :imgSrc="SignOutIcon"
  :hoverImgSrc="SignOutHoverIcon"
  imgAlt="Sign out icon"
  :isActive="route.path === '/Login'"
  @click="logoutAndRedirect"
>
  <p class="p1">Log ud</p>
</NavBarButton>
    </nav>
  </div>
</template>


<style scoped lang="scss">
nav {

  display: flex;
  flex-direction: column;
  gap: 0.6em;
}

.logo {
  margin-bottom: 2.5em;
  width: 100%;
}

.nav-bar {
  position: sticky;
  top: 0;
  left: 0;
  height: 100%;
  width: 18.75em;
}

.button-icon {
  height: 1.5em;
  width: 1.5em;
}

:deep(button:hover) .body-text {
  color: #FFFFFF;
}
</style>
