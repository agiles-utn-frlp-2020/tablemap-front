import { ref, computed } from "vue";

import {
  getOrder,
  createOrder,
  closeOrder,
  addProductToOrder
} from "@/services/orders.js";

export default function useOrder(id) {
  const orderId = ref(id);
  const order = ref([]);
  let products = ref([]);

  const total = computed(() => {
    return 0;
  });

  async function fetchOrder(table) {
    if (orderId.value) {
      return getOrder(orderId.value).then(fetchedOrder => {
        order.value = fetchedOrder.order;
      });
    }

    return createOrder(table.value.id).then(({ id }) => {
      order.value = [];
      orderId.value = id;
    });
  }

  function addProduct(product, quantity) {
    if (!product.value.name) {
      return;
    }

    const hasProduct = order.value.find(item => {
      return item.product.name === product.value.name;
    });

    let totalQuantity = hasProduct
      ? hasProduct.quantity + quantity.value
      : quantity.value;

    return addProductToOrder(orderId.value, {
      quantity: totalQuantity,
      product: product.value.id
    });
  }

  function matchOrderProducts() {
    order.value = order.value.map(({ quantity, product }) => {
      return {
        quantity,
        product: products.value.find(p => {
          return p.id === product;
        })
      };
    });
  }

  function setProducts(_products) {
    products = _products;
  }

  return {
    order,
    total,
    fetchOrder,
    setProducts,
    matchOrderProducts,
    addProduct,
    closeOrder: () => {
      closeOrder(orderId.value);
      orderId.value = null;
    }
  };
}
