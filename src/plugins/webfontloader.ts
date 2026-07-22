/*
 * R Depot
 *
 * Copyright (C) 2012-2026 Open Analytics NV
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

/**
 * plugins/webfontloader.ts
 *
 * webfontloader documentation: https://github.com/typekit/webfontloader
 */

import getEnv from '@/utils/env'

const DEFAULT_FONT_FAMILY = 'Roboto'
const DEFAULT_GOOGLE_FONT =
  'Roboto:100,300,400,500,700,900&display=swap'

function loadGeistMono() {
  const urlPrefix = getEnv('VITE_URL_PREFIX') || '/'
  const style = document.createElement('style')
  style.textContent = `
    @font-face {
      font-family: 'Geist Mono';
      src: url('${urlPrefix}fonts/GeistMono[wght].ttf') format('truetype');
      font-weight: 100 900;
      font-display: swap;
    }
  `
  document.head.appendChild(style)
}

function loadCustomFontFromUrl(url: string) {
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = url
  document.head.appendChild(link)
}

function applyFontFamily(fontFamily: string) {
  const style = document.createElement('style')
  style.textContent = `
    * {
      font-family: '${fontFamily}', sans-serif !important;
    }
  `
  document.head.appendChild(style)
}

export function getFontFamily(): string {
  return getEnv('VITE_FONT_FAMILY') || DEFAULT_FONT_FAMILY
}

export async function loadFonts() {
  const fontFamily = getFontFamily()
  const fontUrl = getEnv('VITE_FONT_URL')

  if (fontUrl) {
    try {
      loadCustomFontFromUrl(fontUrl)
      applyFontFamily(fontFamily || DEFAULT_FONT_FAMILY)
    } catch {
      await loadDefaultFont()
      applyFontFamily(DEFAULT_FONT_FAMILY)
    }
    return
  }

  if (fontFamily === 'Geist Mono') {
    loadGeistMono()
    applyFontFamily('Geist Mono')
    return
  }

  await loadDefaultFont()
}

async function loadDefaultFont() {
  const webFontLoader = await import(
    /* webpackChunkName: "webfontloader" */ 'webfontloader'
  )
  webFontLoader.load({
    google: { families: [DEFAULT_GOOGLE_FONT] }
  })
}
