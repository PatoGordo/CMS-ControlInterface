<script lang="ts" setup>
import { cmsStore } from "@/store/Cms.store";
import { ref } from "vue";
import { useRouter } from "vue-router";

const name = ref("");
const structure = ref<{ name: string; type: string }[]>([]);

const router = useRouter();

const newStructure = ref({ name: "", type: "string" });

async function createCMS() {
  try {
    await cmsStore.createCMS(name.value, structure.value, []);

    alert("New CMS Created with success");
    router.push("/dashboard");
  } catch (err) {
    console.error(err);
  }
}

function addNewStructure() {
  structure.value.push({
    name: newStructure.value.name,
    type: newStructure.value.type,
  });
}
</script>

<template>
  <div>
    <h2 class="title">Create a new CMS</h2>
    <form class="container" @submit.prevent="createCMS">
      <label for="name" class="osr">CMS name</label>
      <input
        id="name"
        v-model="name"
        type="text"
        class="outlined"
        placeholder="CMS name"
      />

      <h3>Structure</h3>
      <ul class="container">
        <li v-for="(field, index) in structure" :key="index">
          {{ field.name }}: !{{ field.type }}
          <a style="cursor: pointer" @click="structure.splice(index, 1)"
            >Remove field</a
          >
        </li>
      </ul>

      <label for="field-name" class="osr">New structure field name</label>
      <input
        id="field-name"
        v-model="newStructure.name"
        type="text"
        class="outlined"
        placeholder="CMS New structure field name"
      />

      <label for="field-type" class="osr">New structure field type</label>
      <select
        id="field-type"
        v-model="newStructure.type"
        class="outlined"
        placeholder="CMS New structure field type"
      >
        <option value="string">String</option>
        <option value="number">Number</option>
      </select>

      <button
        class="outlined half border-blue"
        type="button"
        @click="addNewStructure"
      >
        Add to structures
      </button>

      <button class="outlined half border-deep-purple" type="submit">
        Create new CMS
      </button>
    </form>
  </div>
</template>
