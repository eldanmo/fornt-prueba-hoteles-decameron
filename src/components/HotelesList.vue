<template>
  <div>
    <div v-if="loading">Cargando hoteles...</div>
    <div v-else>
        <div class="container mt-5">
            <div class="text-center">
                <h2>Listado de hoteles</h2>
                <hr>
            </div>

            <div class="table-responsive">
                <table class="table table-sm">
                    <tr class="text-center">
                        <th class="table-primary">#</th>
                        <th class="table-primary">NIT</th>
                        <th class="table-primary">NOMBRE</th>
                        <th class="table-primary">NÚMERO DE HABITACIONES</th>
                        <th class="table-primary">CIUDAD</th>
                        <th class="table-primary">DIRECCIÓN</th>                       
                        <th class="table-primary">ACCIONES</th>                       
                    </tr>
                    <tr v-for="(hotel, i) in hoteles" :key="hotel.id">
                        <td class="text-center">{{i+1}}</td>
                        <td class="text-center">{{  hotel.nit }}</td>
                        <td class="text-center">{{ hotel.nombre }}</td>
                        <td class="text-center">{{ hotel.numero_habitaciones }}</td>
                        <td class="text-center">{{  hotel.ciudad }}</td>
                        <td class="text-center">{{ hotel.direccion }}</td>
                        <td>
                            <router-link :to="{ name: 'editar-hotel', params: { id: hotel.id } }">
                                <img src="@/assets/edit.svg" alt="Editar hotel" width="35px" height="35px" />
                            </router-link>
                            <a @click="confirmarEliminar(hotel.id)">
                                <img src="@/assets/delete.svg" alt="Eliminar hotel" width="35px" height="35px" />
                            </a>                        
                        </td>
                    </tr>
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
            hoteles: [],
            loading: true,
            };
        },
        mounted() {
            this.fetchHoteles();
        },
        methods: {
            async fetchHoteles() {
                try {
                    const response = await this.$axios.get('/hoteles');
                    this.hoteles = response.data.data;
                    } catch (error) {
                        console.error('Error al cargar los hoteles:', error);
                    } finally {
                        this.loading = false;
                }
            },

            async confirmarEliminar(id) {
                const confirmado = window.confirm("¿Estás seguro de que deseas eliminar este hotel?");
                if (confirmado) {
                    this.eliminarHotel(id);
                }
            },


            async eliminarHotel(id) {
                try {
                    await this.$axios.delete(`http://prueba-hoteles-decameron.com/api/hoteles/${id}`);
                    this.hoteles = this.hoteles.filter(hotel => hotel.id !== id); // Actualiza la lista local
                    alert("Hotel eliminado exitosamente.");
                } catch (error) {
                    alert("Ocurrió un error al eliminar el hotel.");
                }
            },
        },
    };
</script>