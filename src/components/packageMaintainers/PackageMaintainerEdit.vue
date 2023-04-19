<template>
  <Form
    as="v-form"
    :validation-schema="validationSchema"
    ref="form"
    lazy-validation
  >
    <v-card class="pa-5" width="400">
      <v-card-title>
        {{ $t('maintainers.editform.title') }}
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text style="height: 300px">
        <validated-input-field
          as="v-text-field"
          name="user.name"
          id="edit-package-maintainer-user"
          v-model="localMaintainer.user"
          :value="localMaintainer.user?.name"
          :label="$t('maintainers.editform.user')"
          disabled
        />
        <validated-input-field
          as="v-select"
          name="repository.id"
          :modelValue="localMaintainer.repository"
          @update:modelValue="newValue => localMaintainer.repository!.id = newValue"
          :items="repositories"
          item-title="name"
          item-value="id"
          id="edit-package-maintainer-repository"
          :label="$t('maintainers.editform.repository')"
        />
        <validated-input-field
          as="v-select"
          name="packageName"
          id="edit-package-maintainer-package"
          v-model="localMaintainer.packageName"
          :items="packages"
          item-title="name"
          item-value="name"
          :label="$t('maintainers.editform.package')"
        />
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
              @click="editMaintainer()"
            >
              <small>
                {{ $t('common.save') }}
              </small>
            </v-btn>
          </v-row>
        </v-row>
      </v-card-actions>
    </v-card>
  </Form>
</template>

<script setup lang="ts">
import { usePackageMaintainersStore } from '@/store/package_maintainers'
import { toTypedSchema } from '@vee-validate/zod'
import { Form } from 'vee-validate'
import ValidatedInputField from '../common/ValidatedInputField.vue'
import { ref, onMounted, computed } from 'vue'
import { packageMaintainerSchema } from '@/models/Schamas'

const validationSchema = toTypedSchema(
  packageMaintainerSchema
)

const maintainers_store = usePackageMaintainersStore()

const repositories = computed(() => {
  return maintainers_store.repositories
})

const packages = computed(() => {
  return Array.from(
    new Set(
      maintainers_store.packages
        .filter((packageBag) => {
          return (
            packageBag.repository?.id ==
            localMaintainer.value.repository?.id
          )
        })
        .map((packageBag) => packageBag.name)
    )
  )
})

let maintainer = maintainers_store.chosenMaintainer
const localMaintainer = ref(maintainer)

const emit = defineEmits(['closeModal'])

function updateMaintainer() {
  localMaintainer.value = JSON.parse(
    JSON.stringify(maintainers_store.chosenMaintainer)
  )
}

async function editMaintainer() {
  await maintainers_store.editMaintainer(
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
  maintainers_store.fetchRepositories()
  maintainers_store.fetchPackages()
})
</script>
