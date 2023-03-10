<template>
  <FiltrationButtons />
  <submission-list />
</template>

<script setup lang="ts">
import SubmissionList from '@/components/submissions/SubmissionList.vue'
import { useCommonStore } from '@/store/common'
import { useI18n } from 'vue-i18n'
import FiltrationButtons from '@/components/common/FiltrationButtons.vue'

const common_store = useCommonStore()
const { t } = useI18n()

function showOverlay(value: number) {
  common_store.setOverlayText(t('filtration.makeSure'))
  common_store.setOverlayModel(true)
  common_store.setOverlayOpacity(0.8)
  common_store.setOverlayComponent(value)
}
</script>
