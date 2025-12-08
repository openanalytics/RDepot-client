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

import { i18n } from '@/plugins/i18n'
import z from 'zod'
import { Technologies } from '@/enum/Technologies'

export function useRepositoryMaintainerValidationSchema() {
  const repositoryMaintainerSchemaBaseFields = {
    user: z
      .object({
        title: z.string(),
        value: z.number()
      })
      .nullable()
      .refine(
        (val) => val !== null,
        i18n.t('messages.errors.required')
      ),
    repository: z
      .object({
        title: z.string(),
        value: z.number(),
        props: z.object({
          technology: Technologies
        })
      })
      .nullable()
      .refine(
        (val) => val !== null,
        i18n.t('messages.errors.required')
      )
  }

  const repositoryMaintainerSchema = z.object(
    {
      ...repositoryMaintainerSchemaBaseFields
    },
    {
      required_error: i18n.t('messages.errors.required'),
      invalid_type_error: i18n.t('messages.errors.required')
    }
  )
  const transformedRepositoryMaintainerSchema = z
    .object({
      ...repositoryMaintainerSchemaBaseFields
    })
    .transform((values) => {
      return {
        user: { id: values.user?.value },
        repository: { id: values.repository?.value }
      }
    })
  return {
    repositoryMaintainerSchema,
    transformedRepositoryMaintainerSchema
  }
}
