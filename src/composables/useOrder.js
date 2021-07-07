import { ref } from "vue";

import {
  getOrder,
  createOrder,
  closeOrder,
  addProductToOrder,
  removeProductFromOrder
} from "@/services/orders.js";

export default function useOrder(id) {
  const orderId = ref(id);
  const order = ref([]);
  let products = ref([]);

  const total = ref(0);

  async function fetchOrder(table) {
    if (orderId.value) {
      return getOrder(orderId.value).then(fetchedOrder => {
        order.value = fetchedOrder.order;
        total.value = fetchedOrder.total;
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

  function removeProduct(product) {
    return removeProductFromOrder(orderId.value, product.id);
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
    removeProduct,
    setOrderId: newOrderId => {
      orderId.value = newOrderId;
      order.value = [];
    },
    closeOrder: () => {
      closeOrder(orderId.value);
      orderId.value = null;
    }
  };
}
