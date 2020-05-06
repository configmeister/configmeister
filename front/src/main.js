import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

import 'jsoneditor/dist/jsoneditor.min.css';

Vue.config.productionTip = false;

import {plugin} from '@/plugins/loader';

Vue.use(plugin);

new Vue({
	router,
	store,
	vuetify,
	render: h => h(App)
}).$mount('#app');
