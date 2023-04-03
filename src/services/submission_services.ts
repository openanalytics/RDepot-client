import { SubmissionsFiltration } from '@/models/Filtration'
import {
  ResponseDtoPagedModelEntityModelSubmissionDto,
  RSubmissionControllerApiFactory
} from '@/openapi'
import { useLoggedUserStore } from '@/store/logged_user'
import { AxiosResponse } from 'axios'
import { getConfiguration } from './api_config'
import { openApiRequest } from './open_api_access'
import { Blob } from 'buffer'

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
  )
}

export function updateSubmission(
  state: string,
  submission_id: number
) {
  const r_submission_api = RSubmissionControllerApiFactory(
    getConfiguration()
  )
  const patch_body = [
    {
      op: 'replace',
      path: '/state',
      value: state
    }
  ]

  return openApiRequest<AxiosResponse<any>>(() =>
    r_submission_api.updateSubmission(
      patch_body,
      submission_id
    )
  )
}

export function addSumbission(
  repository: string,
  file: File
) {
  const r_submission_api = RSubmissionControllerApiFactory(
    getConfiguration()
  )

  return openApiRequest<AxiosResponse<any>>(() =>
    r_submission_api.submitPackageForm(repository, file)
  )
}
