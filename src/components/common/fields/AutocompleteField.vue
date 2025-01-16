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
  <v-autocomplete
    v-model="value"
    :label="label"
    :items="selectStore.items"
    :loading="selectStore.pending"
    :menu-props="{
      location: 'bottom',
      maxHeight: '200px'
    }"
    @update:search="search"
  >
    <template v-if="template" #item="{ item, props }">
      <slot name="item" :item="item" :props="props"> </slot>
    </template>
    <template #append-item>
      <div
        v-if="!selectStore.ifAllFetched"
        class="p3"
        justify="center"
        align="center"
      >
        <span v-show="!selectStore.ifAllFetched">...</span>
      </div>
    </template>
  </v-autocomplete>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { watchDebounced } from '@vueuse/core'
import {
  SelectState,
  useSelectStore
} from '@/store/setup/selectPagination'

const componentProps = defineProps<{
  label: string
  storeId: SelectState
  template?: boolean
}>()

const emits = defineEmits<{
  (event: 'loadItems'): Promise<void>
  (event: 'filtrate', value: string | undefined): void
}>()

const selectStore = useSelectStore(componentProps.storeId)

const queryTerm = ref<string | undefined>('')

const value = ref<string>()

function search(value: string) {
  if (queryTerm.value !== value) {
    if (value == '') {
      queryTerm.value = undefined
    } else {
      queryTerm.value = value
    }
  }
}

async function loadItems() {
  if (
    selectStore.paginationData.totalNumber < 0 ||
    !selectStore.shouldFetchNextPage
  ) {
    emits('loadItems')
  }
}

watchDebounced(
  queryTerm,
  async () => {
    const item = selectStore.items.find((item) => {
      if (typeof item === 'string') return undefined
      else {
        if (
          item?.value == value.value &&
          item?.title == queryTerm.value
        )
          return item
      }
    })
    if (item) {
      selectStore.resetItems()
      selectStore.resetPagination()
      emits('filtrate', queryTerm.value)
      await loadItems()
    }
  },
  { debounce: 500, maxWait: 1000 }
)

onMounted(async () => {
  await loadItems()
})
</script>
