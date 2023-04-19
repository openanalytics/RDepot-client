<template>
  <v-row justify="end" class="mt-5 mx-10" align="center">
    <CommonButton
      id="reset-events-filtration"
      :component="OverlayEnum.enum.Reset"
    >
      {{ $t('common.reset') }}
    </CommonButton>
    <CommonButton
      :component="OverlayEnum.enum.Filtration"
    />
  </v-row>
</template>

<script setup lang="ts">
import CommonButton from '@/components/common/Button.vue'
import { OverlayEnum } from '@/enum/Overlay'
</script>
