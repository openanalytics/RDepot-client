/*
 * R Depot
 * 
 * Copyright (C) 2012-2025 Open Analytics NV
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
*/
/* tslint:disable */
/* eslint-disable */


import globalAxios, { AxiosResponse, AxiosInstance, AxiosRequestConfig } from 'axios';
import { Configuration } from '../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
import { JsonPatch } from '../models';
import { PythonRepositoryDto } from '../models';
import { ResponseDtoEntityModelPythonRepositoryDto } from '../models';
import { ResponseDtoObject } from '../models';
import { ResponseDtoPagedModelEntityModelPythonRepositoryDto } from '../models';
/**
 * PythonRepositoryControllerApi - axios parameter creator
 * @export
 */
export const PythonRepositoryControllerApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {PythonRepositoryDto} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createPythonRepository: async (body: PythonRepositoryDto, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling createPythonRepository.');
            }
            const localVarPath = `/api/v2/manager/python/repositories`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Bearer required
            // http bearer authentication required
            if (configuration && configuration.accessToken) {
                const accessToken = typeof configuration.accessToken === 'function'
                    ? await configuration.accessToken()
                    : await configuration.accessToken;
                localVarHeaderParameter["Authorization"] = "Bearer " + accessToken;
            }

            localVarHeaderParameter['Content-Type'] = 'application/json';

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
              if (key === 'sort' && Array.isArray(localVarQueryParameter[key])) {
                 localVarQueryParameter[key].forEach((sortValue: string) => {
                    query.append(key, sortValue);
                  });
               } else {
                  query.set(key, localVarQueryParameter[key]);
                }
             }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
             const needsSerialization =
  typeof body !== 'string' ||
  (localVarRequestOptions.headers &&
    localVarRequestOptions.headers[
      'Content-Type'
    ] === 'application/json')
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deletePythonRepository: async (id: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling deletePythonRepository.');
            }
            const localVarPath = `/api/v2/manager/python/repositories/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Bearer required
            // http bearer authentication required
            if (configuration && configuration.accessToken) {
                const accessToken = typeof configuration.accessToken === 'function'
                    ? await configuration.accessToken()
                    : await configuration.accessToken;
                localVarHeaderParameter["Authorization"] = "Bearer " + accessToken;
            }

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
              if (key === 'sort' && Array.isArray(localVarQueryParameter[key])) {
                 localVarQueryParameter[key].forEach((sortValue: string) => {
                    query.append(key, sortValue);
                  });
               } else {
                  query.set(key, localVarQueryParameter[key]);
                }
             }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {number} [page] Zero-based page index (0..N)
         * @param {number} [size] The size of the page to be returned
         * @param {Array<string>} [sort] Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
         * @param {boolean} [deleted] 
         * @param {boolean} [published] 
         * @param {Array<string>} [maintainer] 
         * @param {string} [name] 
         * @param {string} [search] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAllPythonRepositories: async (page?: number, size?: number, sort?: Array<string>, deleted?: boolean, published?: boolean, maintainer?: Array<string>, name?: string, search?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/v2/manager/python/repositories`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Bearer required
            // http bearer authentication required
            if (configuration && configuration.accessToken) {
                const accessToken = typeof configuration.accessToken === 'function'
                    ? await configuration.accessToken()
                    : await configuration.accessToken;
                localVarHeaderParameter["Authorization"] = "Bearer " + accessToken;
            }

            if (page !== undefined) {
                localVarQueryParameter['page'] = page;
            }

            if (size !== undefined) {
                localVarQueryParameter['size'] = size;
            }

            if (sort) {
                localVarQueryParameter['sort'] = sort;
            }

            if (deleted !== undefined) {
                localVarQueryParameter['deleted'] = deleted;
            }

            if (published !== undefined) {
                localVarQueryParameter['published'] = published;
            }

            if (maintainer) {
                localVarQueryParameter['maintainer'] = maintainer;
            }

            if (name !== undefined) {
                localVarQueryParameter['name'] = name;
            }

            if (search !== undefined) {
                localVarQueryParameter['search'] = search;
            }

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
              if (key === 'sort' && Array.isArray(localVarQueryParameter[key])) {
                 localVarQueryParameter[key].forEach((sortValue: string) => {
                    query.append(key, sortValue);
                  });
               } else {
                  query.set(key, localVarQueryParameter[key]);
                }
             }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getPythonRepositoryById: async (id: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling getPythonRepositoryById.');
            }
            const localVarPath = `/api/v2/manager/python/repositories/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Bearer required
            // http bearer authentication required
            if (configuration && configuration.accessToken) {
                const accessToken = typeof configuration.accessToken === 'function'
                    ? await configuration.accessToken()
                    : await configuration.accessToken;
                localVarHeaderParameter["Authorization"] = "Bearer " + accessToken;
            }

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
              if (key === 'sort' && Array.isArray(localVarQueryParameter[key])) {
                 localVarQueryParameter[key].forEach((sortValue: string) => {
                    query.append(key, sortValue);
                  });
               } else {
                  query.set(key, localVarQueryParameter[key]);
                }
             }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getSynchronizationStatus1: async (id: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling getSynchronizationStatus1.');
            }
            const localVarPath = `/api/v2/manager/python/repositories/{id}/synchronization-status`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Bearer required
            // http bearer authentication required
            if (configuration && configuration.accessToken) {
                const accessToken = typeof configuration.accessToken === 'function'
                    ? await configuration.accessToken()
                    : await configuration.accessToken;
                localVarHeaderParameter["Authorization"] = "Bearer " + accessToken;
            }

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
              if (key === 'sort' && Array.isArray(localVarQueryParameter[key])) {
                 localVarQueryParameter[key].forEach((sortValue: string) => {
                    query.append(key, sortValue);
                  });
               } else {
                  query.set(key, localVarQueryParameter[key]);
                }
             }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        republishRRepository1: async (id: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling republishRRepository1.');
            }
            const localVarPath = `/api/v2/manager/python/repositories/{id}/republish`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Bearer required
            // http bearer authentication required
            if (configuration && configuration.accessToken) {
                const accessToken = typeof configuration.accessToken === 'function'
                    ? await configuration.accessToken()
                    : await configuration.accessToken;
                localVarHeaderParameter["Authorization"] = "Bearer " + accessToken;
            }

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
              if (key === 'sort' && Array.isArray(localVarQueryParameter[key])) {
                 localVarQueryParameter[key].forEach((sortValue: string) => {
                    query.append(key, sortValue);
                  });
               } else {
                  query.set(key, localVarQueryParameter[key]);
                }
             }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        synchronizeWithMirrors1: async (id: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling synchronizeWithMirrors1.');
            }
            const localVarPath = `/api/v2/manager/python/repositories/{id}/synchronize-mirrors`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Bearer required
            // http bearer authentication required
            if (configuration && configuration.accessToken) {
                const accessToken = typeof configuration.accessToken === 'function'
                    ? await configuration.accessToken()
                    : await configuration.accessToken;
                localVarHeaderParameter["Authorization"] = "Bearer " + accessToken;
            }

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
              if (key === 'sort' && Array.isArray(localVarQueryParameter[key])) {
                 localVarQueryParameter[key].forEach((sortValue: string) => {
                    query.append(key, sortValue);
                  });
               } else {
                  query.set(key, localVarQueryParameter[key]);
                }
             }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {JsonPatch} body 
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updatePythonRepository: async (body: JsonPatch, id: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling updatePythonRepository.');
            }
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling updatePythonRepository.');
            }
            const localVarPath = `/api/v2/manager/python/repositories/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'PATCH', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Bearer required
            // http bearer authentication required
            if (configuration && configuration.accessToken) {
                const accessToken = typeof configuration.accessToken === 'function'
                    ? await configuration.accessToken()
                    : await configuration.accessToken;
                localVarHeaderParameter["Authorization"] = "Bearer " + accessToken;
            }

            localVarHeaderParameter['Content-Type'] = 'application/json-patch+json';

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
              if (key === 'sort' && Array.isArray(localVarQueryParameter[key])) {
                 localVarQueryParameter[key].forEach((sortValue: string) => {
                    query.append(key, sortValue);
                  });
               } else {
                  query.set(key, localVarQueryParameter[key]);
                }
             }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
             const needsSerialization =
  typeof body !== 'string' ||
  (localVarRequestOptions.headers &&
    localVarRequestOptions.headers[
      'Content-Type'
    ] === 'application/json')
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * PythonRepositoryControllerApi - functional programming interface
 * @export
 */
