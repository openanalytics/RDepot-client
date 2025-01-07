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
  <PropertiesTable
    id="package-files-properties"
    :items="filesList"
    @property-clicked="handlePropertyClicked"
  >
    <template
      v-for="(item, i) in filesList"
      :key="i"
      #[`${item.iconSlotName}`]
    >
      <v-list
        :id="`package-vignette-menu-${i}`"
        density="compact"
      >
        <v-list-item
          @click="handlePropertyClicked(item.key, false)"
        >
          <template #append>
            <v-btn
              :id="`package-vignette-open-${i}`"
              variant="plain"
              size="small"
              :icon="Icons.get('open-new')"
            ></v-btn>
          </template>
          <v-list-item-title>{{
            i18n.t('packageDetails.vignette.open')
          }}</v-list-item-title>
        </v-list-item>
        <v-list-item
          @click="handlePropertyClicked(item.key)"
        >
          <template #append>
            <v-btn
              :id="`package-vignette-download-${i}`"
              variant="plain"
              size="small"
              :icon="Icons.get('download')"
            ></v-btn>
          </template>
          <v-list-item-title>{{
            i18n.t('packageDetails.vignette.download')
          }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </template>
  </PropertiesTable>
</template>

<script setup lang="ts">
import PropertiesTable from '@/components/common/properties/PropertiesTable.vue'
import { usePackageFiles } from '@/composable/packages/packageFiles'
import { usePackageProperties } from '@/composable/packages/packageProperties'
import Icons from '@/maps/Icons'
import { Vignette } from '@/openapi'
import { i18n } from '@/plugins/i18n'
import { usePackageDetailsStore } from '@/store/options/packageDetails'

const packageDetailsStore = usePackageDetailsStore()
const { filesList } = usePackageProperties()
const {
  openVignette,
  downloadManual,
  downloadSourceFile,
  downloadVignette
} = usePackageFiles()

function handlePropertyClicked(
  key: string,
  download = true
) {
  switch (key) {
    case 'package-property-manual':
      downloadManual()
      break
    case 'package-property-source-file':
      downloadSourceFile()
      break
    default:
      // eslint-disable-next-line no-case-declarations
      const vignette = packageDetailsStore.vignettes?.find(
        (item: Vignette) => item.title == key
      )
      if (vignette) {
        if (download) {
          downloadVignette(vignette.fileName)
        } else {
          openVignette(vignette.fileName)
        }
      }
      break
  }
}
</script>
