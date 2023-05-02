<template>
  <v-card class="mb-12 px-10 py-5 step" height="250px">
    <v-select
      class="mt-5"
      :items="repositories"
      :label="$t('addSubmission.step1Title')"
      v-model="submissions_store.repository"
      filled
      dense
      clearable
      persistent-hint
    >
      <template v-slot:selection="{ item, index }">
        {{ item.value.name }}
      </template>
      <template v-slot:item="{ item, index }">
        <v-list-item @click="changeRepository(item.value)">
          <v-list-item-content>
            <v-list-item-title>
              <v-row no-gutters align="center">
                <span class="text-body-1">{{
                  item.value.name
                }}</span>
                <v-spacer></v-spacer>
                <v-chip
                  text-color="white"
                  :color="item.color"
                  class="text-body-1"
                  small
                  >{{ item.value.technology }}</v-chip
                >
              </v-row>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-select>
  </v-card>
  <div class="d-flex justify-end">
    <v-btn
      id="next-button"
      color="oablue"
      @click="nextStep"
    >
      Continue
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { EntityModelRepositoryDto } from '@/openapi'
import { useRepositoryStore } from '@/store/repositories'
import { useSubmissionStore } from '@/store/submission'
import { useNotification } from '@kyvg/vue3-notification'
import { onMounted } from 'vue'
import { computed } from 'vue'

const emits = defineEmits(['next'])
const submissions_store = useSubmissionStore()
const repository_store = useRepositoryStore()
const notifications = useNotification()

const repositories = computed(function () {
  return repository_store.repositories
})

function changeRepository(value: EntityModelRepositoryDto) {
  console.log('repository')
  submissions_store.setRepository(value)
}

function nextStep() {
  if (submissions_store.repository != null) {
    emits('next', 2)
  } else {
    notifications.notify({
      text: 'no repository chosen',
      type: 'warn'
    })
  }
}

onMounted(() => {
  repository_store.fetchRepositories()
})
</script>

<style lang="scss">
.v-input {
  align-items: center !important;
}

.v-file-input {
  .v-file-input__text {
    .v-chip {
      font-size: 1.125em !important;
      margin-bottom: 10px !important;
    }
  }
}
</style>