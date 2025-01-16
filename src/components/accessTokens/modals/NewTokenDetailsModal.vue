<!--
 R Depot
 
 Copyright (C) 2012-2025 Open Analytics NV
 
 ===========================================================================
 
 This program is free software: you can redistribute it and/or modify
 it under the terms of the Apache License as published by
 The Apache Software Foundation, either version 2 of the License, or
 (at your option) any later version.
 
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 Apache License for more details.
 
 You should have received a copy of the Apache License
 along with this program. If not, see <http://www.apache.org/licenses/>
 
-->

<template>
  <ModalOverlay @action="commonStore.closeOverlay">
    <template #props> <NewTokenDetailsForm /> </template>
  </ModalOverlay>
</template>

<script setup lang="ts">
import ModalOverlay from '@/components/common/overlay/ModalOverlay.vue'
import NewTokenDetailsForm from '../forms/NewTokenDetailsForm.vue'
import { useCommonStore } from '@/store/options/common'

const commonStore = useCommonStore()
</script>

<style scoped lang="scss">
$code_color: rgba(var(--v-theme-code));

.code {
  background-color: $code_color;
  padding: 20px;
  line-height: 1.5;
  border-radius: 8px;
  -webkit-box-shadow: 4px 4px 12px 0px #42445a;
  -moz-box-shadow: 4px 4px 12px 0px rgba(66, 68, 90, 1);
  box-shadow: 2px 2px 6px 0px rgba(66, 68, 90, 1);
  max-width: 1200px;
  font-size: 0.9em;
}
</style>

<style lang="scss">
#newTokenDetails {
  .v-card-text {
    padding: 1rem 0 !important;
  }
}
</style>
