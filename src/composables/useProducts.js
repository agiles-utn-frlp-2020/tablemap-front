import { ref } from "vue";
import productServices from "@/services/products.js";

export default function useProducts() {
  const products = ref([]);

  async function fetchProducts() {
    products.value = await productServices.getProducts();
    return products;
  }

  function deleteProduct(product) {
    products.value = products.value.filter(p => p.id !== product.id);
    return productServices.deleteProduct(product);
  }

  function updateProduct(product) {
    let idx;

    products.value.find((p, i) => {
      if (p.id === product.id) {
        idx = i;
        return true;
      }
    });

    if (!idx) {
      return;
    }

    products.value = [
      ...products.value.slice(0, idx),
      product,
      ...products.value.slice(idx + 1)
    ];

    return productServices.updateProduct(product);
  }

  function createProduct(product) {
    products.value = [...products.value, product];
    return productServices.createProduct(product);
  }

  return {
    products,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct
  };
}
