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
  <div v-if="changes">
    <MarkdownDescription
      :description="changes"
      :short="packageBagShort !== undefined"
      :changes="true"
    ></MarkdownDescription>
  </div>
  <div v-else>
    <div :class="{ short: packageBagShort }">
      <RSTDescription
        v-if="
          packageBag.technology ===
            Technologies.enum.Python &&
          packageBag?.descriptionContentType !==
            'text/markdown'
        "
        :description="packageBag.description"
        :short="packageBagShort !== undefined"
      ></RSTDescription>
      <MarkdownDescription
        v-else-if="
          packageBag.technology ===
            Technologies.enum.Python &&
          packageBag.descriptionContentType ===
            'text/markdown'
        "
        :description="packageBag.description"
        :short="packageBagShort !== undefined"
      ></MarkdownDescription>
      <div
        v-else
        id="package-description-plane"
        v-dompurify-html="RDescription"
        class="text my-5 px-4"
      ></div>
    </div>
  </div>
  <div v-if="packageBagShort" class="center">
    <v-divider :thickness="3"></v-divider>
    <v-btn
      id="see-package-details-button"
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
import { usePackageDetailsStore } from '@/store/options/packageDetails'
import { Technologies } from '@/enum/Technologies'
import MarkdownDescription from '@/components/common/markdown/MarkdownDescription.vue'
import RSTDescription from '@/components/common/markdown/RSTDescription.vue'
import router from '@/plugins/router'

var props = defineProps<{
  packageBagShort?: EntityModelPackageDto
  changes?: string
}>()

const packageDetailsStore = usePackageDetailsStore()

const packageBag = computed(() => {
  if (props.packageBagShort) {
    return props.packageBagShort
  } else {
    return packageDetailsStore.packageBag as EntityModelPackageDto
  }
})

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
  padding: 0.5rem 1rem;
  mask-image: -webkit-gradient(
    linear,
    left 90%,
    left bottom,
    from(rgba(0, 0, 0, 1)),
    to(rgba(0, 0, 0, 0))
  );
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
