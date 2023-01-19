import api from '@/plugins/axios'

export async function fetchPackagesServices() {
  let packages = await api.get('/v2/manager/r/packages')
  return packages
}
