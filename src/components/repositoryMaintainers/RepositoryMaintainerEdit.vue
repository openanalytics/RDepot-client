<template>
  <v-card class="pa-5" width="400">
    <v-card-title>
      {{ $t('maintainers.editform.title') }}
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text style="height: 300px">
      <v-form ref="form" lazy-validation>
        <v-text-field
          id="edit-package-maintainer-user"
          :value="localMaintainer.user?.login"
          :label="$t('maintainers.editform.user')"
          :disabled="blockedField == 'user'"
        >
        </v-text-field>
        <v-select
          id="edit-package-maintainer-repository"
          v-model="localMaintainer.repository"
          item-title="name"
          return-object
          :items="repositories"
          :label="$t('maintainers.editform.repository')"
          :disabled="blockedField == 'repository'"
        ></v-select>
      </v-form>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-row justify="space-between" class="mt-1">
        <v-btn
          id="cancel-button"
          color="blue darken-1"
          @click="changeDialogOptions"
          class="mx-1"
        >
          <small>
            {{ $t('common.cancel') }}
          </small>
        </v-btn>
        <v-row class="my-0" justify="end">
          <v-btn
            id="set-filtration"
            color="blue darken-1"
            class="mx-1"
            @click="setMaintainer()"
          >
            <small>
              {{ $t('common.save') }}
            </small>
          </v-btn>
        </v-row>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { useRepositoryMaintainersStore } from '@/store/repository_maintainers'
import { ref, computed } from 'vue'

const props = defineProps({
  blockedField: {
    required: false,
    default: 'user',
    validator(value: string) {
      return ['user', 'repository'].includes(value)
    }
  }
})

const maintainers_store = useRepositoryMaintainersStore()

const repositories = computed(() => {
  return maintainers_store.repositories
})

let maintainer = maintainers_store.chosenMaintainer
const localMaintainer = ref(maintainer)

const emit = defineEmits(['closeModal'])

async function setMaintainer() {
  await maintainers_store.setChosenMaintainer(
    localMaintainer.value
  )
  await maintainers_store.saveMaintainer()
  changeDialogOptions()
}

function changeDialogOptions() {
  emit('closeModal')
}
</script>
