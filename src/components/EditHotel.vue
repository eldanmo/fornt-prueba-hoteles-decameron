<template>
  <div class="container mt-5">
    <div class="text-center">
      <h2>Editar Hotel</h2>
      <hr>
    </div>

    <form @submit.prevent="editarHotel">
      <div class="mb-3">
        <label for="nombre" class="form-label">Nombre del Hotel</label>
        <input
          type="text"
          class="form-control"
          id="nombre"
          v-model="hotel.nombre"
          required
          autocomplete="off"
        />
      </div>
      <div class="mb-3">
        <label for="direccion" class="form-label">Dirección</label>
        <input
          type="text"
          class="form-control"
          id="direccion"
          v-model="hotel.direccion"
          required
          autocomplete="off"
        />
      </div>
      <div class="mb-3">
        <label for="ciudad" class="form-label">Ciudad</label>
        <input
          type="text"
          class="form-control"
          id="ciudad"
          v-model="hotel.ciudad"
          required
          autocomplete="off"
        />
      </div>
      <div class="mb-3">
        <label for="nit" class="form-label">NIT</label>
        <input
          type="number"
          class="form-control"
          id="nit"
          v-model="hotel.nit"
          required
          autocomplete="off"
          min="0"
        />
      </div>
      <div class="text-center mb-3">
        <button type="submit" class="btn btn-primary">Guardar Cambios</button>
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
  name: "EditHotel",
  data() {
    return {
      hotel: {
        nombre: "",
        direccion: "",
        ciudad: "",
        nit: "",
      },
      mensaje: "",
      mensajeExito: false,
    };
  },
  created() {
    this.cargarHotel();
  },
  methods: {
    async cargarHotel() {
      const id = this.$route.params.id; 
      try {
        const response = await axios.get(`http://prueba-hoteles-decameron.com/api/hoteles/${id}`);
        this.hotel = response.data.data;
      } catch (error) {
        this.mensaje = "Error al cargar los datos del hotel.";
        this.mensajeExito = false;
      }
    },
    async editarHotel() {
      const id = this.$route.params.id;
      try {
        await axios.put(`http://prueba-hoteles-decameron.com/api/hoteles/${id}`, this.hotel);
        this.mensaje = "Hotel actualizado exitosamente.";
        this.mensajeExito = true;

        setTimeout(() => {
          this.$router.push('/consultar-hotel');
        }, 3000);
      } catch (error) {
        this.mensaje = "Error al actualizar el hotel.";
        this.mensajeExito = false;
      }
    },
  },
};
</script>

<style scoped>
  .container {
    max-width: 600px;
  }
</style>