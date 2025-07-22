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
import { ResponseDtoEntityModelPackageDto } from '../models';
import { ResponseDtoPagedModelEntityModelPackageDto } from '../models';
/**
 * ApiV2PackageControllerApi - axios parameter creator
 * @export
 */
export const ApiV2PackageControllerApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {number} [page] Zero-based page index (0..N)
         * @param {number} [size] The size of the page to be returned
         * @param {Array<string>} [sort] Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
         * @param {Array<string>} [repository] 
         * @param {boolean} [deleted] 
         * @param {Array<string>} [submissionState] 
         * @param {Array<string>} [technology] 
         * @param {string} [search] 
         * @param {Array<string>} [maintainer] 
         * @param {Array<string>} [notMaintainedBy] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAllPackages: async (page?: number, size?: number, sort?: Array<string>, repository?: Array<string>, deleted?: boolean, submissionState?: Array<string>, technology?: Array<string>, search?: string, maintainer?: Array<string>, notMaintainedBy?: Array<string>, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/v2/manager/packages`;
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

            if (repository) {
                localVarQueryParameter['repository'] = repository;
            }

            if (deleted !== undefined) {
                localVarQueryParameter['deleted'] = deleted;
            }

            if (submissionState) {
                localVarQueryParameter['submissionState'] = submissionState;
            }

            if (technology) {
                localVarQueryParameter['technology'] = technology;
            }

            if (search !== undefined) {
                localVarQueryParameter['search'] = search;
            }

            if (maintainer) {
                localVarQueryParameter['maintainer'] = maintainer;
            }

            if (notMaintainedBy) {
                localVarQueryParameter['notMaintainedBy'] = notMaintainedBy;
            }

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
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
        getPackageById: async (id: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling getPackageById.');
            }
            const localVarPath = `/api/v2/manager/packages/{id}`
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
                query.set(key, localVarQueryParameter[key]);
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
    }
};

/**
 * ApiV2PackageControllerApi - functional programming interface
 * @export
 */
export const ApiV2PackageControllerApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @param {number} [page] Zero-based page index (0..N)
         * @param {number} [size] The size of the page to be returned
         * @param {Array<string>} [sort] Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
         * @param {Array<string>} [repository] 
         * @param {boolean} [deleted] 
         * @param {Array<string>} [submissionState] 
         * @param {Array<string>} [technology] 
         * @param {string} [search] 
         * @param {Array<string>} [maintainer] 
         * @param {Array<string>} [notMaintainedBy] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getAllPackages(page?: number, size?: number, sort?: Array<string>, repository?: Array<string>, deleted?: boolean, submissionState?: Array<string>, technology?: Array<string>, search?: string, maintainer?: Array<string>, notMaintainedBy?: Array<string>, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<ResponseDtoPagedModelEntityModelPackageDto>>> {
            const localVarAxiosArgs = await ApiV2PackageControllerApiAxiosParamCreator(configuration).getAllPackages(page, size, sort, repository, deleted, submissionState, technology, search, maintainer, notMaintainedBy, options);
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
        async getPackageById(id: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<ResponseDtoEntityModelPackageDto>>> {
            const localVarAxiosArgs = await ApiV2PackageControllerApiAxiosParamCreator(configuration).getPackageById(id, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * ApiV2PackageControllerApi - factory interface
 * @export
 */
export const ApiV2PackageControllerApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * 
         * @param {number} [page] Zero-based page index (0..N)
         * @param {number} [size] The size of the page to be returned
         * @param {Array<string>} [sort] Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
         * @param {Array<string>} [repository] 
         * @param {boolean} [deleted] 
         * @param {Array<string>} [submissionState] 
         * @param {Array<string>} [technology] 
         * @param {string} [search] 
         * @param {Array<string>} [maintainer] 
         * @param {Array<string>} [notMaintainedBy] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getAllPackages(page?: number, size?: number, sort?: Array<string>, repository?: Array<string>, deleted?: boolean, submissionState?: Array<string>, technology?: Array<string>, search?: string, maintainer?: Array<string>, notMaintainedBy?: Array<string>, options?: AxiosRequestConfig): Promise<AxiosResponse<ResponseDtoPagedModelEntityModelPackageDto>> {
            return ApiV2PackageControllerApiFp(configuration).getAllPackages(page, size, sort, repository, deleted, submissionState, technology, search, maintainer, notMaintainedBy, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getPackageById(id: number, options?: AxiosRequestConfig): Promise<AxiosResponse<ResponseDtoEntityModelPackageDto>> {
            return ApiV2PackageControllerApiFp(configuration).getPackageById(id, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * ApiV2PackageControllerApi - object-oriented interface
 * @export
 * @class ApiV2PackageControllerApi
 * @extends {BaseAPI}
 */
export class ApiV2PackageControllerApi extends BaseAPI {
    /**
     * 
     * @param {number} [page] Zero-based page index (0..N)
     * @param {number} [size] The size of the page to be returned
     * @param {Array<string>} [sort] Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @param {Array<string>} [repository] 
     * @param {boolean} [deleted] 
     * @param {Array<string>} [submissionState] 
     * @param {Array<string>} [technology] 
     * @param {string} [search] 
     * @param {Array<string>} [maintainer] 
     * @param {Array<string>} [notMaintainedBy] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ApiV2PackageControllerApi
     */
    public async getAllPackages(page?: number, size?: number, sort?: Array<string>, repository?: Array<string>, deleted?: boolean, submissionState?: Array<string>, technology?: Array<string>, search?: string, maintainer?: Array<string>, notMaintainedBy?: Array<string>, options?: AxiosRequestConfig) : Promise<AxiosResponse<ResponseDtoPagedModelEntityModelPackageDto>> {
        return ApiV2PackageControllerApiFp(this.configuration).getAllPackages(page, size, sort, repository, deleted, submissionState, technology, search, maintainer, notMaintainedBy, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @param {number} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ApiV2PackageControllerApi
     */
    public async getPackageById(id: number, options?: AxiosRequestConfig) : Promise<AxiosResponse<ResponseDtoEntityModelPackageDto>> {
        return ApiV2PackageControllerApiFp(this.configuration).getPackageById(id, options).then((request) => request(this.axios, this.basePath));
    }
}
