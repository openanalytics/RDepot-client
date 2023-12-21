/*
 * R Depot
 *
 * Copyright (C) 2012-2023 Open Analytics NV
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

import { z } from 'zod'
import { EntityModelSubmissionDtoStateEnum } from '@/openapi'

export function defaultValues<T extends z.ZodType>(
  type: T
): z.infer<T> {
  return type.parse(undefined)
}

const PackagesFiltration = z
  .object({
    submissionState: z
      .array(z.string())
      .optional()
      .transform((val) => {
        if (val?.length == 0) {
          return undefined
        }
        return val
      }),
    deleted: z.boolean(),
    repository: z
      .array(z.string())
      .optional()
      .transform((val) => {
        if (val?.length == 0) {
          return undefined
        }
        return val
      }),
    technologies: z
      .array(z.string())
      .optional()
      .transform((val) => {
        if (val?.length == 0) {
          return undefined
        }
        return val
      }),
    name: z.array(z.string()).optional(),
    maintainer: z.array(z.string()).optional()
  })
  .default({
    submissionState: undefined,
    repository: undefined,
    technologies: undefined,
    deleted: false,
    name: undefined,
    maintainer: undefined
  })

type PackagesFiltration = z.infer<typeof PackagesFiltration>

const RepositoriesFiltration = z
  .object({
    technologies: z
      .array(z.string())
      .optional()
      .transform((val) => {
        if (val?.length == 0) {
          return undefined
        }
        return val
      }),
    name: z.string().optional(),
    deleted: z.boolean(),
    published: z.boolean(),
    maintainer: z
      .array(z.string())
      .optional()
      .transform((val) => {
        if (val?.length == 0) {
          return undefined
        }
        return val
      })
  })
  .default({
    technologies: undefined,
    name: undefined,
    deleted: false,
    published: false,
    maintainer: undefined
  })

type RepositoriesFiltration = z.infer<
  typeof RepositoriesFiltration
>

const SubmissionsFiltration = z
  .object({
    assignedToMe: z.boolean().optional(),
    state: z
      .array(
        z.nativeEnum(EntityModelSubmissionDtoStateEnum)
      )
      .optional()
      .transform((val) => {
        if (val?.length == 0) {
          return undefined
        }
        return val
      }),
    package: z.string().optional(),
    technologies: z
      .array(z.string())
      .optional()
      .transform((val) => {
        if (val?.length == 0) {
          return undefined
        }
        return val
      }),
    repository: z
      .array(z.string())
      .optional()
      .transform((val) => {
        if (val?.length == 0) {
          return undefined
        }
        return val
      }),
    fromDate: z.string().optional(),
    toDate: z.string().optional()
  })
  .default({
    assignedToMe: undefined,
    state: undefined,
    package: undefined,
    technologies: undefined,
    repository: undefined,
    fromDate: undefined,
    toDate: undefined
  })

type SubmissionsFiltration = z.infer<
  typeof SubmissionsFiltration
>

const EventsFiltration = z
  .object({
    technologies: z
      .array(z.string())
      .optional()
      .transform((val) => {
        if (val?.length == 0) {
          return undefined
        }
        return val
      }),
    userId: z.number().optional(),
    resourceId: z.number().optional(),
    eventType: z.array(z.string()).optional(),
    resourceType: z.array(z.string()).optional()
  })
  .default({
    technologies: undefined,
    userId: undefined,
    resourceId: undefined,
    eventType: undefined,
    resourceType: undefined
  })

type EventsFiltration = z.infer<typeof EventsFiltration>
const PackageMaintainersFiltration = z
  .object({
    deleted: z.boolean(),
    technologies: z
      .array(z.string())
      .optional()
      .transform((val) => {
        if (val?.length == 0) {
          return undefined
        }
        return val
      }),
    repository: z
      .array(z.string())
      .optional()
      .transform((val) => {
        if (val?.length == 0) {
          return undefined
        }
        return val
      }),
    maintainer: z
      .array(z.string())
      .optional()
      .transform((val) => {
        if (val?.length == 0) {
          return undefined
        }
        return val
      })
  })
  .default({
    deleted: false,
    technologies: undefined,
    repository: undefined,
    maintainer: undefined
  })

type PackageMaintainersFiltration = z.infer<
  typeof PackageMaintainersFiltration
>

const RepositoryMaintainersFiltration = z
  .object({
    deleted: z.boolean(),
    technologies: z
      .array(z.string())
      .optional()
      .transform((val) => {
        if (val?.length == 0) {
          return undefined
        }
        return val
      }),
    repository: z.array(z.string()).optional()
  })
  .default({
    deleted: false,
    technologies: undefined,
    repository: undefined
  })

type RepositoryMaintainersFiltration = z.infer<
  typeof RepositoryMaintainersFiltration
>

export {
  RepositoriesFiltration,
  PackagesFiltration,
  SubmissionsFiltration,
  EventsFiltration,
  PackageMaintainersFiltration,
  RepositoryMaintainersFiltration
}
