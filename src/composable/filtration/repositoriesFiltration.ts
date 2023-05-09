import { EntityModelRepositoryDto } from '@/openapi'
import { useRepositoryStore } from '@/store/repositories'
import {
  useSelectStore,
  SelectState
} from '@/store/select_pagination'

export function useRepositoriesFiltration() {
  const storeId: SelectState = 'repositories'

  const select_store = useSelectStore(storeId)
  const repositories_store = useRepositoryStore()

  async function loadRepositories() {
    select_store.paginationData =
      await repositories_store.fetchPageOfRepositories(
        select_store.paginationData.page
      )
    select_store.addItems(
      repositories_store.repositories.map(
        (repository: EntityModelRepositoryDto) =>
          repository.name
      )
    )
  }

  function filtrateRepositories(value: string | undefined) {
    if (repositories_store.filtration.name !== value) {
      repositories_store.setFiltrationByName(value)
    }
  }

  return {
    storeId,
    loadRepositories,
    filtrateRepositories
  }
}
