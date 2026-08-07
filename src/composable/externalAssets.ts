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

import getEnv from '@/utils/env'

function cleanFiles(files: string): string[] {
  if (!files) {
    return []
  }
  return files
    .split(',')
    .map((f) => f.trim())
    .filter((f) => f.length > 0)
    .map((f) =>
      f.startsWith('http://') ||
      f.startsWith('https://') ||
      f.startsWith('/')
        ? f
        : '/' + f
    )
}

export function useExternalAssets() {
  const cssFiles = cleanFiles(getEnv('VITE_CSS_FILES', ''))
  const jsFiles = cleanFiles(getEnv('VITE_JS_FILES', ''))

  cssFiles.forEach((href) => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = href
    document.head.appendChild(link)
  })

  jsFiles.forEach((src) => {
    const script = document.createElement('script')
    script.src = src
    document.head.appendChild(script)
  })
}
