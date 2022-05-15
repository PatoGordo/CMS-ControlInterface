<script lang="ts" setup>
import { authStore } from "@/store/Auth.store";

async function handleSubmit() {
  await authStore.signUp();
}
</script>

<template>
  <div>
    <h2 class="title">Sign Up with email and password</h2>

    <form class="container" @submit.prevent="handleSubmit">
      <label for="name" class="osr">Your name</label>
      <input
        id="name"
        v-model="authStore.name"
        type="text"
        class="outlined"
        placeholder="Your name"
      />

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

      <router-link to="/auth/sign-in">I already have an account</router-link>

      <button type="submit" class="outlined half border-deep-purple">
        Sign Up
      </button>
    </form>
  </div>
</template>
