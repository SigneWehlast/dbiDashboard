import './assets/main.scss';

//bruges til at oprette en vue app
import { createApp } from 'vue';
//bruges til at oprette pinia store
import { createPinia } from 'pinia';

//importerer app.vue og router
import App from './App.vue';
import router from './router';

//importerer firebase og firebase auth, som lytter efter ændringer i login
import { auth } from '@/configs/firebase';
import { onAuthStateChanged } from 'firebase/auth';

let app;

//lytter efter ændringer i login
onAuthStateChanged(auth, () => {
  if (!app) {
    app = createApp(App);

    app.use(createPinia());
    app.use(router);

    app.mount('#app');
  }
});