export const PythonRepositoryControllerApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @param {PythonRepositoryDto} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createPythonRepository(body: PythonRepositoryDto, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<any>>> {
            const localVarAxiosArgs = await PythonRepositoryControllerApiAxiosParamCreator(configuration).createPythonRepository(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deletePythonRepository(id: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>> {
            const localVarAxiosArgs = await PythonRepositoryControllerApiAxiosParamCreator(configuration).deletePythonRepository(id, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @param {number} [page] Zero-based page index (0..N)
         * @param {number} [size] The size of the page to be returned
         * @param {Array<string>} [sort] Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
         * @param {boolean} [deleted] 
         * @param {boolean} [published] 
         * @param {Array<string>} [maintainer] 
         * @param {string} [name] 
         * @param {string} [search] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getAllPythonRepositories(page?: number, size?: number, sort?: Array<string>, deleted?: boolean, published?: boolean, maintainer?: Array<string>, name?: string, search?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<ResponseDtoPagedModelEntityModelPythonRepositoryDto>>> {
            const localVarAxiosArgs = await PythonRepositoryControllerApiAxiosParamCreator(configuration).getAllPythonRepositories(page, size, sort, deleted, published, maintainer, name, search, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getPythonRepositoryById(id: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<ResponseDtoEntityModelPythonRepositoryDto>>> {
            const localVarAxiosArgs = await PythonRepositoryControllerApiAxiosParamCreator(configuration).getPythonRepositoryById(id, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getSynchronizationStatus1(id: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<ResponseDtoObject>>> {
            const localVarAxiosArgs = await PythonRepositoryControllerApiAxiosParamCreator(configuration).getSynchronizationStatus1(id, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async republishRRepository1(id: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<any>>> {
            const localVarAxiosArgs = await PythonRepositoryControllerApiAxiosParamCreator(configuration).republishRRepository1(id, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async synchronizeWithMirrors1(id: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>> {
            const localVarAxiosArgs = await PythonRepositoryControllerApiAxiosParamCreator(configuration).synchronizeWithMirrors1(id, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @param {JsonPatch} body 
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updatePythonRepository(body: JsonPatch, id: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<any>>> {
            const localVarAxiosArgs = await PythonRepositoryControllerApiAxiosParamCreator(configuration).updatePythonRepository(body, id, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * PythonRepositoryControllerApi - factory interface
 * @export
 */
export const PythonRepositoryControllerApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * 
         * @param {PythonRepositoryDto} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createPythonRepository(body: PythonRepositoryDto, options?: AxiosRequestConfig): Promise<AxiosResponse<any>> {
            return PythonRepositoryControllerApiFp(configuration).createPythonRepository(body, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deletePythonRepository(id: number, options?: AxiosRequestConfig): Promise<AxiosResponse<void>> {
            return PythonRepositoryControllerApiFp(configuration).deletePythonRepository(id, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {number} [page] Zero-based page index (0..N)
         * @param {number} [size] The size of the page to be returned
         * @param {Array<string>} [sort] Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
         * @param {boolean} [deleted] 
         * @param {boolean} [published] 
         * @param {Array<string>} [maintainer] 
         * @param {string} [name] 
         * @param {string} [search] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getAllPythonRepositories(page?: number, size?: number, sort?: Array<string>, deleted?: boolean, published?: boolean, maintainer?: Array<string>, name?: string, search?: string, options?: AxiosRequestConfig): Promise<AxiosResponse<ResponseDtoPagedModelEntityModelPythonRepositoryDto>> {
            return PythonRepositoryControllerApiFp(configuration).getAllPythonRepositories(page, size, sort, deleted, published, maintainer, name, search, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getPythonRepositoryById(id: number, options?: AxiosRequestConfig): Promise<AxiosResponse<ResponseDtoEntityModelPythonRepositoryDto>> {
            return PythonRepositoryControllerApiFp(configuration).getPythonRepositoryById(id, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getSynchronizationStatus1(id: number, options?: AxiosRequestConfig): Promise<AxiosResponse<ResponseDtoObject>> {
            return PythonRepositoryControllerApiFp(configuration).getSynchronizationStatus1(id, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async republishRRepository1(id: number, options?: AxiosRequestConfig): Promise<AxiosResponse<any>> {
            return PythonRepositoryControllerApiFp(configuration).republishRRepository1(id, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async synchronizeWithMirrors1(id: number, options?: AxiosRequestConfig): Promise<AxiosResponse<void>> {
            return PythonRepositoryControllerApiFp(configuration).synchronizeWithMirrors1(id, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {JsonPatch} body 
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updatePythonRepository(body: JsonPatch, id: number, options?: AxiosRequestConfig): Promise<AxiosResponse<any>> {
            return PythonRepositoryControllerApiFp(configuration).updatePythonRepository(body, id, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * PythonRepositoryControllerApi - object-oriented interface
 * @export
 * @class PythonRepositoryControllerApi
 * @extends {BaseAPI}
 */
export class PythonRepositoryControllerApi extends BaseAPI {
    /**
     * 
     * @param {PythonRepositoryDto} body 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PythonRepositoryControllerApi
     */
    public async createPythonRepository(body: PythonRepositoryDto, options?: AxiosRequestConfig) : Promise<AxiosResponse<any>> {
        return PythonRepositoryControllerApiFp(this.configuration).createPythonRepository(body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @param {number} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PythonRepositoryControllerApi
     */
    public async deletePythonRepository(id: number, options?: AxiosRequestConfig) : Promise<AxiosResponse<void>> {
        return PythonRepositoryControllerApiFp(this.configuration).deletePythonRepository(id, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @param {number} [page] Zero-based page index (0..N)
     * @param {number} [size] The size of the page to be returned
     * @param {Array<string>} [sort] Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @param {boolean} [deleted] 
     * @param {boolean} [published] 
     * @param {Array<string>} [maintainer] 
     * @param {string} [name] 
     * @param {string} [search] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PythonRepositoryControllerApi
     */
    public async getAllPythonRepositories(page?: number, size?: number, sort?: Array<string>, deleted?: boolean, published?: boolean, maintainer?: Array<string>, name?: string, search?: string, options?: AxiosRequestConfig) : Promise<AxiosResponse<ResponseDtoPagedModelEntityModelPythonRepositoryDto>> {
        return PythonRepositoryControllerApiFp(this.configuration).getAllPythonRepositories(page, size, sort, deleted, published, maintainer, name, search, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @param {number} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PythonRepositoryControllerApi
     */
    public async getPythonRepositoryById(id: number, options?: AxiosRequestConfig) : Promise<AxiosResponse<ResponseDtoEntityModelPythonRepositoryDto>> {
        return PythonRepositoryControllerApiFp(this.configuration).getPythonRepositoryById(id, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @param {number} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PythonRepositoryControllerApi
     */
    public async getSynchronizationStatus1(id: number, options?: AxiosRequestConfig) : Promise<AxiosResponse<ResponseDtoObject>> {
        return PythonRepositoryControllerApiFp(this.configuration).getSynchronizationStatus1(id, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @param {number} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PythonRepositoryControllerApi
     */
    public async republishRRepository1(id: number, options?: AxiosRequestConfig) : Promise<AxiosResponse<any>> {
        return PythonRepositoryControllerApiFp(this.configuration).republishRRepository1(id, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @param {number} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PythonRepositoryControllerApi
     */
    public async synchronizeWithMirrors1(id: number, options?: AxiosRequestConfig) : Promise<AxiosResponse<void>> {
        return PythonRepositoryControllerApiFp(this.configuration).synchronizeWithMirrors1(id, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @param {JsonPatch} body 
     * @param {number} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PythonRepositoryControllerApi
     */
    public async updatePythonRepository(body: JsonPatch, id: number, options?: AxiosRequestConfig) : Promise<AxiosResponse<any>> {
        return PythonRepositoryControllerApiFp(this.configuration).updatePythonRepository(body, id, options).then((request) => request(this.axios, this.basePath));
    }
}
