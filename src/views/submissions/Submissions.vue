<template>
  <v-row justify="end" class="my-5 mx-10" align="center">
    <CommonButton
      id="reset-packages-filtration"
      :title="$t('common.reset')"
      v-on:buttonClicked="
        showOverlay(OverlayEnum.PackagesFiltrationReset)
      "
      class="mx-3"
    />
    <CommonButton
      :title="$t('filtration.title')"
      v-on:buttonClicked="
        showOverlay(OverlayEnum.PackagesFiltration)
      "
      class="mx-3"
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
