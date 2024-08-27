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
import { ResponseDtoEntityModelRPackageDto } from '../models'
import { ResponseDtoListVignette } from '../models'
import { ResponseDtoObject } from '../models'
/**
 * RPackageControllerApi - axios parameter creator
 * @export
 */
export const RPackageControllerApiAxiosParamCreator =
  function (configuration?: Configuration) {
    return {
      /**
       *
       * @param {number} id
       * @param {string} name
       * @param {string} version
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      downloadRPackage: async (
        id: number,
        name: string,
        version: string,
        options: AxiosRequestConfig = {}
      ): Promise<RequestArgs> => {
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
          throw new RequiredError(
            'id',
            'Required parameter id was null or undefined when calling downloadRPackage.'
          )
        }
        // verify required parameter 'name' is not null or undefined
        if (name === null || name === undefined) {
          throw new RequiredError(
            'name',
            'Required parameter name was null or undefined when calling downloadRPackage.'
          )
        }
        // verify required parameter 'version' is not null or undefined
        if (version === null || version === undefined) {
          throw new RequiredError(
            'version',
            'Required parameter version was null or undefined when calling downloadRPackage.'
          )
        }
        const localVarPath =
          `/api/v2/manager/r/packages/{id}/download/{name}_{version}.tar.gz`
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
      downloadReferenceManual: async (
        id: number,
        options: AxiosRequestConfig = {}
      ): Promise<RequestArgs> => {
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
          throw new RequiredError(
            'id',
            'Required parameter id was null or undefined when calling downloadReferenceManual.'
          )
        }
        const localVarPath =
          `/api/v2/manager/r/packages/{id}/manual`.replace(
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
       * @param {number} id
       * @param {string} name
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      downloadVignetteHtml: async (
        id: number,
        name: string,
        options: AxiosRequestConfig = {}
      ): Promise<RequestArgs> => {
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
          throw new RequiredError(
            'id',
            'Required parameter id was null or undefined when calling downloadVignetteHtml.'
          )
        }
        // verify required parameter 'name' is not null or undefined
        if (name === null || name === undefined) {
          throw new RequiredError(
            'name',
            'Required parameter name was null or undefined when calling downloadVignetteHtml.'
          )
        }
        const localVarPath =
          `/api/v2/manager/r/packages/{id}/vignettes/{name}.html`
            .replace(
              `{${'id'}}`,
              encodeURIComponent(String(id))
            )
            .replace(
              `{${'name'}}`,
              encodeURIComponent(String(name))
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
       * @param {string} name
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      downloadVignettePdf: async (
        id: number,
        name: string,
        options: AxiosRequestConfig = {}
      ): Promise<RequestArgs> => {
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
          throw new RequiredError(
            'id',
            'Required parameter id was null or undefined when calling downloadVignettePdf.'
          )
        }
        // verify required parameter 'name' is not null or undefined
        if (name === null || name === undefined) {
          throw new RequiredError(
            'name',
            'Required parameter name was null or undefined when calling downloadVignettePdf.'
          )
        }
        const localVarPath =
          `/api/v2/manager/r/packages/{id}/vignettes/{name}.pdf`
            .replace(
              `{${'id'}}`,
              encodeURIComponent(String(id))
            )
            .replace(
              `{${'name'}}`,
              encodeURIComponent(String(name))
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
      getAllRPackages: async (
        page?: number,
        size?: number,
        sort?: Array<string>,
        repository?: Array<string>,
        deleted?: boolean,
        submissionState?: Array<string>,
        name?: string,
        options: AxiosRequestConfig = {}
      ): Promise<RequestArgs> => {
        const localVarPath = `/api/v2/manager/r/packages`
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
       * @param {number} id
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      getRPackageById: async (
        id: number,
        options: AxiosRequestConfig = {}
      ): Promise<RequestArgs> => {
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
          throw new RequiredError(
            'id',
            'Required parameter id was null or undefined when calling getRPackageById.'
          )
        }
        const localVarPath =
          `/api/v2/manager/r/packages/{id}`.replace(
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
       * @param {number} id
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      getVignetteLinks: async (
        id: number,
        options: AxiosRequestConfig = {}
      ): Promise<RequestArgs> => {
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
          throw new RequiredError(
            'id',
            'Required parameter id was null or undefined when calling getVignetteLinks.'
          )
        }
        const localVarPath =
          `/api/v2/manager/r/packages/{id}/vignettes`.replace(
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
       * @param {number} id
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      shiftDeletePackage: async (
        id: number,
        options: AxiosRequestConfig = {}
      ): Promise<RequestArgs> => {
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
          throw new RequiredError(
            'id',
            'Required parameter id was null or undefined when calling shiftDeletePackage.'
          )
        }
        const localVarPath =
          `/api/v2/manager/r/packages/{id}`.replace(
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
       * @param {JsonPatch} body
       * @param {number} id
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      updatePackage: async (
        body: JsonPatch,
        id: number,
        options: AxiosRequestConfig = {}
      ): Promise<RequestArgs> => {
        // verify required parameter 'body' is not null or undefined
        if (body === null || body === undefined) {
          throw new RequiredError(
            'body',
            'Required parameter body was null or undefined when calling updatePackage.'
          )
        }
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
          throw new RequiredError(
            'id',
            'Required parameter id was null or undefined when calling updatePackage.'
          )
        }
        const localVarPath =
          `/api/v2/manager/r/packages/{id}`.replace(
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
 * RPackageControllerApi - functional programming interface
 * @export
 */
export const RPackageControllerApiFp = function (
  configuration?: Configuration
) {
  return {
    /**
     *
     * @param {number} id
     * @param {string} name
     * @param {string} version
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async downloadRPackage(
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
        await RPackageControllerApiAxiosParamCreator(
          configuration
        ).downloadRPackage(id, name, version, options)
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
    async downloadReferenceManual(
      id: number,
      options?: AxiosRequestConfig
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => Promise<AxiosResponse<Array<string>>>
    > {
      const localVarAxiosArgs =
        await RPackageControllerApiAxiosParamCreator(
          configuration
        ).downloadReferenceManual(id, options)
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
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async downloadVignetteHtml(
      id: number,
      name: string,
      options?: AxiosRequestConfig
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => Promise<AxiosResponse<Array<string>>>
    > {
      const localVarAxiosArgs =
        await RPackageControllerApiAxiosParamCreator(
          configuration
        ).downloadVignetteHtml(id, name, options)
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
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async downloadVignettePdf(
      id: number,
      name: string,
      options?: AxiosRequestConfig
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => Promise<AxiosResponse<Array<string>>>
    > {
      const localVarAxiosArgs =
        await RPackageControllerApiAxiosParamCreator(
          configuration
        ).downloadVignettePdf(id, name, options)
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
    async getAllRPackages(
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
        await RPackageControllerApiAxiosParamCreator(
          configuration
        ).getAllRPackages(
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
     * @param {number} id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async getRPackageById(
      id: number,
      options?: AxiosRequestConfig
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => Promise<
        AxiosResponse<ResponseDtoEntityModelRPackageDto>
      >
    > {
      const localVarAxiosArgs =
        await RPackageControllerApiAxiosParamCreator(
          configuration
        ).getRPackageById(id, options)
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
    async getVignetteLinks(
      id: number,
      options?: AxiosRequestConfig
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => Promise<AxiosResponse<ResponseDtoListVignette>>
    > {
      const localVarAxiosArgs =
        await RPackageControllerApiAxiosParamCreator(
          configuration
        ).getVignetteLinks(id, options)
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
    async shiftDeletePackage(
      id: number,
      options?: AxiosRequestConfig
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => Promise<AxiosResponse<void>>
    > {
      const localVarAxiosArgs =
        await RPackageControllerApiAxiosParamCreator(
          configuration
        ).shiftDeletePackage(id, options)
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
    async updatePackage(
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
        await RPackageControllerApiAxiosParamCreator(
          configuration
        ).updatePackage(body, id, options)
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
 * RPackageControllerApi - factory interface
 * @export
 */
export const RPackageControllerApiFactory = function (
  configuration?: Configuration,
  basePath?: string,
  axios?: AxiosInstance
) {
  return {
    /**
     *
     * @param {number} id
     * @param {string} name
     * @param {string} version
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async downloadRPackage(
      id: number,
      name: string,
      version: string,
      options?: AxiosRequestConfig
    ): Promise<AxiosResponse<Array<string>>> {
      return RPackageControllerApiFp(configuration)
        .downloadRPackage(id, name, version, options)
        .then((request) => request(axios, basePath))
    },
    /**
     *
     * @param {number} id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async downloadReferenceManual(
      id: number,
      options?: AxiosRequestConfig
    ): Promise<AxiosResponse<Array<string>>> {
      return RPackageControllerApiFp(configuration)
        .downloadReferenceManual(id, options)
        .then((request) => request(axios, basePath))
    },
    /**
     *
     * @param {number} id
     * @param {string} name
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async downloadVignetteHtml(
      id: number,
      name: string,
      options?: AxiosRequestConfig
    ): Promise<AxiosResponse<Array<string>>> {
      return RPackageControllerApiFp(configuration)
        .downloadVignetteHtml(id, name, options)
        .then((request) => request(axios, basePath))
    },
    /**
     *
     * @param {number} id
     * @param {string} name
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async downloadVignettePdf(
      id: number,
      name: string,
      options?: AxiosRequestConfig
    ): Promise<AxiosResponse<Array<string>>> {
      return RPackageControllerApiFp(configuration)
        .downloadVignettePdf(id, name, options)
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
    async getAllRPackages(
      page?: number,
      size?: number,
      sort?: Array<string>,
      repository?: Array<string>,
      deleted?: boolean,
      submissionState?: Array<string>,
      name?: string,
      options?: AxiosRequestConfig
    ): Promise<AxiosResponse<ResponseDtoObject>> {
      return RPackageControllerApiFp(configuration)
        .getAllRPackages(
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
     * @param {number} id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async getRPackageById(
      id: number,
      options?: AxiosRequestConfig
    ): Promise<
      AxiosResponse<ResponseDtoEntityModelRPackageDto>
    > {
      return RPackageControllerApiFp(configuration)
        .getRPackageById(id, options)
        .then((request) => request(axios, basePath))
    },
    /**
     *
     * @param {number} id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async getVignetteLinks(
      id: number,
      options?: AxiosRequestConfig
    ): Promise<AxiosResponse<ResponseDtoListVignette>> {
      return RPackageControllerApiFp(configuration)
        .getVignetteLinks(id, options)
        .then((request) => request(axios, basePath))
    },
    /**
     *
     * @param {number} id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async shiftDeletePackage(
      id: number,
      options?: AxiosRequestConfig
    ): Promise<AxiosResponse<void>> {
      return RPackageControllerApiFp(configuration)
        .shiftDeletePackage(id, options)
        .then((request) => request(axios, basePath))
    },
    /**
     *
     * @param {JsonPatch} body
     * @param {number} id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async updatePackage(
      body: JsonPatch,
      id: number,
      options?: AxiosRequestConfig
    ): Promise<AxiosResponse<any>> {
      return RPackageControllerApiFp(configuration)
        .updatePackage(body, id, options)
        .then((request) => request(axios, basePath))
    }
  }
}

/**
 * RPackageControllerApi - object-oriented interface
 * @export
 * @class RPackageControllerApi
 * @extends {BaseAPI}
 */
export class RPackageControllerApi extends BaseAPI {
  /**
   *
   * @param {number} id
   * @param {string} name
   * @param {string} version
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof RPackageControllerApi
   */
  public async downloadRPackage(
    id: number,
    name: string,
    version: string,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<Array<string>>> {
    return RPackageControllerApiFp(this.configuration)
      .downloadRPackage(id, name, version, options)
      .then((request) => request(this.axios, this.basePath))
  }
  /**
   *
   * @param {number} id
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof RPackageControllerApi
   */
  public async downloadReferenceManual(
    id: number,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<Array<string>>> {
    return RPackageControllerApiFp(this.configuration)
      .downloadReferenceManual(id, options)
      .then((request) => request(this.axios, this.basePath))
  }
  /**
   *
   * @param {number} id
   * @param {string} name
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof RPackageControllerApi
   */
  public async downloadVignetteHtml(
    id: number,
    name: string,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<Array<string>>> {
    return RPackageControllerApiFp(this.configuration)
      .downloadVignetteHtml(id, name, options)
      .then((request) => request(this.axios, this.basePath))
  }
  /**
   *
   * @param {number} id
   * @param {string} name
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof RPackageControllerApi
   */
  public async downloadVignettePdf(
    id: number,
    name: string,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<Array<string>>> {
    return RPackageControllerApiFp(this.configuration)
      .downloadVignettePdf(id, name, options)
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
   * @memberof RPackageControllerApi
   */
  public async getAllRPackages(
    page?: number,
    size?: number,
    sort?: Array<string>,
    repository?: Array<string>,
    deleted?: boolean,
    submissionState?: Array<string>,
    name?: string,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<ResponseDtoObject>> {
    return RPackageControllerApiFp(this.configuration)
      .getAllRPackages(
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
   * @param {number} id
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof RPackageControllerApi
   */
  public async getRPackageById(
    id: number,
    options?: AxiosRequestConfig
  ): Promise<
    AxiosResponse<ResponseDtoEntityModelRPackageDto>
  > {
    return RPackageControllerApiFp(this.configuration)
      .getRPackageById(id, options)
      .then((request) => request(this.axios, this.basePath))
  }
  /**
   *
   * @param {number} id
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof RPackageControllerApi
   */
  public async getVignetteLinks(
    id: number,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<ResponseDtoListVignette>> {
    return RPackageControllerApiFp(this.configuration)
      .getVignetteLinks(id, options)
      .then((request) => request(this.axios, this.basePath))
  }
  /**
   *
   * @param {number} id
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof RPackageControllerApi
   */
  public async shiftDeletePackage(
    id: number,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<void>> {
    return RPackageControllerApiFp(this.configuration)
      .shiftDeletePackage(id, options)
      .then((request) => request(this.axios, this.basePath))
  }
  /**
   *
   * @param {JsonPatch} body
   * @param {number} id
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof RPackageControllerApi
   */
  public async updatePackage(
    body: JsonPatch,
    id: number,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<any>> {
    return RPackageControllerApiFp(this.configuration)
      .updatePackage(body, id, options)
      .then((request) => request(this.axios, this.basePath))
  }
}
