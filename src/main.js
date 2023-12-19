import { createPinia } from 'pinia';
import { createApp } from 'vue';
import { createMetaManager } from 'vue-meta';

import LoadScript from 'vue-plugin-load-script';
import App from './App.vue';
import router from './router';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// s : vue create
const app = createApp(App);

app.use(createPinia());
app.use(LoadScript);
app.use(router);
app.use(createMetaManager());

// e : vue create
router.isReady().then(() => app.mount('body'));
