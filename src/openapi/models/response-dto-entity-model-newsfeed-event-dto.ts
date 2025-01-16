/* tslint:disable */

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

import { EntityModelNewsfeedEventDto } from './entity-model-newsfeed-event-dto'
/**
 *
 *
 * @export
 * @interface ResponseDtoEntityModelNewsfeedEventDto
 */
export interface ResponseDtoEntityModelNewsfeedEventDto {
  /**
   * @type {string}
   * @memberof ResponseDtoEntityModelNewsfeedEventDto
   */
  status?: ResponseDtoEntityModelNewsfeedEventDtoStatusEnum

  /**
   * @type {number}
   * @memberof ResponseDtoEntityModelNewsfeedEventDto
   */
  code?: number

  /**
   * @type {string}
   * @memberof ResponseDtoEntityModelNewsfeedEventDto
   */
  message?: string

  /**
   * @type {string}
   * @memberof ResponseDtoEntityModelNewsfeedEventDto
   */
  messageCode?: string

  /**
   * @type {EntityModelNewsfeedEventDto}
   * @memberof ResponseDtoEntityModelNewsfeedEventDto
   */
  data?: EntityModelNewsfeedEventDto
}

/**
 * @export
 * @enum {string}
 */
export enum ResponseDtoEntityModelNewsfeedEventDtoStatusEnum {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  WARNING = 'WARNING'
}
