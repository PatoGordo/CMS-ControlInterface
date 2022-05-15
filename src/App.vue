<script setup lang="ts">
import AppNavbar from "@/components/appNavbar.vue";
import { usePreferencesStore } from "@/store/Preferences.store";
import { watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { authStore } from "./store/Auth.store";

const userPreferences = usePreferencesStore();

document.body.setAttribute("theme", userPreferences.theme);

const route = useRoute();
const router = useRouter();

watch(
  () => route.path,
  (val) => {
    if (val.includes("/auth/sign-") && authStore.isLoggedin) {
      router.push("/dashboard");
    }
    if (val.includes("/dashboard") && !authStore.isLoggedin) {
      router.push("/auth/sign-in");
    }
  },
  { deep: true }
);
</script>

<template>
  <app-navbar />
  <router-view />
</template>

<style lang="less">
@import "./styles/style.less";

#app {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  > div {
    width: min(510px, 100%) !important;
    .container();
    .distance();
  }
}

.icon {
  width: 24px;
  height: 24px;
  color: #fff;
  fill: #fff;
  display: grid;
  place-items: center;
}
</style>
