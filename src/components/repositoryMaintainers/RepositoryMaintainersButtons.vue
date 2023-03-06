<template>
  <v-row justify="end" class="my-5 mx-10" align="center">
    <CommonButton
      id="reset-maintainers-filtration"
      :component="OverlayEnum.MaintainersFiltrationReset"
      >{{ $t('common.reset') }}</CommonButton
    >
    <CommonButton
      :component="OverlayEnum.MaintainersFiltration"
    />
  </v-row>
</template>

<script setup lang="ts">
import CommonButton from '@/components/common/Button.vue'
import { OverlayEnum } from '@/enum/Overlay'
</script>
