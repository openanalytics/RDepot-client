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
import { ResponseDtoEntityModelRepositoryDto } from '../models'
import { ResponseDtoPagedModelEntityModelRepositoryDto } from '../models'
/**
 * ApiV2RepositoryControllerApi - axios parameter creator
 * @export
 */
export const ApiV2RepositoryControllerApiAxiosParamCreator =
  function (configuration?: Configuration) {
    return {
      /**
       *
       * @param {number} [page] Zero-based page index (0..N)
       * @param {number} [size] The size of the page to be returned
       * @param {Array<string>} [sort] Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
       * @param {boolean} [deleted]
       * @param {Array<string>} [technology]
       * @param {boolean} [published]
       * @param {Array<string>} [maintainer]
       * @param {string} [name]
       * @param {string} [search]
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      getAllRepositories: async (
        page?: number,
        size?: number,
        sort?: Array<string>,
        deleted?: boolean,
        technology?: Array<string>,
        published?: boolean,
        maintainer?: Array<string>,
        name?: string,
        search?: string,
        options: AxiosRequestConfig = {}
      ): Promise<RequestArgs> => {
        const localVarPath = `/api/v2/manager/repositories`
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

        if (published !== undefined) {
          localVarQueryParameter['published'] = published
        }

        if (maintainer) {
          localVarQueryParameter['maintainer'] = maintainer
        }

        if (name !== undefined) {
          localVarQueryParameter['name'] = name
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
      getRepositoryById: async (
        id: number,
        options: AxiosRequestConfig = {}
      ): Promise<RequestArgs> => {
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
          throw new RequiredError(
            'id',
            'Required parameter id was null or undefined when calling getRepositoryById.'
          )
        }
        const localVarPath =
          `/api/v2/manager/repositories/{id}`.replace(
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
 * ApiV2RepositoryControllerApi - functional programming interface
 * @export
 */
export const ApiV2RepositoryControllerApiFp = function (
  configuration?: Configuration
) {
  return {
    /**
     *
     * @param {number} [page] Zero-based page index (0..N)
     * @param {number} [size] The size of the page to be returned
     * @param {Array<string>} [sort] Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @param {boolean} [deleted]
     * @param {Array<string>} [technology]
     * @param {boolean} [published]
     * @param {Array<string>} [maintainer]
     * @param {string} [name]
     * @param {string} [search]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async getAllRepositories(
      page?: number,
      size?: number,
      sort?: Array<string>,
      deleted?: boolean,
      technology?: Array<string>,
      published?: boolean,
      maintainer?: Array<string>,
      name?: string,
      search?: string,
      options?: AxiosRequestConfig
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => Promise<
        AxiosResponse<ResponseDtoPagedModelEntityModelRepositoryDto>
      >
    > {
      const localVarAxiosArgs =
        await ApiV2RepositoryControllerApiAxiosParamCreator(
          configuration
        ).getAllRepositories(
          page,
          size,
          sort,
          deleted,
          technology,
          published,
          maintainer,
          name,
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
    async getRepositoryById(
      id: number,
      options?: AxiosRequestConfig
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => Promise<
        AxiosResponse<ResponseDtoEntityModelRepositoryDto>
      >
    > {
      const localVarAxiosArgs =
        await ApiV2RepositoryControllerApiAxiosParamCreator(
          configuration
        ).getRepositoryById(id, options)
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
 * ApiV2RepositoryControllerApi - factory interface
 * @export
 */
export const ApiV2RepositoryControllerApiFactory =
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
       * @param {boolean} [deleted]
       * @param {Array<string>} [technology]
       * @param {boolean} [published]
       * @param {Array<string>} [maintainer]
       * @param {string} [name]
       * @param {string} [search]
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      async getAllRepositories(
        page?: number,
        size?: number,
        sort?: Array<string>,
        deleted?: boolean,
        technology?: Array<string>,
        published?: boolean,
        maintainer?: Array<string>,
        name?: string,
        search?: string,
        options?: AxiosRequestConfig
      ): Promise<
        AxiosResponse<ResponseDtoPagedModelEntityModelRepositoryDto>
      > {
        return ApiV2RepositoryControllerApiFp(configuration)
          .getAllRepositories(
            page,
            size,
            sort,
            deleted,
            technology,
            published,
            maintainer,
            name,
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
      async getRepositoryById(
        id: number,
        options?: AxiosRequestConfig
      ): Promise<
        AxiosResponse<ResponseDtoEntityModelRepositoryDto>
      > {
        return ApiV2RepositoryControllerApiFp(configuration)
          .getRepositoryById(id, options)
          .then((request) => request(axios, basePath))
      }
    }
  }

/**
 * ApiV2RepositoryControllerApi - object-oriented interface
 * @export
 * @class ApiV2RepositoryControllerApi
 * @extends {BaseAPI}
 */
export class ApiV2RepositoryControllerApi extends BaseAPI {
  /**
   *
   * @param {number} [page] Zero-based page index (0..N)
   * @param {number} [size] The size of the page to be returned
   * @param {Array<string>} [sort] Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   * @param {boolean} [deleted]
   * @param {Array<string>} [technology]
   * @param {boolean} [published]
   * @param {Array<string>} [maintainer]
   * @param {string} [name]
   * @param {string} [search]
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ApiV2RepositoryControllerApi
   */
  public async getAllRepositories(
    page?: number,
    size?: number,
    sort?: Array<string>,
    deleted?: boolean,
    technology?: Array<string>,
    published?: boolean,
    maintainer?: Array<string>,
    name?: string,
    search?: string,
    options?: AxiosRequestConfig
  ): Promise<
    AxiosResponse<ResponseDtoPagedModelEntityModelRepositoryDto>
  > {
    return ApiV2RepositoryControllerApiFp(
      this.configuration
    )
      .getAllRepositories(
        page,
        size,
        sort,
        deleted,
        technology,
        published,
        maintainer,
        name,
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
   * @memberof ApiV2RepositoryControllerApi
   */
  public async getRepositoryById(
    id: number,
    options?: AxiosRequestConfig
  ): Promise<
    AxiosResponse<ResponseDtoEntityModelRepositoryDto>
  > {
    return ApiV2RepositoryControllerApiFp(
      this.configuration
    )
      .getRepositoryById(id, options)
      .then((request) => request(this.axios, this.basePath))
  }
}
