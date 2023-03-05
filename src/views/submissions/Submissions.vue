<template>
  <v-row justify="end" class="my-5 mx-10" align="center">
    <CommonButton
      id="reset-maintainers-filtration"
      :component="OverlayEnum.SubmissionsFiltrationReset"
      >{{ $t('common.reset') }}</CommonButton
    >
    <CommonButton
      :component="OverlayEnum.SubmissionsFiltration"
    />
  </v-row>
  <submission-list />
</template>

<script setup lang="ts">
import SubmissionList from '@/components/submissions/SubmissionList.vue'
import CommonButton from '@/components/common/Button.vue'
import { useCommonStore } from '@/store/common'
import { useI18n } from 'vue-i18n'
import { OverlayEnum } from '@/enum/Overlay'

const common_store = useCommonStore()
const { t } = useI18n()

function showOverlay(value: number) {
  common_store.setOverlayText(t('filtration.makeSure'))
  common_store.setOverlayModel(true)
  common_store.setOverlayOpacity(0.8)
  common_store.setOverlayComponent(value)
}
</script>
