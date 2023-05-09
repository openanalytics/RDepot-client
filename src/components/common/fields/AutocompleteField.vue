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
