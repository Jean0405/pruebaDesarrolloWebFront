import { createRouter, createWebHistory } from "vue-router";
import Login from "./components/pages/Login.vue";
import Register from "./components/pages/Register.vue";
import ProfessionalPage from "./components/pages/ProfessionalPage.vue";
import PatientPage from "./components/pages/PatientPage.vue";
import UpdatePassword from "./components/pages/UpdatePassword.vue";
import UpdateProfile from "./components/pages/UpdateProfile.vue";

const routes = [
  { path: "/", component: Login },
  { path: "/register", component: Register },
  { path: "/professionalPage", component: ProfessionalPage },
  { path: "/patientPage", component: PatientPage },
  { path: "/updatePassword", component: UpdatePassword },
  { path: "/updateProfile", component: UpdateProfile },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
