<template>
  <v-window-item :value="1">
    <v-card class="mb-12 px-10 py-5 step" height="250px">
      <v-select
        class="mt-5"
        :items="repositories"
        :label="$t('addSubmission.step1Title')"
        @update:modelValue="changeRepository"
        item-value="id"
        item-title="name"
        color="black"
        persistent-hint
        return-object
      ></v-select>
    </v-card>
    <div class="d-flex justify-end">
      <v-btn color="oablue" @click="nextStep"> Continue </v-btn>
    </div>
  </v-window-item>
</template>

<script setup lang="ts">
import { Repository } from "@/models";
import { useSubmissionState } from "@/store/submission";
const emits = defineEmits(["next"]);
const submissions_store = useSubmissionState();
const repositories = [
  {
    id: 1,
    name: "repository1",
  },
  {
    id: 2,
    name: "repository2",
  },
] as Repository[];

function changeRepository(value: Repository) {
  console.log('repository')
      submissions_store.setRepository(value);
}
function nextStep() {
  if (submissions_store.repository != null) {
    console.log('false')
    emits("next", 2);
  } else {
    // this.$notify({
    //   group: 'rdepot',
    //   text: 'no repository choosen',
    //   type: 'warn'
    // })
  }
}
</script>

<style lang="scss">
.v-select__selection,
label.v-label.theme--dark {
  font-size: 1.125em;
}

.v-select__selection.v-select__selection--comma {
  padding: 10px 0;
}

.v-list-item__title {
  font-size: 1.125em !important;
  line-height: 1.5;
  padding: 10px 0;
}

.v-input {
  align-items: center !important;
}

.v-file-input {
  .v-file-input__text {
    .v-chip {
      font-size: 1.125em !important;
      padding: 15px 5px !important;
      margin-bottom: 10px !important;
    }
  }
}
</style>
