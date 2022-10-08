import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import {useConfig} from './assets/js/config/useConfig.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// s : config set
const config = useConfig();
// e : config set

// vue create
const app = createApp(App);

app.use(router);
app.use(config.axiosConfig())
app.use(createPinia());
app.mount('#app');


