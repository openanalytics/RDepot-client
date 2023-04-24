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
          :modelValue="localMaintainer.repository"
          @update:modelValue="newValue => localMaintainer.repository!.id = newValue"
          :items="repositories"
          item-title="name"
          item-value="id"
          :label="$t('maintainers.editform.repository')"
          :disabled="blockedField == 'repository'"
        ></v-select>
      </v-form>
    </v-card-text>
    <v-divider></v-divider>
    <card-actions :buttons="buttons" />
  </v-card>
</template>

<script setup lang="ts">
import CardActions from '../common/CardActions.vue'
import { EntityModelRepositoryMaintainerDto } from '@/openapi'
import { i18n } from '@/plugins/i18n'
import { useRepositoryMaintainersStore } from '@/store/repository_maintainers'
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  blockedField: {
    required: false,
    default: 'user',
    validator(value: string) {
      return ['user', 'repository'].includes(value)
    }
  }
})

const buttons = [
  {
    text: i18n.t('common.cancel'),
    handler: changeDialogOptions
  },
  {
    text: i18n.t('common.save'),
    handler: setMaintainer
  }
]

const maintainers_store = useRepositoryMaintainersStore()

const repositories = computed(() => {
  return maintainers_store.repositories
})

let maintainer: EntityModelRepositoryMaintainerDto =
  JSON.parse(
    JSON.stringify(maintainers_store.chosenMaintainer)
  )

const localMaintainer = ref(maintainer)

const emit = defineEmits(['closeModal'])

function setMaintainer() {
  maintainers_store.saveMaintainer(localMaintainer.value)
  changeDialogOptions()
}

onMounted(() => maintainers_store.fetchRepositories())

function changeDialogOptions() {
  emit('closeModal')
}
</script>
