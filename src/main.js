import LoadScript from 'vue-plugin-load-script';
import App from './App.vue';
import router from './router';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@quasar/extras/material-icons/material-icons.css';
import 'quasar/src/css/index.sass';

import { createPinia } from 'pinia';
import { createApp } from 'vue';
import { Quasar, Loading } from 'quasar';
import { createMetaManager } from 'vue-meta';

// s : vue create
const app = createApp(App);

app.use(createPinia());
app.use(LoadScript);
app.use(router);
app.use(createMetaManager());
app.use(Quasar, {
	plugins: {
		Loading,
	},
	// config: {
	// 	loading,
	// },
});

// e : vue create
router.isReady().then(() => app.mount('body'));
