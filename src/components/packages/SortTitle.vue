<template>
  <v-row
    no-gutters
    align="center"
    class="flex-nowrap"
    :justify="center ? 'center' : 'start'"
  >
    <span class="font-weight-bold"
      >{{ prepareString() }}
    </span>
    <v-btn
      v-if="sort"
      @click="sortBy()"
      variant="text"
      size="x-small"
      :icon="getIcon"
      :color="active ? 'oablue' : ''"
      :class="{ opacity: !active }"
      :id="id"
    ></v-btn>
  </v-row>
</template>

<script setup lang="ts">
import { useCommonStore } from '@/store/common'
import { useSortStore } from '@/store/sort'
import { computed, ref } from 'vue'
import { sort_params } from '@/maps/Sort'

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  sort: {
    type: Boolean,
    required: false,
    default: true
  },
  center: {
    type: Boolean,
    required: false,
    default: false
  },
  sortField: {
    type: String,
    required: false
  }
})

const id = ref<string>(
  sort_params.get(props.text) || 'name'
)
const common_store = useCommonStore()
const sort_store = useSortStore()

const active = computed(() => {
  if (props.sortField) {
    return (
      common_store.activeId == props.sortField ||
      common_store.activeId == id.value
    )
  }
  return common_store.activeId == id.value
})

const getIcon = computed(() => {
  if (active.value) {
    if (sort_store.direction == 'asc') {
      return 'mdi-sort-ascending'
    } else {
      return 'mdi-sort-descending'
    }
  } else {
    return 'mdi-sort'
  }
})

function sortBy() {
  common_store.setActiveId(id.value)
  sort_store.setField(
    props.sortField ? props.sortField : id.value
  )
}

function prepareString(): string {
  var title =
    props.text.charAt(0).toUpperCase() + props.text.slice(1)
  return title
}
</script>

<style lang="scss">
.opacity {
  opacity: 20%;
  &:hover {
    opacity: 100%;
  }
}
</style>
