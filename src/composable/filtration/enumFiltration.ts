import { Technologies } from '@/enum/Technologies'
import { EntityModelSubmissionDtoStateEnum } from '@/openapi'
import { ref } from 'vue'

export function useEnumFiltration() {
  const states = ref(
    Object.values(EntityModelSubmissionDtoStateEnum)
  )

  const technologies = ref(Technologies.options)

  const resourceTypes = ref([
    'package',
    'repository',
    'user',
    'submission',
    'packageMaintainer',
    'repositoryMaintainer'
  ])

  const eventTypes = ref(['create', 'update', 'delete'])

  return {
    states,
    technologies,
    resourceTypes,
    eventTypes
  }
}
