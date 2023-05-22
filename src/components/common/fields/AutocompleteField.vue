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
    :items="select_store.items"
    :custom-filter="customFiltrate"
    :loading="select_store.pending"
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
        <span v-show="!select_store.ifAllFetched">...</span>
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

const props = defineProps<{
  label: string
  storeId: SelectState
}>()

const emits = defineEmits<{
  (event: 'loadItems'): Promise<void>
  (event: 'filtrate', value: string | undefined): void
}>()

const select_store = useSelectStore(props.storeId)
const sort_store = useSortStore()

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
  itemText: string
) {
  return (
    select_store.ifAllFetched &&
    (itemText.includes(queryText) || false)
  )
}

async function loadItems() {
  if (
    select_store.paginationData.totalNumber < 0 ||
    !select_store.ifAllFetched
  ) {
    select_store.pending = true
    await emits('loadItems')
    select_store.pending = false
  }
}

watchDebounced(
  queryTerm,
  () => {
    if (!select_store.ifAllFetched) {
      emits('filtrate', queryTerm.value)
      select_store.resetItems()
      select_store.resetPagination()
      loadItems()
    }
  },
  { debounce: 500, maxWait: 1000 }
)

onMounted(async () => {
  sort_store.reset()
  await loadItems()
})
</script>
