import { createRouter, createWebHistory } from 'vue-router';
import MainLand from "@/components/MainLand";
import SecondLand from "@/components/SecondLand";
import HelloWorld from "@/components/HelloWorld";
const routes = [
    {
        path: '/',
        redirect:'/HelloWorld'
    },
    {
        path: '/MainLand',
        name: 'MainLand',
        component: MainLand
    },
    {
        path: '/SecondLand',
        name: 'SecondLand',
        component: SecondLand
    },
    {
        path: '/HelloWorld',
        name: 'HelloWorld',
        component: HelloWorld
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;