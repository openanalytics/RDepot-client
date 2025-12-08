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

import z from 'zod'
import { i18n } from '@/plugins/i18n.ts'

export function useTokenValidationSchema() {
  const tokenSchema = z.object({
    name: z
      .string()
      .min(1, i18n.t('messages.errors.required'))
      .nullable()
      .refine(
        (val) => val !== null,
        i18n.t('messages.errors.required')
      ),
    lifetime: z.string()
  })
  return {
    tokenSchema
  }
}
