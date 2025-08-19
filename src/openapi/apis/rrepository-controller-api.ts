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
import { RRepositoryDto } from '../models';
import { ResponseDtoEntityModelRRepositoryDto } from '../models';
import { ResponseDtoObject } from '../models';
import { ResponseDtoPagedModelEntityModelRRepositoryDto } from '../models';
/**
 * RRepositoryControllerApi - axios parameter creator
 * @export
 */
export const RRepositoryControllerApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        crash: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/v2/manager/r/repositories/bad-endpoint`;
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
         * @param {RRepositoryDto} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createRRepository: async (body: RRepositoryDto, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling createRRepository.');
            }
            const localVarPath = `/api/v2/manager/r/repositories`;
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
        deleteRRepository: async (id: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling deleteRRepository.');
            }
            const localVarPath = `/api/v2/manager/r/repositories/{id}`
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
        getAllRRepositories: async (page?: number, size?: number, sort?: Array<string>, deleted?: boolean, published?: boolean, maintainer?: Array<string>, name?: string, search?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/v2/manager/r/repositories`;
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
        getRRepositoryById: async (id: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling getRRepositoryById.');
            }
            const localVarPath = `/api/v2/manager/r/repositories/{id}`
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
        getSynchronizationStatus: async (id: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling getSynchronizationStatus.');
            }
            const localVarPath = `/api/v2/manager/r/repositories/{id}/synchronization-status`
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
        republishRRepository: async (id: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling republishRRepository.');
            }
            const localVarPath = `/api/v2/manager/r/repositories/{id}/republish`
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
        synchronizeWithMirrors: async (id: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling synchronizeWithMirrors.');
            }
            const localVarPath = `/api/v2/manager/r/repositories/{id}/synchronize-mirrors`
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
        updateRRepository: async (body: JsonPatch, id: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling updateRRepository.');
            }
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling updateRRepository.');
            }
            const localVarPath = `/api/v2/manager/r/repositories/{id}`
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
 * RRepositoryControllerApi - functional programming interface
 * @export
 */
