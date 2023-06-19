/*
 * R Depot
 *
 * Copyright (C) 2012-2023 Open Analytics NV
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
/**
 * RDEPOT API
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: v2
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
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
 * RSubmissionControllerApi - axios parameter creator
 * @export
 */
export const RSubmissionControllerApiAxiosParamCreator =
  function (configuration?: Configuration) {
    return {
      /**
       *
       * @param {number} id
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      deleteSubmission: async (
        id: number,
        options: AxiosRequestConfig = {}
      ): Promise<RequestArgs> => {
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
          throw new RequiredError(
            'id',
            'Required parameter id was null or undefined when calling deleteSubmission.'
          )
        }
        const localVarPath =
          `/api/v2/manager/r/submissions/{id}`.replace(
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
       * @param {string} [state]
       * @param {number} [submitterId]
       * @param {number} [packageId]
       * @param {number} [page] Zero-based page index (0..N)
       * @param {number} [size] The size of the page to be returned
       * @param {Array<string>} [sort] Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      getAllSubmissions: async (
        state?: string,
        submitterId?: number,
        packageId?: number,
        page?: number,
        size?: number,
        sort?: Array<string>,
        options: AxiosRequestConfig = {}
      ): Promise<RequestArgs> => {
        const localVarPath = `/api/v2/manager/r/submissions`
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

        if (state !== undefined) {
          localVarQueryParameter['state'] = state
        }

        if (submitterId !== undefined) {
          localVarQueryParameter['submitterId'] =
            submitterId
        }

        if (packageId !== undefined) {
          localVarQueryParameter['packageId'] = packageId
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
          `/api/v2/manager/r/submissions/{id}`.replace(
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
      submitPackageForm: async (
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
            'Required parameter repository was null or undefined when calling submitPackageForm.'
          )
        }
        const localVarPath = `/api/v2/manager/r/submissions`
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
      updateSubmission: async (
        body: JsonPatch,
        id: number,
        options: AxiosRequestConfig = {}
      ): Promise<RequestArgs> => {
        // verify required parameter 'body' is not null or undefined
        if (body === null || body === undefined) {
          throw new RequiredError(
            'body',
            'Required parameter body was null or undefined when calling updateSubmission.'
          )
        }
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
          throw new RequiredError(
            'id',
            'Required parameter id was null or undefined when calling updateSubmission.'
          )
        }
        const localVarPath =
          `/api/v2/manager/r/submissions/{id}`.replace(
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
 * RSubmissionControllerApi - functional programming interface
 * @export
 */
export const RSubmissionControllerApiFp = function (
  configuration?: Configuration
) {
  return {
    /**
     *
     * @param {number} id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async deleteSubmission(
      id: number,
      options?: AxiosRequestConfig
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => Promise<AxiosResponse<void>>
    > {
      const localVarAxiosArgs =
        await RSubmissionControllerApiAxiosParamCreator(
          configuration
        ).deleteSubmission(id, options)
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
     * @param {string} [state]
     * @param {number} [submitterId]
     * @param {number} [packageId]
     * @param {number} [page] Zero-based page index (0..N)
     * @param {number} [size] The size of the page to be returned
     * @param {Array<string>} [sort] Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async getAllSubmissions(
      state?: string,
      submitterId?: number,
      packageId?: number,
      page?: number,
      size?: number,
      sort?: Array<string>,
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
        await RSubmissionControllerApiAxiosParamCreator(
          configuration
        ).getAllSubmissions(
          state,
          submitterId,
          packageId,
          page,
          size,
          sort,
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
        await RSubmissionControllerApiAxiosParamCreator(
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
    async submitPackageForm(
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
        await RSubmissionControllerApiAxiosParamCreator(
          configuration
        ).submitPackageForm(
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
    async updateSubmission(
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
        await RSubmissionControllerApiAxiosParamCreator(
          configuration
        ).updateSubmission(body, id, options)
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
 * RSubmissionControllerApi - factory interface
 * @export
 */
export const RSubmissionControllerApiFactory = function (
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
    async deleteSubmission(
      id: number,
      options?: AxiosRequestConfig
    ): Promise<AxiosResponse<void>> {
      return RSubmissionControllerApiFp(configuration)
        .deleteSubmission(id, options)
        .then((request) => request(axios, basePath))
    },
    /**
     *
     * @param {string} [state]
     * @param {number} [submitterId]
     * @param {number} [packageId]
     * @param {number} [page] Zero-based page index (0..N)
     * @param {number} [size] The size of the page to be returned
     * @param {Array<string>} [sort] Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async getAllSubmissions(
      state?: string,
      submitterId?: number,
      packageId?: number,
      page?: number,
      size?: number,
      sort?: Array<string>,
      options?: AxiosRequestConfig
    ): Promise<
      AxiosResponse<ResponseDtoPagedModelEntityModelSubmissionDto>
    > {
      return RSubmissionControllerApiFp(configuration)
        .getAllSubmissions(
          state,
          submitterId,
          packageId,
          page,
          size,
          sort,
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
      return RSubmissionControllerApiFp(configuration)
        .getSubmissionById(id, options)
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
    async submitPackageForm(
      repository: string,
      file?: Blob,
      generateManual?: boolean,
      replace?: boolean,
      options?: AxiosRequestConfig
    ): Promise<AxiosResponse<any>> {
      return RSubmissionControllerApiFp(configuration)
        .submitPackageForm(
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
    async updateSubmission(
      body: JsonPatch,
      id: number,
      options?: AxiosRequestConfig
    ): Promise<AxiosResponse<any>> {
      return RSubmissionControllerApiFp(configuration)
        .updateSubmission(body, id, options)
        .then((request) => request(axios, basePath))
    }
  }
}

/**
 * RSubmissionControllerApi - object-oriented interface
 * @export
 * @class RSubmissionControllerApi
 * @extends {BaseAPI}
 */
export class RSubmissionControllerApi extends BaseAPI {
  /**
   *
   * @param {number} id
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof RSubmissionControllerApi
   */
  public async deleteSubmission(
    id: number,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<void>> {
    return RSubmissionControllerApiFp(this.configuration)
      .deleteSubmission(id, options)
      .then((request) => request(this.axios, this.basePath))
  }
  /**
   *
   * @param {string} [state]
   * @param {number} [submitterId]
   * @param {number} [packageId]
   * @param {number} [page] Zero-based page index (0..N)
   * @param {number} [size] The size of the page to be returned
   * @param {Array<string>} [sort] Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof RSubmissionControllerApi
   */
  public async getAllSubmissions(
    state?: string,
    submitterId?: number,
    packageId?: number,
    page?: number,
    size?: number,
    sort?: Array<string>,
    options?: AxiosRequestConfig
  ): Promise<
    AxiosResponse<ResponseDtoPagedModelEntityModelSubmissionDto>
  > {
    return RSubmissionControllerApiFp(this.configuration)
      .getAllSubmissions(
        state,
        submitterId,
        packageId,
        page,
        size,
        sort,
        options
      )
      .then((request) => request(this.axios, this.basePath))
  }
  /**
   *
   * @param {number} id
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof RSubmissionControllerApi
   */
  public async getSubmissionById(
    id: number,
    options?: AxiosRequestConfig
  ): Promise<
    AxiosResponse<ResponseDtoEntityModelSubmissionDto>
  > {
    return RSubmissionControllerApiFp(this.configuration)
      .getSubmissionById(id, options)
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
   * @memberof RSubmissionControllerApi
   */
  public async submitPackageForm(
    repository: string,
    file?: Blob,
    generateManual?: boolean,
    replace?: boolean,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<any>> {
    return RSubmissionControllerApiFp(this.configuration)
      .submitPackageForm(
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
   * @memberof RSubmissionControllerApi
   */
  public async updateSubmission(
    body: JsonPatch,
    id: number,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<any>> {
    return RSubmissionControllerApiFp(this.configuration)
      .updateSubmission(body, id, options)
      .then((request) => request(this.axios, this.basePath))
  }
}
