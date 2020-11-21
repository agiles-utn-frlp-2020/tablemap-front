import { ref } from "vue";
import {
  getProducts,
  updateProduct,
  createProduct
} from "@/services/products.js";

export default function useProducts() {
  const products = ref([]);

  async function fetchProducts() {
    products.value = await getProducts();
    return products;
  }

  return {
    products,
    fetchProducts,
    createProduct,
    updateProduct
  };
}
