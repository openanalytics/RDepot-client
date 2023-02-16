interface PackagesFiltration {
  state: string
  deleted: boolean
  repository: string
}

interface RepositoriesFiltration {
  technology: string
  name: string
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
  EventsFiltration,
  RepositoriesFiltration
}
