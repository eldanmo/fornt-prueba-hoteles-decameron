<template>
  <div class="container mt-5">
    <div class="text-center">
      <h2>Editar habitación</h2>
      <hr>
    </div>

    <form @submit.prevent="editarHabitacion">
      <div class="mb-3">
        <label for="id_hotel" class="form-label">Nombre del Hotel</label>
        <select class="form-control" id="id_hotel" v-model="habitacion.id_hotel" @change="consultarHabitaciones" required>
          <option value="">Seleccione</option>
          <option v-for="hotel in hoteles" :key="hotel.id" :value="hotel.id">
            {{ hotel.nombre }}
          </option>
        </select>
      </div>
      <div class="mb-3">
        <label for="cantidad" class="form-label">Cantidad</label>
        <input
          type="number"
          class="form-control"
          id="cantidad"
          v-model="habitacion.cantidad"
          required
          min="0"
          @keydown="soloNumeros"
          autocomplete="off"
        />
      </div>
      <div class="mb-3">
        <label for="tipo_habitacion" class="form-label">Tipo de habitación</label>
        <select class="form-control" id="tipo_habitacion" v-model="habitacion.tipo_habitacion" required>
          <option value="">Seleccione</option>
          <option value="ESTANDAR">ESTANDAR</option>
          <option value="JUNIOR">JUNIOR</option>
          <option value="SUITE">SUITE</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="acomodacion" class="form-label">Acomodación</label>
        <select class="form-control" id="acomodacion" v-model="habitacion.acomodacion" required>
          <option value="">Seleccione</option>
          <option v-if="habitacion.tipo_habitacion == 'ESTANDAR' || habitacion.tipo_habitacion == 'SUITE'" value="SENCILLA">
            SENCILLA
          </option>
          <option v-if="habitacion.tipo_habitacion == 'ESTANDAR' || habitacion.tipo_habitacion == 'SUITE'" value="DOBLE">
            DOBLE
          </option>
          <option v-if="habitacion.tipo_habitacion == 'JUNIOR' || habitacion.tipo_habitacion == 'SUITE'" value="TRIPLE">
            TRIPLE
          </option>
          <option v-if="habitacion.tipo_habitacion == 'JUNIOR'" value="CUADRUPLE">
            CUADRUPLE
          </option>
        </select>
      </div>
      <div class="text-center m-3">
        <button type="submit" class="btn btn-primary">Guardar habitación</button>
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
  name: "EditHabitacion",
  data() {
    return {
      habitacion: {
        id_hotel: "",
        cantidad: "",
        tipo_habitacion: "",
        acomodacion: "",
      },
      hoteles: [], 
      habitacionesExistentes: 0,
      mensaje: "",
      mensajeExito: false,
    };
  },
  created() {
    this.cargarHabitacion();
    this.cargarHoteles();
  },
  methods: {
    
    async cargarHabitacion() {
      const id = this.$route.params.id; 
      try {
        const response = await axios.get(`http://prueba-hoteles-decameron.com/api/habitaciones/${id}`);
        this.habitacion = response.data.data;
      } catch (error) {
        this.mensaje = "Error al cargar los datos de la habitación.";
        this.mensajeExito = false;
      }
    },

    async cargarHoteles() {
      try {
        const response = await axios.get("http://prueba-hoteles-decameron.com/api/hoteles");
        this.hoteles = response.data.data; 
      } catch (error) {
        console.error("Error al cargar hoteles:", error);
        this.mensaje = "Error al cargar la lista de hoteles.";
        this.mensajeExito = false;
      }
    },

    async consultarHabitaciones() {
      if (!this.habitacion.id_hotel) return;
      try {
        const response = await axios.get(
          `http://prueba-hoteles-decameron.com/api/habitaciones/cantidad/${this.habitacion.id_hotel}`
        );
        this.habitacionesExistentes = response.data.total;
      } catch (error) {
        console.error("Error al consultar habitaciones:", error);
        this.mensaje = "Error al consultar las habitaciones configuradas.";
        this.mensajeExito = false;
      }
    },

    async editarHabitacion() {
      const id = this.$route.params.id;

      const hotelSeleccionado = this.hoteles.find(
        (hotel) => hotel.id === this.habitacion.id_hotel
      );

      if (!hotelSeleccionado) {
        this.mensaje = "Debe seleccionar un hotel válido.";
        this.mensajeExito = false;
        return;
      }

      const totalHabitaciones =
        this.habitacionesExistentes + parseInt(this.habitacion.cantidad, 10);

      if (totalHabitaciones > hotelSeleccionado.numero_habitaciones) {
        this.mensaje = `No puedes exceder el límite de ${hotelSeleccionado.numero_habitaciones} habitaciones para este hotel.`;
        this.mensajeExito = false;
        return;
      }


      try {
        await axios.put(`http://prueba-hoteles-decameron.com/api/habitaciones/${id}`, this.habitacion);
        this.mensaje = "Habitación actualizada exitosamente.";
        this.mensajeExito = true;

        setTimeout(() => {
          this.$router.push('/consultar-habitacion');
        }, 3000);
      } catch (error) {
        this.mensaje = error.response.data.error;
        this.mensajeExito = false;
      }
    },

    soloNumeros(event) {
      const key = event.key;
      const allowedKeys = ["Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete", "Enter"];
      if (!/^[0-9]$/.test(key) && !allowedKeys.includes(key)) {
        event.preventDefault();
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