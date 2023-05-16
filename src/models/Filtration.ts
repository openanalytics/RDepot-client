import { z } from 'zod'
import { EntityModelSubmissionDtoStateEnum } from '@/openapi'

export function defaultValues<T extends z.ZodType>(
  type: T
): z.infer<T> {
  return type.parse(undefined)
}

const PackagesFiltration = z
  .object({
    state: z.string().optional(),
    deleted: z.boolean(),
    repository: z.string().optional(),
    technologies: z
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
    state: undefined,
    repository: undefined,
    technologies: undefined,
    deleted: false
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
    deleted: z.boolean()
  })
  .default({
    technologies: undefined,
    name: undefined,
    deleted: false
  })

type RepositoriesFiltration = z.infer<
  typeof RepositoriesFiltration
>

const SubmissionsFiltration = z
  .object({
    assignedToMe: z.boolean().optional(),
    state: z
      .nativeEnum(EntityModelSubmissionDtoStateEnum)
      .optional(),
    package: z.string().optional()
  })
  .default({
    assignedToMe: undefined,
    state: undefined,
    package: undefined
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
    eventType: z.string().optional(),
    resourceType: z.string().optional()
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
      })
  })
  .default({
    deleted: false,
    technologies: undefined
  })

type PackageMaintainersFiltration = z.infer<
  typeof PackageMaintainersFiltration
>

const RepositoryMaintainersFiltration =
  PackageMaintainersFiltration

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
