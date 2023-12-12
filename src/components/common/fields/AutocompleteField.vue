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
  <v-autocomplete
    :label="label"
    :items="selectStore.items"
    :custom-filter="customFiltrate"
    auto-select-first
    :loading="selectStore.pending"
    :menu-props="{
      location: 'bottom center',
      height: '200px',
      width: '300px'
    }"
    @update:search="search"
    ><template v-slot:append-item>
      <div
        v-intersect="loadItems"
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
import { useSortStore } from '@/store/sort'
import { watchDebounced } from '@vueuse/core'
import {
  SelectState,
  useSelectStore
} from '@/store/select_pagination'
import { q } from 'msw/lib/glossary-de6278a9'

const props = defineProps<{
  label: string
  storeId: SelectState
}>()

const emits = defineEmits<{
  (event: 'loadItems'): Promise<void>
  (event: 'filtrate', value: string | undefined): void
}>()

const selectStore = useSelectStore(props.storeId)
const sortStore = useSortStore()

const queryTerm = ref<string | undefined>('')

function search(value: string) {
  if (queryTerm.value !== value) {
    if (value == '') {
      queryTerm.value = undefined
    } else {
      queryTerm.value = value
    }
  }
}

function customFiltrate(
  _: string,
  queryText: string,
  itemText: { title: string }
) {
  return (
    selectStore.ifAllFetched &&
    (itemText.title.includes(queryText) || false)
  )
}

async function loadItems() {
  if (
    selectStore.paginationData.totalNumber < 0 ||
    !selectStore.ifAllFetched
  ) {
    selectStore.pending = true
    await emits('loadItems')
    selectStore.pending = false
  }
}

watchDebounced(
  queryTerm,
  () => {
    if (!selectStore.ifAllFetched) {
      emits('filtrate', queryTerm.value)
      selectStore.resetItems()
      selectStore.resetPagination()
      loadItems()
    }
  },
  { debounce: 500, maxWait: 1000 }
)

onMounted(async () => {
  sortStore.reset()
  await loadItems()
})
</script>
