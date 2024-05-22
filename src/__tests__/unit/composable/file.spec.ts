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
import { useFiles } from '@/composable/file'

const SHORT_FILE_NAME = 'short-file.pdf'
const LONG_FILE_NAME =
  'very-long-file-name-with-some-really-interesting-sentence-inside.pdf'

beforeEach(async () => {
  setActivePinia(createPinia())
})

describe('file composable', () => {
  it('should return full file name', () => {
    const { formatFilename } = useFiles()
    const name: string = formatFilename(SHORT_FILE_NAME)
    expect(name).toEqual(SHORT_FILE_NAME)
  })

  it('should return shortened file name', () => {
    const { formatFilename } = useFiles()
    const name: string = formatFilename(LONG_FILE_NAME)
    expect(name).toEqual(
      'very-long-file-name-with-...g-sentence-inside.pdf'
    )
  })

  it('should return file name when its shorten then given length', () => {
    const { formatCutFilename } = useFiles()
    const name: string = formatCutFilename(SHORT_FILE_NAME)
    expect(name).toEqual(SHORT_FILE_NAME)
  })

  it('should return file name cut after the default text length', () => {
    const { formatCutFilename } = useFiles()
    const name: string = formatCutFilename(LONG_FILE_NAME)
    expect(name).toEqual('very-long-file-na...')
  })

  it('should return file name cut after the chosen text length', () => {
    const { formatCutFilename } = useFiles()
    const name: string = formatCutFilename(
      LONG_FILE_NAME,
      10
    )
    expect(name).toEqual('very-lo...')
  })
})
