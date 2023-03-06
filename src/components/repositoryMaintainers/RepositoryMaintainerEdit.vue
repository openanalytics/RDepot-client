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
          v-model="localMaintainer.userId"
          :label="$t('maintainers.editform.user')"
          :disabled="blockedField == 'user'"
        >
        </v-text-field>
        <v-select
          id="edit-package-maintainer-repository"
          v-model="localMaintainer.repositoryId"
          item-title="name"
          item-value="id"
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
          id="cancelbutton"
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
            id="setfiltration"
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
import { ref, onMounted, computed } from 'vue'

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

let maintainer = maintainers_store.choosenMaintainer
const localMaintainer = ref(maintainer)

const emit = defineEmits(['closeModal'])

function updateMaintainer() {
  localMaintainer.value = JSON.parse(
    JSON.stringify(maintainers_store.choosenMaintainer)
  )
}

async function setMaintainer() {
  await maintainers_store.setChoosenMaintainer(
    localMaintainer.value
  )
  changeDialogOptions()
}

function changeDialogOptions() {
  updateMaintainer()
  emit('closeModal')
}

onMounted(() => {
  updateMaintainer()
})
</script>
