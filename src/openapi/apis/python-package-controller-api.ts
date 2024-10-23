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
import { ResponseDtoEntityModelPythonPackageDto } from '../models'
import { ResponseDtoObject } from '../models'
/**
 * PythonPackageControllerApi - axios parameter creator
 * @export
 */
export const PythonPackageControllerApiAxiosParamCreator =
  function (configuration?: Configuration) {
    return {
      /**
       *
       * @param {number} id
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      deletePythonPackage: async (
        id: number,
        options: AxiosRequestConfig = {}
      ): Promise<RequestArgs> => {
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
          throw new RequiredError(
            'id',
            'Required parameter id was null or undefined when calling deletePythonPackage.'
          )
        }
        const localVarPath =
          `/api/v2/manager/python/packages/{id}`.replace(
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
       * @param {number} id
       * @param {string} name
       * @param {string} version
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      downloadPythonPackage: async (
        id: number,
        name: string,
        version: string,
        options: AxiosRequestConfig = {}
      ): Promise<RequestArgs> => {
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
          throw new RequiredError(
            'id',
            'Required parameter id was null or undefined when calling downloadPythonPackage.'
          )
        }
        // verify required parameter 'name' is not null or undefined
        if (name === null || name === undefined) {
          throw new RequiredError(
            'name',
            'Required parameter name was null or undefined when calling downloadPythonPackage.'
          )
        }
        // verify required parameter 'version' is not null or undefined
        if (version === null || version === undefined) {
          throw new RequiredError(
            'version',
            'Required parameter version was null or undefined when calling downloadPythonPackage.'
          )
        }
        const localVarPath =
          `/api/v2/manager/python/packages/{id}/download/{name}-{version}.tar.gz`
            .replace(
              `{${'id'}}`,
              encodeURIComponent(String(id))
            )
            .replace(
              `{${'name'}}`,
              encodeURIComponent(String(name))
            )
            .replace(
              `{${'version'}}`,
              encodeURIComponent(String(version))
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
       * @param {number} id
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      getAllPythonPackageById: async (
        id: number,
        options: AxiosRequestConfig = {}
      ): Promise<RequestArgs> => {
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
          throw new RequiredError(
            'id',
            'Required parameter id was null or undefined when calling getAllPythonPackageById.'
          )
        }
        const localVarPath =
          `/api/v2/manager/python/packages/{id}`.replace(
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
       * @param {number} [page] Zero-based page index (0..N)
       * @param {number} [size] The size of the page to be returned
       * @param {Array<string>} [sort] Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
       * @param {Array<string>} [repository]
       * @param {boolean} [deleted]
       * @param {Array<string>} [submissionState]
       * @param {string} [name]
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      getAllPythonPackages: async (
        page?: number,
        size?: number,
        sort?: Array<string>,
        repository?: Array<string>,
        deleted?: boolean,
        submissionState?: Array<string>,
        name?: string,
        options: AxiosRequestConfig = {}
      ): Promise<RequestArgs> => {
        const localVarPath = `/api/v2/manager/python/packages`
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

        if (repository) {
          localVarQueryParameter['repository'] = repository
        }

        if (deleted !== undefined) {
          localVarQueryParameter['deleted'] = deleted
        }

        if (submissionState) {
          localVarQueryParameter['submissionState'] =
            submissionState
        }

        if (name !== undefined) {
          localVarQueryParameter['name'] = name
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
       * @param {JsonPatch} body
       * @param {number} id
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      updatePythonPackage: async (
        body: JsonPatch,
        id: number,
        options: AxiosRequestConfig = {}
      ): Promise<RequestArgs> => {
        // verify required parameter 'body' is not null or undefined
        if (body === null || body === undefined) {
          throw new RequiredError(
            'body',
            'Required parameter body was null or undefined when calling updatePythonPackage.'
          )
        }
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
          throw new RequiredError(
            'id',
            'Required parameter id was null or undefined when calling updatePythonPackage.'
          )
        }
        const localVarPath =
          `/api/v2/manager/python/packages/{id}`.replace(
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
 * PythonPackageControllerApi - functional programming interface
 * @export
 */
export const PythonPackageControllerApiFp = function (
  configuration?: Configuration
) {
  return {
    /**
     *
     * @param {number} id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async deletePythonPackage(
      id: number,
      options?: AxiosRequestConfig
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => Promise<AxiosResponse<void>>
    > {
      const localVarAxiosArgs =
        await PythonPackageControllerApiAxiosParamCreator(
          configuration
        ).deletePythonPackage(id, options)
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
     * @param {string} name
     * @param {string} version
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async downloadPythonPackage(
      id: number,
      name: string,
      version: string,
      options?: AxiosRequestConfig
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => Promise<AxiosResponse<Array<string>>>
    > {
      const localVarAxiosArgs =
        await PythonPackageControllerApiAxiosParamCreator(
          configuration
        ).downloadPythonPackage(id, name, version, options)
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
    async getAllPythonPackageById(
      id: number,
      options?: AxiosRequestConfig
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => Promise<
        AxiosResponse<ResponseDtoEntityModelPythonPackageDto>
      >
    > {
      const localVarAxiosArgs =
        await PythonPackageControllerApiAxiosParamCreator(
          configuration
        ).getAllPythonPackageById(id, options)
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
     * @param {Array<string>} [repository]
     * @param {boolean} [deleted]
     * @param {Array<string>} [submissionState]
     * @param {string} [name]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async getAllPythonPackages(
      page?: number,
      size?: number,
      sort?: Array<string>,
      repository?: Array<string>,
      deleted?: boolean,
      submissionState?: Array<string>,
      name?: string,
      options?: AxiosRequestConfig
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => Promise<AxiosResponse<ResponseDtoObject>>
    > {
      const localVarAxiosArgs =
        await PythonPackageControllerApiAxiosParamCreator(
          configuration
        ).getAllPythonPackages(
          page,
          size,
          sort,
          repository,
          deleted,
          submissionState,
          name,
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
    async updatePythonPackage(
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
        await PythonPackageControllerApiAxiosParamCreator(
          configuration
        ).updatePythonPackage(body, id, options)
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
 * PythonPackageControllerApi - factory interface
 * @export
 */
export const PythonPackageControllerApiFactory = function (
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
    async deletePythonPackage(
      id: number,
      options?: AxiosRequestConfig
    ): Promise<AxiosResponse<void>> {
      return PythonPackageControllerApiFp(configuration)
        .deletePythonPackage(id, options)
        .then((request) => request(axios, basePath))
    },
    /**
     *
     * @param {number} id
     * @param {string} name
     * @param {string} version
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async downloadPythonPackage(
      id: number,
      name: string,
      version: string,
      options?: AxiosRequestConfig
    ): Promise<AxiosResponse<Array<string>>> {
      return PythonPackageControllerApiFp(configuration)
        .downloadPythonPackage(id, name, version, options)
        .then((request) => request(axios, basePath))
    },
    /**
     *
     * @param {number} id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async getAllPythonPackageById(
      id: number,
      options?: AxiosRequestConfig
    ): Promise<
      AxiosResponse<ResponseDtoEntityModelPythonPackageDto>
    > {
      return PythonPackageControllerApiFp(configuration)
        .getAllPythonPackageById(id, options)
        .then((request) => request(axios, basePath))
    },
    /**
     *
     * @param {number} [page] Zero-based page index (0..N)
     * @param {number} [size] The size of the page to be returned
     * @param {Array<string>} [sort] Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @param {Array<string>} [repository]
     * @param {boolean} [deleted]
     * @param {Array<string>} [submissionState]
     * @param {string} [name]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async getAllPythonPackages(
      page?: number,
      size?: number,
      sort?: Array<string>,
      repository?: Array<string>,
      deleted?: boolean,
      submissionState?: Array<string>,
      name?: string,
      options?: AxiosRequestConfig
    ): Promise<AxiosResponse<ResponseDtoObject>> {
      return PythonPackageControllerApiFp(configuration)
        .getAllPythonPackages(
          page,
          size,
          sort,
          repository,
          deleted,
          submissionState,
          name,
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
    async updatePythonPackage(
      body: JsonPatch,
      id: number,
      options?: AxiosRequestConfig
    ): Promise<AxiosResponse<any>> {
      return PythonPackageControllerApiFp(configuration)
        .updatePythonPackage(body, id, options)
        .then((request) => request(axios, basePath))
    }
  }
}

/**
 * PythonPackageControllerApi - object-oriented interface
 * @export
 * @class PythonPackageControllerApi
 * @extends {BaseAPI}
 */
export class PythonPackageControllerApi extends BaseAPI {
  /**
   *
   * @param {number} id
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof PythonPackageControllerApi
   */
  public async deletePythonPackage(
    id: number,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<void>> {
    return PythonPackageControllerApiFp(this.configuration)
      .deletePythonPackage(id, options)
      .then((request) => request(this.axios, this.basePath))
  }
  /**
   *
   * @param {number} id
   * @param {string} name
   * @param {string} version
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof PythonPackageControllerApi
   */
  public async downloadPythonPackage(
    id: number,
    name: string,
    version: string,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<Array<string>>> {
    return PythonPackageControllerApiFp(this.configuration)
      .downloadPythonPackage(id, name, version, options)
      .then((request) => request(this.axios, this.basePath))
  }
  /**
   *
   * @param {number} id
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof PythonPackageControllerApi
   */
  public async getAllPythonPackageById(
    id: number,
    options?: AxiosRequestConfig
  ): Promise<
    AxiosResponse<ResponseDtoEntityModelPythonPackageDto>
  > {
    return PythonPackageControllerApiFp(this.configuration)
      .getAllPythonPackageById(id, options)
      .then((request) => request(this.axios, this.basePath))
  }
  /**
   *
   * @param {number} [page] Zero-based page index (0..N)
   * @param {number} [size] The size of the page to be returned
   * @param {Array<string>} [sort] Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   * @param {Array<string>} [repository]
   * @param {boolean} [deleted]
   * @param {Array<string>} [submissionState]
   * @param {string} [name]
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof PythonPackageControllerApi
   */
  public async getAllPythonPackages(
    page?: number,
    size?: number,
    sort?: Array<string>,
    repository?: Array<string>,
    deleted?: boolean,
    submissionState?: Array<string>,
    name?: string,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<ResponseDtoObject>> {
    return PythonPackageControllerApiFp(this.configuration)
      .getAllPythonPackages(
        page,
        size,
        sort,
        repository,
        deleted,
        submissionState,
        name,
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
   * @memberof PythonPackageControllerApi
   */
  public async updatePythonPackage(
    body: JsonPatch,
    id: number,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<any>> {
    return PythonPackageControllerApiFp(this.configuration)
      .updatePythonPackage(body, id, options)
      .then((request) => request(this.axios, this.basePath))
  }
}
