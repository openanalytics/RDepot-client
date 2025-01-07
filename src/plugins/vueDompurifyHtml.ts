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

export const VueDOMPurifyHTMLconfig = {
  default: {
    ADD_ATTR: ['tmp-code'],
    USE_PROFILES: { html: true, svg: true }
  },
  hooks: {
    uponSanitizeAttribute: (
      node: HTMLElement,
      data: any
    ) => {
      if (
        data.attrName === 'onclick' &&
        check_code(
          data.attrValue,
          node.parentNode!.textContent || ''
        )
      ) {
        const icon = document.createElement('i')
        icon.setAttribute(
          'class',
          node.getAttribute('class') || ''
        )
        icon.setAttribute('tmp-code', data.attrValue)
        node.parentElement!.appendChild(icon)
        node.parentElement!.removeChild(node)
      }
    },
    afterSanitizeAttributes: (node: HTMLElement) => {
      switch (node.nodeName) {
        case 'I':
          if (
            node.hasAttribute('tmp-code') &&
            check_code(
              node.getAttribute('tmp-code') || '',
              node.parentNode!.textContent || ''
            )
          ) {
            node.setAttribute(
              'onclick',
              node.getAttribute('tmp-code') || ''
            )
            node.removeAttribute('tmp-code')
          }
          break
        default:
          break
      }
    }
  }
}

function check_code(
  attributeValue: string,
  code_text: string
) {
  const COMMAND = 'navigator.clipboard.writeText()'

  const end_command = attributeValue.indexOf('(') + 1
  const end_argument = attributeValue.lastIndexOf(')')

  const command =
    attributeValue.substring(0, end_command) +
    attributeValue.substring(
      end_argument,
      attributeValue.length
    )
  const argument = attributeValue.substring(
    end_command + 1,
    end_argument - 1
  )

  return (
    command === COMMAND &&
    argument === code_text.trim().replaceAll('\n', '\\n')
  )
}
