<template>
  <Overlay v-on:action="performAction()">
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

const emit = defineEmits(['delete'])

async function performAction() {
  if (getFiltration.value) {
    await maintainers_store.clearFiltrationAndFetch()
  } else if (getDelete.value) {
    console.log('performAction')
    await maintainers_store.deleteMaintainer()
  }
}

const getFiltration = computed(common_store.isFiltration)

const getEdit = computed(common_store.isEdit)

const getDelete = computed(common_store.isDelete)
</script>
