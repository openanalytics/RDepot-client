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
  <v-row
    id="title-row"
    no-gutters
    align="center"
    class="flex-nowrap"
    :justify="justify"
  >
    <span class="font-weight-bold">{{ title }} </span>
    <v-btn
      v-if="!noSort"
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
import { SORT_PARAMS } from '@/maps/Sort'
import { JustifyEnum } from '@/enum/Justify'
import { PropType } from 'vue'

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  noSort: {
    type: Boolean,
    required: false,
    default: false
  },
  justify: {
    type: String as PropType<JustifyEnum>,
    required: false,
    default: JustifyEnum.Enum.start
  },
  sortField: {
    type: String,
    required: false
  },
  direction: {
    type: String,
    required: false
  },
  sortKey: {
    type: String,
    required: true
  }
})

const id = ref<string>(
  SORT_PARAMS.get(props.sortKey) || 'name'
)
const commonStore = useCommonStore()
const sortStore = useSortStore()

const active = computed(() => {
  if (props.sortField) {
    return (
      commonStore.activeId == props.sortField ||
      commonStore.activeId == id.value
    )
  }
  return commonStore.activeId == id.value
})

const getIcon = computed(() => {
  if (active.value) {
    if (sortStore.direction == 'asc') {
      return 'mdi-sort-ascending'
    } else {
      return 'mdi-sort-descending'
    }
  } else {
    return 'mdi-sort'
  }
})

async function sortBy() {
  await sortStore.setField(
    props.sortField ? props.sortField : id.value,
    props?.direction
  )
  commonStore.setActiveId(sortStore.field)
}

const title = computed(() => {
  return (
    props.text.charAt(0).toUpperCase() + props.text.slice(1)
  )
})
</script>

<style lang="scss">
.opacity {
  opacity: 20%;
  &:hover {
    opacity: 100%;
  }
}
</style>
