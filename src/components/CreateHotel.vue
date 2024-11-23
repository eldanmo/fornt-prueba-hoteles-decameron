<template>
    <div class="container mt-5">
        <div class="text-center">
            <h2>Crear Hotel</h2>
            <hr>
        </div>
      
      <form @submit.prevent="crearHotel">
        <div class="mb-3">
          <label for="nombre" class="form-label">Nombre del Hotel</label>
          <input type="text" class="form-control" id="nombre" v-model="hotel.nombre" required autocomplete="off" >
        </div>
        <div class="mb-3">
          <label for="direccion" class="form-label">Dirección</label>
          <input type="text" class="form-control" id="direccion" v-model="hotel.direccion" required autocomplete="off">
        </div>
        <div class="mb-3">
          <label for="ciudad" class="form-label">Ciudad</label>
          <input type="text" class="form-control" id="ciudad" v-model="hotel.ciudad" required autocomplete="off">
        </div>
        <div class="mb-3">
          <label for="nit" class="form-label">NIT</label>
          <input type="number" class="form-control" id="nit" v-model="hotel.nit" required autocomplete="off" min="0" @keydown="soloNumeros">
        </div>
        <div class="mb-3">
          <label for="digito_verificacion" class="form-label">Dígito de Verificación</label>
          <input type="number" class="form-control" id="digito_verificacion" autocomplete="off" v-model="hotel.digito_verificacion" required min="0" max="9" @keydown="soloNumeros">
        </div>
        <div class="mb-3">
          <label for="numero_habitaciones" class="form-label">Número de Habitaciones</label>
          <input type="number" class="form-control" id="numero_habitaciones" v-model="hotel.numero_habitaciones" required autocomplete="off" min="0" @keydown="soloNumeros">
        </div>
        <div class="text-center mb-3" >
            <button type="submit" class="btn btn-primary">Crear Hotel</button>
        </div>
        
      </form>
      
      <div v-if="mensaje" class="alert mt-3" :class="mensajeExito ? 'alert-success' : 'alert-danger'">
        {{ mensaje }}
      </div>
    </div>
</template>
  
<script>
  import axios from "axios";
  
  export default {
    name: "CreateHotel",
    data() {
      return {
        hotel: {
          nombre: "",
          direccion: "",
          ciudad: "",
          nit: "",
          digito_verificacion: "",
          numero_habitaciones: "",
        },
        mensaje: "",
        mensajeExito: false,
      };
    },
    methods: {
      async crearHotel() {
        try {
          await axios.post("http://prueba-hoteles-decameron.com/api/hoteles", this.hotel);
          this.mensaje = "Hotel creado exitosamente.";
          this.mensajeExito = true;
          this.limpiarFormulario();

          setTimeout(() => {
            this.mensaje = "";
            this.mensajeExito = false; 
            }, 5000);
                
        } catch (error) {
            this.mensaje = "Error al crear el hotel: " + error.response?.data?.error || error.message;
            this.mensajeExito = false;

            setTimeout(() => {
                this.mensaje = "";
                this.mensajeExito = false;
            }, 5000);
         }
      },

      limpiarFormulario() {
        this.hotel = {
          nombre: "",
          direccion: "",
          ciudad: "",
          nit: "",
          digito_verificacion: "",
          numero_habitaciones: "",
        };
      },

      soloNumeros(event) {
        const key = event.key;
        const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete', 'Enter'];

            if (!/^[0-9]$/.test(key) && !allowedKeys.includes(key)) {
                event.preventDefault();
            }
        }
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 600px;
  }
  </style>
  