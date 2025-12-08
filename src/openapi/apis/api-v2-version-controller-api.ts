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
import { ResponseDtoString } from '../models';
/**
 * ApiV2VersionControllerApi - axios parameter creator
 * @export
 */
export const ApiV2VersionControllerApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getVersion: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/v2/manager/version`;
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
    }
};

/**
 * ApiV2VersionControllerApi - functional programming interface
 * @export
 */
export const ApiV2VersionControllerApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getVersion(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<ResponseDtoString>>> {
            const localVarAxiosArgs = await ApiV2VersionControllerApiAxiosParamCreator(configuration).getVersion(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * ApiV2VersionControllerApi - factory interface
 * @export
 */
export const ApiV2VersionControllerApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getVersion(options?: AxiosRequestConfig): Promise<AxiosResponse<ResponseDtoString>> {
            return ApiV2VersionControllerApiFp(configuration).getVersion(options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * ApiV2VersionControllerApi - object-oriented interface
 * @export
 * @class ApiV2VersionControllerApi
 * @extends {BaseAPI}
 */
export class ApiV2VersionControllerApi extends BaseAPI {
    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ApiV2VersionControllerApi
     */
    public async getVersion(options?: AxiosRequestConfig) : Promise<AxiosResponse<ResponseDtoString>> {
        return ApiV2VersionControllerApiFp(this.configuration).getVersion(options).then((request) => request(this.axios, this.basePath));
    }
}
