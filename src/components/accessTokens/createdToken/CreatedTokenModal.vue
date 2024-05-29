<!--
 R Depot
 
 Copyright (C) 2012-2024 Open Analytics NV
 
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
  <Overlay @action="resetToken()">
    <template #props="{ closeModal }">
      <NewTokenDetails @close-modal="closeModal" />
    </template>
  </Overlay>
</template>

<script setup lang="ts">
import Overlay from '@/components/common/overlay/ModalOverlay.vue'
import NewTokenDetails from '@/components/accessTokens/createdToken/NewTokenDetails.vue'
import { useAccessTokensStore } from '@/store/access_tokens'

const accessTokensStore = useAccessTokensStore()

function resetToken() {
  accessTokensStore.resetNewToken()
}
</script>
