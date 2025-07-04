import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
			component: HomeView
		},
		{
			path: "/about",
			name: "about",
			component: () => import("../views/AboutView.vue")
		},
		{
			path: "/calculator",
			name: "calculator",
			component: () => import("../components/calculator/CalculatorView.vue")
		},
		{
			path: "/computed",
			name: "computed",
			component: () => import("../views/ComputedExample.vue")
		},
		{
			path: "/form",
			name: "form",
			component: () => import("../views/FormExample.vue")
		}
	]
});

export default router;
