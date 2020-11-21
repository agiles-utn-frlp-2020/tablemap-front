<template>
  <nav
    class="flex align-center border-solid border-2 border-gray-100 py-3 px-10"
  >
    <div class="w-1/2 flex justify-end">
      <a href="/" class="flex align-center outline-none focus:shadow-outline">
        <Logo width="40" height="40" class="inline-block mr-3" />
        <h1 class="inline-block text-2xl text-gray-800">TableMap</h1>
      </a>
    </div>
    <div class="w-1/2 flex justify-end">
      <Button
        variant="outline"
        size="sm"
        class="flex items-center"
        @click="logout"
      >
        <Signout class="w-6 inline mr-2"></Signout>
        Salir
      </Button>
    </div>
  </nav>
</template>

<script>
import Logo from "./Logo.vue";
import Button from "@/components/Button.vue";
import Signout from "@/components/Icons/SignOut.vue";

import useLogin from "@/composables/useLogin.js";
import { useRouter } from "vue-router";

export default {
  components: { Logo, Button, Signout },
  setup() {
    const router = useRouter();
    const { logout } = useLogin();

    return {
      logout: async () => {
        await logout();
        router.go({ name: "Login" });
      }
    };
  }
};
</script>
