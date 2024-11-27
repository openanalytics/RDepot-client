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
import { CreateAccessTokenDto } from '../models'
import { JsonPatch } from '../models'
import { ResponseDtoEntityModelAccessTokenDto } from '../models'
import { ResponseDtoPagedModelEntityModelAccessTokenDto } from '../models'
/**
 * ApiV2AccessTokenControllerApi - axios parameter creator
 * @export
 */
export const ApiV2AccessTokenControllerApiAxiosParamCreator =
  function (configuration?: Configuration) {
    return {
      /**
       *
       * @param {CreateAccessTokenDto} body
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      createAccessToken: async (
        body: CreateAccessTokenDto,
        options: AxiosRequestConfig = {}
      ): Promise<RequestArgs> => {
        // verify required parameter 'body' is not null or undefined
        if (body === null || body === undefined) {
          throw new RequiredError(
            'body',
            'Required parameter body was null or undefined when calling createAccessToken.'
          )
        }
        const localVarPath = `/api/v2/manager/access-tokens`
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
      deleteAccessToken: async (
        id: number,
        options: AxiosRequestConfig = {}
      ): Promise<RequestArgs> => {
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
          throw new RequiredError(
            'id',
            'Required parameter id was null or undefined when calling deleteAccessToken.'
          )
        }
        const localVarPath =
          `/api/v2/manager/access-tokens/{id}`.replace(
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
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      getAccessTokenById: async (
        id: number,
        options: AxiosRequestConfig = {}
      ): Promise<RequestArgs> => {
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
          throw new RequiredError(
            'id',
            'Required parameter id was null or undefined when calling getAccessTokenById.'
          )
        }
        const localVarPath =
          `/api/v2/manager/access-tokens/{id}`.replace(
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
       * @param {string} [search]
       * @param {Array<string>} [userLogin]
       * @param {boolean} [active]
       * @param {boolean} [expired]
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      getAllAccessTokens: async (
        page?: number,
        size?: number,
        sort?: Array<string>,
        search?: string,
        userLogin?: Array<string>,
        active?: boolean,
        expired?: boolean,
        options: AxiosRequestConfig = {}
      ): Promise<RequestArgs> => {
        const localVarPath = `/api/v2/manager/access-tokens`
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

        if (search !== undefined) {
          localVarQueryParameter['search'] = search
        }

        if (userLogin) {
          localVarQueryParameter['userLogin'] = userLogin
        }

        if (active !== undefined) {
          localVarQueryParameter['active'] = active
        }

        if (expired !== undefined) {
          localVarQueryParameter['expired'] = expired
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
      patchAccessToken: async (
        body: JsonPatch,
        id: number,
        options: AxiosRequestConfig = {}
      ): Promise<RequestArgs> => {
        // verify required parameter 'body' is not null or undefined
        if (body === null || body === undefined) {
          throw new RequiredError(
            'body',
            'Required parameter body was null or undefined when calling patchAccessToken.'
          )
        }
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
          throw new RequiredError(
            'id',
            'Required parameter id was null or undefined when calling patchAccessToken.'
          )
        }
        const localVarPath =
          `/api/v2/manager/access-tokens/{id}`.replace(
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
 * ApiV2AccessTokenControllerApi - functional programming interface
 * @export
 */
export const ApiV2AccessTokenControllerApiFp = function (
  configuration?: Configuration
) {
  return {
    /**
     *
     * @param {CreateAccessTokenDto} body
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async createAccessToken(
      body: CreateAccessTokenDto,
      options?: AxiosRequestConfig
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => Promise<AxiosResponse<any>>
    > {
      const localVarAxiosArgs =
        await ApiV2AccessTokenControllerApiAxiosParamCreator(
          configuration
        ).createAccessToken(body, options)
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
    async deleteAccessToken(
      id: number,
      options?: AxiosRequestConfig
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => Promise<AxiosResponse<void>>
    > {
      const localVarAxiosArgs =
        await ApiV2AccessTokenControllerApiAxiosParamCreator(
          configuration
        ).deleteAccessToken(id, options)
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
    async getAccessTokenById(
      id: number,
      options?: AxiosRequestConfig
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => Promise<
        AxiosResponse<ResponseDtoEntityModelAccessTokenDto>
      >
    > {
      const localVarAxiosArgs =
        await ApiV2AccessTokenControllerApiAxiosParamCreator(
          configuration
        ).getAccessTokenById(id, options)
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
     * @param {string} [search]
     * @param {Array<string>} [userLogin]
     * @param {boolean} [active]
     * @param {boolean} [expired]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async getAllAccessTokens(
      page?: number,
      size?: number,
      sort?: Array<string>,
      search?: string,
      userLogin?: Array<string>,
      active?: boolean,
      expired?: boolean,
      options?: AxiosRequestConfig
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => Promise<
        AxiosResponse<ResponseDtoPagedModelEntityModelAccessTokenDto>
      >
    > {
      const localVarAxiosArgs =
        await ApiV2AccessTokenControllerApiAxiosParamCreator(
          configuration
        ).getAllAccessTokens(
          page,
          size,
          sort,
          search,
          userLogin,
          active,
          expired,
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
    async patchAccessToken(
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
        await ApiV2AccessTokenControllerApiAxiosParamCreator(
          configuration
        ).patchAccessToken(body, id, options)
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
 * ApiV2AccessTokenControllerApi - factory interface
 * @export
 */
export const ApiV2AccessTokenControllerApiFactory =
  function (
    configuration?: Configuration,
    basePath?: string,
    axios?: AxiosInstance
  ) {
    return {
      /**
       *
       * @param {CreateAccessTokenDto} body
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      async createAccessToken(
        body: CreateAccessTokenDto,
        options?: AxiosRequestConfig
      ): Promise<AxiosResponse<any>> {
        return ApiV2AccessTokenControllerApiFp(
          configuration
        )
          .createAccessToken(body, options)
          .then((request) => request(axios, basePath))
      },
      /**
       *
       * @param {number} id
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      async deleteAccessToken(
        id: number,
        options?: AxiosRequestConfig
      ): Promise<AxiosResponse<void>> {
        return ApiV2AccessTokenControllerApiFp(
          configuration
        )
          .deleteAccessToken(id, options)
          .then((request) => request(axios, basePath))
      },
      /**
       *
       * @param {number} id
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      async getAccessTokenById(
        id: number,
        options?: AxiosRequestConfig
      ): Promise<
        AxiosResponse<ResponseDtoEntityModelAccessTokenDto>
      > {
        return ApiV2AccessTokenControllerApiFp(
          configuration
        )
          .getAccessTokenById(id, options)
          .then((request) => request(axios, basePath))
      },
      /**
       *
       * @param {number} [page] Zero-based page index (0..N)
       * @param {number} [size] The size of the page to be returned
       * @param {Array<string>} [sort] Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
       * @param {string} [search]
       * @param {Array<string>} [userLogin]
       * @param {boolean} [active]
       * @param {boolean} [expired]
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      async getAllAccessTokens(
        page?: number,
        size?: number,
        sort?: Array<string>,
        search?: string,
        userLogin?: Array<string>,
        active?: boolean,
        expired?: boolean,
        options?: AxiosRequestConfig
      ): Promise<
        AxiosResponse<ResponseDtoPagedModelEntityModelAccessTokenDto>
      > {
        return ApiV2AccessTokenControllerApiFp(
          configuration
        )
          .getAllAccessTokens(
            page,
            size,
            sort,
            search,
            userLogin,
            active,
            expired,
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
      async patchAccessToken(
        body: JsonPatch,
        id: number,
        options?: AxiosRequestConfig
      ): Promise<AxiosResponse<any>> {
        return ApiV2AccessTokenControllerApiFp(
          configuration
        )
          .patchAccessToken(body, id, options)
          .then((request) => request(axios, basePath))
      }
    }
  }

/**
 * ApiV2AccessTokenControllerApi - object-oriented interface
 * @export
 * @class ApiV2AccessTokenControllerApi
 * @extends {BaseAPI}
 */
export class ApiV2AccessTokenControllerApi extends BaseAPI {
  /**
   *
   * @param {CreateAccessTokenDto} body
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ApiV2AccessTokenControllerApi
   */
  public async createAccessToken(
    body: CreateAccessTokenDto,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<any>> {
    return ApiV2AccessTokenControllerApiFp(
      this.configuration
    )
      .createAccessToken(body, options)
      .then((request) => request(this.axios, this.basePath))
  }
  /**
   *
   * @param {number} id
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ApiV2AccessTokenControllerApi
   */
  public async deleteAccessToken(
    id: number,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<void>> {
    return ApiV2AccessTokenControllerApiFp(
      this.configuration
    )
      .deleteAccessToken(id, options)
      .then((request) => request(this.axios, this.basePath))
  }
  /**
   *
   * @param {number} id
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ApiV2AccessTokenControllerApi
   */
  public async getAccessTokenById(
    id: number,
    options?: AxiosRequestConfig
  ): Promise<
    AxiosResponse<ResponseDtoEntityModelAccessTokenDto>
  > {
    return ApiV2AccessTokenControllerApiFp(
      this.configuration
    )
      .getAccessTokenById(id, options)
      .then((request) => request(this.axios, this.basePath))
  }
  /**
   *
   * @param {number} [page] Zero-based page index (0..N)
   * @param {number} [size] The size of the page to be returned
   * @param {Array<string>} [sort] Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   * @param {string} [search]
   * @param {Array<string>} [userLogin]
   * @param {boolean} [active]
   * @param {boolean} [expired]
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ApiV2AccessTokenControllerApi
   */
  public async getAllAccessTokens(
    page?: number,
    size?: number,
    sort?: Array<string>,
    search?: string,
    userLogin?: Array<string>,
    active?: boolean,
    expired?: boolean,
    options?: AxiosRequestConfig
  ): Promise<
    AxiosResponse<ResponseDtoPagedModelEntityModelAccessTokenDto>
  > {
    return ApiV2AccessTokenControllerApiFp(
      this.configuration
    )
      .getAllAccessTokens(
        page,
        size,
        sort,
        search,
        userLogin,
        active,
        expired,
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
   * @memberof ApiV2AccessTokenControllerApi
   */
  public async patchAccessToken(
    body: JsonPatch,
    id: number,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<any>> {
    return ApiV2AccessTokenControllerApiFp(
      this.configuration
    )
      .patchAccessToken(body, id, options)
      .then((request) => request(this.axios, this.basePath))
  }
}
