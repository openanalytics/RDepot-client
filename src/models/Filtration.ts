interface PackagesFiltration {
  state: string
  deleted: boolean
  repository: string
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

export type {
  PackagesFiltration,
  SubmissionsFiltration,
  EventsFiltration,
  RepositoriesFiltration
}
