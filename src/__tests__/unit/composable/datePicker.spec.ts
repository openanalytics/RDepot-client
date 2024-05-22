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

import { describe, it, expect, beforeEach } from 'vitest'

import { createPinia, setActivePinia } from 'pinia'
import { useDatePicker } from '@/composable/datePicker'

beforeEach(async () => {
  setActivePinia(createPinia())
})

describe('date picker composable', () => {
  it('should not update data picker values', () => {
    const {
      showDatepicker,
      fromDatePicker,
      selectDate,
      changedDate
    } = useDatePicker()
    fromDatePicker.value = new Date('2024.20.4')
    showDatepicker.value = false
    changedDate.value = 'desc'

    selectDate(false, 'asc', '2024.20.5')
    expect(fromDatePicker.value).toEqual(
      new Date('2024.20.4')
    )
    expect(changedDate.value).toEqual('desc')
    expect(showDatepicker.value).toBeFalsy()
  })

  it('should update data picker values', () => {
    const {
      showDatepicker,
      fromDatePicker,
      selectDate,
      changedDate
    } = useDatePicker()
    fromDatePicker.value = new Date('2024.20.4')
    showDatepicker.value = false
    changedDate.value = 'desc'

    selectDate(true, 'asc', '2024.20.5')
    expect(fromDatePicker.value).toEqual(
      new Date('2024.20.5')
    )
    expect(changedDate.value).toEqual('asc')
    expect(showDatepicker.value).toBeTruthy()
  })

  it('should update data picker values expect from one', () => {
    const {
      showDatepicker,
      fromDatePicker,
      selectDate,
      changedDate
    } = useDatePicker()
    fromDatePicker.value = new Date('2024.20.4')
    showDatepicker.value = false
    changedDate.value = 'desc'

    selectDate(true, 'asc', 'undefined')
    expect(fromDatePicker.value).toEqual(
      new Date('2024.20.4')
    )
    expect(changedDate.value).toEqual('asc')
    expect(showDatepicker.value).toBeTruthy()
  })

  it('should close modal and revert defaults', () => {
    const {
      showDatepicker,
      fromDatePicker,
      closeModal,
      changedDate
    } = useDatePicker()
    fromDatePicker.value = new Date('2024.20.4')
    showDatepicker.value = false
    changedDate.value = 'desc'

    closeModal()
    expect(fromDatePicker.value).toEqual(new Date())
    expect(changedDate.value).toEqual('')
    expect(showDatepicker.value).toBeFalsy()
  })
})
