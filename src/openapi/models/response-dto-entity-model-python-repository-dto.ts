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
import { EntityModelPythonRepositoryDto } from './entity-model-python-repository-dto';
/**
 * 
 * @export
 * @interface ResponseDtoEntityModelPythonRepositoryDto
 */
export interface ResponseDtoEntityModelPythonRepositoryDto {
    /**
     * 
     * @type {string}
     * @memberof ResponseDtoEntityModelPythonRepositoryDto
     */
    status?: ResponseDtoEntityModelPythonRepositoryDtoStatusEnum;
    /**
     * 
     * @type {number}
     * @memberof ResponseDtoEntityModelPythonRepositoryDto
     */
    code?: number;
    /**
     * 
     * @type {string}
     * @memberof ResponseDtoEntityModelPythonRepositoryDto
     */
    message?: string;
    /**
     * 
     * @type {string}
     * @memberof ResponseDtoEntityModelPythonRepositoryDto
     */
    messageCode?: string;
    /**
     * 
     * @type {EntityModelPythonRepositoryDto}
     * @memberof ResponseDtoEntityModelPythonRepositoryDto
     */
    data?: EntityModelPythonRepositoryDto;
}

/**
    * @export
    * @enum {string}
    */
export enum ResponseDtoEntityModelPythonRepositoryDtoStatusEnum {
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR'
}

