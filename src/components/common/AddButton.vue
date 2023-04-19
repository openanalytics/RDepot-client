<template>
  <CommonButton
    id="add-maintainer"
    :component="OverlayEnum.enum.Create"
    ><v-icon icon="mdi-plus"
  /></CommonButton>
  <v-spacer></v-spacer>
</template>

<script setup lang="ts">
import CommonButton from '@/components/common/Button.vue'
import { OverlayEnum } from '@/enum/Overlay'
</script>
