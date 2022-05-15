<script lang="ts" setup>
import { authStore } from "@/store/Auth.store";

async function handleSubmit() {
  await authStore.signIn();
}
</script>

<template>
  <div>
    <h2 class="title">Sign In with email and password</h2>

    <form class="container" @submit.prevent="handleSubmit">
      <label for="email" class="osr">Your email</label>
      <input
        id="email"
        v-model="authStore.email"
        type="email"
        class="outlined"
        placeholder="Your email"
      />

      <label for="password" class="osr">Your password</label>
      <input
        id="password"
        v-model="authStore.password"
        type="password"
        class="outlined"
        placeholder="Your password"
      />

      <router-link to="/auth/sign-up">I don't have an account yet</router-link>

      <button type="submit" class="outlined half border-deep-purple">
        Sign In
      </button>
    </form>
  </div>
</template>
