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
import { JsonPatch } from '../models'
import { ResponseDtoEntityModelSubmissionDto } from '../models'
import { ResponseDtoPagedModelEntityModelSubmissionDto } from '../models'
/**
 * PythonSubmissionControllerApi - axios parameter creator
 * @export
 */
export const PythonSubmissionControllerApiAxiosParamCreator =
  function (configuration?: Configuration) {
    return {
      /**
       *
       * @param {number} id
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      deletePythonSubmission: async (
        id: number,
        options: AxiosRequestConfig = {}
      ): Promise<RequestArgs> => {
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
          throw new RequiredError(
            'id',
            'Required parameter id was null or undefined when calling deletePythonSubmission.'
          )
        }
        const localVarPath =
          `/api/v2/manager/python/submissions/{id}`.replace(
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
          method: 'DELETE',
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
      },
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
      getAllPythonSubmissions: async (
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
        const localVarPath = `/api/v2/manager/python/submissions`
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
      getPythonSubmissionById: async (
        id: number,
        options: AxiosRequestConfig = {}
      ): Promise<RequestArgs> => {
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
          throw new RequiredError(
            'id',
            'Required parameter id was null or undefined when calling getPythonSubmissionById.'
          )
        }
        const localVarPath =
          `/api/v2/manager/python/submissions/{id}`.replace(
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
      },
      /**
       *
       * @param {string} repository
       * @param {Blob} [file]
       * @param {boolean} [generateManual]
       * @param {boolean} [replace]
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      submitPythonPackageForm: async (
        repository: string,
        file?: Blob,
        generateManual?: boolean,
        replace?: boolean,
        options: AxiosRequestConfig = {}
      ): Promise<RequestArgs> => {
        // verify required parameter 'repository' is not null or undefined
        if (
          repository === null ||
          repository === undefined
        ) {
          throw new RequiredError(
            'repository',
            'Required parameter repository was null or undefined when calling submitPythonPackageForm.'
          )
        }
        const localVarPath = `/api/v2/manager/python/submissions`
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
          method: 'POST',
          ...baseOptions,
          ...options
        }
        const localVarHeaderParameter = {} as any
        const localVarQueryParameter = {} as any
        const localVarFormParams = new FormData()

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

        if (repository !== undefined) {
          localVarQueryParameter['repository'] = repository
        }

        if (generateManual !== undefined) {
          localVarQueryParameter['generateManual'] =
            generateManual
        }

        if (replace !== undefined) {
          localVarQueryParameter['replace'] = replace
        }

        if (file !== undefined) {
          localVarFormParams.append('file', file as any)
        }

        localVarHeaderParameter['Content-Type'] =
          'multipart/form-data'
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
        localVarRequestOptions.data = localVarFormParams

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
       * @param {JsonPatch} body
       * @param {number} id
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      updatePythonSubmission: async (
        body: JsonPatch,
        id: number,
        options: AxiosRequestConfig = {}
      ): Promise<RequestArgs> => {
        // verify required parameter 'body' is not null or undefined
        if (body === null || body === undefined) {
          throw new RequiredError(
            'body',
            'Required parameter body was null or undefined when calling updatePythonSubmission.'
          )
        }
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
          throw new RequiredError(
            'id',
            'Required parameter id was null or undefined when calling updatePythonSubmission.'
          )
        }
        const localVarPath =
          `/api/v2/manager/python/submissions/{id}`.replace(
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
          method: 'PATCH',
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

        localVarHeaderParameter['Content-Type'] =
          'application/json-patch+json'

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
        const needsSerialization =
          typeof body !== 'string' ||
          Object.entries(
            localVarRequestOptions.headers!
          ).find(([key, value]) => {
            if (
              value === 'application/json' &&
              key == 'Content-Type'
            ) {
              return true
            }
            return false
          })

        localVarRequestOptions.data = needsSerialization
          ? JSON.stringify(body !== undefined ? body : {})
          : body || ''

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
 * PythonSubmissionControllerApi - functional programming interface
 * @export
 */
export const PythonSubmissionControllerApiFp = function (
  configuration?: Configuration
) {
  return {
    /**
     *
     * @param {number} id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async deletePythonSubmission(
      id: number,
      options?: AxiosRequestConfig
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => Promise<AxiosResponse<void>>
    > {
      const localVarAxiosArgs =
        await PythonSubmissionControllerApiAxiosParamCreator(
          configuration
        ).deletePythonSubmission(id, options)
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
    async getAllPythonSubmissions(
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
        await PythonSubmissionControllerApiAxiosParamCreator(
          configuration
        ).getAllPythonSubmissions(
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
    async getPythonSubmissionById(
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
        await PythonSubmissionControllerApiAxiosParamCreator(
          configuration
        ).getPythonSubmissionById(id, options)
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
     * @param {string} repository
     * @param {Blob} [file]
     * @param {boolean} [generateManual]
     * @param {boolean} [replace]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async submitPythonPackageForm(
      repository: string,
      file?: Blob,
      generateManual?: boolean,
      replace?: boolean,
      options?: AxiosRequestConfig
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => Promise<AxiosResponse<any>>
    > {
      const localVarAxiosArgs =
        await PythonSubmissionControllerApiAxiosParamCreator(
          configuration
        ).submitPythonPackageForm(
          repository,
          file,
          generateManual,
          replace,
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
     * @param {JsonPatch} body
     * @param {number} id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async updatePythonSubmission(
      body: JsonPatch,
      id: number,
      options?: AxiosRequestConfig
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => Promise<AxiosResponse<any>>
    > {
      const localVarAxiosArgs =
        await PythonSubmissionControllerApiAxiosParamCreator(
          configuration
        ).updatePythonSubmission(body, id, options)
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
 * PythonSubmissionControllerApi - factory interface
 * @export
 */
export const PythonSubmissionControllerApiFactory =
  function (
    configuration?: Configuration,
    basePath?: string,
    axios?: AxiosInstance
  ) {
    return {
      /**
       *
       * @param {number} id
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      async deletePythonSubmission(
        id: number,
        options?: AxiosRequestConfig
      ): Promise<AxiosResponse<void>> {
        return PythonSubmissionControllerApiFp(
          configuration
        )
          .deletePythonSubmission(id, options)
          .then((request) => request(axios, basePath))
      },
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
      async getAllPythonSubmissions(
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
        return PythonSubmissionControllerApiFp(
          configuration
        )
          .getAllPythonSubmissions(
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
      async getPythonSubmissionById(
        id: number,
        options?: AxiosRequestConfig
      ): Promise<
        AxiosResponse<ResponseDtoEntityModelSubmissionDto>
      > {
        return PythonSubmissionControllerApiFp(
          configuration
        )
          .getPythonSubmissionById(id, options)
          .then((request) => request(axios, basePath))
      },
      /**
       *
       * @param {string} repository
       * @param {Blob} [file]
       * @param {boolean} [generateManual]
       * @param {boolean} [replace]
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      async submitPythonPackageForm(
        repository: string,
        file?: Blob,
        generateManual?: boolean,
        replace?: boolean,
        options?: AxiosRequestConfig
      ): Promise<AxiosResponse<any>> {
        return PythonSubmissionControllerApiFp(
          configuration
        )
          .submitPythonPackageForm(
            repository,
            file,
            generateManual,
            replace,
            options
          )
          .then((request) => request(axios, basePath))
      },
      /**
       *
       * @param {JsonPatch} body
       * @param {number} id
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      async updatePythonSubmission(
        body: JsonPatch,
        id: number,
        options?: AxiosRequestConfig
      ): Promise<AxiosResponse<any>> {
        return PythonSubmissionControllerApiFp(
          configuration
        )
          .updatePythonSubmission(body, id, options)
          .then((request) => request(axios, basePath))
      }
    }
  }

/**
 * PythonSubmissionControllerApi - object-oriented interface
 * @export
 * @class PythonSubmissionControllerApi
 * @extends {BaseAPI}
 */
export class PythonSubmissionControllerApi extends BaseAPI {
  /**
   *
   * @param {number} id
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof PythonSubmissionControllerApi
   */
  public async deletePythonSubmission(
    id: number,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<void>> {
    return PythonSubmissionControllerApiFp(
      this.configuration
    )
      .deletePythonSubmission(id, options)
      .then((request) => request(this.axios, this.basePath))
  }
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
   * @memberof PythonSubmissionControllerApi
   */
  public async getAllPythonSubmissions(
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
    return PythonSubmissionControllerApiFp(
      this.configuration
    )
      .getAllPythonSubmissions(
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
   * @memberof PythonSubmissionControllerApi
   */
  public async getPythonSubmissionById(
    id: number,
    options?: AxiosRequestConfig
  ): Promise<
    AxiosResponse<ResponseDtoEntityModelSubmissionDto>
  > {
    return PythonSubmissionControllerApiFp(
      this.configuration
    )
      .getPythonSubmissionById(id, options)
      .then((request) => request(this.axios, this.basePath))
  }
  /**
   *
   * @param {string} repository
   * @param {Blob} [file]
   * @param {boolean} [generateManual]
   * @param {boolean} [replace]
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof PythonSubmissionControllerApi
   */
  public async submitPythonPackageForm(
    repository: string,
    file?: Blob,
    generateManual?: boolean,
    replace?: boolean,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<any>> {
    return PythonSubmissionControllerApiFp(
      this.configuration
    )
      .submitPythonPackageForm(
        repository,
        file,
        generateManual,
        replace,
        options
      )
      .then((request) => request(this.axios, this.basePath))
  }
  /**
   *
   * @param {JsonPatch} body
   * @param {number} id
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof PythonSubmissionControllerApi
   */
  public async updatePythonSubmission(
    body: JsonPatch,
    id: number,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<any>> {
    return PythonSubmissionControllerApiFp(
      this.configuration
    )
      .updatePythonSubmission(body, id, options)
      .then((request) => request(this.axios, this.basePath))
  }
}
