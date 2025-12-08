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
  <v-tooltip max-width="250">
    <template #activator="{ props }">
      <v-icon
        v-bind="props"
        :id="`resources-list-${value.replace('@', '-').replaceAll('/', '').replaceAll(':', '')}-warning`"
        size="small"
        color="warning"
        :icon="Icons.get('alert')"
        @click.stop
      />
    </template>
    {{
      $t('messages.repositories.deprecatedAddressTooltip')
    }}
  </v-tooltip>
</template>

<script setup lang="ts">
import Icons from '@/maps/Icons'

defineProps({
  value: {
    type: String,
    required: true
  }
})
</script>
