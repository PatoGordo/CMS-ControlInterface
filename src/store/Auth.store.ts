import { api, handleAxiosError } from "@/api";
import { reactive, watch } from "vue";

export const authStore = reactive({
  isLoggedin: localStorage.getItem("app-auth-token") ? true : false,
  token: localStorage.getItem("app-auth-token") || "",
  user: JSON.parse(localStorage.getItem("app-auth-user") || "{}"),
  name: "",
  email: "",
  password: "",
  async signIn() {
    try {
      const res = await api.post("/auth/sign-in", {
        email: this.email,
        password: this.password,
      });

      this.user = res.data.result.user;
      this.token = res.data.result.token;

      this.name = "";
      this.email = "";
      this.password = "";

      localStorage.setItem("app-auth-user", JSON.stringify(this.user));
      localStorage.setItem("app-auth-token", this.token);
    } catch (err) {
      handleAxiosError(err);
    }
  },
  async signUp() {
    try {
      const res = await api.post("/auth/sign-up", {
        name: this.name,
        email: this.email,
        password: this.password,
      });

      this.user = res.data.result.user;
      this.token = res.data.result.token;

      this.name = "";
      this.email = "";
      this.password = "";

      localStorage.setItem("app-auth-user", JSON.stringify(this.user));
      localStorage.setItem("app-auth-token", this.token);
    } catch (err) {
      handleAxiosError(err);
    }
  },
});

watch(
  () => authStore.token,
  () => {
    window.location.reload();
  },
  { deep: true }
);
