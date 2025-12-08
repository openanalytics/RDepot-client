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
  <DeleteIcon
    v-if="item.name"
    :id="id"
    :disabled="disabled"
    :name="item.name"
    :hover-message="hoverMessage"
    :overlay-text="overlayText"
    @set-resource-id="choosePackage"
  />
</template>

<script setup lang="ts">
import { usePackagesStore } from '@/store/options/packages'
import DeleteIcon from '@/components/common/action_icons/DeleteIcon.vue'
import { EntityModelPackageDto } from '@/openapi'
import { i18n } from '@/plugins/i18n'
import { useUserAuthorities } from '@/composable/authorities/userAuthorities'
import { useConfigStore } from '@/store/options/config'
import { computed } from 'vue'
import { OverlayEnum } from '@/enum/Overlay.ts'
import { useCommonStore } from '@/store/options/common.ts'

const componentProps = defineProps({
  item: {
    type: Object as () => EntityModelPackageDto,
    required: true
  }
})

const packagesStore = usePackagesStore()
const { canDelete } = useUserAuthorities()
const configStore = useConfigStore()

const id = computed(
  () =>
    `delete-icon-${
      componentProps.item.name
    }-${componentProps.item.version?.replaceAll(
      '.',
      '-'
    )}-${componentProps.item.repository?.name}`
)

const disabled = computed(
  () =>
    !configStore.deletingPackages ||
    (!canDelete(componentProps.item.links) &&
      !componentProps.item.deleted) ||
    componentProps.item.deleted ||
    isPending.value
)

const hoverMessage = computed(() => {
  if (!configStore.deletingPackages)
    return i18n.t('messages.config.deletingPackages')
  if (componentProps.item.deleted)
    return i18n.t('messages.general.deleted', {
      resource_name: i18n.t('resources.package')
    })
  if (isPending.value)
    return i18n.t('messages.general.pending')
  return undefined
})

const overlayText = computed(() =>
  i18n.t('messages.general.deleteResourcesQuestion', {
    resource_type: i18n
      .t('resources.package', 2)
      .toLocaleLowerCase()
  })
)

const isPending = computed(
  () =>
    !!packagesStore.pending.find(
      (packageBag) =>
        packageBag.id == componentProps.item.id
    )
)

const commonStore = useCommonStore()

function choosePackage() {
  packagesStore.packagesToDelete = [componentProps.item]
  commonStore.overlayText = i18n.t(
    'messages.general.deleteQuestion',
    {
      resource_name: componentProps.item.name
    }
  )
  commonStore.openOverlay(OverlayEnum.enum.Delete)
}
</script>
