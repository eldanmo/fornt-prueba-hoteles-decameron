<template>
  <div>
    <div v-if="loading">Cargando habitaciones...</div>
    <div v-else>
        <div class="container mt-5">
            <div class="text-center">
                <h2>Listado de habitaciones</h2>
                <hr>
            </div>

            <div class="table-responsive">
                <table class="table table-sm">
                  <thead>
                    <tr class="text-center">
                        <th class="table-primary">#</th>
                        <th class="table-primary">HOTEL </th>
                        <th class="table-primary">CANTIDAD</th>
                        <th class="table-primary">TIPO DE HABITACIÓN</th>
                        <th class="table-primary">ACOMODACIÓN</th>                     
                        <th class="table-primary">ACCIONES</th>                       
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(habitacion, i) in habitaciones" :key="habitacion.id">
                        <td class="text-center">{{i+1}}</td>
                        <td class="text-center">{{  habitacion.hotel.nombre }}</td>
                        <td class="text-center">{{ habitacion.cantidad }}</td>
                        <td class="text-center">{{ habitacion.tipo_habitacion }}</td>
                        <td class="text-center">{{ habitacion.acomodacion }}</td>
                        <td>
                            <router-link :to="{ name: 'editar-habitacion', params: { id: habitacion.id } }">
                                <img src="@/assets/edit.svg" alt="Editar habitacion" width="35px" height="35px" />
                            </router-link>
                            <a @click="confirmarEliminar(habitacion.id)">
                                <img src="@/assets/delete.svg" alt="Eliminar habitacion" width="35px" height="35px" />
                            </a>                        
                        </td>
                    </tr>
                  </tbody>
                </table>
             </div>

        </div>

    </div>
  </div>
</template>

<script>
    export default {
        data() {
            return {
            habitaciones: [],
            loading: true,
            };
        },
        mounted() {
            this.fetchhabitaciones();
        },
        methods: {
            async fetchhabitaciones() {
                try {
                    const response = await this.$axios.get('/habitaciones');
                    this.habitaciones = response.data.data;
                    } catch (error) {
                        console.error('Error al cargar los habitaciones:', error);
                    } finally {
                        this.loading = false;
                }
            },

            async confirmarEliminar(id) {
                const confirmado = window.confirm("¿Estás seguro de que deseas eliminar este habitacion?");
                if (confirmado) {
                    this.eliminarhabitacion(id);
                }
            },


            async eliminarhabitacion(id) {
                try {
                    await this.$axios.delete(`http://prueba-hoteles-decameron.com/api/habitaciones/${id}`);
                    this.habitaciones = this.habitaciones.filter(habitacion => habitacion.id !== id);
                    alert("habitacion eliminado exitosamente.");
                } catch (error) {
                    alert("Ocurrió un error al eliminar el habitacion.");
                }
            },
        },
    };
</script>