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
import { EntityModelRRepositoryDto } from './entity-model-rrepository-dto'
/**
 *
 * @export
 * @interface ResponseDtoEntityModelRRepositoryDto
 */
export interface ResponseDtoEntityModelRRepositoryDto {
  /**
   *
   * @type {string}
   * @memberof ResponseDtoEntityModelRRepositoryDto
   */
  status?: ResponseDtoEntityModelRRepositoryDtoStatusEnum
  /**
   *
   * @type {number}
   * @memberof ResponseDtoEntityModelRRepositoryDto
   */
  code?: number
  /**
   *
   * @type {string}
   * @memberof ResponseDtoEntityModelRRepositoryDto
   */
  message?: string
  /**
   *
   * @type {string}
   * @memberof ResponseDtoEntityModelRRepositoryDto
   */
  messageCode?: string
  /**
   *
   * @type {EntityModelRRepositoryDto}
   * @memberof ResponseDtoEntityModelRRepositoryDto
   */
  data?: EntityModelRRepositoryDto
}

/**
 * @export
 * @enum {string}
 */
export enum ResponseDtoEntityModelRRepositoryDtoStatusEnum {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
