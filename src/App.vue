<template>
  <div id="app" class="d-flex flex-column min-vh-100">
    <NavBar />
    <router-view />
    <AppFooter />
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';
import AppFooter from "./components/AppFooter.vue";


export default {
  components: {
    NavBar,
    AppFooter,
  },
};
</script>

<style>
  #app {
    display: flex;
    flex-direction: column;
    min-height: 100vh
  }

  footer {
    margin-top: auto; /* Esto empuja el footer hacia el fondo */
  }


</style>


