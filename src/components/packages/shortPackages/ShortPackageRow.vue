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
  <VRow
    class="px-5"
    :class="{ title: title }"
    id="short-package-row"
  >
    <v-col
      id="package-name"
      cols="lg-1 sm-2"
      class="d-flex align-center"
    >
      <SortTitle v-if="title" :text="$t('columns.name')" />
      <TextRecord v-else :text="packageBag?.name" />
    </v-col>
    <v-col
      id="package-version"
      cols="1"
      class="d-flex align-center"
    >
      <SortTitle
        v-if="title"
        :text="$t('columns.version')"
      />
      <TextRecord v-else :text="packageBag?.version" />
    </v-col>
    <v-col
      id="package-description"
      cols="lg-8\7 sm-2"
      class="d-flex align-center"
    >
      <SortTitle v-if="title" :text="$t('columns.title')" />
      <TextRecord v-else :text="packageBag?.title" />
    </v-col>
    <v-col
      id="package-maintainer"
      cols="lg-2 sm-2"
      class="d-flex align-center"
    >
      <SortTitle
        v-if="title"
        :text="$t('columns.maintainer')" />
      <TextRecord v-else :text="packageBag?.user?.name"
    /></v-col>
    <v-col
      id="package-actions"
      cols="lg-1"
      class="d-flex justify-center"
    >
      <SortTitle
        v-if="title"
        :text="$t('columns.actions')"
        no-sort
      />
      <span
        v-else
        class="d-flex justify-center align-center"
      >
        <v-tooltip top>
          <template v-slot:activator="{ props }">
            <v-icon
              id="navigate-icon"
              @click.stop
              @click="navigate"
              v-bind="props"
              color="oablue"
              >mdi-forward</v-icon
            >
          </template>
          <span id="action-details">{{
            $t('common.details')
          }}</span>
        </v-tooltip>
      </span>
    </v-col>
  </VRow>
</template>

<script setup lang="ts">
import router from '@/router'
import { EntityModelPackageDto } from '@/openapi'
import SortTitle from '@/components/common/resources/SortTitle.vue'
import TextRecord from '@/components/common/resources/TextRecord.vue'

const props = defineProps({
  title: {
    type: Boolean,
    default: false
  },
  packageBag: Object as () =>
    | EntityModelPackageDto
    | undefined
})

function navigate() {
  if (props.packageBag) {
    router.push({
      name: 'packageDetails',
      params: {
        name: props.packageBag.id
      }
    })
  }
}
</script>

<style lang="scss">
.v-col {
  padding: 10px !important;
  font-size: 13px !important;
}
.col {
  line-height: 1.3;
}
.title {
  font-weight: 600 !important;
  padding: 16px 24px;
}

.v-input__control {
  justify-content: center !important;
}

#packagerow {
  .v-input__details {
    display: none !important;
  }
}
</style>
