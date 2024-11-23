<template>
    <nav class="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
      <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
          <router-link class="navbar-brand" to="/">Home</router-link>
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Hoteles
              </a>
              <ul class="dropdown-menu">
                <li><router-link class="dropdown-item" to="/crear-hotel">Crear</router-link></li>
                <li><router-link class="dropdown-item" to="/consultar-hotel">Consultar</router-link></li>
              </ul>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Habitaciones
              </a>
              <ul class="dropdown-menu">
                <li><router-link class="dropdown-item" to="/crear-habitacion">Crear</router-link></li>
                <li><router-link class="dropdown-item" to="/consultar-habitacion">Consultar</router-link></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </template>
  
  