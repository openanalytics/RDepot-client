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

import getEnv from '@/utils/env'

export function useHTMLSanitizer() {
  function checkAllowedTags(node: HTMLElement) {
    const allowedTags: string = getEnv(
      'VITE_ALLOWED_PACKAGE_DESCRIPTION_TAGS'
    )
    let allowedTagsRegexps: RegExp[] = []
    if (allowedTags) {
      allowedTagsRegexps = allowedTags
        .split(',')
        .map((tag: string) => new RegExp(tag))
    }

    if (
      allowedTagsRegexps.find((tag) => {
        const pattern = new RegExp(tag)
        return node.nodeName.toLowerCase().match(pattern)
      })
    ) {
      node.textContent = `&lt;${node.nodeName.toLowerCase()}&gt;${node.textContent}`
    }
  }
  return { checkAllowedTags }
}
