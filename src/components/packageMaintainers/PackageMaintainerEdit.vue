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
          v-model="localMaintainer.user"
          :value="localMaintainer.user?.name"
          :label="$t('maintainers.editform.user')"
          disabled
        >
        </v-text-field>
        <v-select
          id="edit-package-maintainer-repository"
          v-model="localMaintainer.repository"
          item-title="name"
          :items="repositories"
          :label="$t('maintainers.editform.repository')"
          return-object
        ></v-select>
        <v-select
          id="edit-package-maintainer-package"
          v-model="localMaintainerPackage"
          :items="packages"
          :item-title="
            (item) => `${item.name}, ${item.version}`
          "
          :item-value="
            (item) => `${item.name}, ${item.version}`
          "
          :label="$t('maintainers.editform.package')"
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
</template>

<script setup lang="ts">
import { usePackageMaintainersStore } from '@/store/package_maintainers'
import { ref, onMounted, computed } from 'vue'

const maintainers_store = usePackageMaintainersStore()

const repositories = computed(() => {
  return maintainers_store.repositories
})

const packages = computed(() => {
  return maintainers_store.packages.filter((packageBag) => {
    return (
      packageBag.repository?.id ==
      localMaintainer.value.repository?.id
    )
  })
})

let maintainer = maintainers_store.choosenMaintainer
const localMaintainer = ref(maintainer)

const localMaintainerPackage = computed(() => {
  return maintainers_store.packages.filter(
    (packagedto) =>
      packagedto.user?.id == localMaintainer.value.id
  )[0]
})

const emit = defineEmits(['closeModal'])

function updateMaintainer() {
  localMaintainer.value = JSON.parse(
    JSON.stringify(maintainers_store.choosenMaintainer)
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
})
</script>
