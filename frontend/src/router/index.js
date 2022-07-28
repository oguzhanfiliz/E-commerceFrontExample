import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
    },

    {
        path: "/basket",
        name: "Basket",
        component: () => import('@/views/Basket.vue'),
    },
    {
        path: "/product",
        name: "product",
        component: () => import('@/views/Basket.vue'),
    },
]
const router = createRouter({
    history: createWebHistory(),
    routes,
});



export default router;