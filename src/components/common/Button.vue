<template>
  <v-btn
    id="commonbutton"
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
import { i18n } from '@/plugins/i18n'
import { useCommonStore } from '@/store/common'

var props = defineProps({
  component: {
    type: Number,
    required: true
  }
})

const common_store = useCommonStore()

function openModal() {
  common_store.setOverlayText(i18n.t('filtration.makeSure'))
  common_store.setOverlayModel(true)
  common_store.setOverlayComponent(props.component)
}
</script>
