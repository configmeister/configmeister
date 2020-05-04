import Vue from 'vue';
import VueRouter from 'vue-router';
import Main from '../views/Main.vue';
import TestScalar from '../views/test/TestScalar';

Vue.use(VueRouter);

const routes = [{
	path     : '/',
	name     : 'main',
	component: Main
}, {
	path: '/test/scalar',
	name: 'test-scalar',
	component: TestScalar
}];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
});

export default router;
