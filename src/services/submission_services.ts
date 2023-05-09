import { SubmissionsFiltration } from '@/models/Filtration'
import {
  EntityModelSubmissionDto,
  EntityModelSubmissionDtoStateEnum,
  ResponseDtoPagedModelEntityModelSubmissionDto,
  RSubmissionControllerApiFactory
} from '@/openapi'
import { AxiosResponse } from 'axios'
import { getConfiguration } from './api_config'
import {
  openApiRequest,
  validatedData,
  validateRequest
} from './open_api_access'
import { notify } from '@kyvg/vue3-notification'
import { createPatch } from 'rfc6902'
import { useSortStore } from '@/store/sort'
import { isAuthorized } from '@/plugins/casl'
import { useUtilities } from '@/composable/utilities'

export function fetchRSubmissions(
  filtration: SubmissionsFiltration,
  logged_user_id: number,
  page?: number,
  pageSize?: number
): Promise<validatedData<EntityModelSubmissionDto>> {
  if (!isAuthorized('GET', 'submissions')) {
    return new Promise(() => validateRequest())
  }
  const r_submission_api = RSubmissionControllerApiFactory(
    getConfiguration()
  )
  const sort = useSortStore()
  if (sort.field == 'name') {
    sort.setField('packageBag')
  }
  return openApiRequest<ResponseDtoPagedModelEntityModelSubmissionDto>(
    r_submission_api.getAllSubmissions,
    [
      filtration.state,
      filtration.assignedToMe ? logged_user_id : undefined,
      filtration.package?.id,
      page,
      pageSize,
      sort.getSortBy()
    ]
  ).then(
    (res) =>
      validateRequest(
        res.data.data?.content,
        res.data.data?.page
      ),
    (msg) => {
      notify({ text: msg, type: 'error' })
      return validateRequest()
    }
  )
}

export function updateSubmission(
  oldSubmission: EntityModelSubmissionDto,
  newSubmission: EntityModelSubmissionDto,
  textNotification?: string
): Promise<boolean> {
  if (!isAuthorized('PATCH', 'submissions')) {
    return new Promise(() => false)
  }
  const r_submission_api = RSubmissionControllerApiFactory(
    getConfiguration()
  )
  const patch_body = createPatch(
    oldSubmission,
    newSubmission
  )

  return openApiRequest<AxiosResponse<any>>(() =>
    r_submission_api.updateSubmission(
      patch_body,
      oldSubmission.id!
    )
  ).then(
    () => {
      notify({
        type: 'success',
        text: textNotification
      })
      return true
    },
    (msg) => {
      notify({
        type: 'error',
        text: msg
      })
      return false
    }
  )
}

export function addSubmission(
  repository: string,
  file: File
): Promise<boolean> {
  if (!isAuthorized('POST', 'submissions')) {
    return new Promise(() => false)
  }
  const r_submission_api = RSubmissionControllerApiFactory(
    getConfiguration()
  )
  return openApiRequest<AxiosResponse<any>>(
    r_submission_api.submitPackageForm,
    [repository, file]
  ).then(
    () => {
      return true
    },
    (msg) => {
      notify({
        type: 'error',
        text: msg
      })
      return false
    }
  )
}
