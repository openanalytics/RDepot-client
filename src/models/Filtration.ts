interface Filtration {
  label: string
  requestName: string
  value: string
}

interface FiltrationNumber {
  label: string
  requestName: string
  value: number | undefined
}

interface FiltrationBoolean {
  label: string
  requestName: string
  value: boolean
}

interface PackagesFiltration {
  state: Filtration
  deleted: FiltrationBoolean
  repository: Filtration
}

interface RepositoriesFiltration {
  technology: Filtration
  name: Filtration
}

interface EventsFiltration {
  technology: Filtration
  userId: FiltrationNumber
  resourceId: FiltrationNumber
  eventType: Filtration
  resourceType: Filtration
}

export type {
  PackagesFiltration,
  EventsFiltration,
  RepositoriesFiltration
}
