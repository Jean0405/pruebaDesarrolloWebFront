<template>
    <div class="relative">
        <div class="h-screen flex flex-col justify-center items-center p-5">
            <img class="" src="https://d2sbaogcozkhdh.cloudfront.net/assets/prod/uploads/avances-software-s-a-s" alt="">
            <form class="flex flex-col gap-5 p-5 rounded-lg" @submit.prevent="submitForm">
                <div class="flex flex-col gap-2">
                    <label class="font-bold" for="type" style="color: #1C6B89;">Type: </label>
                    <select class="p-2.5 bg-gray-200 rounded outline-none border-none" name="type" v-model="type" id="">
                        <option class="outline-none border-none" value="patient" selected>Patient</option>
                        <option class="outline-none border-none" value="professional">Professional</option>
                    </select>
                </div>
                <div class="flex flex-col gap-2">
                    <label class="font-bold" for="identification_number" style="color: #1C6B89;">Identification:</label>
                    <input class="p-2 bg-gray-200 rounded outline-none" type="text" v-model="identification_number"
                        placeholder="Identification number">
                </div>
                <div class="flex flex-col gap-2">
                    <label class="font-bold" for="password" style="color: #1C6B89;">Password:</label>
                    <input class="p-2 bg-gray-200 rounded outline-none" type="password" v-model="password"
                        placeholder="Contraseña">
                </div>
                <button class="bg-sky-500 text-white font-bold rounded shadow-lg p-2.5" type="submit">Iniciar
                    sesión</button>
                <p>No tienes una cuenta? <span class="text-sky-600 italic font-bold cursor-pointer"
                        @click="$router.push('/register')">Registrarse</span></p>
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
            "type": 'patient',
            "identification_number": '',
            "password": ''
        }
    },

    methods: {
        async submitForm() {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        type: this.type,
                        identification_number: this.identification_number,
                        password: this.password
                    })
                });

                if (response.status === 200) {
                    const responseData = await response.json();

                    if (responseData.user) {
                        if (responseData.isFirst_login) {
                            this.$router.push({
                                    path: '/updatePassword',
                                    query: { user: JSON.stringify(responseData.user) }
                                });
                        } else {
                            if (responseData.user.type === 'professional') {
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
                        }
                    } else {
                        alert('Credenciales incorrectas');
                    }
                } else {
                    alert('Credenciales incorrectas');
                }
                this.type = 'patient';
                this.identification_number = '';
                this.password = '';
            } catch (error) {

                console.error('Error en la solicitud', error);
            }
        }
    }
};
</script>