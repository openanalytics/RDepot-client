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
import { RepositoryMaintainerDto } from '../models'
import { ResponseDtoEntityModelRepositoryMaintainerDto } from '../models'
import { ResponseDtoPagedModelEntityModelRepositoryMaintainerDto } from '../models'
/**
 * ApiV2RepositoryMaintainerControllerApi - axios parameter creator
 * @export
 */
export const ApiV2RepositoryMaintainerControllerApiAxiosParamCreator =
  function (configuration?: Configuration) {
    return {
      /**
       *
       * @param {RepositoryMaintainerDto} body
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      createRepositoryMaintainer: async (
        body: RepositoryMaintainerDto,
        options: AxiosRequestConfig = {}
      ): Promise<RequestArgs> => {
        // verify required parameter 'body' is not null or undefined
        if (body === null || body === undefined) {
          throw new RequiredError(
            'body',
            'Required parameter body was null or undefined when calling createRepositoryMaintainer.'
          )
        }
        const localVarPath = `/api/v2/manager/repository-maintainers`
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
      deleteRepositoryMaintainer: async (
        id: number,
        options: AxiosRequestConfig = {}
      ): Promise<RequestArgs> => {
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
          throw new RequiredError(
            'id',
            'Required parameter id was null or undefined when calling deleteRepositoryMaintainer.'
          )
        }
        const localVarPath =
          `/api/v2/manager/repository-maintainers/{id}`.replace(
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
       * @param {Array<string>} [resourceTechnology]
       * @param {string} [search]
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      getAllRepositoryMaintainers: async (
        page?: number,
        size?: number,
        sort?: Array<string>,
        deleted?: boolean,
        resourceTechnology?: Array<string>,
        search?: string,
        options: AxiosRequestConfig = {}
      ): Promise<RequestArgs> => {
        const localVarPath = `/api/v2/manager/repository-maintainers`
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

        if (resourceTechnology) {
          localVarQueryParameter['resourceTechnology'] =
            resourceTechnology
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
      getRepositoryMaintainersById: async (
        id: number,
        options: AxiosRequestConfig = {}
      ): Promise<RequestArgs> => {
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
          throw new RequiredError(
            'id',
            'Required parameter id was null or undefined when calling getRepositoryMaintainersById.'
          )
        }
        const localVarPath =
          `/api/v2/manager/repository-maintainers/{id}`.replace(
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
      updateRepositoryMaintainer: async (
        body: JsonPatch,
        id: number,
        options: AxiosRequestConfig = {}
      ): Promise<RequestArgs> => {
        // verify required parameter 'body' is not null or undefined
        if (body === null || body === undefined) {
          throw new RequiredError(
            'body',
            'Required parameter body was null or undefined when calling updateRepositoryMaintainer.'
          )
        }
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
          throw new RequiredError(
            'id',
            'Required parameter id was null or undefined when calling updateRepositoryMaintainer.'
          )
        }
        const localVarPath =
          `/api/v2/manager/repository-maintainers/{id}`.replace(
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
 * ApiV2RepositoryMaintainerControllerApi - functional programming interface
 * @export
 */
export const ApiV2RepositoryMaintainerControllerApiFp =
  function (configuration?: Configuration) {
    return {
      /**
       *
       * @param {RepositoryMaintainerDto} body
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      async createRepositoryMaintainer(
        body: RepositoryMaintainerDto,
        options?: AxiosRequestConfig
      ): Promise<
        (
          axios?: AxiosInstance,
          basePath?: string
        ) => Promise<AxiosResponse<any>>
      > {
        const localVarAxiosArgs =
          await ApiV2RepositoryMaintainerControllerApiAxiosParamCreator(
            configuration
          ).createRepositoryMaintainer(body, options)
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
      async deleteRepositoryMaintainer(
        id: number,
        options?: AxiosRequestConfig
      ): Promise<
        (
          axios?: AxiosInstance,
          basePath?: string
        ) => Promise<AxiosResponse<void>>
      > {
        const localVarAxiosArgs =
          await ApiV2RepositoryMaintainerControllerApiAxiosParamCreator(
            configuration
          ).deleteRepositoryMaintainer(id, options)
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
       * @param {Array<string>} [resourceTechnology]
       * @param {string} [search]
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      async getAllRepositoryMaintainers(
        page?: number,
        size?: number,
        sort?: Array<string>,
        deleted?: boolean,
        resourceTechnology?: Array<string>,
        search?: string,
        options?: AxiosRequestConfig
      ): Promise<
        (
          axios?: AxiosInstance,
          basePath?: string
        ) => Promise<
          AxiosResponse<ResponseDtoPagedModelEntityModelRepositoryMaintainerDto>
        >
      > {
        const localVarAxiosArgs =
          await ApiV2RepositoryMaintainerControllerApiAxiosParamCreator(
            configuration
          ).getAllRepositoryMaintainers(
            page,
            size,
            sort,
            deleted,
            resourceTechnology,
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
      async getRepositoryMaintainersById(
        id: number,
        options?: AxiosRequestConfig
      ): Promise<
        (
          axios?: AxiosInstance,
          basePath?: string
        ) => Promise<
          AxiosResponse<ResponseDtoEntityModelRepositoryMaintainerDto>
        >
      > {
        const localVarAxiosArgs =
          await ApiV2RepositoryMaintainerControllerApiAxiosParamCreator(
            configuration
          ).getRepositoryMaintainersById(id, options)
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
      async updateRepositoryMaintainer(
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
          await ApiV2RepositoryMaintainerControllerApiAxiosParamCreator(
            configuration
          ).updateRepositoryMaintainer(body, id, options)
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
 * ApiV2RepositoryMaintainerControllerApi - factory interface
 * @export
 */
export const ApiV2RepositoryMaintainerControllerApiFactory =
  function (
    configuration?: Configuration,
    basePath?: string,
    axios?: AxiosInstance
  ) {
    return {
      /**
       *
       * @param {RepositoryMaintainerDto} body
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      async createRepositoryMaintainer(
        body: RepositoryMaintainerDto,
        options?: AxiosRequestConfig
      ): Promise<AxiosResponse<any>> {
        return ApiV2RepositoryMaintainerControllerApiFp(
          configuration
        )
          .createRepositoryMaintainer(body, options)
          .then((request) => request(axios, basePath))
      },
      /**
       *
       * @param {number} id
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      async deleteRepositoryMaintainer(
        id: number,
        options?: AxiosRequestConfig
      ): Promise<AxiosResponse<void>> {
        return ApiV2RepositoryMaintainerControllerApiFp(
          configuration
        )
          .deleteRepositoryMaintainer(id, options)
          .then((request) => request(axios, basePath))
      },
      /**
       *
       * @param {number} [page] Zero-based page index (0..N)
       * @param {number} [size] The size of the page to be returned
       * @param {Array<string>} [sort] Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
       * @param {boolean} [deleted]
       * @param {Array<string>} [resourceTechnology]
       * @param {string} [search]
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      async getAllRepositoryMaintainers(
        page?: number,
        size?: number,
        sort?: Array<string>,
        deleted?: boolean,
        resourceTechnology?: Array<string>,
        search?: string,
        options?: AxiosRequestConfig
      ): Promise<
        AxiosResponse<ResponseDtoPagedModelEntityModelRepositoryMaintainerDto>
      > {
        return ApiV2RepositoryMaintainerControllerApiFp(
          configuration
        )
          .getAllRepositoryMaintainers(
            page,
            size,
            sort,
            deleted,
            resourceTechnology,
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
      async getRepositoryMaintainersById(
        id: number,
        options?: AxiosRequestConfig
      ): Promise<
        AxiosResponse<ResponseDtoEntityModelRepositoryMaintainerDto>
      > {
        return ApiV2RepositoryMaintainerControllerApiFp(
          configuration
        )
          .getRepositoryMaintainersById(id, options)
          .then((request) => request(axios, basePath))
      },
      /**
       *
       * @param {JsonPatch} body
       * @param {number} id
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      async updateRepositoryMaintainer(
        body: JsonPatch,
        id: number,
        options?: AxiosRequestConfig
      ): Promise<AxiosResponse<any>> {
        return ApiV2RepositoryMaintainerControllerApiFp(
          configuration
        )
          .updateRepositoryMaintainer(body, id, options)
          .then((request) => request(axios, basePath))
      }
    }
  }

/**
 * ApiV2RepositoryMaintainerControllerApi - object-oriented interface
 * @export
 * @class ApiV2RepositoryMaintainerControllerApi
 * @extends {BaseAPI}
 */
export class ApiV2RepositoryMaintainerControllerApi extends BaseAPI {
  /**
   *
   * @param {RepositoryMaintainerDto} body
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ApiV2RepositoryMaintainerControllerApi
   */
  public async createRepositoryMaintainer(
    body: RepositoryMaintainerDto,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<any>> {
    return ApiV2RepositoryMaintainerControllerApiFp(
      this.configuration
    )
      .createRepositoryMaintainer(body, options)
      .then((request) => request(this.axios, this.basePath))
  }
  /**
   *
   * @param {number} id
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ApiV2RepositoryMaintainerControllerApi
   */
  public async deleteRepositoryMaintainer(
    id: number,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<void>> {
    return ApiV2RepositoryMaintainerControllerApiFp(
      this.configuration
    )
      .deleteRepositoryMaintainer(id, options)
      .then((request) => request(this.axios, this.basePath))
  }
  /**
   *
   * @param {number} [page] Zero-based page index (0..N)
   * @param {number} [size] The size of the page to be returned
   * @param {Array<string>} [sort] Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   * @param {boolean} [deleted]
   * @param {Array<string>} [resourceTechnology]
   * @param {string} [search]
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ApiV2RepositoryMaintainerControllerApi
   */
  public async getAllRepositoryMaintainers(
    page?: number,
    size?: number,
    sort?: Array<string>,
    deleted?: boolean,
    resourceTechnology?: Array<string>,
    search?: string,
    options?: AxiosRequestConfig
  ): Promise<
    AxiosResponse<ResponseDtoPagedModelEntityModelRepositoryMaintainerDto>
  > {
    return ApiV2RepositoryMaintainerControllerApiFp(
      this.configuration
    )
      .getAllRepositoryMaintainers(
        page,
        size,
        sort,
        deleted,
        resourceTechnology,
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
   * @memberof ApiV2RepositoryMaintainerControllerApi
   */
  public async getRepositoryMaintainersById(
    id: number,
    options?: AxiosRequestConfig
  ): Promise<
    AxiosResponse<ResponseDtoEntityModelRepositoryMaintainerDto>
  > {
    return ApiV2RepositoryMaintainerControllerApiFp(
      this.configuration
    )
      .getRepositoryMaintainersById(id, options)
      .then((request) => request(this.axios, this.basePath))
  }
  /**
   *
   * @param {JsonPatch} body
   * @param {number} id
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ApiV2RepositoryMaintainerControllerApi
   */
  public async updateRepositoryMaintainer(
    body: JsonPatch,
    id: number,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<any>> {
    return ApiV2RepositoryMaintainerControllerApiFp(
      this.configuration
    )
      .updateRepositoryMaintainer(body, id, options)
      .then((request) => request(this.axios, this.basePath))
  }
}
