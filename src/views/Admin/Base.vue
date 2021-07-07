<template>
  <div class="h-screen w-full flex bg-gray-200">
    <nav class="w-24 flex flex-col bg-white">
      <Logo class="menu-item p-4 mb-4"></Logo>

      <router-link :to="{ name: 'AdminActivity' }" v-slot="{ isActive }">
        <div
          class="menu-item p-2 hover:bg-primary-100 cursor-pointer"
          :class="{ 'bg-primary-100': isActive }"
        >
          <ActivityIcon class="text-primary-600"></ActivityIcon>
          Actividad
        </div>
      </router-link>

      <router-link :to="{ name: 'AdminTable' }" v-slot="{ isActive }">
        <div
          class="menu-item p-2 hover:bg-primary-100 cursor-pointer"
          :class="{ 'bg-primary-100': isActive }"
        >
          <TableIcon></TableIcon>
          Mesas
        </div>
      </router-link>
      <router-link :to="{ name: 'AdminProduct' }" v-slot="{ isActive }">
        <div
          class="menu-item p-2 hover:bg-primary-100 cursor-pointer"
          :class="{ 'bg-primary-100': isActive }"
        >
          <ProductIcon></ProductIcon>
          Productos
        </div>
      </router-link>
      <div
        class="menu-item p-2 hover:bg-primary-100 cursor-pointer mt-4"
        @click="logout"
      >
        <SignoutIcon class="text-primary-600"></SignoutIcon>
        Salir
      </div>
    </nav>
    <main class="my-4 mx-8 flex-1 flex overflow-hidden">
      <router-view />
    </main>
  </div>
</template>

<script>
import Logo from "@/components/Logo.vue";
import ProductIcon from "@/components/Icons/Product.vue";
import TableIcon from "@/components/Icons/Table.vue";
import SignoutIcon from "@/components/Icons/SignOut.vue";
import ActivityIcon from "@/components/Icons/Activity.vue";

import useLogin from "@/composables/useLogin.js";
import { useRouter } from "vue-router";

export default {
  components: { ProductIcon, TableIcon, ActivityIcon, SignoutIcon, Logo },
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

<style>
/* purgecss start ignore */
.menu-item {
  @apply .flex;
  @apply .flex-col;
  @apply .items-center;
}
/* purgecss end ignore */
</style>
