
<template>
    <div class="container text-center">
      <div class="row">
        <!-- Contenedor Hoteles -->
        <div class="col col-sm-5 col-md-5 col-lg-3 border border-secondary text-center m-3 bg-secondary">
          <div class="row text-center p-3 justify-content-center">
            <div class="col col-sm-12">
              <h5 style="color: white;">Hoteles</h5>
            </div>
  
            <!-- Botón Crear Hotel -->
            <router-link 
              to="/crear-hotel" 
              class="col-10 col-sm-10 col-md-10 col-lg-4 border border-secondary pt-3 m-3 text-center flex flex-col items-center bg-white"
              style="text-decoration: none; color: inherit;" 
              aria-label="Crear hotel">
              <img src="@/assets/hotel_create.svg" alt="Crear hotel" width="35px" height="35px" />
              <p>Crear</p>
            </router-link>
  
            <!-- Botón Consultar Hotel -->
            <router-link 
              to="/consultar-hotel" 
              class="col-10 col-sm-10 col-md-10 col-lg-4 border border-secondary pt-3 m-3 text-center flex flex-col items-center bg-white"
              style="text-decoration: none; color: inherit;" 
              aria-label="Consultar hoteles">
              <img src="@/assets/hotel_search.svg" alt="Consultar hotel" width="35px" height="35px" />
              <p>Consultar</p>
            </router-link>
          </div>
        </div>
  
        <!-- Contenedor Habitaciones -->
        <div class="col col-sm-5 col-md-5 col-lg-3 border border-warning text-center m-3 bg-warning">
          <div class="row text-center p-3 justify-content-center">
            <div class="col col-sm-12">
              <h5 style="color: white;">Habitaciones</h5>
            </div>
  
            <!-- Botón Crear Habitación -->
            <router-link 
              to="/crear-habitacion" 
              class="col-10 col-sm-10 col-md-10 col-lg-4 border border-warning pt-3 m-3 text-center flex flex-col items-center bg-white"
              style="text-decoration: none; color: inherit;" 
              aria-label="Crear habitación">
              <img src="@/assets/bedroom_create.svg" alt="Crear habitación" width="35px" height="35px" />
              <p>Crear</p>
            </router-link>
  
            <!-- Botón Consultar Habitación -->
            <router-link 
              to="/consultar-habitacion" 
              class="col-10 col-sm-10 col-md-10 col-lg-4 border border-warning pt-3 m-3 text-center flex flex-col items-center bg-white"
              style="text-decoration: none; color: inherit;" 
              aria-label="Consultar habitaciones">
              <img src="@/assets/bedroom_search.svg" alt="Consultar habitación" width="35px" height="35px" />
              <p>Consultar</p>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </template>
  
<script>
  export default {
    name: "AppDashboard",
  };
  </script>
  
  <style scoped>
  /* Estilos opcionales */
</style>
  