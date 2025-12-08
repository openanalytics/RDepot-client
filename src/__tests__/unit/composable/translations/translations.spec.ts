/*
 * R Depot
 *
 * Copyright (C) 2012-2025 Open Analytics NV
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
import { useTranslations } from '@/composable/translations/translations'

beforeEach(async () => {
  setActivePinia(createPinia())
})

describe('translations composable', () => {
  it('should return correct translation', () => {
    const { getTranslationWithFallbackValue } =
      useTranslations()
    const translation =
      getTranslationWithFallbackValue('accepted')
    expect(translation).toEqual('accepted')
  })

  it('should return correct translation when non-default key is used', () => {
    const { getTranslationWithFallbackValue } =
      useTranslations()
    const translation = getTranslationWithFallbackValue(
      'repository',
      'resources'
    )
    expect(translation).toEqual('Repository')
  })

  it('should return not translated value when translation is missing', () => {
    const { getTranslationWithFallbackValue } =
      useTranslations()
    const translation =
      getTranslationWithFallbackValue('approved')
    expect(translation).toEqual('approved')
  })

  it('should return empty string when value is not provided', () => {
    const { getTranslationWithFallbackValue } =
      useTranslations()
    const translation = getTranslationWithFallbackValue()
    expect(translation).toEqual('')
  })
})
