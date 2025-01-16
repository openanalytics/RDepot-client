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

import { EntityModelPackageDto } from './entity-model-package-dto'
/**
 *
 *
 * @export
 * @interface ResponseDtoEntityModelPackageDto
 */
export interface ResponseDtoEntityModelPackageDto {
  /**
   * @type {string}
   * @memberof ResponseDtoEntityModelPackageDto
   */
  status?: ResponseDtoEntityModelPackageDtoStatusEnum

  /**
   * @type {number}
   * @memberof ResponseDtoEntityModelPackageDto
   */
  code?: number

  /**
   * @type {string}
   * @memberof ResponseDtoEntityModelPackageDto
   */
  message?: string

  /**
   * @type {string}
   * @memberof ResponseDtoEntityModelPackageDto
   */
  messageCode?: string

  /**
   * @type {EntityModelPackageDto}
   * @memberof ResponseDtoEntityModelPackageDto
   */
  data?: EntityModelPackageDto
}

/**
 * @export
 * @enum {string}
 */
export enum ResponseDtoEntityModelPackageDtoStatusEnum {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  WARNING = 'WARNING'
}
