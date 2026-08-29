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

import { EntityModelSubmissionDtoStateEnum } from '@/openapi'
import { SubmissionsFiltration } from '@/models/Filtration'
import { useSubmissionStore } from '@/store/options/submission'

const chipFieldToFiltration: Record<
  string,
  (value: string) => Partial<SubmissionsFiltration>
> = {
  created: (value) => {
    const date = new Date(value).toLocaleDateString('en-CA')
    return { fromDate: date, toDate: date }
  },
  'packageBag.repository.technology': (value) => ({
    technologies: [value]
  }),
  state: (value) => ({
    state: [value as EntityModelSubmissionDtoStateEnum]
  }),
  'packageBag.binary': (value) => ({
    fileType: [value]
  })
}

export function useSubmissionChipFiltration() {
  const submissionStore = useSubmissionStore()

  function filterByChip(field: string, value: string) {
    const toFiltration = chipFieldToFiltration[field]
    if (!toFiltration) return
    submissionStore.setFiltration({
      ...submissionStore.filtration,
      ...toFiltration(value)
    })
  }

  return { filterByChip }
}
