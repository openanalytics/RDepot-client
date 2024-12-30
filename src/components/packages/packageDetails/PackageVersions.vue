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
  <v-expansion-panels id="package-all-versions">
    <v-expansion-panel
      id="package-open-all-versions"
      :title="$t('packageDetails.versions')"
    >
      <v-expansion-panel-text>
        <div
          class="d-flex px-10"
          style="flex-direction: column"
        >
          <ul
            v-for="localPackage in packageDetailsStore.packages"
            :key="localPackage.id"
          >
            <li
              class="classifier-value"
              :class="{
                hover: mainId != localPackage.id
              }"
              @click="navigate(localPackage.id)"
            >
              <span
                :class="{
                  current: mainId == localPackage.id
                }"
              >
                {{ localPackage.version }}
                <span
                  v-if="
                    localPackage.version ==
                    packageDetailsStore.packageBag?.version
                  "
                  >({{ $t('common.current') }})</span
                >
              </span>
            </li>
          </ul>
        </div>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup lang="ts">
import { usePackageDetailsStore } from '@/store/options/packageDetails'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const packageDetailsStore = usePackageDetailsStore()

const mainId = computed(() => {
  return packageDetailsStore.packageBag?.id
})

function navigate(id?: number) {
  if (id) {
    router.push({
      name: 'packageDetails',
      params: {
        id: id,
        technology:
          packageDetailsStore.packageBag?.technology
      }
    })
  }
}
</script>

<style lang="scss">
.current {
  font-weight: 600;
}
.hover {
  cursor: pointer;
}
.arrow_box {
  padding: 2px 10px;
}
</style>
