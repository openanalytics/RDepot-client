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
import { useHTMLSanitizer } from '@/composable/htmlSanitizer'

beforeEach(async () => {
  setActivePinia(createPinia())
})

describe('html sanitizer composable', () => {
  it('should accept tags from the whitelist', () => {
    const { checkAllowedTags } = useHTMLSanitizer()
    const approvedElement: string = 'doi:10.18637'
    const node: HTMLElement =
      document.createElement(approvedElement)
    checkAllowedTags(node)
    expect(node.textContent).toEqual('&lt;doi:10.18637&gt;')
  })

  it('should remove tags that are not from the whitelist', () => {
    const { checkAllowedTags } = useHTMLSanitizer()
    const forbiddenElement: string = 'iframe'
    const node: HTMLElement = document.createElement(
      forbiddenElement
    )
    checkAllowedTags(node)
    expect(node.textContent).toEqual('')
  })
})
