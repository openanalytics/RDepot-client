/* tslint:disable */
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
 * PythonSubmissionControllerApi - axios parameter creator
 * @export
 */
export const PythonSubmissionControllerApiAxiosParamCreator =
  function (configuration?: Configuration) {
    return {
      /**
       *
       * @param {number} id
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      deletePythonSubmission: async (
        id: number,
        options: AxiosRequestConfig = {}
      ): Promise<RequestArgs> => {
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
          throw new RequiredError(
            'id',
            'Required parameter id was null or undefined when calling deletePythonSubmission.'
          )
        }
        const localVarPath =
          `/api/v2/manager/python/submissions/{id}`.replace(
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
       * @param {string} [state]
       * @param {number} [submitterId]
       * @param {number} [packageId]
       * @param {number} [page] Zero-based page index (0..N)
       * @param {number} [size] The size of the page to be returned
       * @param {Array<string>} [sort] Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      getAllPythonSubmissions: async (
        state?: string,
        submitterId?: number,
        packageId?: number,
        page?: number,
        size?: number,
        sort?: Array<string>,
        options: AxiosRequestConfig = {}
      ): Promise<RequestArgs> => {
        const localVarPath = `/api/v2/manager/python/submissions`
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
      getPythonSubmissionById: async (
        id: number,
        options: AxiosRequestConfig = {}
      ): Promise<RequestArgs> => {
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
          throw new RequiredError(
            'id',
            'Required parameter id was null or undefined when calling getPythonSubmissionById.'
          )
        }
        const localVarPath =
          `/api/v2/manager/python/submissions/{id}`.replace(
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
       * @param {string} repository
       * @param {Blob} [file]
       * @param {boolean} [generateManual]
       * @param {boolean} [replace]
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      submitPythonPacakgeForm: async (
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
            'Required parameter repository was null or undefined when calling submitPythonPacakgeForm.'
          )
        }
        const localVarPath = `/api/v2/manager/python/submissions`
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
        // http bearer authentication required
        if (configuration && configuration.accessToken) {
          const accessToken =
            typeof configuration.accessToken === 'function'
              ? await configuration.accessToken()
              : await configuration.accessToken
          localVarHeaderParameter['Authorization'] =
            'Bearer ' + accessToken
        }

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
      updatePythonSubmission: async (
        body: JsonPatch,
        id: number,
        options: AxiosRequestConfig = {}
      ): Promise<RequestArgs> => {
        // verify required parameter 'body' is not null or undefined
        if (body === null || body === undefined) {
          throw new RequiredError(
            'body',
            'Required parameter body was null or undefined when calling updatePythonSubmission.'
          )
        }
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
          throw new RequiredError(
            'id',
            'Required parameter id was null or undefined when calling updatePythonSubmission.'
          )
        }
        const localVarPath =
          `/api/v2/manager/python/submissions/{id}`.replace(
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
          localVarRequestOptions.headers['Content-Type'] ===
            'application/json'
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
 * PythonSubmissionControllerApi - functional programming interface
 * @export
 */
export const PythonSubmissionControllerApiFp = function (
  configuration?: Configuration
) {
  return {
    /**
     *
     * @param {number} id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async deletePythonSubmission(
      id: number,
      options?: AxiosRequestConfig
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => Promise<AxiosResponse<void>>
    > {
      const localVarAxiosArgs =
        await PythonSubmissionControllerApiAxiosParamCreator(
          configuration
        ).deletePythonSubmission(id, options)
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
    async getAllPythonSubmissions(
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
        await PythonSubmissionControllerApiAxiosParamCreator(
          configuration
        ).getAllPythonSubmissions(
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
    async getPythonSubmissionById(
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
        await PythonSubmissionControllerApiAxiosParamCreator(
          configuration
        ).getPythonSubmissionById(id, options)
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
    async submitPythonPacakgeForm(
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
        await PythonSubmissionControllerApiAxiosParamCreator(
          configuration
        ).submitPythonPacakgeForm(
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
    async updatePythonSubmission(
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
        await PythonSubmissionControllerApiAxiosParamCreator(
          configuration
        ).updatePythonSubmission(body, id, options)
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
 * PythonSubmissionControllerApi - factory interface
 * @export
 */
export const PythonSubmissionControllerApiFactory =
  function (
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
      async deletePythonSubmission(
        id: number,
        options?: AxiosRequestConfig
      ): Promise<AxiosResponse<void>> {
        return PythonSubmissionControllerApiFp(
          configuration
        )
          .deletePythonSubmission(id, options)
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
      async getAllPythonSubmissions(
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
        return PythonSubmissionControllerApiFp(
          configuration
        )
          .getAllPythonSubmissions(
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
      async getPythonSubmissionById(
        id: number,
        options?: AxiosRequestConfig
      ): Promise<
        AxiosResponse<ResponseDtoEntityModelSubmissionDto>
      > {
        return PythonSubmissionControllerApiFp(
          configuration
        )
          .getPythonSubmissionById(id, options)
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
      async submitPythonPacakgeForm(
        repository: string,
        file?: Blob,
        generateManual?: boolean,
        replace?: boolean,
        options?: AxiosRequestConfig
      ): Promise<AxiosResponse<any>> {
        return PythonSubmissionControllerApiFp(
          configuration
        )
          .submitPythonPacakgeForm(
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
      async updatePythonSubmission(
        body: JsonPatch,
        id: number,
        options?: AxiosRequestConfig
      ): Promise<AxiosResponse<any>> {
        return PythonSubmissionControllerApiFp(
          configuration
        )
          .updatePythonSubmission(body, id, options)
          .then((request) => request(axios, basePath))
      }
    }
  }

/**
 * PythonSubmissionControllerApi - object-oriented interface
 * @export
 * @class PythonSubmissionControllerApi
 * @extends {BaseAPI}
 */
export class PythonSubmissionControllerApi extends BaseAPI {
  /**
   *
   * @param {number} id
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof PythonSubmissionControllerApi
   */
  public async deletePythonSubmission(
    id: number,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<void>> {
    return PythonSubmissionControllerApiFp(
      this.configuration
    )
      .deletePythonSubmission(id, options)
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
   * @memberof PythonSubmissionControllerApi
   */
  public async getAllPythonSubmissions(
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
    return PythonSubmissionControllerApiFp(
      this.configuration
    )
      .getAllPythonSubmissions(
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
   * @memberof PythonSubmissionControllerApi
   */
  public async getPythonSubmissionById(
    id: number,
    options?: AxiosRequestConfig
  ): Promise<
    AxiosResponse<ResponseDtoEntityModelSubmissionDto>
  > {
    return PythonSubmissionControllerApiFp(
      this.configuration
    )
      .getPythonSubmissionById(id, options)
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
   * @memberof PythonSubmissionControllerApi
   */
  public async submitPythonPacakgeForm(
    repository: string,
    file?: Blob,
    generateManual?: boolean,
    replace?: boolean,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<any>> {
    return PythonSubmissionControllerApiFp(
      this.configuration
    )
      .submitPythonPacakgeForm(
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
   * @memberof PythonSubmissionControllerApi
   */
  public async updatePythonSubmission(
    body: JsonPatch,
    id: number,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<any>> {
    return PythonSubmissionControllerApiFp(
      this.configuration
    )
      .updatePythonSubmission(body, id, options)
      .then((request) => request(this.axios, this.basePath))
  }
}