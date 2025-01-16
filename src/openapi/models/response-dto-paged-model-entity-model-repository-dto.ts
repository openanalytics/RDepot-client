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

import { PagedModelEntityModelRepositoryDto } from './paged-model-entity-model-repository-dto'
/**
 *
 *
 * @export
 * @interface ResponseDtoPagedModelEntityModelRepositoryDto
 */
export interface ResponseDtoPagedModelEntityModelRepositoryDto {
  /**
   * @type {string}
   * @memberof ResponseDtoPagedModelEntityModelRepositoryDto
   */
  status?: ResponseDtoPagedModelEntityModelRepositoryDtoStatusEnum

  /**
   * @type {number}
   * @memberof ResponseDtoPagedModelEntityModelRepositoryDto
   */
  code?: number

  /**
   * @type {string}
   * @memberof ResponseDtoPagedModelEntityModelRepositoryDto
   */
  message?: string

  /**
   * @type {string}
   * @memberof ResponseDtoPagedModelEntityModelRepositoryDto
   */
  messageCode?: string

  /**
   * @type {PagedModelEntityModelRepositoryDto}
   * @memberof ResponseDtoPagedModelEntityModelRepositoryDto
   */
  data?: PagedModelEntityModelRepositoryDto
}

/**
 * @export
 * @enum {string}
 */
export enum ResponseDtoPagedModelEntityModelRepositoryDtoStatusEnum {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  WARNING = 'WARNING'
}
