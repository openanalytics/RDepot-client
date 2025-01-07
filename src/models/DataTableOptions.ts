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

export type Sort = {
  key: string
  order?: boolean | 'asc' | 'desc'
}

export type DataTableOptions = {
  page: number
  itemsPerPage: number
  sortBy: Sort[]
}

type SelectItemKey<T = Record<string, any>> =
  | boolean
  | null
  | undefined // Ignored
  | string // Lookup by key, can use dot notation for nested objects
  | readonly (string | number)[] // Nested lookup by key, each array item is a key in the next level
  | ((item: T, fallback?: any) => any)

export type DataTableHeaders<T = Record<string, any>> = {
  key?:
    | 'data-table-group'
    | 'data-table-select'
    | 'data-table-expand'
    | string
  value?: SelectItemKey<T>
  title?: string
  fixed?: boolean
  align?: 'start' | 'end' | 'center'
  width?: number | string
  minWidth?: string
  maxWidth?: string
  nowrap?: boolean
  headerProps?: Record<string, any>
  sortable?: boolean
}
