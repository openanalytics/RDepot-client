import {
  ApiV2RepositoryControllerApiFactory,
  Configuration,
  ResponseDtoPagedModelEntityModelRepositoryDto
} from '@/openapi'
import axios, { AxiosResponse } from 'axios'
import { openApiRequest } from './open_api_access'

var configuration: Configuration = new Configuration()
configuration.baseOptions = {
  headers: {
    // Authorization:
    //   'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJnYWxpZWxlbyJ9.Hp95DiIZ0L0JXyQZOvhJkzyTDzNuos81QoTWfLeVPlodWvGg7ziJTI6nJFitg5VAwrGmA4wpbWbjK9aItCKB3A'
  }
}
// configuration.baseOptions.headers =
//   'Access-Control-Allow-Origin'
const repository_api =
  ApiV2RepositoryControllerApiFactory(configuration)

export function fetchRepositoriesServices() {
  return openApiRequest<ResponseDtoPagedModelEntityModelRepositoryDto>(
    repository_api.getAllRepositories
  )
}

function test2() {
  return axios
    .get('https://reqres.in/api/unknown/2')
    .then(resolved, rejected)
}

function getPromise() {
  return test2()
}

function resolved(result: AxiosResponse<any, any>) {
  var a = result.data
  return a
}

function rejected(result: AxiosResponse<any, any>) {
  alert(result)
}

export async function testPromise() {
  console.log('test begin')
  var a = await getPromise()
  console.log(a)
  console.log('test end')
}
