import './assets/main.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import { auth } from '@/configs/firebase';
import { onAuthStateChanged } from 'firebase/auth';

let app;

onAuthStateChanged(auth, () => {
  if (!app) {
    app = createApp(App);

    app.use(createPinia());
    app.use(router);

    app.mount('#app');
  }
});
