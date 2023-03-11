import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// s : vue create
const app = createApp(App);

app.use(router);
app.use(createPinia());
app.mount('body');
// e : vue create
