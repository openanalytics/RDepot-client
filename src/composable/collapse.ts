/*
 * R Depot
 *
 * Copyright (C) 2012-2024 Open Analytics NV
 *
 * ===========================================================================
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the Apache License as published by
 * The Apache Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * Apache License for more details.
 *
 * You should have received a copy of the Apache License
 * along with this program. If not, see <http://www.apache.org/licenses/>
 *
 */

import { ref, computed } from 'vue'

export function useCollapse(showContentInit: boolean) {
  const showContent = ref(showContentInit)

  const showContentStyle = computed(() => {
    return showContent.value
      ? 'display: block; overflow: hidden; transition: all 0.5s ease; padding-bottom: 20px;'
      : 'display: block; opacity: 0; max-height: 0px'
  })

  const showListStyle = computed(() => {
    return showContent.value
      ? 'display: list-item;'
      : 'display: list-item; max-height: 0px'
  })

  const collapseIcon = computed(() => {
    return showContent.value
      ? 'mdi-menu-down'
      : 'mdi-menu-right'
  })

  function collapse() {
    showContent.value = !showContent.value
  }

  return {
    showContent,
    showContentStyle,
    showListStyle,
    collapseIcon,
    collapse
  }
}
