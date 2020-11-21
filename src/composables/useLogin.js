import { login, logout } from "@/services/login.js";

export default function() {
  let role = localStorage.getItem("role");

  return {
    routeAfterLogin: role === "encargado" ? "Admin" : "Home",
    isLoged: !!role,
    login: async credentials => {
      const resp = await login(credentials);
      localStorage.setItem("role", resp.role);
      role = resp.role;
    },
    logout: async () => {
      await logout();
      localStorage.removeItem("role");
    }
  };
}
