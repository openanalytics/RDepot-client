import { Configuration } from '@/openapi'
import { useLoggedUserStore } from '@/store/logged_user'

export function getConfiguration() {
  const logged_user_store = useLoggedUserStore()
  const configuration: Configuration = new Configuration()
  configuration.baseOptions = {
    headers: {
      Authorization: 'Bearer ' + logged_user_store.userToken
    }
  }
  return configuration
}
