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
import { ResponseDtoCollectionModelRoleDto } from '../models'
import { ResponseDtoEntityModelUserDto } from '../models'
import { ResponseDtoPagedModelEntityModelUserDto } from '../models'
/**
 * ApiV2UserControllerApi - axios parameter creator
 * @export
 */
export const ApiV2UserControllerApiAxiosParamCreator =
  function (configuration?: Configuration) {
    return {
      /**
       *
       * @param {number} [page] Zero-based page index (0..N)
       * @param {number} [size] The size of the page to be returned
       * @param {Array<string>} [sort] Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
       * @param {Array<string>} [role]
       * @param {boolean} [active]
       * @param {boolean} [deleted]
       * @param {string} [search]
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      getAllUsers: async (
        page?: number,
        size?: number,
        sort?: Array<string>,
        role?: Array<string>,
        active?: boolean,
        deleted?: boolean,
        search?: string,
        options: AxiosRequestConfig = {}
      ): Promise<RequestArgs> => {
        const localVarPath = `/api/v2/manager/users`
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

        if (role) {
          localVarQueryParameter['role'] = role
        }

        if (active !== undefined) {
          localVarQueryParameter['active'] = active
        }

        if (deleted !== undefined) {
          localVarQueryParameter['deleted'] = deleted
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
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      getRoles: async (
        options: AxiosRequestConfig = {}
      ): Promise<RequestArgs> => {
        const localVarPath = `/api/v2/manager/users/roles`
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
      getUser: async (
        id: number,
        options: AxiosRequestConfig = {}
      ): Promise<RequestArgs> => {
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
          throw new RequiredError(
            'id',
            'Required parameter id was null or undefined when calling getUser.'
          )
        }
        const localVarPath =
          `/api/v2/manager/users/{id}`.replace(
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
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      getUserInfo: async (
        options: AxiosRequestConfig = {}
      ): Promise<RequestArgs> => {
        const localVarPath = `/api/v2/manager/users/me`
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
      patchUser: async (
        body: JsonPatch,
        id: number,
        options: AxiosRequestConfig = {}
      ): Promise<RequestArgs> => {
        // verify required parameter 'body' is not null or undefined
        if (body === null || body === undefined) {
          throw new RequiredError(
            'body',
            'Required parameter body was null or undefined when calling patchUser.'
          )
        }
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
          throw new RequiredError(
            'id',
            'Required parameter id was null or undefined when calling patchUser.'
          )
        }
        const localVarPath =
          `/api/v2/manager/users/{id}`.replace(
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
 * ApiV2UserControllerApi - functional programming interface
 * @export
 */
export const ApiV2UserControllerApiFp = function (
  configuration?: Configuration
) {
  return {
    /**
     *
     * @param {number} [page] Zero-based page index (0..N)
     * @param {number} [size] The size of the page to be returned
     * @param {Array<string>} [sort] Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @param {Array<string>} [role]
     * @param {boolean} [active]
     * @param {boolean} [deleted]
     * @param {string} [search]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async getAllUsers(
      page?: number,
      size?: number,
      sort?: Array<string>,
      role?: Array<string>,
      active?: boolean,
      deleted?: boolean,
      search?: string,
      options?: AxiosRequestConfig
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => Promise<
        AxiosResponse<ResponseDtoPagedModelEntityModelUserDto>
      >
    > {
      const localVarAxiosArgs =
        await ApiV2UserControllerApiAxiosParamCreator(
          configuration
        ).getAllUsers(
          page,
          size,
          sort,
          role,
          active,
          deleted,
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
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async getRoles(
      options?: AxiosRequestConfig
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => Promise<
        AxiosResponse<ResponseDtoCollectionModelRoleDto>
      >
    > {
      const localVarAxiosArgs =
        await ApiV2UserControllerApiAxiosParamCreator(
          configuration
        ).getRoles(options)
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
    async getUser(
      id: number,
      options?: AxiosRequestConfig
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => Promise<
        AxiosResponse<ResponseDtoEntityModelUserDto>
      >
    > {
      const localVarAxiosArgs =
        await ApiV2UserControllerApiAxiosParamCreator(
          configuration
        ).getUser(id, options)
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
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async getUserInfo(
      options?: AxiosRequestConfig
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => Promise<
        AxiosResponse<ResponseDtoEntityModelUserDto>
      >
    > {
      const localVarAxiosArgs =
        await ApiV2UserControllerApiAxiosParamCreator(
          configuration
        ).getUserInfo(options)
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
    async patchUser(
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
        await ApiV2UserControllerApiAxiosParamCreator(
          configuration
        ).patchUser(body, id, options)
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
 * ApiV2UserControllerApi - factory interface
 * @export
 */
export const ApiV2UserControllerApiFactory = function (
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
     * @param {Array<string>} [role]
     * @param {boolean} [active]
     * @param {boolean} [deleted]
     * @param {string} [search]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async getAllUsers(
      page?: number,
      size?: number,
      sort?: Array<string>,
      role?: Array<string>,
      active?: boolean,
      deleted?: boolean,
      search?: string,
      options?: AxiosRequestConfig
    ): Promise<
      AxiosResponse<ResponseDtoPagedModelEntityModelUserDto>
    > {
      return ApiV2UserControllerApiFp(configuration)
        .getAllUsers(
          page,
          size,
          sort,
          role,
          active,
          deleted,
          search,
          options
        )
        .then((request) => request(axios, basePath))
    },
    /**
     *
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async getRoles(
      options?: AxiosRequestConfig
    ): Promise<
      AxiosResponse<ResponseDtoCollectionModelRoleDto>
    > {
      return ApiV2UserControllerApiFp(configuration)
        .getRoles(options)
        .then((request) => request(axios, basePath))
    },
    /**
     *
     * @param {number} id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async getUser(
      id: number,
      options?: AxiosRequestConfig
    ): Promise<
      AxiosResponse<ResponseDtoEntityModelUserDto>
    > {
      return ApiV2UserControllerApiFp(configuration)
        .getUser(id, options)
        .then((request) => request(axios, basePath))
    },
    /**
     *
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async getUserInfo(
      options?: AxiosRequestConfig
    ): Promise<
      AxiosResponse<ResponseDtoEntityModelUserDto>
    > {
      return ApiV2UserControllerApiFp(configuration)
        .getUserInfo(options)
        .then((request) => request(axios, basePath))
    },
    /**
     *
     * @param {JsonPatch} body
     * @param {number} id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async patchUser(
      body: JsonPatch,
      id: number,
      options?: AxiosRequestConfig
    ): Promise<AxiosResponse<any>> {
      return ApiV2UserControllerApiFp(configuration)
        .patchUser(body, id, options)
        .then((request) => request(axios, basePath))
    }
  }
}

/**
 * ApiV2UserControllerApi - object-oriented interface
 * @export
 * @class ApiV2UserControllerApi
 * @extends {BaseAPI}
 */
export class ApiV2UserControllerApi extends BaseAPI {
  /**
   *
   * @param {number} [page] Zero-based page index (0..N)
   * @param {number} [size] The size of the page to be returned
   * @param {Array<string>} [sort] Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   * @param {Array<string>} [role]
   * @param {boolean} [active]
   * @param {boolean} [deleted]
   * @param {string} [search]
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ApiV2UserControllerApi
   */
  public async getAllUsers(
    page?: number,
    size?: number,
    sort?: Array<string>,
    role?: Array<string>,
    active?: boolean,
    deleted?: boolean,
    search?: string,
    options?: AxiosRequestConfig
  ): Promise<
    AxiosResponse<ResponseDtoPagedModelEntityModelUserDto>
  > {
    return ApiV2UserControllerApiFp(this.configuration)
      .getAllUsers(
        page,
        size,
        sort,
        role,
        active,
        deleted,
        search,
        options
      )
      .then((request) => request(this.axios, this.basePath))
  }
  /**
   *
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ApiV2UserControllerApi
   */
  public async getRoles(
    options?: AxiosRequestConfig
  ): Promise<
    AxiosResponse<ResponseDtoCollectionModelRoleDto>
  > {
    return ApiV2UserControllerApiFp(this.configuration)
      .getRoles(options)
      .then((request) => request(this.axios, this.basePath))
  }
  /**
   *
   * @param {number} id
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ApiV2UserControllerApi
   */
  public async getUser(
    id: number,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<ResponseDtoEntityModelUserDto>> {
    return ApiV2UserControllerApiFp(this.configuration)
      .getUser(id, options)
      .then((request) => request(this.axios, this.basePath))
  }
  /**
   *
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ApiV2UserControllerApi
   */
  public async getUserInfo(
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<ResponseDtoEntityModelUserDto>> {
    return ApiV2UserControllerApiFp(this.configuration)
      .getUserInfo(options)
      .then((request) => request(this.axios, this.basePath))
  }
  /**
   *
   * @param {JsonPatch} body
   * @param {number} id
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ApiV2UserControllerApi
   */
  public async patchUser(
    body: JsonPatch,
    id: number,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<any>> {
    return ApiV2UserControllerApiFp(this.configuration)
      .patchUser(body, id, options)
      .then((request) => request(this.axios, this.basePath))
  }
}
