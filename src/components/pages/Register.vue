<template>
  <div class="relative">
    <div class="h-screen flex flex-col justify-center items-center p-5">
      <img src="https://d2sbaogcozkhdh.cloudfront.net/assets/prod/uploads/avances-software-s-a-s" alt="">
      <form class="flex flex-col gap-1 p-5 rounded-lg" @submit.prevent="submitForm">
        <div class="flex flex-col gap-2">
          <select class="p-2.5 bg-gray-200 rounded outline-none border-none" name="type" v-model="type" id="">
            <option class="outline-none border-none" value="patient" selected>Patient</option>
            <option class="outline-none border-none" value="professional">Professional</option>
          </select>
        </div>
        <div class="flex flex-col gap-2">
          <input class="p-2 bg-gray-200 rounded outline-none" type="text" v-model="identification_number"
            placeholder="Identification Number">
        </div>
        <div class="flex flex-col sm:flex-row gap-2">
          <input class="p-2 sm:w-1/2 bg-gray-200 rounded outline-none" type="text" v-model="first_name" placeholder="Nombres">
          <input class="p-2 sm:w-1/2 bg-gray-200 rounded outline-none" type="text" v-model="last_name" placeholder="Apellidos">
        </div>
        <div class="flex flex-col gap-2">
          <input class="p-2 bg-gray-200 rounded outline-none" type="email" v-model="email"
            placeholder="Correo Electronico">
        </div>
        <div class="flex flex-col gap-2">
          <input class="p-2 bg-gray-200 rounded outline-none" type="text" v-model="phone_number" placeholder="Teléfono">
        </div>
        <div class="flex flex-col gap-2">
          <input class="p-2 bg-gray-200 rounded outline-none" type="text" v-model="location" placeholder="Dirección">
        </div>
        <button class="bg-sky-500 text-white font-bold rounded shadow-lg p-2.5 mt-1" type="submit">Registrarse</button>
        <p class="text-center">Ya tienes una cuenta? <span class="text-sky-600 italic font-bold cursor-pointer"
            @click="$router.push('/')">Iniciar sesión</span></p>
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
      type: 'patient',
      identification_number: '',
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
      location: '',
      password: '',
    };
  },

  methods: {
    async submitForm() {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: this.type,
            identification_number: this.identification_number,
            first_name: this.first_name,
            last_name: this.last_name,
            email: this.email,
            phone_number: this.phone_number,
            location: this.location,
            password: this.password,
          }),
        });

        if (response.status === 200) {
          this.$router.push('/');
        } else {
          alert('Error en el registro. Verifica tus datos.');
        }

        // Limpiar campos después del registro
        this.type = 'patient';
        this.identification_number = '';
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