interface PackagesFiltration {
  state: string | undefined
  deleted: boolean | undefined
  repository: string | undefined
  technology: string[] | undefined
}

interface RepositoriesFiltration {
  technology: string
  name: string
}

interface SubmissionsFiltration {
  assignedToMe: boolean
  state: string
  package: string
}

interface EventsFiltration {
  technology: string
  userId: number | undefined
  resourceId: number | undefined
  eventType: string
  resourceType: string
}

interface MaintainersFiltration {
  deleted: boolean
  technology: string
}

export type {
  PackagesFiltration,
  SubmissionsFiltration,
  EventsFiltration,
  RepositoriesFiltration,
  MaintainersFiltration
}
