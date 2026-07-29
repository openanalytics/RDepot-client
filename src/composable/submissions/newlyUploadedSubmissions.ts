/*
 * R Depot
 *
 * Copyright (C) 2012-2026 Open Analytics NV
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

import { ref } from 'vue'

const ids = ref<number[]>([])

export function useNewlyUploadedSubmissions() {
  function set(newIds: number[]) {
    ids.value = newIds
  }

  function clear() {
    ids.value = []
  }

  function includes(id: number): boolean {
    return ids.value.includes(id)
  }

  return {
    ids,
    set,
    clear,
    includes
  }
}
