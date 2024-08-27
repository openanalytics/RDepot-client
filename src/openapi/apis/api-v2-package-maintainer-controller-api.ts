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
import { JsonPatch } from '../models'
import { PackageMaintainerDto } from '../models'
import { ResponseDtoEntityModelPackageMaintainerDto } from '../models'
import { ResponseDtoPagedModelEntityModelPackageMaintainerDto } from '../models'
/**
 * ApiV2PackageMaintainerControllerApi - axios parameter creator
 * @export
 */
export const ApiV2PackageMaintainerControllerApiAxiosParamCreator =
  function (configuration?: Configuration) {
    return {
      /**
       *
       * @param {PackageMaintainerDto} body
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      createPackageMaintainer: async (
        body: PackageMaintainerDto,
        options: AxiosRequestConfig = {}
      ): Promise<RequestArgs> => {
        // verify required parameter 'body' is not null or undefined
        if (body === null || body === undefined) {
          throw new RequiredError(
            'body',
            'Required parameter body was null or undefined when calling createPackageMaintainer.'
          )
        }
        const localVarPath = `/api/v2/manager/package-maintainers`
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
          'application/json'

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
      },
      /**
       *
       * @param {number} id
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      deletePackageMaintainer: async (
        id: number,
        options: AxiosRequestConfig = {}
      ): Promise<RequestArgs> => {
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
          throw new RequiredError(
            'id',
            'Required parameter id was null or undefined when calling deletePackageMaintainer.'
          )
        }
        const localVarPath =
          `/api/v2/manager/package-maintainers/{id}`.replace(
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
       * @param {boolean} [deleted]
       * @param {Array<string>} [technology]
       * @param {Array<string>} [repository]
       * @param {string} [search]
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      getAllPackageMaintainers: async (
        page?: number,
        size?: number,
        sort?: Array<string>,
        deleted?: boolean,
        technology?: Array<string>,
        repository?: Array<string>,
        search?: string,
        options: AxiosRequestConfig = {}
      ): Promise<RequestArgs> => {
        const localVarPath = `/api/v2/manager/package-maintainers`
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

        if (deleted !== undefined) {
          localVarQueryParameter['deleted'] = deleted
        }

        if (technology) {
          localVarQueryParameter['technology'] = technology
        }

        if (repository) {
          localVarQueryParameter['repository'] = repository
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
      getPackageMaintainerById: async (
        id: number,
        options: AxiosRequestConfig = {}
      ): Promise<RequestArgs> => {
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
          throw new RequiredError(
            'id',
            'Required parameter id was null or undefined when calling getPackageMaintainerById.'
          )
        }
        const localVarPath =
          `/api/v2/manager/package-maintainers/{id}`.replace(
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
       * @param {JsonPatch} body
       * @param {number} id
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      updatePackageMaintainer: async (
        body: JsonPatch,
        id: number,
        options: AxiosRequestConfig = {}
      ): Promise<RequestArgs> => {
        // verify required parameter 'body' is not null or undefined
        if (body === null || body === undefined) {
          throw new RequiredError(
            'body',
            'Required parameter body was null or undefined when calling updatePackageMaintainer.'
          )
        }
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
          throw new RequiredError(
            'id',
            'Required parameter id was null or undefined when calling updatePackageMaintainer.'
          )
        }
        const localVarPath =
          `/api/v2/manager/package-maintainers/{id}`.replace(
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
 * ApiV2PackageMaintainerControllerApi - functional programming interface
 * @export
 */
export const ApiV2PackageMaintainerControllerApiFp =
  function (configuration?: Configuration) {
    return {
      /**
       *
       * @param {PackageMaintainerDto} body
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      async createPackageMaintainer(
        body: PackageMaintainerDto,
        options?: AxiosRequestConfig
      ): Promise<
        (
          axios?: AxiosInstance,
          basePath?: string
        ) => Promise<AxiosResponse<any>>
      > {
        const localVarAxiosArgs =
          await ApiV2PackageMaintainerControllerApiAxiosParamCreator(
            configuration
          ).createPackageMaintainer(body, options)
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
      async deletePackageMaintainer(
        id: number,
        options?: AxiosRequestConfig
      ): Promise<
        (
          axios?: AxiosInstance,
          basePath?: string
        ) => Promise<AxiosResponse<void>>
      > {
        const localVarAxiosArgs =
          await ApiV2PackageMaintainerControllerApiAxiosParamCreator(
            configuration
          ).deletePackageMaintainer(id, options)
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
       * @param {boolean} [deleted]
       * @param {Array<string>} [technology]
       * @param {Array<string>} [repository]
       * @param {string} [search]
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      async getAllPackageMaintainers(
        page?: number,
        size?: number,
        sort?: Array<string>,
        deleted?: boolean,
        technology?: Array<string>,
        repository?: Array<string>,
        search?: string,
        options?: AxiosRequestConfig
      ): Promise<
        (
          axios?: AxiosInstance,
          basePath?: string
        ) => Promise<
          AxiosResponse<ResponseDtoPagedModelEntityModelPackageMaintainerDto>
        >
      > {
        const localVarAxiosArgs =
          await ApiV2PackageMaintainerControllerApiAxiosParamCreator(
            configuration
          ).getAllPackageMaintainers(
            page,
            size,
            sort,
            deleted,
            technology,
            repository,
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
      async getPackageMaintainerById(
        id: number,
        options?: AxiosRequestConfig
      ): Promise<
        (
          axios?: AxiosInstance,
          basePath?: string
        ) => Promise<
          AxiosResponse<ResponseDtoEntityModelPackageMaintainerDto>
        >
      > {
        const localVarAxiosArgs =
          await ApiV2PackageMaintainerControllerApiAxiosParamCreator(
            configuration
          ).getPackageMaintainerById(id, options)
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
      async updatePackageMaintainer(
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
          await ApiV2PackageMaintainerControllerApiAxiosParamCreator(
            configuration
          ).updatePackageMaintainer(body, id, options)
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
 * ApiV2PackageMaintainerControllerApi - factory interface
 * @export
 */
export const ApiV2PackageMaintainerControllerApiFactory =
  function (
    configuration?: Configuration,
    basePath?: string,
    axios?: AxiosInstance
  ) {
    return {
      /**
       *
       * @param {PackageMaintainerDto} body
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      async createPackageMaintainer(
        body: PackageMaintainerDto,
        options?: AxiosRequestConfig
      ): Promise<AxiosResponse<any>> {
        return ApiV2PackageMaintainerControllerApiFp(
          configuration
        )
          .createPackageMaintainer(body, options)
          .then((request) => request(axios, basePath))
      },
      /**
       *
       * @param {number} id
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      async deletePackageMaintainer(
        id: number,
        options?: AxiosRequestConfig
      ): Promise<AxiosResponse<void>> {
        return ApiV2PackageMaintainerControllerApiFp(
          configuration
        )
          .deletePackageMaintainer(id, options)
          .then((request) => request(axios, basePath))
      },
      /**
       *
       * @param {number} [page] Zero-based page index (0..N)
       * @param {number} [size] The size of the page to be returned
       * @param {Array<string>} [sort] Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
       * @param {boolean} [deleted]
       * @param {Array<string>} [technology]
       * @param {Array<string>} [repository]
       * @param {string} [search]
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      async getAllPackageMaintainers(
        page?: number,
        size?: number,
        sort?: Array<string>,
        deleted?: boolean,
        technology?: Array<string>,
        repository?: Array<string>,
        search?: string,
        options?: AxiosRequestConfig
      ): Promise<
        AxiosResponse<ResponseDtoPagedModelEntityModelPackageMaintainerDto>
      > {
        return ApiV2PackageMaintainerControllerApiFp(
          configuration
        )
          .getAllPackageMaintainers(
            page,
            size,
            sort,
            deleted,
            technology,
            repository,
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
      async getPackageMaintainerById(
        id: number,
        options?: AxiosRequestConfig
      ): Promise<
        AxiosResponse<ResponseDtoEntityModelPackageMaintainerDto>
      > {
        return ApiV2PackageMaintainerControllerApiFp(
          configuration
        )
          .getPackageMaintainerById(id, options)
          .then((request) => request(axios, basePath))
      },
      /**
       *
       * @param {JsonPatch} body
       * @param {number} id
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      async updatePackageMaintainer(
        body: JsonPatch,
        id: number,
        options?: AxiosRequestConfig
      ): Promise<AxiosResponse<any>> {
        return ApiV2PackageMaintainerControllerApiFp(
          configuration
        )
          .updatePackageMaintainer(body, id, options)
          .then((request) => request(axios, basePath))
      }
    }
  }

/**
 * ApiV2PackageMaintainerControllerApi - object-oriented interface
 * @export
 * @class ApiV2PackageMaintainerControllerApi
 * @extends {BaseAPI}
 */
export class ApiV2PackageMaintainerControllerApi extends BaseAPI {
  /**
   *
   * @param {PackageMaintainerDto} body
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ApiV2PackageMaintainerControllerApi
   */
  public async createPackageMaintainer(
    body: PackageMaintainerDto,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<any>> {
    return ApiV2PackageMaintainerControllerApiFp(
      this.configuration
    )
      .createPackageMaintainer(body, options)
      .then((request) => request(this.axios, this.basePath))
  }
  /**
   *
   * @param {number} id
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ApiV2PackageMaintainerControllerApi
   */
  public async deletePackageMaintainer(
    id: number,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<void>> {
    return ApiV2PackageMaintainerControllerApiFp(
      this.configuration
    )
      .deletePackageMaintainer(id, options)
      .then((request) => request(this.axios, this.basePath))
  }
  /**
   *
   * @param {number} [page] Zero-based page index (0..N)
   * @param {number} [size] The size of the page to be returned
   * @param {Array<string>} [sort] Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   * @param {boolean} [deleted]
   * @param {Array<string>} [technology]
   * @param {Array<string>} [repository]
   * @param {string} [search]
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ApiV2PackageMaintainerControllerApi
   */
  public async getAllPackageMaintainers(
    page?: number,
    size?: number,
    sort?: Array<string>,
    deleted?: boolean,
    technology?: Array<string>,
    repository?: Array<string>,
    search?: string,
    options?: AxiosRequestConfig
  ): Promise<
    AxiosResponse<ResponseDtoPagedModelEntityModelPackageMaintainerDto>
  > {
    return ApiV2PackageMaintainerControllerApiFp(
      this.configuration
    )
      .getAllPackageMaintainers(
        page,
        size,
        sort,
        deleted,
        technology,
        repository,
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
   * @memberof ApiV2PackageMaintainerControllerApi
   */
  public async getPackageMaintainerById(
    id: number,
    options?: AxiosRequestConfig
  ): Promise<
    AxiosResponse<ResponseDtoEntityModelPackageMaintainerDto>
  > {
    return ApiV2PackageMaintainerControllerApiFp(
      this.configuration
    )
      .getPackageMaintainerById(id, options)
      .then((request) => request(this.axios, this.basePath))
  }
  /**
   *
   * @param {JsonPatch} body
   * @param {number} id
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ApiV2PackageMaintainerControllerApi
   */
  public async updatePackageMaintainer(
    body: JsonPatch,
    id: number,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<any>> {
    return ApiV2PackageMaintainerControllerApiFp(
      this.configuration
    )
      .updatePackageMaintainer(body, id, options)
      .then((request) => request(this.axios, this.basePath))
  }
}
