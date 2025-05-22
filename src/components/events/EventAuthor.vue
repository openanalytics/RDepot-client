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
  <v-icon
    v-tooltip:top="{
      text: i18n.t('properties.events.general.author')
    }"
    size="small"
    style="vertical-align: text-bottom"
    >{{ Icons.get('account') }}</v-icon
  >
  <span style="vertical-align: middle">
    {{ user?.name }}
  </span>
  <v-icon
    v-tooltip="{
      text: user?.email,
      openOnHover: !!user?.email
    }"
    style="padding-left: 10px; vertical-align: text-bottom"
    density="compact"
    variant="plain"
    color="primary"
    size="small"
    @click.stop="clicked"
    >{{ Icons.get('email') }}
  </v-icon>
</template>

<script setup lang="ts">
import { UserProjection } from '@/openapi'
import { i18n } from '@/plugins/i18n'
import Icons from '@/maps/Icons'
import { useUtilities } from '@/composable/utilities'

const componentProps = defineProps({
  user: {
    type: Object as () => UserProjection,
    default: undefined
  }
})
const { copyText } = useUtilities()

function clicked() {
  copyText(
    componentProps.user?.email || '',
    i18n.t('messages.general.copied')
  )
}
</script>

<style scoped lang="scss">
.value {
  flex-basis: 70%;
  margin: 10px 0;
}
</style>
