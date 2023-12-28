/*
 * R Depot
 *
 * Copyright (C) 2012-2023 Open Analytics NV
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

export function useDatePicker() {
  const fromDatePicker = ref(new Date())
  const changedDate = ref('')
  const showDatepicker = ref(false)

  function selectDate(
    e: boolean,
    direction: string,
    inputDate: string
  ) {
    if (e) {
      if (inputDate !== undefined) {
        fromDatePicker.value = new Date(inputDate)
      }
      showDatepicker.value = true
      changedDate.value = direction
    }
  }

  function closeModal() {
    showDatepicker.value = false
    changedDate.value = ''
    fromDatePicker.value = new Date()
  }

  return {
    selectDate,
    closeModal,
    fromDatePicker,
    changedDate,
    showDatepicker
  }
}
