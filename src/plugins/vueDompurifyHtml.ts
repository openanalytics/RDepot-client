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
        console.log(node.parentElement)
        node.parentElement!.style.cssText = preStyle
        node.parentElement!.appendChild(icon)
        node.parentElement!.removeChild(node)
      }
    },
    afterSanitizeAttributes: (node: HTMLElement) => {
      switch (node.nodeName) {
        case 'TH':
        case 'TD':
          node.style.cssText = thStyle
          break
        case 'TABLE':
          node.style.cssText = tableStyle
          break
        case 'CODE':
          node.style.cssText = codeStyle
          break
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

const preStyle =
  'background-color: rgba(var(--v-theme-code)); padding: 20px; line-height: 1.5; border-radius: 8px; -webkit-box-shadow: 4px 4px 12px 0px #42445a; -moz-box-shadow: 4px 4px 12px 0px rgba(66, 68, 90, 1); box-shadow: 2px 2px 6px 0px rgba(66, 68, 90, 1); max-width: 1200px; font-size: 0.9em; white-space: pre-line;'
const codeStyle = 'margin-top: -25px; align-self: center;'
const tableStyle =
  'border: 1px solid; border-collapse: collapse'
const thStyle = 'border: 1px solid; padding: 10px;'
