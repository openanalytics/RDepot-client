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
/**
 * ApiV2UserSettingsControllerApi - axios parameter creator
 * @export
 */
export const ApiV2UserSettingsControllerApiAxiosParamCreator =
  function (configuration?: Configuration) {
    return {
      /**
       *
       * @param {number} userId
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      getUserSettingsByUserId: async (
        userId: number,
        options: AxiosRequestConfig = {}
      ): Promise<RequestArgs> => {
        // verify required parameter 'userId' is not null or undefined
        if (userId === null || userId === undefined) {
          throw new RequiredError(
            'userId',
            'Required parameter userId was null or undefined when calling getUserSettingsByUserId.'
          )
        }
        const localVarPath =
          `/api/v2/manager/user-settings/{userId}`.replace(
            `{${'userId'}}`,
            encodeURIComponent(String(userId))
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
       * @param {number} userId
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      patchUserSettingsByUserId: async (
        body: JsonPatch,
        userId: number,
        options: AxiosRequestConfig = {}
      ): Promise<RequestArgs> => {
        // verify required parameter 'body' is not null or undefined
        if (body === null || body === undefined) {
          throw new RequiredError(
            'body',
            'Required parameter body was null or undefined when calling patchUserSettingsByUserId.'
          )
        }
        // verify required parameter 'userId' is not null or undefined
        if (userId === null || userId === undefined) {
          throw new RequiredError(
            'userId',
            'Required parameter userId was null or undefined when calling patchUserSettingsByUserId.'
          )
        }
        const localVarPath =
          `/api/v2/manager/user-settings/{userId}`.replace(
            `{${'userId'}}`,
            encodeURIComponent(String(userId))
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
 * ApiV2UserSettingsControllerApi - functional programming interface
 * @export
 */
export const ApiV2UserSettingsControllerApiFp = function (
  configuration?: Configuration
) {
  return {
    /**
     *
     * @param {number} userId
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async getUserSettingsByUserId(
      userId: number,
      options?: AxiosRequestConfig
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => Promise<AxiosResponse<any>>
    > {
      const localVarAxiosArgs =
        await ApiV2UserSettingsControllerApiAxiosParamCreator(
          configuration
        ).getUserSettingsByUserId(userId, options)
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
     * @param {number} userId
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async patchUserSettingsByUserId(
      body: JsonPatch,
      userId: number,
      options?: AxiosRequestConfig
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => Promise<AxiosResponse<any>>
    > {
      const localVarAxiosArgs =
        await ApiV2UserSettingsControllerApiAxiosParamCreator(
          configuration
        ).patchUserSettingsByUserId(body, userId, options)
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
 * ApiV2UserSettingsControllerApi - factory interface
 * @export
 */
export const ApiV2UserSettingsControllerApiFactory =
  function (
    configuration?: Configuration,
    basePath?: string,
    axios?: AxiosInstance
  ) {
    return {
      /**
       *
       * @param {number} userId
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      async getUserSettingsByUserId(
        userId: number,
        options?: AxiosRequestConfig
      ): Promise<AxiosResponse<any>> {
        return ApiV2UserSettingsControllerApiFp(
          configuration
        )
          .getUserSettingsByUserId(userId, options)
          .then((request) => request(axios, basePath))
      },
      /**
       *
       * @param {JsonPatch} body
       * @param {number} userId
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      async patchUserSettingsByUserId(
        body: JsonPatch,
        userId: number,
        options?: AxiosRequestConfig
      ): Promise<AxiosResponse<any>> {
        return ApiV2UserSettingsControllerApiFp(
          configuration
        )
          .patchUserSettingsByUserId(body, userId, options)
          .then((request) => request(axios, basePath))
      }
    }
  }

/**
 * ApiV2UserSettingsControllerApi - object-oriented interface
 * @export
 * @class ApiV2UserSettingsControllerApi
 * @extends {BaseAPI}
 */
export class ApiV2UserSettingsControllerApi extends BaseAPI {
  /**
   *
   * @param {number} userId
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ApiV2UserSettingsControllerApi
   */
  public async getUserSettingsByUserId(
    userId: number,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<any>> {
    return ApiV2UserSettingsControllerApiFp(
      this.configuration
    )
      .getUserSettingsByUserId(userId, options)
      .then((request) => request(this.axios, this.basePath))
  }
  /**
   *
   * @param {JsonPatch} body
   * @param {number} userId
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ApiV2UserSettingsControllerApi
   */
  public async patchUserSettingsByUserId(
    body: JsonPatch,
    userId: number,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<any>> {
    return ApiV2UserSettingsControllerApiFp(
      this.configuration
    )
      .patchUserSettingsByUserId(body, userId, options)
      .then((request) => request(this.axios, this.basePath))
  }
}
