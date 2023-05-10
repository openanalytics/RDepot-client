<template>
  <form as="v-form" ref="form">
    <v-card class="pa-5" width="400">
      <v-card-title>
        {{ $t('maintainers.editform.title') }}
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text style="height: 300px">
        <validated-input-field
          as="v-text-field"
          name="username"
          id="edit-package-maintainer-user"
          :label="$t('maintainers.editform.user')"
          disabled
        />
        <validated-input-field
          as="v-select"
          name="repositoryId"
          :modelValue="localMaintainer.repository"
          @update:modelValue="newValue => {
            localMaintainer.repository!.id = newValue
            validateField('packageName')
          }"
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
      <v-divider></v-divider>
      <card-actions :buttons="buttons" />
    </v-card>
  </form>
</template>

<script setup lang="ts">
import { i18n } from '@/plugins/i18n'
import CardActions from '@/components/common/CardActions.vue'
import { usePackageMaintainersStore } from '@/store/package_maintainers'
import { toTypedSchema } from '@vee-validate/zod'
import { Form, useForm } from 'vee-validate'
import ValidatedInputField from '@/components/common/ValidatedInputField.vue'
import { ref, onMounted, computed } from 'vue'
import { packageMaintainerSchema } from '@/models/Schemas'
import { notify } from '@kyvg/vue3-notification'
import { z } from 'zod'
import { useUtilities } from '@/composable/utilities'

const maintainers_store = usePackageMaintainersStore()
const buttons = [
  {
    id: 'cancelbutton',
    text: i18n.t('common.cancel'),
    handler: () => {
      changeDialogOptions()
    }
  },
  {
    id: 'setfiltration',
    text: i18n.t('common.save'),
    handler: () => {
      editMaintainer()
    }
  }
]
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

const { meta, validateField } = useForm({
  validationSchema: toTypedSchema(
    z.object({
      username:
        packageMaintainerSchema.shape.user.shape.name,
      repositoryId:
        packageMaintainerSchema.shape.repository.shape.id,
      packageName:
        packageMaintainerSchema.shape.packageName.refine(
          (val) => {
            if (packages.value) {
              return packages.value.includes(val)
            } else {
              return false
            }
          },
          i18n.t(
            'package_maintainers.editform.packageNotFound'
          )
        )
    })
  ),
  initialValues: {
    username: maintainer?.user?.name,
    repositoryId: maintainer?.repository?.id,
    packageName: maintainer?.packageName
  },
  initialTouched: {
    username: false,
    repositoryId: false,
    packageName: true
  }
})
const { deepCopy } = useUtilities()

function updateMaintainer() {
  localMaintainer.value = deepCopy(
    maintainers_store.chosenMaintainer
  )
}

async function editMaintainer() {
  if (meta.value.valid) {
    await maintainers_store.updateMaintainer(
      localMaintainer.value
    )
    changeDialogOptions()
  } else {
    notify({
      type: 'warn',
      text: i18n.t('notifications.invalidform')
    })
  }
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
