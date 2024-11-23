<template>
  <div class="container mt-5">
    <div class="text-center">
      <h2>Crear habitación</h2>
      <hr />
    </div>
    <form @submit.prevent="crearHabitacion">
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
      <div class="text-center">
        <button type="submit" class="btn btn-primary">Crear Habitación</button>
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
  name: "CreateHabitacion",
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
    this.cargarHoteles();
  },
  methods: {
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

    async crearHabitacion() {
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
        await axios.post("http://prueba-hoteles-decameron.com/api/habitaciones", this.habitacion);
        this.mensaje = "Habitación creada exitosamente.";
        this.mensajeExito = true;
        this.limpiarFormulario();
      } catch (error) {
        this.mensaje = "Error al crear la habitación: " + (error.response?.data?.error || error.message);
        this.mensajeExito = false;
      }
    },

    limpiarFormulario() {
      this.habitacion = {
        id_hotel: "",
        cantidad: "",
        tipo_habitacion: "",
        acomodacion: "",
      };
      this.habitacionesExistentes = 0;
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
