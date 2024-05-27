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
  <div :class="{ short: packageBagShort }">
    <MarkdownDescription
      v-if="
        packageBag.technology == Technologies.enum.Python
      "
      :description="packageBag.description || ''"
      short
    ></MarkdownDescription>
    <div
      v-else
      class="text my-5"
      v-dompurify-html="RDescription"
    ></div>
  </div>
  <div class="center" v-if="packageBagShort">
    <v-divider :thickness="3"></v-divider>
    <v-btn
      ref="button"
      color="oablue"
      size="x-small"
      variant="text"
      class="button mt-3 ml-3 my-3"
      @click="goToDetailsPage(packageBagShort || {})"
    >
      {{ $t('common.details') }}</v-btn
    >
  </div>
</template>

<script setup lang="ts">
import {
  EntityModelPackageDto,
  EntityModelRPackageDto
} from '@/openapi'
import { computed } from 'vue'
import { usePackageDetailsStore } from '@/store/package_details'
import { Technologies } from '@/enum/Technologies'
import MarkdownDescription from '@/components/common/markdown/MarkdownDescription.vue'
import router from '@/plugins/router'

var props = defineProps<{
  packageBagShort?: EntityModelPackageDto
}>()

const packageDetailsStore = usePackageDetailsStore()

const packageBag = computed<EntityModelRPackageDto>(
  () =>
    props.packageBagShort ||
    (packageDetailsStore.packageBag as EntityModelRPackageDto)
)

const RDescription = computed(() => {
  const dotRegex = /\.\\n+/gi
  const description =
    props.packageBagShort?.description ||
    (
      packageDetailsStore.packageBag as EntityModelRPackageDto
    ).description
  return description
    ?.replaceAll(dotRegex, '.<br/>')
    .replaceAll('\\n', ' ')
})

function goToDetailsPage({
  id,
  technology
}: EntityModelPackageDto) {
  router.push({
    name: 'packageDetails',
    params: {
      id: id,
      technology: technology
    }
  })
}
</script>

<style scoped>
.short {
  max-height: 250px;
  overflow: hidden;
  mask-size: auto 250px;
  padding: 1rem;
  -webkit-mask-image: -webkit-gradient(
    linear,
    left 90%,
    left bottom,
    from(rgba(0, 0, 0, 1)),
    to(rgba(0, 0, 0, 0))
  );

  .text {
    font-size: 1em !important;
    padding-right: 25%;
  }
}
</style>
