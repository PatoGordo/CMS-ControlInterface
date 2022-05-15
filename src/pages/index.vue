<script setup lang="ts"></script>

<template>
  <div>
    <h2 class="sub-title">Welcome to CMS</h2>

    <button
      class="outlined half border-deep-purple"
      @click="$router.push('/auth/sign-in')"
    >
      Sign In to the CMS
    </button>
  </div>
</template>

<style lang="scss" scoped></style>
