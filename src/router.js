import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/Home.vue';
import TaskIndex from './pages/Task.vue';
import ProductIndex from './pages/Product.vue';
import CartIndex from './pages/Cart.vue';

const routes = [
    { name: 'home', path: '/', component: Home },
    { name: 'tasks', path: '/tasks', component: TaskIndex },
    { name: 'products', path: '/products', component: ProductIndex },
    { name: 'cart', path: '/cart', component: CartIndex }
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;