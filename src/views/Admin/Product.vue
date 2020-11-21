<template>
  <div class="mr-2 w-1/2 flex flex-col bg-white overflow-y-auto">
    <input placeholder="Buscar ..." class="m-4" v-model="searchTerm" />

    <ProductCard
      class="border-b-2 hover:bg-primary-100 cursor-pointer"
      :class="{ 'bg-primary-100': selectedProduct.id === product.id }"
      @click="selectProduct(product)"
      v-for="product in products"
      v-bind="{ product, quantity: 1 }"
      :key="product.name"
      :show-quantity="false"
    >
    </ProductCard>

    <div class="mt-4 self-center">
      <Button @click="addProduct">Agregar un producto</Button>
    </div>
  </div>
  <div class="ml-2 w-1/2 flex flex-col bg-white p-6 overflow-y-auto">
    <div
      v-if="!selectedProduct.id"
      class="flex h-full items-center justify-center"
    >
      <div class="flex flex-col items-center">
        <p class="text-2xl text-center">Seleccione un producto ó</p>
        <Button @click="addProduct">Agregue un producto</Button>
      </div>
    </div>
    <form v-else class="flex flex-col">
      <div class="self-center">
        <img
          :src="selectedProduct.image"
          v-if="selectedProduct.image"
          class="h-48 w-48"
        />
      </div>
      <div class="form-group mb-3">
        <label for="img" class="mb-1">Imagen</label>
        <input
          type="url"
          id="img"
          class="w-full"
          v-model="selectedProduct.image"
        />
      </div>

      <div class="form-group mb-3">
        <label for="name" class="mb-1">Nombre</label>
        <input
          type="text"
          id="name"
          class="w-full"
          v-model="selectedProduct.name"
        />
      </div>

      <div class="form-group mb-6">
        <label for="price" class="mb-1">Precio</label>
        <input
          type="number"
          min="0"
          id="price"
          class="w-full"
          v-model="selectedProduct.price"
        />
      </div>

      <Button @click.prevent="saveProduct" class="mb-2">Guardar</Button>
      <Button @click.prevent="deleteProduct(selectedProduct)" variant="danger"
        >Eliminar</Button
      >
    </form>
  </div>
</template>

<script>
import { ref, computed } from "vue";

import ProductCard from "@/components/ProductCard.vue";
import Button from "@/components/Button.vue";

import useProducts from "@/composables/useProducts.js";

export default {
  components: { ProductCard, Button },
  setup() {
    const {
      products,
      updateProduct,
      createProduct,
      deleteProduct,
      fetchProducts
    } = useProducts();

    const searchTerm = ref("");

    const filterProducts = computed(() => {
      if (!searchTerm.value) {
        return products.value;
      }
      return products.value.filter(p =>
        p.name.toLowerCase().includes(searchTerm.value.toLowerCase())
      );
    });

    const selectedProduct = ref({
      id: null,
      image: "",
      name: "",
      price: 0
    });

    function selectProduct(product) {
      if (selectedProduct.value.name === product.name) {
        selectedProduct.value = {};
      } else {
        selectedProduct.value = { ...product };
      }
    }

    function addProduct() {
      selectedProduct.value = {
        id: "new"
      };
    }

    async function saveProduct() {
      if (selectedProduct.value.id === "new") {
        await createProduct(selectedProduct.value);
      } else {
        await updateProduct(selectedProduct.value);
      }

      fetchProducts();
    }

    fetchProducts();

    return {
      products: filterProducts,
      searchTerm,
      selectProduct,
      selectedProduct,
      addProduct,
      saveProduct,
      deleteProduct
    };
  }
};
</script>
