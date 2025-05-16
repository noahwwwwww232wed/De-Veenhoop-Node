import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue'; 
import Dashboard from '../components/Dashboard.vue'; // <-- nieuw toegevoegd

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: () => import('../components/ForgotPassword.vue'),
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard, // <-- nieuw toegevoegd
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
