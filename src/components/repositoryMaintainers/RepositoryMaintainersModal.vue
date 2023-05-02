<template>
  <Overlay v-on:action="performAction()">
    <template v-slot:props="{ closeModal }">
      <Filtration
        v-if="common_store.isFiltration()"
        v-on:closeModal="closeModal"
      />
      <RepositoryMaintainerEdit
        v-if="common_store.isEdit()"
        :blocked-field="editBlockedField"
        v-on:closeModal="closeModal"
      />
    </template>
  </Overlay>
</template>

<script setup lang="ts">
import { useCommonStore } from '@/store/common'
import Overlay from '@/components/common/Overlay.vue'
import Filtration from '@/components/repositoryMaintainers/Filtration.vue'
import { useRepositoryMaintainersStore } from '@/store/repository_maintainers'
import RepositoryMaintainerEdit from '@/components/repositoryMaintainers/RepositoryMaintainerEdit.vue'

const maintainers_store = useRepositoryMaintainersStore()
const common_store = useCommonStore()

const props = defineProps({
  editBlockedField: {
    required: false,
    default: 'user',
    type: String
  }
})

async function performAction() {
  if (common_store.isFiltration()) {
    await maintainers_store.clearFiltrationAndFetch()
  } else if (common_store.isDelete()) {
    await maintainers_store.softDelete()
  }
}
</script>
