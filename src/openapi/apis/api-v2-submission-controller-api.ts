/*
 * R Depot
 *
 * Copyright (C) 2012-2024 Open Analytics NV
 *
 * ===========================================================================
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the Apache License as published by
 * The Apache Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * Apache License for more details.
 *
 * You should have received a copy of the Apache License
 * along with this program. If not, see <http://www.apache.org/licenses/>
 *
 */

/* tslint:disable */
/* eslint-disable */
import globalAxios, {
  AxiosResponse,
  AxiosInstance,
  AxiosRequestConfig
} from 'axios'
import { Configuration } from '../configuration'
// Some imports not used depending on template conditions
// @ts-ignore
import {
  BASE_PATH,
  COLLECTION_FORMATS,
  RequestArgs,
  BaseAPI,
  RequiredError
} from '../base'
import { ResponseDtoEntityModelSubmissionDto } from '../models'
import { ResponseDtoPagedModelEntityModelSubmissionDto } from '../models'
/**
 * ApiV2SubmissionControllerApi - axios parameter creator
 * @export
 */
export const ApiV2SubmissionControllerApiAxiosParamCreator =
  function (configuration?: Configuration) {
    return {
      /**
       *
       * @param {number} [page] Zero-based page index (0..N)
       * @param {number} [size] The size of the page to be returned
       * @param {Array<string>} [sort] Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
       * @param {Array<string>} [state]
       * @param {Array<string>} [technology]
       * @param {Array<string>} [repository]
       * @param {string} [fromDate]
       * @param {string} [toDate]
       * @param {string} [search]
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      getAllSubmissions: async (
        page?: number,
        size?: number,
        sort?: Array<string>,
        state?: Array<string>,
        technology?: Array<string>,
        repository?: Array<string>,
        fromDate?: string,
        toDate?: string,
        search?: string,
        options: AxiosRequestConfig = {}
      ): Promise<RequestArgs> => {
        const localVarPath = `/api/v2/manager/submissions`
        // use dummy base URL string because the URL constructor only accepts absolute URLs.
        const localVarUrlObj = new URL(
          localVarPath,
          'https://example.com'
        )
        let baseOptions
        if (configuration) {
          baseOptions = configuration.baseOptions
        }
        const localVarRequestOptions: AxiosRequestConfig = {
          method: 'GET',
          ...baseOptions,
          ...options
        }
        const localVarHeaderParameter = {} as any
        const localVarQueryParameter = {} as any

        // authentication Bearer required
        // http bearer authentication required
        if (configuration && configuration.accessToken) {
          const accessToken =
            typeof configuration.accessToken === 'function'
              ? await configuration.accessToken()
              : await configuration.accessToken
          localVarHeaderParameter['Authorization'] =
            'Bearer ' + accessToken
        }

        if (page !== undefined) {
          localVarQueryParameter['page'] = page
        }

        if (size !== undefined) {
          localVarQueryParameter['size'] = size
        }

        if (sort) {
          localVarQueryParameter['sort'] = sort
        }

        if (state) {
          localVarQueryParameter['state'] = state
        }

        if (technology) {
          localVarQueryParameter['technology'] = technology
        }

        if (repository) {
          localVarQueryParameter['repository'] = repository
        }

        if (fromDate !== undefined) {
          localVarQueryParameter['fromDate'] = fromDate
        }

        if (toDate !== undefined) {
          localVarQueryParameter['toDate'] = toDate
        }

        if (search !== undefined) {
          localVarQueryParameter['search'] = search
        }

        const query = new URLSearchParams(
          localVarUrlObj.search
        )
        for (const key in localVarQueryParameter) {
          query.set(key, localVarQueryParameter[key])
        }
        for (const key in options.params) {
          query.set(key, options.params[key])
        }
        localVarUrlObj.search = new URLSearchParams(
          query
        ).toString()
        let headersFromBaseOptions =
          baseOptions && baseOptions.headers
            ? baseOptions.headers
            : {}
        localVarRequestOptions.headers = {
          ...localVarHeaderParameter,
          ...headersFromBaseOptions,
          ...options.headers
        }

        return {
          url:
            localVarUrlObj.pathname +
            localVarUrlObj.search +
            localVarUrlObj.hash,
          options: localVarRequestOptions
        }
      },
      /**
       *
       * @param {number} id
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      getSubmissionById: async (
        id: number,
        options: AxiosRequestConfig = {}
      ): Promise<RequestArgs> => {
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
          throw new RequiredError(
            'id',
            'Required parameter id was null or undefined when calling getSubmissionById.'
          )
        }
        const localVarPath =
          `/api/v2/manager/submissions/{id}`.replace(
            `{${'id'}}`,
            encodeURIComponent(String(id))
          )
        // use dummy base URL string because the URL constructor only accepts absolute URLs.
        const localVarUrlObj = new URL(
          localVarPath,
          'https://example.com'
        )
        let baseOptions
        if (configuration) {
          baseOptions = configuration.baseOptions
        }
        const localVarRequestOptions: AxiosRequestConfig = {
          method: 'GET',
          ...baseOptions,
          ...options
        }
        const localVarHeaderParameter = {} as any
        const localVarQueryParameter = {} as any

        // authentication Bearer required
        // http bearer authentication required
        if (configuration && configuration.accessToken) {
          const accessToken =
            typeof configuration.accessToken === 'function'
              ? await configuration.accessToken()
              : await configuration.accessToken
          localVarHeaderParameter['Authorization'] =
            'Bearer ' + accessToken
        }

        const query = new URLSearchParams(
          localVarUrlObj.search
        )
        for (const key in localVarQueryParameter) {
          query.set(key, localVarQueryParameter[key])
        }
        for (const key in options.params) {
          query.set(key, options.params[key])
        }
        localVarUrlObj.search = new URLSearchParams(
          query
        ).toString()
        let headersFromBaseOptions =
          baseOptions && baseOptions.headers
            ? baseOptions.headers
            : {}
        localVarRequestOptions.headers = {
          ...localVarHeaderParameter,
          ...headersFromBaseOptions,
          ...options.headers
        }

        return {
          url:
            localVarUrlObj.pathname +
            localVarUrlObj.search +
            localVarUrlObj.hash,
          options: localVarRequestOptions
        }
      }
    }
  }

/**
 * ApiV2SubmissionControllerApi - functional programming interface
 * @export
 */
export const ApiV2SubmissionControllerApiFp = function (
  configuration?: Configuration
) {
  return {
    /**
     *
     * @param {number} [page] Zero-based page index (0..N)
     * @param {number} [size] The size of the page to be returned
     * @param {Array<string>} [sort] Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @param {Array<string>} [state]
     * @param {Array<string>} [technology]
     * @param {Array<string>} [repository]
     * @param {string} [fromDate]
     * @param {string} [toDate]
     * @param {string} [search]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async getAllSubmissions(
      page?: number,
      size?: number,
      sort?: Array<string>,
      state?: Array<string>,
      technology?: Array<string>,
      repository?: Array<string>,
      fromDate?: string,
      toDate?: string,
      search?: string,
      options?: AxiosRequestConfig
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => Promise<
        AxiosResponse<ResponseDtoPagedModelEntityModelSubmissionDto>
      >
    > {
      const localVarAxiosArgs =
        await ApiV2SubmissionControllerApiAxiosParamCreator(
          configuration
        ).getAllSubmissions(
          page,
          size,
          sort,
          state,
          technology,
          repository,
          fromDate,
          toDate,
          search,
          options
        )
      return (
        axios: AxiosInstance = globalAxios,
        basePath: string = BASE_PATH
      ) => {
        const axiosRequestArgs: AxiosRequestConfig = {
          ...localVarAxiosArgs.options,
          url: basePath + localVarAxiosArgs.url
        }
        return axios.request(axiosRequestArgs)
      }
    },
    /**
     *
     * @param {number} id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async getSubmissionById(
      id: number,
      options?: AxiosRequestConfig
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => Promise<
        AxiosResponse<ResponseDtoEntityModelSubmissionDto>
      >
    > {
      const localVarAxiosArgs =
        await ApiV2SubmissionControllerApiAxiosParamCreator(
          configuration
        ).getSubmissionById(id, options)
      return (
        axios: AxiosInstance = globalAxios,
        basePath: string = BASE_PATH
      ) => {
        const axiosRequestArgs: AxiosRequestConfig = {
          ...localVarAxiosArgs.options,
          url: basePath + localVarAxiosArgs.url
        }
        return axios.request(axiosRequestArgs)
      }
    }
  }
}

/**
 * ApiV2SubmissionControllerApi - factory interface
 * @export
 */
export const ApiV2SubmissionControllerApiFactory =
  function (
    configuration?: Configuration,
    basePath?: string,
    axios?: AxiosInstance
  ) {
    return {
      /**
       *
       * @param {number} [page] Zero-based page index (0..N)
       * @param {number} [size] The size of the page to be returned
       * @param {Array<string>} [sort] Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
       * @param {Array<string>} [state]
       * @param {Array<string>} [technology]
       * @param {Array<string>} [repository]
       * @param {string} [fromDate]
       * @param {string} [toDate]
       * @param {string} [search]
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      async getAllSubmissions(
        page?: number,
        size?: number,
        sort?: Array<string>,
        state?: Array<string>,
        technology?: Array<string>,
        repository?: Array<string>,
        fromDate?: string,
        toDate?: string,
        search?: string,
        options?: AxiosRequestConfig
      ): Promise<
        AxiosResponse<ResponseDtoPagedModelEntityModelSubmissionDto>
      > {
        return ApiV2SubmissionControllerApiFp(configuration)
          .getAllSubmissions(
            page,
            size,
            sort,
            state,
            technology,
            repository,
            fromDate,
            toDate,
            search,
            options
          )
          .then((request) => request(axios, basePath))
      },
      /**
       *
       * @param {number} id
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      async getSubmissionById(
        id: number,
        options?: AxiosRequestConfig
      ): Promise<
        AxiosResponse<ResponseDtoEntityModelSubmissionDto>
      > {
        return ApiV2SubmissionControllerApiFp(configuration)
          .getSubmissionById(id, options)
          .then((request) => request(axios, basePath))
      }
    }
  }

/**
 * ApiV2SubmissionControllerApi - object-oriented interface
 * @export
 * @class ApiV2SubmissionControllerApi
 * @extends {BaseAPI}
 */
export class ApiV2SubmissionControllerApi extends BaseAPI {
  /**
   *
   * @param {number} [page] Zero-based page index (0..N)
   * @param {number} [size] The size of the page to be returned
   * @param {Array<string>} [sort] Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   * @param {Array<string>} [state]
   * @param {Array<string>} [technology]
   * @param {Array<string>} [repository]
   * @param {string} [fromDate]
   * @param {string} [toDate]
   * @param {string} [search]
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ApiV2SubmissionControllerApi
   */
  public async getAllSubmissions(
    page?: number,
    size?: number,
    sort?: Array<string>,
    state?: Array<string>,
    technology?: Array<string>,
    repository?: Array<string>,
    fromDate?: string,
    toDate?: string,
    search?: string,
    options?: AxiosRequestConfig
  ): Promise<
    AxiosResponse<ResponseDtoPagedModelEntityModelSubmissionDto>
  > {
    return ApiV2SubmissionControllerApiFp(
      this.configuration
    )
      .getAllSubmissions(
        page,
        size,
        sort,
        state,
        technology,
        repository,
        fromDate,
        toDate,
        search,
        options
      )
      .then((request) => request(this.axios, this.basePath))
  }
  /**
   *
   * @param {number} id
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ApiV2SubmissionControllerApi
   */
  public async getSubmissionById(
    id: number,
    options?: AxiosRequestConfig
  ): Promise<
    AxiosResponse<ResponseDtoEntityModelSubmissionDto>
  > {
    return ApiV2SubmissionControllerApiFp(
      this.configuration
    )
      .getSubmissionById(id, options)
      .then((request) => request(this.axios, this.basePath))
  }
}
