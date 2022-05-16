<script lang="ts" setup>
import { cmsStore, ICMS } from "@/store/Cms.store";
import { onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";

let cms = ref<ICMS | undefined>();
let showAPIKey = ref(false);

let data = ref<unknown>({});

const route = useRoute();

const id = route.params.id as string;

async function insertDataToCMS() {
  if (!id || !cms.value?.api_key || !data.value) {
    return;
  }

  try {
    await cmsStore.insertDataToCMS(id, cms.value?.api_key, data.value);
    alert("Data added with success");
    data.value = {};
  } catch (err) {
    console.error(err);
  }
}

onBeforeMount(async () => {
  if (!cmsStore.cmss.length) {
    await cmsStore.getCMSs();
    cms.value = cmsStore.getCMS(id) as ICMS;
    return;
  }

  cms.value = cmsStore.getCMS(id) as ICMS;
});
</script>

<template>
  <div>
    <h2 class="title">{{ cms?.name }}</h2>
    <p>CMS id: {{ cms?._id }}</p>
    <p>
      API Key:
      {{
        !showAPIKey
          ? cms?.api_key
              .replace(cms.api_key.split("-")[1], "****")
              .replace(cms.api_key.split("-")[4], "***************")
          : cms?.api_key
      }}
    </p>
    <p>
      Last change: {{ new Date(cms?.updatedAt || new Date()).toLocaleString() }}
    </p>
    <div v-if="cms?.authorized_urls?.length" class="container">
      <h4>Authorized URL's</h4>
      <ul v-for="(url, index) in cms.authorized_urls" :key="index">
        <li>{{ url }}</li>
      </ul>
    </div>
    <button
      class="outlined half border-deep-purple"
      @click="showAPIKey = !showAPIKey"
    >
      Show API Key complete
    </button>
    <br />
    <div v-if="cms?.structure" class="container">
      <h4>Data Structure</h4>
      <ul>
        <li
          v-for="(field, index) in Object.keys(
            JSON.parse(JSON.stringify(cms.structure))
          )"
          :key="index"
        >
          {{ (cms.structure as any)[field].name }}: !{{
          (cms.structure as any)[field].type
          }}
        </li>
      </ul>
    </div>
    <br />
    <div v-if="cms?.structure" class="container">
      <h4>Add data to CMS</h4>
      <form class="container" @submit.prevent="insertDataToCMS">
        <div
          v-for="(field, index) in Object.keys(
            JSON.parse(JSON.stringify(cms.structure))
          )"
          :key="index"
          class="container"
        >
          <label
            :for="`${(cms.structure as any)[field].name}-${id}`"
            class="osr"
            >Your {{(cms.structure as any)[field].name}}</label
          >
          <input
            :id="`${(cms.structure as any)[field].name}-${id}`"
            v-model="(data as any)[(cms.structure as any)[field].name]"
            type="text"
            class="outlined"
            :placeholder="`Your ${(cms.structure as any)[field].name}`"
          />
        </div>

        <button class="outlined half border-deep-purple">Insert data</button>
      </form>
    </div>
    <br />
    <div v-if="cms?.data" class="container">
      <h4>CMS Data</h4>
      <ul>
        <li v-for="(data, index) in cms.data" :key="index">
          {{ JSON.stringify(data) }}
        </li>
      </ul>
    </div>
    <br />
  </div>
</template>