export const RRepositoryControllerApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async crash(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<ResponseDtoPagedModelEntityModelRRepositoryDto>>> {
            const localVarAxiosArgs = await RRepositoryControllerApiAxiosParamCreator(configuration).crash(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @param {RRepositoryDto} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createRRepository(body: RRepositoryDto, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<any>>> {
            const localVarAxiosArgs = await RRepositoryControllerApiAxiosParamCreator(configuration).createRRepository(body, options);
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
        async deleteRRepository(id: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>> {
            const localVarAxiosArgs = await RRepositoryControllerApiAxiosParamCreator(configuration).deleteRRepository(id, options);
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
        async getAllRRepositories(page?: number, size?: number, sort?: Array<string>, deleted?: boolean, published?: boolean, maintainer?: Array<string>, name?: string, search?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<ResponseDtoPagedModelEntityModelRRepositoryDto>>> {
            const localVarAxiosArgs = await RRepositoryControllerApiAxiosParamCreator(configuration).getAllRRepositories(page, size, sort, deleted, published, maintainer, name, search, options);
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
        async getRRepositoryById(id: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<ResponseDtoEntityModelRRepositoryDto>>> {
            const localVarAxiosArgs = await RRepositoryControllerApiAxiosParamCreator(configuration).getRRepositoryById(id, options);
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
        async getSynchronizationStatus(id: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<ResponseDtoObject>>> {
            const localVarAxiosArgs = await RRepositoryControllerApiAxiosParamCreator(configuration).getSynchronizationStatus(id, options);
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
        async republishRRepository(id: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<any>>> {
            const localVarAxiosArgs = await RRepositoryControllerApiAxiosParamCreator(configuration).republishRRepository(id, options);
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
        async synchronizeWithMirrors(id: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>> {
            const localVarAxiosArgs = await RRepositoryControllerApiAxiosParamCreator(configuration).synchronizeWithMirrors(id, options);
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
        async updateRRepository(body: JsonPatch, id: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<any>>> {
            const localVarAxiosArgs = await RRepositoryControllerApiAxiosParamCreator(configuration).updateRRepository(body, id, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * RRepositoryControllerApi - factory interface
 * @export
 */
export const RRepositoryControllerApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async crash(options?: AxiosRequestConfig): Promise<AxiosResponse<ResponseDtoPagedModelEntityModelRRepositoryDto>> {
            return RRepositoryControllerApiFp(configuration).crash(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {RRepositoryDto} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createRRepository(body: RRepositoryDto, options?: AxiosRequestConfig): Promise<AxiosResponse<any>> {
            return RRepositoryControllerApiFp(configuration).createRRepository(body, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteRRepository(id: number, options?: AxiosRequestConfig): Promise<AxiosResponse<void>> {
            return RRepositoryControllerApiFp(configuration).deleteRRepository(id, options).then((request) => request(axios, basePath));
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
        async getAllRRepositories(page?: number, size?: number, sort?: Array<string>, deleted?: boolean, published?: boolean, maintainer?: Array<string>, name?: string, search?: string, options?: AxiosRequestConfig): Promise<AxiosResponse<ResponseDtoPagedModelEntityModelRRepositoryDto>> {
            return RRepositoryControllerApiFp(configuration).getAllRRepositories(page, size, sort, deleted, published, maintainer, name, search, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getRRepositoryById(id: number, options?: AxiosRequestConfig): Promise<AxiosResponse<ResponseDtoEntityModelRRepositoryDto>> {
            return RRepositoryControllerApiFp(configuration).getRRepositoryById(id, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getSynchronizationStatus(id: number, options?: AxiosRequestConfig): Promise<AxiosResponse<ResponseDtoObject>> {
            return RRepositoryControllerApiFp(configuration).getSynchronizationStatus(id, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async republishRRepository(id: number, options?: AxiosRequestConfig): Promise<AxiosResponse<any>> {
            return RRepositoryControllerApiFp(configuration).republishRRepository(id, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async synchronizeWithMirrors(id: number, options?: AxiosRequestConfig): Promise<AxiosResponse<void>> {
            return RRepositoryControllerApiFp(configuration).synchronizeWithMirrors(id, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {JsonPatch} body 
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateRRepository(body: JsonPatch, id: number, options?: AxiosRequestConfig): Promise<AxiosResponse<any>> {
            return RRepositoryControllerApiFp(configuration).updateRRepository(body, id, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * RRepositoryControllerApi - object-oriented interface
 * @export
 * @class RRepositoryControllerApi
 * @extends {BaseAPI}
 */
export class RRepositoryControllerApi extends BaseAPI {
    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RRepositoryControllerApi
     */
    public async crash(options?: AxiosRequestConfig) : Promise<AxiosResponse<ResponseDtoPagedModelEntityModelRRepositoryDto>> {
        return RRepositoryControllerApiFp(this.configuration).crash(options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @param {RRepositoryDto} body 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RRepositoryControllerApi
     */
    public async createRRepository(body: RRepositoryDto, options?: AxiosRequestConfig) : Promise<AxiosResponse<any>> {
        return RRepositoryControllerApiFp(this.configuration).createRRepository(body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @param {number} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RRepositoryControllerApi
     */
    public async deleteRRepository(id: number, options?: AxiosRequestConfig) : Promise<AxiosResponse<void>> {
        return RRepositoryControllerApiFp(this.configuration).deleteRRepository(id, options).then((request) => request(this.axios, this.basePath));
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
     * @memberof RRepositoryControllerApi
     */
    public async getAllRRepositories(page?: number, size?: number, sort?: Array<string>, deleted?: boolean, published?: boolean, maintainer?: Array<string>, name?: string, search?: string, options?: AxiosRequestConfig) : Promise<AxiosResponse<ResponseDtoPagedModelEntityModelRRepositoryDto>> {
        return RRepositoryControllerApiFp(this.configuration).getAllRRepositories(page, size, sort, deleted, published, maintainer, name, search, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @param {number} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RRepositoryControllerApi
     */
    public async getRRepositoryById(id: number, options?: AxiosRequestConfig) : Promise<AxiosResponse<ResponseDtoEntityModelRRepositoryDto>> {
        return RRepositoryControllerApiFp(this.configuration).getRRepositoryById(id, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @param {number} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RRepositoryControllerApi
     */
    public async getSynchronizationStatus(id: number, options?: AxiosRequestConfig) : Promise<AxiosResponse<ResponseDtoObject>> {
        return RRepositoryControllerApiFp(this.configuration).getSynchronizationStatus(id, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @param {number} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RRepositoryControllerApi
     */
    public async republishRRepository(id: number, options?: AxiosRequestConfig) : Promise<AxiosResponse<any>> {
        return RRepositoryControllerApiFp(this.configuration).republishRRepository(id, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @param {number} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RRepositoryControllerApi
     */
    public async synchronizeWithMirrors(id: number, options?: AxiosRequestConfig) : Promise<AxiosResponse<void>> {
        return RRepositoryControllerApiFp(this.configuration).synchronizeWithMirrors(id, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @param {JsonPatch} body 
     * @param {number} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RRepositoryControllerApi
     */
    public async updateRRepository(body: JsonPatch, id: number, options?: AxiosRequestConfig) : Promise<AxiosResponse<any>> {
        return RRepositoryControllerApiFp(this.configuration).updateRRepository(body, id, options).then((request) => request(this.axios, this.basePath));
    }
}
