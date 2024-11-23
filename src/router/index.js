import { createRouter, createWebHistory } from 'vue-router';
import AppDashboard from '../components/AppDashboard.vue'; 
import CreateHotel from '../components/CreateHotel.vue';
import HotelesList from '../components/HotelesList.vue';
import CreateHabitacion from '../components/CreateHabitacion.vue';
import HabitacionList from '../components/HabitacionList.vue';
import EditHotel from '../components/EditHotel.vue';
import EditHabitacion from '../components/EditHabitacion.vue';


const routes = [
  { path: '/', component: AppDashboard }, 
  { path: '/crear-hotel', component: CreateHotel }, 
  { path: '/consultar-hotel', component: HotelesList }, 
  { path: '/crear-habitacion', component: CreateHabitacion }, 
  { path: '/consultar-habitacion', component: HabitacionList },
  { path: '/editar-hotel/:id', name: 'editar-hotel', component: EditHotel }, 
  { path: '/editar-habitacion/:id', name: 'editar-habitacion', component: EditHabitacion }, 
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


export default router;
