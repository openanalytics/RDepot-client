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
  packageId: number | undefined
}

interface EventsFiltration {
  technology: string | undefined
  userId: number | undefined
  resourceId: number | undefined
  eventType: string | undefined
  resourceType: string | undefined
}

interface MaintainersFiltration {
  deleted: boolean | undefined
  technology: string | undefined
}

export type {
  PackagesFiltration,
  SubmissionsFiltration,
  EventsFiltration,
  RepositoriesFiltration,
  MaintainersFiltration
}
