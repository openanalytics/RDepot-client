<template>
  <v-btn
    id="common-button"
    color="oablue"
    dark
    dense
    @click="openModal"
    class="mx-3"
  >
    <slot>{{ $t('filtration.title') }}</slot>
  </v-btn>
</template>

<script setup lang="ts">
import { OverlayEnum } from '@/enum/Overlay'
import { i18n } from '@/plugins/i18n'
import { useCommonStore } from '@/store/common'

var props = defineProps<{ component: OverlayEnum }>()

const common_store = useCommonStore()

function openModal() {
  common_store.setOverlayText(i18n.t('filtration.makeSure'))
  common_store.setOverlayModel(true)
  common_store.setOverlayComponent(props.component)
}
</script>
