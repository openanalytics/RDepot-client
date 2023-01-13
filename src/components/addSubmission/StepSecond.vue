<template>
  <v-window-item :value="2">
    <v-card class="mb-12 px-10 py-5 step" min-height="250px">
      <v-file-input
        multiple
        v-model="files"
        counter
        placeholder="Choose packages"
        prepend-icon="mdi-paperclip"
        v-on:change="addPackages"
      >
        <template v-slot:selection="{ fileNames }">
          <template v-for="fileName in fileNames" :key="fileName">
        <v-chip
          size="x-small"
          label
          color="oablue"
          class="mt-3 p-2"
          @click="removePackage"
        >
          {{ fileName }}
        </v-chip>
        </template>
      </template>
      </v-file-input>
    </v-card>
    <div class="d-flex justify-space-between">
      <v-btn color="oablue" @click="$emit('next', 1)"> go back </v-btn>
      <v-btn color="oablue" @click="nextStep"> Continue </v-btn>
    </div>
  </v-window-item>
</template>

<script setup lang="ts">
import { useSubmissionState } from "@/store/submission";
import { ref } from "vue";

const emits = defineEmits(["next"]);
const submissions_store = useSubmissionState();
const files = ref([]);

function removePackage() {}
function addPackage() {}
function addPackages(value: File[]) {
  console.log(value);
  submissions_store.setPackages(files.value);
}
function deleteAllExistingPackagesAndAddNewPackages() {}
function nextStep() {
  if (submissions_store.packages.length > 0) {
    emits("next", 3);
  } else {
    // this.$notify({
    //   group: 'rdepot',
    //   text: 'no packages choosen',
    //   type: 'warn'
    // })
  }
}
</script>
