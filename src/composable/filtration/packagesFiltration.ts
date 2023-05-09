import { EntityModelPackageDto } from '@/openapi'
import { usePackagesStore } from '@/store/packages'
import {
  useSelectStore,
  SelectState
} from '@/store/select_pagination'

export function usePackagesFiltration() {
  const storeId: SelectState = 'packages'

  const select_store = useSelectStore(storeId)
  const packages_store = usePackagesStore()

  async function loadPackages() {
    select_store.paginationData =
      await packages_store.fetchPageOfPackages(
        select_store.paginationData.page
      )
    select_store.addItems(
      packages_store.packages.map(
        (packageBag: EntityModelPackageDto) =>
          packageBag.name
      )
    )
  }

  function filtratePackages(value: string | undefined) {
    if (packages_store.filtration.repository !== value) {
      packages_store.setFiltrationByRepositoryOnly(value)
    }
  }

  return {
    storeId,
    loadPackages,
    filtratePackages
  }
}
