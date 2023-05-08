<template>
  <v-autocomplete
    v-model="value"
    :items="select_store.items"
    item-title="name"
    :menu-props="{
      location: 'bottom center',
      height: '200px',
      width: '300px'
    }"
    :custom-filter="customFiltrate"
    @update:search="search"
    :loading="select_store.pending"
    :label="label"
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
import { useField } from 'vee-validate'
import { toRef } from 'vue'
import {
  SelectState,
  useSelectStore
} from '@/store/select_pagination'

const props = defineProps<{
  name: string
  label: string
  store_id: SelectState
}>()

const emits = defineEmits<{
  (event: 'loadItems'): Promise<void>
  (event: 'filtrate', value: string | undefined): void
}>()

const select_store = useSelectStore(props.store_id)
const sort_store = useSortStore()

const reload = ref<boolean>(false)
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
    if (reload) {
      select_store.resetPagination
    }

    select_store.pending = true
    await emits('loadItems')
    reload.value = false
    select_store.pending = false
  }
}

watchDebounced(
  queryTerm,
  () => {
    if (!select_store.ifAllFetched) {
      emits('filtrate', queryTerm.value)
      select_store.resetItems()
      reload.value = true
      emits('loadItems')
    }
  },
  { debounce: 500, maxWait: 1000 }
)

onMounted(async () => {
  sort_store.reset()
  await loadItems()
})

const { value, handleBlur, errors } = useField(
  toRef(props, 'name'),
  undefined
)
</script>
