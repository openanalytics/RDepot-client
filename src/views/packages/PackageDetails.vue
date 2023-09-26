<!--
 R Depot
 
 Copyright (C) 2012-2023 Open Analytics NV
 
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
  <div v-show="!loading">
    <component
      :is="
        packageBag?.technology === Technologies.enum.R
          ? RPackageDetails
          : PythonPackageDetails
      "
      :class="{ short: package }"
      @is-loaded="isLoaded"
      :id="packageBag?.id || 0"
    />
    <div class="center" v-if="package">
      <v-divider :thickness="3"></v-divider>
      <v-btn
        ref="button"
        color="oablue"
        class="button"
        @click="goToDetailsPage(packageBag || {})"
      >
        {{ $t('common.details') }}</v-btn
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import RPackageDetails from '@/components/packages/RPackageDetails.vue'
import PythonPackageDetails from '@/components/packages/PythonPackageDetails.vue'
import { usePackagesStore } from '@/store/packages'
import { Technologies } from '@/enum/Technologies'
import { useRoute } from 'vue-router'
import { EntityModelPackageDto } from '@/openapi'
import { onBeforeMount, computed, ref } from 'vue'
import router from '@/plugins/router'

const package_store = usePackagesStore()
const route = useRoute()

const props = defineProps<{
  package?: EntityModelPackageDto
}>()

const packageBag = computed(
  () => props.package || package_store.package
)
const loading = ref(true)

function isLoaded() {
  loading.value = false
}

function goToDetailsPage({ id }: EntityModelPackageDto) {
  router.push({
    name: 'packageDetails',
    params: {
      id: id
    }
  })
}

onBeforeMount(() => {
  if (props.package) {
    package_store.package = props.package
  } else {
    package_store.fetchPackage(Number(route.params.id))
  }
})
</script>

<style scoped lang="scss">
.center {
  text-align: center;
}

.button {
  margin-top: 15px;
}

.short {
  max-height: 250px;
  overflow: hidden;
  mask: linear-gradient(
    to top,
    rgba(255, 0, 0, 0),
    rgb(255, 0, 0, 1) 50%
  );
}
</style>
