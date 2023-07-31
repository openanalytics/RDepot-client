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

export function useUtilities() {
  function deepCopy<T>(object: T) {
    return JSON.parse(JSON.stringify(object))
  }

  function deepCopyAny<T>(object: T) {
    return JSON.parse(JSON.stringify(object)) as any
  }

  const renderer = {
    code(code: string, _: string, escaped: boolean) {
      return `<div class="code my-2">
        <code class="d-flex justify-lg-space-between">
          ${escaped ? escape(code) : code}
          <i  class="mdi-content-copy mdi v-icon notranslate v-theme--dark v-icon--size-large v-icon--clickable v-icon--start"
              role="button" 
              onclick="navigator.clipboard.writeText('${escape(
                code
              )}')">
          </i>
        </code>
      </div>`
    }
  }

  // copied from marked helpers
  const escapeTest = /[&<>"']/
  const escapeReplace = new RegExp(escapeTest.source, 'g')
  const escapeReplacements: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }
  const getEscapeReplacement = (ch: string) =>
    escapeReplacements[ch]
  function escape(html: string) {
    if (escapeTest.test(html)) {
      return html.replace(
        escapeReplace,
        getEscapeReplacement
      )
    }

    return html
  }

  return {
    deepCopy,
    deepCopyAny,
    renderer
  }
}
