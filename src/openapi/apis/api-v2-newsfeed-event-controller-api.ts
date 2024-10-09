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
import { ResponseDtoEntityModelNewsfeedEventDto } from '../models'
import { ResponseDtoPagedModelEntityModelNewsfeedEventDto } from '../models'
/**
 * ApiV2NewsfeedEventControllerApi - axios parameter creator
 * @export
 */
export const ApiV2NewsfeedEventControllerApiAxiosParamCreator =
  function (configuration?: Configuration) {
    return {
      /**
       *
       * @param {number} [page] Zero-based page index (0..N)
       * @param {number} [size] The size of the page to be returned
       * @param {Array<string>} [sort] Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
       * @param {Array<string>} [technology]
       * @param {Array<string>} [userName]
       * @param {Array<string>} [packageName]
       * @param {Array<string>} [repositoryName]
       * @param {Array<string>} [eventType]
       * @param {Array<string>} [resourceType]
       * @param {string} [fromDate]
       * @param {string} [toDate]
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      getAllEvents: async (
        page?: number,
        size?: number,
        sort?: Array<string>,
        technology?: Array<string>,
        userName?: Array<string>,
        packageName?: Array<string>,
        repositoryName?: Array<string>,
        eventType?: Array<string>,
        resourceType?: Array<string>,
        fromDate?: string,
        toDate?: string,
        options: AxiosRequestConfig = {}
      ): Promise<RequestArgs> => {
        const localVarPath = `/api/v2/manager/events`
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

        if (technology) {
          localVarQueryParameter['technology'] = technology
        }

        if (userName) {
          localVarQueryParameter['userName'] = userName
        }

        if (packageName) {
          localVarQueryParameter['packageName'] =
            packageName
        }

        if (repositoryName) {
          localVarQueryParameter['repositoryName'] =
            repositoryName
        }

        if (eventType) {
          localVarQueryParameter['eventType'] = eventType
        }

        if (resourceType) {
          localVarQueryParameter['resourceType'] =
            resourceType
        }

        if (fromDate !== undefined) {
          localVarQueryParameter['fromDate'] = fromDate
        }

        if (toDate !== undefined) {
          localVarQueryParameter['toDate'] = toDate
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
      getEvent: async (
        id: number,
        options: AxiosRequestConfig = {}
      ): Promise<RequestArgs> => {
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
          throw new RequiredError(
            'id',
            'Required parameter id was null or undefined when calling getEvent.'
          )
        }
        const localVarPath =
          `/api/v2/manager/events/{id}`.replace(
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
 * ApiV2NewsfeedEventControllerApi - functional programming interface
 * @export
 */
export const ApiV2NewsfeedEventControllerApiFp = function (
  configuration?: Configuration
) {
  return {
    /**
     *
     * @param {number} [page] Zero-based page index (0..N)
     * @param {number} [size] The size of the page to be returned
     * @param {Array<string>} [sort] Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @param {Array<string>} [technology]
     * @param {Array<string>} [userName]
     * @param {Array<string>} [packageName]
     * @param {Array<string>} [repositoryName]
     * @param {Array<string>} [eventType]
     * @param {Array<string>} [resourceType]
     * @param {string} [fromDate]
     * @param {string} [toDate]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async getAllEvents(
      page?: number,
      size?: number,
      sort?: Array<string>,
      technology?: Array<string>,
      userName?: Array<string>,
      packageName?: Array<string>,
      repositoryName?: Array<string>,
      eventType?: Array<string>,
      resourceType?: Array<string>,
      fromDate?: string,
      toDate?: string,
      options?: AxiosRequestConfig
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => Promise<
        AxiosResponse<ResponseDtoPagedModelEntityModelNewsfeedEventDto>
      >
    > {
      const localVarAxiosArgs =
        await ApiV2NewsfeedEventControllerApiAxiosParamCreator(
          configuration
        ).getAllEvents(
          page,
          size,
          sort,
          technology,
          userName,
          packageName,
          repositoryName,
          eventType,
          resourceType,
          fromDate,
          toDate,
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
    async getEvent(
      id: number,
      options?: AxiosRequestConfig
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => Promise<
        AxiosResponse<ResponseDtoEntityModelNewsfeedEventDto>
      >
    > {
      const localVarAxiosArgs =
        await ApiV2NewsfeedEventControllerApiAxiosParamCreator(
          configuration
        ).getEvent(id, options)
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
 * ApiV2NewsfeedEventControllerApi - factory interface
 * @export
 */
export const ApiV2NewsfeedEventControllerApiFactory =
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
       * @param {Array<string>} [technology]
       * @param {Array<string>} [userName]
       * @param {Array<string>} [packageName]
       * @param {Array<string>} [repositoryName]
       * @param {Array<string>} [eventType]
       * @param {Array<string>} [resourceType]
       * @param {string} [fromDate]
       * @param {string} [toDate]
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      async getAllEvents(
        page?: number,
        size?: number,
        sort?: Array<string>,
        technology?: Array<string>,
        userName?: Array<string>,
        packageName?: Array<string>,
        repositoryName?: Array<string>,
        eventType?: Array<string>,
        resourceType?: Array<string>,
        fromDate?: string,
        toDate?: string,
        options?: AxiosRequestConfig
      ): Promise<
        AxiosResponse<ResponseDtoPagedModelEntityModelNewsfeedEventDto>
      > {
        return ApiV2NewsfeedEventControllerApiFp(
          configuration
        )
          .getAllEvents(
            page,
            size,
            sort,
            technology,
            userName,
            packageName,
            repositoryName,
            eventType,
            resourceType,
            fromDate,
            toDate,
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
      async getEvent(
        id: number,
        options?: AxiosRequestConfig
      ): Promise<
        AxiosResponse<ResponseDtoEntityModelNewsfeedEventDto>
      > {
        return ApiV2NewsfeedEventControllerApiFp(
          configuration
        )
          .getEvent(id, options)
          .then((request) => request(axios, basePath))
      }
    }
  }

/**
 * ApiV2NewsfeedEventControllerApi - object-oriented interface
 * @export
 * @class ApiV2NewsfeedEventControllerApi
 * @extends {BaseAPI}
 */
export class ApiV2NewsfeedEventControllerApi extends BaseAPI {
  /**
   *
   * @param {number} [page] Zero-based page index (0..N)
   * @param {number} [size] The size of the page to be returned
   * @param {Array<string>} [sort] Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   * @param {Array<string>} [technology]
   * @param {Array<string>} [userName]
   * @param {Array<string>} [packageName]
   * @param {Array<string>} [repositoryName]
   * @param {Array<string>} [eventType]
   * @param {Array<string>} [resourceType]
   * @param {string} [fromDate]
   * @param {string} [toDate]
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ApiV2NewsfeedEventControllerApi
   */
  public async getAllEvents(
    page?: number,
    size?: number,
    sort?: Array<string>,
    technology?: Array<string>,
    userName?: Array<string>,
    packageName?: Array<string>,
    repositoryName?: Array<string>,
    eventType?: Array<string>,
    resourceType?: Array<string>,
    fromDate?: string,
    toDate?: string,
    options?: AxiosRequestConfig
  ): Promise<
    AxiosResponse<ResponseDtoPagedModelEntityModelNewsfeedEventDto>
  > {
    return ApiV2NewsfeedEventControllerApiFp(
      this.configuration
    )
      .getAllEvents(
        page,
        size,
        sort,
        technology,
        userName,
        packageName,
        repositoryName,
        eventType,
        resourceType,
        fromDate,
        toDate,
        options
      )
      .then((request) => request(this.axios, this.basePath))
  }
  /**
   *
   * @param {number} id
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ApiV2NewsfeedEventControllerApi
   */
  public async getEvent(
    id: number,
    options?: AxiosRequestConfig
  ): Promise<
    AxiosResponse<ResponseDtoEntityModelNewsfeedEventDto>
  > {
    return ApiV2NewsfeedEventControllerApiFp(
      this.configuration
    )
      .getEvent(id, options)
      .then((request) => request(this.axios, this.basePath))
  }
}
