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
  <delete-token-card
    :title="$t('settings.delete')"
    long
    @deleteToken="deleteToken()"
    @cancel="cancelModal()"
  >
  </delete-token-card>
</template>

<script setup lang="ts">
import { useSettingsStore } from '@/store/settings'
import { useI18n } from 'vue-i18n'
import DeleteTokenCard from '@/components/settings/deleteToken/DeleteTokenCard.vue'

const { t } = useI18n()
const settingsStore = useSettingsStore()

const emit = defineEmits(['closeModal'])

function cancelModal() {
  emit('closeModal')
}
function deleteToken() {
  settingsStore.deleteToken()
}
</script>
