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
  <ModalOverlay>
    <template #props="{ closeModal }">
      <DeactivateToken
        @close-modal="closeModal"
        @deactivate-token="deactivateToken"
      />
    </template>
  </ModalOverlay>
</template>

<script setup lang="ts">
import ModalOverlay from '@/components/common/ModalOverlay.vue'
import DeactivateToken from '@/components/accessTokens/deactivateToken/DeactivateToken.vue'
import { useUtilities } from '@/composable/utilities'
import { useAccessTokensStore } from '@/store/access_tokens'

const accessTokensStore = useAccessTokensStore()
const { deepCopy } = useUtilities()

function deactivateToken() {
  let newToken = deepCopy(accessTokensStore.currentToken)
  newToken.active = false
  accessTokensStore.deactivateToken(
    deepCopy(accessTokensStore.currentToken),
    newToken
  )
}
</script>
