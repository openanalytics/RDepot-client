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

export function useFavicon() {
  const icoUrl = getEnv(
    'VITE_FAVICON_ICO_URL',
    '/favicon-oa.ico'
  )
  const svgUrl = getEnv(
    'VITE_FAVICON_SVG_URL',
    '/images/logo.svg'
  )

  if (icoUrl) {
    const link = document.querySelector<HTMLLinkElement>(
      'link[rel="icon"][sizes="32x32"]'
    )
    if (link) {
      link.href = icoUrl
    }
  }

  if (svgUrl) {
    const link = document.querySelector<HTMLLinkElement>(
      'link[rel="icon"][type="image/svg+xml"]'
    )
    if (link) {
      link.href = svgUrl
    }
  }
}
