import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios';
import router from './router';

// Importa Bootstrap CSS y JS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const app = createApp(App);

// Configuración global de Axios
axios.defaults.baseURL = 'http://prueba-hoteles-decameron.com/api';
app.config.globalProperties.$axios = axios;

app.use(router);
app.mount('#app');



