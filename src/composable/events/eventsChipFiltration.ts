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

import { useChipFiltration } from '@/composable/common/chipFiltration'
import { useEventsStore } from '@/store/options/events'

export function useEventsChipFiltration() {
  return useChipFiltration(useEventsStore(), {
    technology: (value) => ({
      technologies: [value]
    }),
    eventType: (value) => ({
      eventType: [value]
    }),
    resourceType: (value) => ({
      resourceType: [
        value
          .toLowerCase()
          .replace(/_([a-z])/g, (_, c) => c.toUpperCase())
      ]
    }),
    repositoryName: (value) => ({
      repositoryName: [value]
    }),
    packageName: (value) => ({
      packageName: [value]
    }),
    date: (value) => {
      const date = new Date(value).toLocaleDateString(
        'en-CA'
      )
      return { fromDate: date, toDate: date }
    }
  })
}
