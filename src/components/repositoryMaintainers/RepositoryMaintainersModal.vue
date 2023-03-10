<template>
  <Overlay v-on:action="clearFiltration()">
    <template v-slot:props="{ closeModal }">
      <Filtration
        v-if="getFiltration"
        v-on:closeModal="closeModal"
      />
      <RepositoryMaintainerEdit
        v-if="getEdit"
        :blocked-field="editBlockedField"
        v-on:closeModal="closeModal"
      />
    </template>
  </Overlay>
</template>

<script setup lang="ts">
import { OverlayEnum } from '@/enum/Overlay'
import { useCommonStore } from '@/store/common'
import { computed } from 'vue'
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

async function clearFiltration() {
  await maintainers_store.clearFiltrationAndFetch()
}

const getFiltration = computed(() => {
  return (
    common_store.overlayComponent == OverlayEnum.Filtration
  )
})

const getEdit = computed(() => {
  return common_store.overlayComponent == OverlayEnum.Edit
})
</script>
