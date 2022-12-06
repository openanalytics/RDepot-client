interface Filtration {
  label: string
  requestName: string
  value: string
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

export { PackagesFiltration }
