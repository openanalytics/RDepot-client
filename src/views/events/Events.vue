<template>
  <v-row justify="end" class="my-5 mx-10" align="center">
    <CommonButton
      id="reset-events-filtration"
      :title="$t('common.reset')"
      v-on:buttonClicked="
        showOverlay(OverlayEnum.EventsFiltrationReset)
      "
      class="mx-3"
    />
    <CommonButton
      :title="$t('filtration.title')"
      v-on:buttonClicked="
        showOverlay(OverlayEnum.EventsFiltration)
      "
      class="mx-3"
    />
  </v-row>

  <EventsTimeLine></EventsTimeLine>
</template>

<script setup lang="ts">
import CommonButton from '@/components/common/Button.vue'
import EventsTimeLine from '@/components/events/EventsTimeLine.vue'
import { OverlayEnum } from '@/enum/Overlay'
import { useCommonStore } from '@/store/common'
import { useI18n } from 'vue-i18n'

const common_store = useCommonStore()
const { t } = useI18n()

function showOverlay(value: number) {
  common_store.setOverlayText(t('filtration.makeSure'))
  common_store.setOverlayModel(true)
  common_store.setOverlayOpacity(0.8)
  common_store.setOverlayComponent(value)
}
</script>
