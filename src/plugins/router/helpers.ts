import { authService } from '@/plugins/oauth'
import { useSimpleAuthorization } from '@/composable/auth/simpleAuthorization'
import { useOICDAuthorization } from '@/composable/auth/oicdAuthorization'
import { usePackagesStore } from '@/store/packages'
import { useAuthorizationStore } from '@/store/authorization'

export async function loadPackageDetails(id: number) {
  const packageStore = usePackagesStore()
  return packageStore.fetchPackage(id)
}

export async function loadRepositoryDetails(name: string) {
  const packageStore = usePackagesStore()
  return packageStore.fetchPackages({
    repository: name,
    deleted: false
  })
}

export async function redirectToLoginPage() {
  const { isSimpleAuthAvailable } = useSimpleAuthorization()
  const authorizationStore = useAuthorizationStore()
  if (isSimpleAuthAvailable()) {
    return '/login'
  } else {
    authorizationStore.login()
    return '/packages'
  }
}

export async function handleAuthorization() {
  await authService
    .handleLoginRedirect()
    .then(() => {
      window.history.replaceState(
        {},
        window.document.title,
        window.location.origin + window.location.pathname
      )
    })
    .catch((error) => {
      console.log(error)
    })
}

export async function handleLogout() {
  const { isOICDAuthAvailable } = useOICDAuthorization()
  if (isOICDAuthAvailable()) {
    authService
      .handleLogoutRedirect()
      .then(() => {
        window.history.replaceState(
          {},
          window.document.title,
          window.location.origin + window.location.pathname
        )
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
