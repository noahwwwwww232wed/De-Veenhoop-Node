import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue'; 
import Dashboard from '../components/Dashboard.vue'; 
import About from '../components/About.vue';
import Cijfers from '../components/Cijfers.vue';
import DocentDashboard from '../components/DocentDashboard.vue';
import LeerlingDashboard from '../components/LeerlingDashboard.vue';
import CijfersLeerling from '@/components/CijfersLeerling.vue';
import CijfersInvoeren from '@/components/CijfersInvoeren.vue'; 
import Nederlands from '@/components/Nederlands.vue';
import Wiskunde from '@/components/Wiskunde.vue';
import Engels from '@/components/Engels.vue';



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
    component: Dashboard, 
  },
  {
    path: '/about',
    name: 'About',
    component: About, 
  },
  {
    path: '/cijfers',
    name: 'Cijfers',
    component: Cijfers, 
  },
  {
  path: '/docent-dashboard',
  name: 'DocentDashboard',
  component: DocentDashboard,
},
{
  path: '/leerling-dashboard',
  name: 'LeerlingDashboard',
  component: LeerlingDashboard,
},
{
    path: '/cijfers-invoeren/:leerlingId',
    name: 'CijfersInvoeren',
    component: CijfersInvoeren,
    props: true, 
  },
  {
  path: '/cijfers-leerling',
  name: 'CijfersLeerling',
  component: CijfersLeerling,
},
 {
    path: '/nederlands',
    name: 'Nederlands',
    component: () => import('../components/Nederlands.vue'),
  },
  {
    path: '/wiskunde',
    name: 'Wiskunde',
    component: () => import('../components/Wiskunde.vue'),
  },
  {
    path: '/engels',
    name: 'Engels',
    component: () => import('../components/Engels.vue'),
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
