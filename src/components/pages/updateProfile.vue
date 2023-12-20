<template>
  <div class="relative">
    <div class="h-screen flex flex-col justify-center items-center p-5">
      <img src="https://d2sbaogcozkhdh.cloudfront.net/assets/prod/uploads/avances-software-s-a-s" alt="">
      <button class="text-black font-bold text-xl w-20 mt-6" @click="back"><i class="fa-solid fa-arrow-left"></i></button>
      <form class="flex flex-col gap-1 pt-2 rounded-lg" @submit.prevent="submitForm">
        <h2 class="text-sky-500 text-center font-bold">Actualiza tus datos</h2>
        <div class="flex flex-col sm:flex-row gap-2">
          <input class="p-2 sm:w-1/2 bg-gray-200 rounded outline-none" type="text" v-model="first_name"
            :placeholder="user.first_name">
          <input class="p-2 sm:w-1/2 bg-gray-200 rounded outline-none" type="text" v-model="last_name"
            :placeholder="user.last_name">
        </div>
        <div class="flex flex-col gap-2">
          <input class="p-2 bg-gray-200 rounded outline-none" type="email" v-model="email" :placeholder="user.email">
        </div>
        <div class="flex flex-col gap-2">
          <input class="p-2 bg-gray-200 rounded outline-none" type="text" v-model="phone_number"
            :placeholder="user.phone_number">
        </div>
        <div class="flex flex-col gap-2">
          <input class="p-2 bg-gray-200 rounded outline-none" type="text" v-model="location" :placeholder="user.location">
        </div>
        <div class="flex flex-col gap-2">
          <input class="p-2 bg-gray-200 rounded outline-none" type="password" v-model="password"
            placeholder="Nueva contraseña">
        </div>
        <button class="bg-sky-500 text-white font-bold rounded shadow-lg p-2.5 mt-1" type="submit">Actualizar</button>
        <button class="bg-gray-500 text-center text-white font-bold rounded italic p-1.5"
          @click="$router.push('/updatePassword')">Cambiar contraseña</button>
      </form>
    </div>
    <svg class="absolute bottom-0 -z-30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
      <path fill="#0099ff" fill-opacity="1" d="M0,64L720,288L1440,256L1440,320L720,320L0,320Z"></path>
    </svg>
    <svg class="absolute bottom-0 -z-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
      <path fill="#a2d9ff" fill-opacity="1" d="M0,224L1440,160L1440,320L0,320Z"></path>
    </svg>
  </div>
</template>

<script>
export default {
  data() {
    return {
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
      location: '',
      password: ''
    };
  },

  computed: {
    user() {
      const userParam = this.$route.query.user;
      return JSON.parse(userParam);
    }
  },


  methods: {
    updatePassword() {
      this.$router.push({
        path: '/updatePassword',
        query: { user: JSON.stringify(this.user) }
      });
    },

    back() {
      if (this.user.type === 'professional') {
        this.$router.push({
          path: '/professionalPage',
          query: { user: JSON.stringify(this.user) }
        });
      } else {
        this.$router.push({
          path: '/patientPage',
          query: { user: JSON.stringify(this.user) }
        });
      }
    },

    async submitForm() {
      try {
        const requestBody = {
          first_name: this.first_name.trim(),
          last_name: this.last_name.trim(),
          email: this.email.trim(),
          phone_number: this.phone_number.trim(),
          location: this.location.trim(),
          password:this.password.trim()
        };

        const filteredRequestBody = Object.fromEntries(
          Object.entries(requestBody).filter(([_, value]) => value !== '')
        );

        const response = await fetch(`http://127.0.0.1:8000/api/user/${this.user.identification_number}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(filteredRequestBody),
        });

        if (response.status === 200) {
          const responseData = await response.json();
          if (this.user.type === 'professional') {
            this.$router.push({
              path: '/professionalPage',
              query: { user: JSON.stringify(responseData.user) }
            });
          } else {
            this.$router.push({
              path: '/patientPage',
              query: { user: JSON.stringify(responseData.user) }
            });
          }
        } else {
          alert('Error en el registro. Verifica tus datos.');
        }

        this.first_name = '';
        this.last_name = '';
        this.email = '';
        this.phone_number = '';
        this.location = '';
        this.password = '';
      } catch (error) {
        console.error('Error en la solicitud', error);
      }
    },
  },
};
</script>