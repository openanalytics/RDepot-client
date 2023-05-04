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
import globalAxios, { AxiosResponse, AxiosInstance, AxiosRequestConfig } from 'axios';
import { Configuration } from '../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
import { ResponseDtoEntityModelRepositoryDto } from '../models';
import { ResponseDtoPagedModelEntityModelRepositoryDto } from '../models';
/**
 * ApiV2RepositoryControllerApi - axios parameter creator
 * @export
 */
export const ApiV2RepositoryControllerApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {boolean} [deleted] 
         * @param {string} [name] 
         * @param {Array<string>} [technology] 
         * @param {number} [page] Zero-based page index (0..N)
         * @param {number} [size] The size of the page to be returned
         * @param {Array<string>} [sort] Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAllRepositories: async (deleted?: boolean, name?: string, technology?: Array<string>, page?: number, size?: number, sort?: Array<string>, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/v2/manager/repositories`;
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

            if (deleted !== undefined) {
                localVarQueryParameter['deleted'] = deleted;
            }

            if (name !== undefined) {
                localVarQueryParameter['name'] = name;
            }

            if (technology) {
                localVarQueryParameter['technology'] = technology;
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
        getRepositoryById: async (id: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling getRepositoryById.');
            }
            const localVarPath = `/api/v2/manager/repositories/{id}`
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
 * ApiV2RepositoryControllerApi - functional programming interface
 * @export
 */
export const ApiV2RepositoryControllerApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @param {boolean} [deleted] 
         * @param {string} [name] 
         * @param {Array<string>} [technology] 
         * @param {number} [page] Zero-based page index (0..N)
         * @param {number} [size] The size of the page to be returned
         * @param {Array<string>} [sort] Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getAllRepositories(deleted?: boolean, name?: string, technology?: Array<string>, page?: number, size?: number, sort?: Array<string>, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<ResponseDtoPagedModelEntityModelRepositoryDto>>> {
            const localVarAxiosArgs = await ApiV2RepositoryControllerApiAxiosParamCreator(configuration).getAllRepositories(deleted, name, technology, page, size, sort, options);
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
        async getRepositoryById(id: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<ResponseDtoEntityModelRepositoryDto>>> {
            const localVarAxiosArgs = await ApiV2RepositoryControllerApiAxiosParamCreator(configuration).getRepositoryById(id, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * ApiV2RepositoryControllerApi - factory interface
 * @export
 */
export const ApiV2RepositoryControllerApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * 
         * @param {boolean} [deleted] 
         * @param {string} [name] 
         * @param {Array<string>} [technology] 
         * @param {number} [page] Zero-based page index (0..N)
         * @param {number} [size] The size of the page to be returned
         * @param {Array<string>} [sort] Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getAllRepositories(deleted?: boolean, name?: string, technology?: Array<string>, page?: number, size?: number, sort?: Array<string>, options?: AxiosRequestConfig): Promise<AxiosResponse<ResponseDtoPagedModelEntityModelRepositoryDto>> {
            return ApiV2RepositoryControllerApiFp(configuration).getAllRepositories(deleted, name, technology, page, size, sort, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getRepositoryById(id: number, options?: AxiosRequestConfig): Promise<AxiosResponse<ResponseDtoEntityModelRepositoryDto>> {
            return ApiV2RepositoryControllerApiFp(configuration).getRepositoryById(id, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * ApiV2RepositoryControllerApi - object-oriented interface
 * @export
 * @class ApiV2RepositoryControllerApi
 * @extends {BaseAPI}
 */
export class ApiV2RepositoryControllerApi extends BaseAPI {
    /**
     * 
     * @param {boolean} [deleted] 
     * @param {string} [name] 
     * @param {Array<string>} [technology] 
     * @param {number} [page] Zero-based page index (0..N)
     * @param {number} [size] The size of the page to be returned
     * @param {Array<string>} [sort] Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ApiV2RepositoryControllerApi
     */
    public async getAllRepositories(deleted?: boolean, name?: string, technology?: Array<string>, page?: number, size?: number, sort?: Array<string>, options?: AxiosRequestConfig) : Promise<AxiosResponse<ResponseDtoPagedModelEntityModelRepositoryDto>> {
        return ApiV2RepositoryControllerApiFp(this.configuration).getAllRepositories(deleted, name, technology, page, size, sort, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @param {number} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ApiV2RepositoryControllerApi
     */
    public async getRepositoryById(id: number, options?: AxiosRequestConfig) : Promise<AxiosResponse<ResponseDtoEntityModelRepositoryDto>> {
        return ApiV2RepositoryControllerApiFp(this.configuration).getRepositoryById(id, options).then((request) => request(this.axios, this.basePath));
    }
}