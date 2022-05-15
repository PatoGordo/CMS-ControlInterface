<script lang="ts" setup>
import { cmsStore } from "@/store/Cms.store";
import { onBeforeMount } from "vue";

onBeforeMount(async () => {
  await cmsStore.getCMSs();
});
</script>

<template>
  <div>
    <h2 class="title">CMS Dashboard</h2>

    <section class="container">
      <div
        v-for="cms in cmsStore.cmss"
        :key="cms._id"
        class="cms-item container distance"
      >
        <h3 class="sub-title">{{ cms.name }}</h3>
        <p>
          API key:
          {{
            cms.api_key
              .replace(cms.api_key.split("-")[1], "****")
              .replace(cms.api_key.split("-")[4], "***************")
          }}
        </p>
        <p>Last change: {{ new Date(cms.updatedAt).toLocaleString() }}</p>
        <button
          class="outlined half border-deep-purple"
          @click="$router.push(`/dashboard/cms/${cms._id}`)"
        >
          Manage CMS
        </button>
      </div>
    </section>

    <button
      class="outlined half border-green"
      @click="$router.push('/dashboard/create-cms')"
    >
      Create a new CMS
    </button>
  </div>
</template>

<style lang="less">
.cms-item {
  width: 100%;
  background: #ededed;
  border-radius: 4px;
}
</style>
