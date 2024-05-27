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
  <TokenModal v-if="commonStore.isCreate()" />
  <CreatedTokenModal v-if="commonStore.isCreated()" />
  <TokenDeleteModal v-if="commonStore.isDelete()" />
  <TokenEditModal v-if="commonStore.isEdit()" />
  <TokenDeactivateModal v-if="commonStore.isDeactivate()" />
  <TokenSettingsDetails />
</template>

<script setup lang="ts">
import TokenModal from '@/components/accessTokens/createToken/TokenModal.vue'
import TokenDeleteModal from '@/components/accessTokens/deleteToken/TokenDeleteModal.vue'
import TokenEditModal from '@/components/accessTokens/editToken/TokenEditModal.vue'
import TokenDeactivateModal from '@/components/accessTokens/deactivateToken/TokenDeactivateModal.vue'
import CreatedTokenModal from '@/components/accessTokens/createdToken/CreatedTokenModal.vue'
import { useCommonStore } from '@/store/common'
import TokenSettingsDetails from '@/components/accessTokens/TokenSettingsDetails.vue'

const commonStore = useCommonStore()
</script>

<style scoped type="scss">
.settings-container {
  max-width: 90%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .settings-card {
    width: 100%;
  }
}
</style>
