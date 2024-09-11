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
import Icons from '@/maps/Icons'
import { i18n } from '@/plugins/i18n'
import { useToast } from './toasts'
import { useClipboard } from '@vueuse/core'

export function useUtilities() {
  const toasts = useToast()
  const { copy } = useClipboard()

  function deepCopy<T>(object: T) {
    return JSON.parse(JSON.stringify(object))
  }

  function deepCopyAny<T>(object: T) {
    return JSON.parse(JSON.stringify(object)) as any
  }

  const copyIcon = Icons.get('copy')

  const renderer = {
    code(
      code: string,
      _infostring: string | undefined,
      escaped: boolean
    ) {
      code = code.trim()
      const copy = code.replaceAll('\n', '\\n')
      return `
        <pre class="code d-flex justify-lg-space-between my-2">
        <code>
          ${escaped ? code : escape(code)}
        </code>
        <i class="${copyIcon} mdi v-icon notranslate v-theme--dark v-icon--size-large v-icon--clickable v-icon--start" role="button" onclick="navigator.clipboard.writeText('${copy}')">
        </i>
        </pre>`
    },
    heading(text: string, level: number) {
      level += 2
      return `<h${level}>${text}</h${level}>\n`
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

  function copyText(
    value: string,
    feedbackMessage: string = i18n.t('common.copied')
  ) {
    try {
      if (value) {
        copy(value)
        toasts.success(feedbackMessage)
      }
    } catch (error) {
      toasts.error(i18n.t('common.errors.copyFailed'))
    }
  }

  return {
    deepCopy,
    deepCopyAny,
    renderer,
    copyText
  }
}
