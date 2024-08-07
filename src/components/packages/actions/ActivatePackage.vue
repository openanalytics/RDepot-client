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
  <v-tooltip
    :disabled="
      (canPatch(packageBag.links) && !packageBag.deleted) ||
      !isPending
    "
    location="top"
  >
    <template #activator="{ props }">
      <span
        v-bind="props"
        style="width: 100%"
        class="d-flex justify-center"
      >
        <v-checkbox-btn
          :id="id"
          v-model="packageBag.active"
          :disabled="disabled"
          hide-details
          :readonly="!canPatch(packageBag?.links)"
          :color="color"
          class="mr-5"
          @click.stop
          @change="updatePackageActive"
        />
      </span>
    </template>
    <span>{{ onHoverMessage }}</span>
  </v-tooltip>
</template>

<script setup lang="ts">
import { usePackagesStore } from '@/store/packages'
import { EntityModelPackageDto } from '@/openapi'
import { useUserAuthorities } from '@/composable/authorities/userAuthorities'
import { ref, computed, watch } from 'vue'
import { i18n } from '@/plugins/i18n'

const componentProps = defineProps({
  item: {
    type: Object as () => EntityModelPackageDto,
    required: true
  }
})

watch(componentProps.item, (newVal) => {
  packageBag.value = newVal
})

const packageBag = ref(componentProps.item)

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
      (packageBag) =>
        packageBag.id == componentProps.item.id
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
