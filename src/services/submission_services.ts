import {
    ResponseDtoPagedModelEntityModelSubmissionDto,
    RSubmissionControllerApiFactory,

} from '@/openapi'
import { AxiosResponse } from 'axios'
import { getConfiguration } from './api_config'
import { openApiRequest } from './open_api_access'


export function fetchRSubmissions() {
    const r_submission_api = RSubmissionControllerApiFactory(getConfiguration())
    return openApiRequest<ResponseDtoPagedModelEntityModelSubmissionDto>(
        r_submission_api.getAllSubmissions
    )
}

export function updateSubmission(state: string, submission_id: number) {
    const r_submission_api = RSubmissionControllerApiFactory(getConfiguration())
  const patch_body = [
    {
      'op': 'replace',
      'path': '/state',
      'value': state
    }
  ]
  
  return openApiRequest<AxiosResponse<any>>(
      () => r_submission_api.updateSubmission(patch_body, submission_id)
  )
}