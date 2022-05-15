<script setup lang="ts">
import { ref } from "vue";
import { Icon } from "@iconify/vue";

const isOpen = ref(false);
</script>

<template>
  <nav class="navbar responsive bg-deep-purple" :class="isOpen ? 'open' : ''">
    <span
      v-if="$route.path !== '/'"
      style="cursor: pointer"
      @click="$router.go(-1)"
    >
      <Icon class="iconify icon" icon="akar-icons:arrow-left" />
    </span>

    <h1 @click="$router.push('/')">PatoGordo CMS</h1>

    <ul class="content">
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/about">About</router-link></li>
    </ul>

    <span class="toggler" @click="isOpen = !isOpen">
      <Icon class="iconify icon" icon="charm:menu-hamburger" />
    </span>
  </nav>

  <ul
    class="mobile-content bg-deep-purple container center"
    :class="isOpen ? 'open' : ''"
    @click="isOpen = !isOpen"
  >
    <li><router-link to="/">Home</router-link></li>
    <li><router-link to="/about">About</router-link></li>
  </ul>
</template>

<style lang="scss" scoped>
.mobile-content {
  position: absolute;
  top: -300px;
  height: 340px;
  list-style: none;
  transition: all 300ms;
  z-index: 1;
}

.mobile-content.open {
  top: 60px;
}

.mobile-content li {
  padding: 16px;
}

.mobile-content li a {
  color: white;
  text-decoration: none;
}

.navbar {
  position: relative;
  transition: all 300ms;
  z-index: 10;
}

.navbar.open {
  margin-bottom: 356px;
}
</style>
