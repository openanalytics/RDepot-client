import { Configuration } from '@/openapi'
import { useLoggedUserStore } from '@/store/logged_user'

const logged_user_store = useLoggedUserStore()
export function getConfiguration() {
  const configuration: Configuration = new Configuration()
  configuration.baseOptions = {
    headers: {
      Authorization: 'Bearer ' + logged_user_store.userToken
    }
  }
  return configuration
}
