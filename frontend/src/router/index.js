import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue'; 
import Dashboard from '../components/Dashboard.vue'; // <-- nieuw toegevoegd
import About from '../components/About.vue';
import Cijfers from '../components/Cijfers.vue';
import DocentDashboard from '../components/DocentDashboard.vue';
import LeerlingDashboard from '../components/LeerlingDashboard.vue';
import CijfersLeerling from '@/components/CijfersLeerling.vue';


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
  {
    path: '/about',
    name: 'About',
    component: About, // <-- nieuw toegevoegd
  },
  {
    path: '/cijfers',
    name: 'Cijfers',
    component: Cijfers, // <-- nieuw toegevoegd
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
  path: '/cijfersleerling',
  name: 'CijfersLeerling',
  component: CijfersLeerling,
},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
