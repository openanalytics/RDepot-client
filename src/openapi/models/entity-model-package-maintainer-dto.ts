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

import { Links } from './links'
import { RepositoryProjection } from './repository-projection'
import { UserProjection } from './user-projection'
/**
 *
 *
 * @export
 * @interface EntityModelPackageMaintainerDto
 */
export interface EntityModelPackageMaintainerDto {
  /**
   * @type {number}
   * @memberof EntityModelPackageMaintainerDto
   */
  id?: number

  /**
   * @type {UserProjection}
   * @memberof EntityModelPackageMaintainerDto
   */
  user?: UserProjection

  /**
   * @type {string}
   * @memberof EntityModelPackageMaintainerDto
   */
  packageName?: string

  /**
   * @type {RepositoryProjection}
   * @memberof EntityModelPackageMaintainerDto
   */
  repository?: RepositoryProjection

  /**
   * @type {boolean}
   * @memberof EntityModelPackageMaintainerDto
   */
  deleted?: boolean

  /**
   * @type {Links}
   * @memberof EntityModelPackageMaintainerDto
   */
  links?: Links
}
