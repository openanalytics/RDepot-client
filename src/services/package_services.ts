import { api } from '../plugins'

export async function fetchPackagesServices() {
  let packages = await api.get('/v2/manager/r/packages')
  return packages
}
