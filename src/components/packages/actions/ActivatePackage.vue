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
  <!--    :disabled="-->
  <!--      (canPatch(packageBag.links) && !packageBag.deleted) ||-->
  <!--      !isPending-->
  <!--    "-->
  <v-checkbox-btn
    :id="id"
    v-model="packageBag.active"
    v-tooltip:top="onHoverMessage"
    :disabled="disabled"
    hide-details
    :readonly="!canPatch(packageBag?.links)"
    :color="color"
    class="mr-6"
    @click.stop
    @change="updatePackageActive"
  />
</template>

<script setup lang="ts">
import { usePackagesStore } from '@/store/options/packages'
import { EntityModelPackageDto } from '@/openapi'
import { useUserAuthorities } from '@/composable/authorities/userAuthorities'
import { computed } from 'vue'
import { i18n } from '@/plugins/i18n'

const componentProps = defineProps({
  item: {
    type: Object as () => EntityModelPackageDto,
    required: true
  }
})

const packageBag = computed(() => componentProps.item)

const packagesStore = usePackagesStore()
const { canPatch } = useUserAuthorities()

const id = computed(
  () =>
    `checkbox-active-${
      componentProps.item.name
    }-${componentProps.item.version?.replaceAll(
      '.',
      '-'
    )}-${componentProps.item.repository?.name}`
)

const isPending = computed(
  () =>
    !!packagesStore.pending.find(
      (packageBagStore) =>
        packageBagStore.id == packageBag.value.id
    )
)

const color = computed(() =>
  !canPatch(packageBag.value.links) ? 'grey' : 'oablue'
)

const disabled = computed(
  () => packageBag.value.deleted || isPending.value
)

const onHoverMessage = computed(() => {
  if (!canPatch(packageBag.value.links))
    return i18n.t('common.notAuthorized')
  if (packageBag.value.deleted)
    return i18n.t('packages.deleted')
  if (isPending.value) return i18n.t('common.pending')
  return undefined
})

function updatePackageActive() {
  if (
    canPatch(packageBag.value.links) &&
    packageBag.value.id &&
    packageBag.value.active != undefined
  ) {
    packagesStore.activatePackage(packageBag.value)
  }
}
</script>
