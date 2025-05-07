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
    :id="`republish-repository-${repo.id}`"
    v-tooltip="tooltipText"
    :color="disabled ? 'grey' : 'primary'"
    style="margin-left: 2px"
    @click.stop
    @click="republish"
    >{{ Icons.get('republish') }}</v-icon
  >
</template>

<script setup lang="ts">
import { OverlayEnum } from '@/enum/Overlay'
import { i18n } from '@/plugins/i18n'
import { useCommonStore } from '@/store/options/common'
import { useConfigStore } from '@/store/options/config'
import { computed } from 'vue'
import Icons from '@/maps/Icons'
import { useUserAuthorities } from '@/composable/authorities/userAuthorities'

const componentProps = defineProps({
  repo: {
    type: Object,
    required: true
  }
})

const emits = defineEmits(['setEntity'])
const commonStore = useCommonStore()
const configStore = useConfigStore()
const { canPatch } = useUserAuthorities()

const tooltipText = computed(() => {
  if (!disabled.value) {
    return i18n.t('actions.repositories.republish')
  } else if (configStore.declarativeMode) {
    return i18n.t(
      'messages.repositories.declarative.republish'
    )
  } else if (componentProps.repo.deleted) {
    return i18n.t('messages.general.deleted', {
      resource_name: i18n
        .t('resources.packageMaintainer')
        .toLowerCase()
    })
  } else if (componentProps.repo.published) {
    return i18n.t('messages.general.notAuthorized')
  }
  return i18n.t('message.repositories.notPublished')
})

const disabled = computed(() => {
  return (
    !canPatch(componentProps.repo.links) ||
    configStore.declarativeMode ||
    componentProps.repo.deleted ||
    !componentProps.repo.published
  )
})

function republish() {
  if (!disabled.value) {
    emits('setEntity')
    commonStore.overlayText = i18n.t(
      'messages.repositories.republishQuestion',
      {
        repo_name: componentProps.repo.name
      }
    )
    commonStore.openOverlay(OverlayEnum.enum.Republish)
  }
}
</script>
