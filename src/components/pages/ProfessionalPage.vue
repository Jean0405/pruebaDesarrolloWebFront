
<template>
  <div class="bg-sky-950 relative">
    <div v-if="showCreateForm" class="fixed inset-0 bg-black opacity-80 z-40"></div>

    <nav class="flex justify-between w-full bg-white p-3">
      <img class="w-20" src="https://d2sbaogcozkhdh.cloudfront.net/assets/prod/uploads/avances-software-s-a-s" alt="">
      <div class="flex gap-2">
        <button @click="logout" class="bg-red-500 text-white font-bold px-3 py-1 rounded">
          <i class="fa-solid fa-right-from-bracket"></i>
        </button>
      </div>
    </nav>

    <button @click="toggleCreateForm" class="fixed bottom-20 right-5 bg-white text-black font-bold px-4 py-2 rounded z-20"><i class="fa-solid fa-plus"></i></button>
    <h1 class="text-sky-200 text-4xl text-center font-bold italic pt-2">¡Bienvenido, {{ user.first_name }}!</h1>

    <!-- HISTORIAS -->
    <h3 class="text-sky-400 text-2xl text-center font-bold pt-5">HISTORIAS REALIZADAS</h3>
    <div class="h-screen">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3">
        <div class="relative bg-sky-200 rounded-lg p-2 z-10" v-for="history in histories" :key="history.id">
          <div class="absolute right-5 top-5 rounded-full w-4 h-4 "
            :class="{ 'bg-green-500': history.is_accepted === 1, 'bg-red-500': history.is_accepted === 0 }"></div>
          <span class="text-3xl font-bold text-sky-700">{{ history.id }}</span>
          <div class="flex flex-col justify-center items-center text-center">
            <div class="flex gap-2 bg-sky-700 text-white rounded-lg py-1 px-3">
              <p class="font-bold">Paciente ID</p>
              <p class="text-sky-200 font-medium">{{ history.patient_id }}</p>
            </div>
            <h2 class="font-bold text-sky-700 uppercase pt-2">antecedentes</h2>
            <p class="font-medium">{{ history.medical_history }}</p>
            <h2 class="font-bold text-sky-700 uppercase pt-2">Evolución</h2>
            <p class="font-medium">{{ history.final_evolution }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Formulario para crear nuevas historias -->
    <div v-if="showCreateForm"
      class="z-50 w-80 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-sky-600 p-6 rounded-md">
      <h2 class="text-center text-xl text-white font-bold mb-4">Crear Nueva Historia</h2>

      <!-- Agrega los campos y lógica necesarios para crear una nueva historia -->
      <form @submit.prevent="saveNewHistory">

        <div class="flex flex-col gap-3 mb-3">
          <input v-model="newHistory.patient_id" class="bg-gray-200 w-full rounded p-2 outline-none" type="text"
            placeholder="Identificación del paciente">
          <input v-model="newHistory.history_consecutive" class="bg-gray-200 w-full rounded p-2 outline-none"
            type="number" placeholder="Consecutivo">
          <select v-model="newHistory.current_patient_state" class="bg-gray-200 rounded border-none outline-none p-2"
            name="" id="">
            <option value="estable" selected>Estable</option>
            <option value="critico">Crítico</option>
          </select>
          <input v-model="newHistory.medical_history" class="bg-gray-200 w-full rounded p-2 outline-none" type="text"
            placeholder="Antecedente médico">
          <input v-model="newHistory.final_evolution" class="bg-gray-200 w-full rounded p-2 outline-none" type="text"
            placeholder="Evolución final">
          <input v-model="newHistory.professional_opinion" class="bg-gray-200 w-full rounded p-2 outline-none" type="text"
            placeholder="Opinión profesional">
          <input v-model="newHistory.recommendations" class="bg-gray-200 w-full rounded p-2 outline-none" type="text"
            placeholder="Recomendación">
        </div>

        <div class="flex justify-center items-center">
          <button type="submit" class="bg-white text-black font-bold px-4 py-2 rounded">
            Guardar
          </button>
          <button @click="cancelCreateForm" class="bg-red-500 text-white font-bold px-4 py-2 rounded ml-2">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newHistory: {
        "patient_id": "",
        "history_consecutive": null,
        "current_patient_state": "estable",
        "medical_history": "",
        "final_evolution": "",
        "professional_opinion": "",
        "recommendations": ""
      },
      histories: null,
      showCreateForm: false,
    }
  },

  computed: {
    user() {
      const userParam = this.$route.query.user;
      return JSON.parse(userParam);
    }
  },

  mounted() {
    this.getUserHistories();
  },


  methods: {
    logout() {
      this.$router.push('/');
    },

    // FETCH METHODS
    async getUserHistories() {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/user/${this.user.identification_number}/histories`);
        const data = await response.json();
        this.histories = data.histories;
      } catch (error) {
        console.error('Error al obtener las historias:', error);
      }
    },

    async saveNewHistory() {

      const response = await fetch(`http://127.0.0.1:8000/api/user/${this.user.identification_number}/histories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.newHistory)
      });
      console.log(response);
      console.log(this.newHistory);
      this.showCreateForm = false;
      this.getUserHistories();
    },

    // Método para mostrar/ocultar el formulario de creación
    toggleCreateForm() {
      this.showCreateForm = !this.showCreateForm;
    },


    // Método para cancelar la creación de una nueva historia
    cancelCreateForm() {
      // Puedes realizar acciones de limpieza o simplemente cerrar el formulario
      this.showCreateForm = false;
    }
  }
};
</script>
