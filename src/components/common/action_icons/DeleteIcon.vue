<template>
  <VTooltip top>
    <template v-slot:activator="{ props }">
      <VIcon
        id="delete-icon"
        @click.stop
        @click="deleteDialog"
        v-bind="props"
        color="oared"
        class="ml-3"
        >mdi-trash-can</VIcon
      >
    </template>
    <span id="action-delete">{{
      $t('common.delete')
    }}</span>
  </VTooltip>
</template>

<script setup lang="ts">
import { OverlayEnum } from '@/enum/Overlay'
import { i18n } from '@/plugins/i18n'
import { useCommonStore } from '@/store/common'

const props = defineProps({
  name: {
    type: String
  },
  setResourceId: {
    type: Function,
    required: true
  }
})

const common_store = useCommonStore()

function deleteDialog() {
  props.setResourceId()
  common_store.setOverlayText(
    i18n.t('common.deleteQuestion', {
      resource_name: props.name
    })
  )
  common_store.setOverlayModel(true)
  common_store.setOverlayOpacity(0.8)
  common_store.setOverlayComponent(OverlayEnum.Delete)
}
</script>
