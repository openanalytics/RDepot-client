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
import { PagedModelEntityModelPythonRepositoryDto } from './paged-model-entity-model-python-repository-dto';
/**
 * 
 * @export
 * @interface ResponseDtoPagedModelEntityModelPythonRepositoryDto
 */
export interface ResponseDtoPagedModelEntityModelPythonRepositoryDto {
    /**
     * 
     * @type {string}
     * @memberof ResponseDtoPagedModelEntityModelPythonRepositoryDto
     */
    status?: ResponseDtoPagedModelEntityModelPythonRepositoryDtoStatusEnum;
    /**
     * 
     * @type {number}
     * @memberof ResponseDtoPagedModelEntityModelPythonRepositoryDto
     */
    code?: number;
    /**
     * 
     * @type {string}
     * @memberof ResponseDtoPagedModelEntityModelPythonRepositoryDto
     */
    message?: string;
    /**
     * 
     * @type {string}
     * @memberof ResponseDtoPagedModelEntityModelPythonRepositoryDto
     */
    messageCode?: string;
    /**
     * 
     * @type {PagedModelEntityModelPythonRepositoryDto}
     * @memberof ResponseDtoPagedModelEntityModelPythonRepositoryDto
     */
    data?: PagedModelEntityModelPythonRepositoryDto;
}

/**
    * @export
    * @enum {string}
    */
export enum ResponseDtoPagedModelEntityModelPythonRepositoryDtoStatusEnum {
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR'
}

