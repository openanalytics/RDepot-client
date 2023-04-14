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
  validateRequest
} from './open_api_access'
import { notify } from '@kyvg/vue3-notification'
import { createPatch } from 'rfc6902'

export function fetchRSubmissions(
  filtration: SubmissionsFiltration,
  logged_user_id: number,
  page?: number,
  pageSize?: number
) {
  const r_submission_api = RSubmissionControllerApiFactory(
    getConfiguration()
  )
  return openApiRequest<ResponseDtoPagedModelEntityModelSubmissionDto>(
    r_submission_api.getAllSubmissions,
    [
      filtration.state,
      filtration.assignedToMe ? logged_user_id : undefined,
      filtration.package?.id,
      page,
      pageSize
    ]
  ).then(
    (res) =>
      validateRequest(
        res.data.data?.content,
        res.data.data?.page
      ),
    (msg) => {
      notify({ text: msg, type: 'error' })
      return validateRequest<EntityModelSubmissionDto>()
    }
  )
}

export function updateSubmission(
  oldSubmission: EntityModelSubmissionDto,
  newSubmission: EntityModelSubmissionDto,
  textNotification?: string
) {
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

export function updateSubmissionState(
  submission: EntityModelSubmissionDto,
  state: EntityModelSubmissionDtoStateEnum,
  textNotification: string
) {
  const newSubmission = JSON.parse(
    JSON.stringify(submission)
  ) as EntityModelSubmissionDto
  newSubmission.state = state
  return updateSubmission(
    submission,
    newSubmission,
    textNotification
  )
}
