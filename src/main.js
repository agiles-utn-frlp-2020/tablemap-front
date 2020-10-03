import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

if (process.env.NODE_ENV === "development") {
  const { worker } = require("./mocks/browser");
  worker.start();
}

createApp(App)
  .use(router)
  .mount("#app");
