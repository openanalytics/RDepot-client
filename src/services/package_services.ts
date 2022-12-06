import { api } from '../plugins'

export async function fetchPackagesServices() {
  var packages = await api.get('/v2/manager/r/packages')
  return packages
}
