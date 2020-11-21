import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Admin from "../views/Admin/Base.vue";
import Product from "../views/Admin/Product.vue";
import Table from "../views/Admin/Table.vue";
import Activity from "../views/Admin/Activity.vue";

import useLogin from "@/composables/useLogin.js";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    redirect: "/admin/activity",
    children: [
      {
        path: "activity",
        name: "AdminActivity",
        component: Activity
      },
      {
        path: "product",
        name: "AdminProduct",
        component: Product
      },

      {
        path: "table",
        name: "AdminTable",
        component: Table
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const { isLoged, routeAfterLogin } = useLogin();

  if (to.name === "Login") {
    if (isLoged) {
      return next({ name: routeAfterLogin });
    } else {
      return next();
    }
  }

  if (isLoged) {
    return next();
  }

  return next({ name: "Login" });
});

export default router;
