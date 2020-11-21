<template>
  <div
    class="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-75"
  >
    <div
      class="w-1/3 h-80 py-4 px-4 md:px-20 flex flex-col bg-white shadow-lg rounded"
    >
      <Logo width="100" height="100" class="mb-6 self-center" />

      <div class="form-group mb-3">
        <label for="user" class="mb-1">Usuario</label>
        <input type="text" id="user" class="w-full" v-model="username" />
      </div>

      <div class="form-group mb-6">
        <label for="pass" class="mb-1">Contraseña</label>
        <input type="password" id="pass" class="w-full" v-model="password" />
      </div>

      <Button @click="login">Ingresar</Button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";

import Logo from "@/components/Logo.vue";
import Button from "@/components/Button.vue";

import useLogin from "@/composables/useLogin.js";

export default {
  components: { Logo, Button },
  setup() {
    const username = ref("");
    const password = ref("");

    const router = useRouter();
    const { login, routeAfterLogin } = useLogin();

    return {
      username,
      password,
      login: async () => {
        await login({
          username: username.value,
          password: password.value
        });

        router.go({ name: routeAfterLogin });
      }
    };
  }
};
</script>
