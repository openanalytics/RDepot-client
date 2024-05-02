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
  <div class="my-5 mx-1 mb-10" style="min-width: 200px">
    <div class="title" @click="collapse">
      {{ $t('packages.versions') }}
      <v-icon
        size="large"
        color="oa-blue"
        class="collapsibleIcon"
        :icon="collapseIcon"
      />
    </div>
    <ul
      v-for="packageBag in packageDetailsStore.packages"
      :key="packageBag.id"
      class="my-5"
      :style="showContentStyle"
    >
      <li
        class="classifier-value"
        :class="{ hover: mainId != packageBag.id }"
        @click="navigate(packageBag.id)"
      >
        {{ packageBag.version }}
        <span
          v-if="
            packageBag.version ==
            packageDetailsStore.packageBag?.version
          "
          >({{ $t('common.current') }})</span
        >
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import router from '@/plugins/router'
import { usePackageDetailsStore } from '@/store/package_details'
import { computed, ref } from 'vue'

const packageDetailsStore = usePackageDetailsStore()
const showContent = ref(false)

const mainId = computed(() => {
  return packageDetailsStore.packageBag?.id
})

const collapseIcon = computed(() => {
  return showContent.value
    ? 'mdi-menu-down'
    : 'mdi-menu-right'
})

const showContentStyle = computed(() => {
  return showContent.value
    ? 'display: table; overflow: hidden; transition: all 0.5s ease; padding-bottom: 20px;'
    : 'display: block; opacity: 0; max-height: 0px'
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

function collapse() {
  showContent.value = !showContent.value
}
</script>

<style lang="scss" scoped>
$text_color: rgba(var(--v-theme-about-package));
$background_color: rgba(var(--v-theme-about-background));

.hover {
  &:hover {
    cursor: pointer;
  }
}

.classifier-value {
  display: list-item;
  list-style-type: disc;
  padding-left: 10px;
  margin-left: 20px;
}

h1,
.package_title {
  font-size: 3rem;
  line-height: 1.4;
  font-weight: 500;
  color: $text_color;
}

h2,
.subtitle {
  font-size: 2rem;
  line-height: 1.4;
  font-weight: 500;
  color: $text_color;
}

p,
.text {
  color: $text_color;
  font-size: 1.125rem;
  line-height: 1.3;
}

.col_title {
  color: $text_color;
  width: 130px;
  background-color: $background_color;
  margin-right: 1rem;
  font-weight: 500;
  padding: 3px;
  border-radius: 4px;
  margin: 1px;
  transition: all 0.2s ease;
  &:hover {
    transform: scale(1.01);
  }
}

.col_small {
  width: 90px;
}

.col_desc {
  padding: 3px;
  margin: 1px;
  color: $text_color;
}

.document {
  color: rgb(var(--v-theme-oared));
  transition: all 0.2s ease;
  text-decoration: none;
  &:hover {
    cursor: pointer;
  }
}
</style>
