<template>
  <div class="relative">
    <div class="h-screen flex flex-col justify-center items-center p-5">
      <img class="" src="https://d2sbaogcozkhdh.cloudfront.net/assets/prod/uploads/avances-software-s-a-s" alt="" />
      <form class="flex flex-col gap-4 p-5 rounded-lg" @submit.prevent="updatePassword">
        <h1 class="text-center font-bold text-sky-700">Actualiza tu contraseña</h1>
        <input class="p-2 bg-gray-200 rounded outline-none" type="password" v-model="password"
          placeholder="Nueva contraseña" />
        <input class="p-2 bg-gray-200 rounded outline-none" type="password" v-model="confirmPassword"
          placeholder="Confirmar contraseña" />
        <button class="bg-sky-500 text-white font-bold rounded shadow-lg p-2.5" type="submit">
          Actualizar
        </button>
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
      password: "",
      confirmPassword: "",
    };
  },
  computed: {
    user() {
      const userParam = this.$route.query.user;
      return JSON.parse(userParam);
    },
  },
  methods: {
    async updatePassword() {
      try {
        if (this.password !== this.confirmPassword) {
          alert("Las contraseñas no concuerdan")
        } else {
          const response = await fetch(
            `http://127.0.0.1:8000/api/user/${this.user.identification_number}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                password: this.password,
              }),
            }
          );

          const responseData = await response.json();
          if (responseData.user.type === 'professional') {
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
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
