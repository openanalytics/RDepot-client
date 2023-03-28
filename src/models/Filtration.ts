import { EntityModelPackageDto } from '@/openapi'

interface PackagesFiltration {
  state: string | undefined
  deleted: boolean | undefined
  repository: string | undefined
  technology: string[] | undefined
}

interface RepositoriesFiltration {
  technology: string[] | undefined
  name: string | undefined
  deleted: boolean | undefined
}

interface SubmissionsFiltration {
  assignedToMe: boolean | undefined
  state: string | undefined
  package: EntityModelPackageDto | undefined
}

interface EventsFiltration {
  technology: string | undefined
  userId: number | undefined
  resourceId: number | undefined
  eventType: string | undefined
  resourceType: string | undefined
}

interface PackageMaintainersFiltration {
  deleted: boolean | undefined
  technologies: string[] | undefined
}

interface RepositoryMaintainersFiltration {
  deleted: boolean | undefined
  technologies: string[] | undefined
}

export type {
  PackagesFiltration,
  SubmissionsFiltration,
  EventsFiltration,
  RepositoriesFiltration,
  PackageMaintainersFiltration,
  RepositoryMaintainersFiltration
}
