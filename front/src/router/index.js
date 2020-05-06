import Vue from 'vue';
import VueRouter from 'vue-router';
import Main from '../views/Main.vue';

Vue.use(VueRouter);

const routes = [{
	path     : '/',
	name     : 'main',
	component: Main
}, {
	path     : '/configuration/new',
	name     : 'configuration-new',
	component: () => import(/* webpackChunkName: "configurationNew" */ '../views/configuration/ConfigurationNew.vue')
}, {
	path: '/configuration/:id',
	name: 'configuration',
	component: () => import(/* webpackChunkName: "configuration" */ '../views/configuration/Configuration.vue')
}];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
});

export default router;
