import './assets/main.css'

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';  // Router importeren

// Maak de app aan en gebruik de router
const app = createApp(App);
app.use(router);  // Router gebruiken
app.mount('#app');  // Mounten van de app
createApp(App).use(router).mount('#app')