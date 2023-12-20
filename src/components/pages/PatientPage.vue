
<template>
  <div class="bg-sky-950 relative">
    <nav class="flex justify-between w-full bg-white p-3">
      <img class="w-20" src="https://d2sbaogcozkhdh.cloudfront.net/assets/prod/uploads/avances-software-s-a-s" alt="">
      <div class="flex gap-2">
        <button @click="updateProfile" class="text-black font-bold px-3 py-1 rounded">
          <i class="fa-solid fa-gear"></i>
        </button>
        <button @click="logout" class="text-black font-bold px-3 py-1 rounded">
          <i class="fa-solid fa-right-from-bracket"></i>
        </button>
      </div>
    </nav>

    <h1 class="text-sky-200 text-4xl text-center font-bold italic pt-2">¡Bienvenido, {{ user.first_name }}!</h1>

    <!-- HISTORIAS -->
    <h3 class="text-sky-400 text-2xl text-center font-bold pt-5">HISTORIAS ASIGNADAS</h3>
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
            <h2 class="font-bold text-sky-700 uppercase pt-2">Opinión profesional</h2>
            <p class="font-medium">{{ history.professional_opinion }}</p>
            <h2 class="font-bold text-sky-700 uppercase pt-2">Recomendaciones</h2>
            <p class="font-medium">{{ history.recommendations }}</p>
            <button v-if="!history.is_accepted" @click="acceptHistory(history.id)"
              class="bg-green-500 text-white font-bold px-3 py-1 rounded-lg mt-2">
              <i class="fa-solid fa-check"></i>
            </button>
          </div>
          <!-- <p class="text-sky-600 text-right font-bold p-3">{{ formatDate(history.created_at) }}</p> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import UpdateProfile from './updateProfile.vue';
export default {

  data() {
    return {
      histories: null,
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
    this.acceptHistory()
  },


  methods: {
    logout() {
      this.$router.push('/');
    },
    updateProfile() {
      this.$router.push({
        path: '/updateProfile',
        query: { user: JSON.stringify(this.user) }
      });
    },

    formatDate(dateString) {
      return format(new Date(dateString), 'dd MMM yyyy', { locale: es });
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

    async acceptHistory(historyId) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/user/${this.user.identification_number}/histories/${historyId}/accept`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        this.getUserHistories();
      } catch (error) {
        console.log(error);
      }

    }

  }
};
</script>
