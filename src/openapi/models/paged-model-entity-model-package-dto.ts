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
import { PageMetadata } from './page-metadata'
import { PagedModelEntityModelPackageDtoEmbedded } from './paged-model-entity-model-package-dto-embedded'
/**
 *
 *
 * @export
 * @interface PagedModelEntityModelPackageDto
 */
export interface PagedModelEntityModelPackageDto {
  /**
   * @type {PagedModelEntityModelPackageDtoEmbedded}
   * @memberof PagedModelEntityModelPackageDto
   */
  embedded?: PagedModelEntityModelPackageDtoEmbedded

  /**
   * @type {Links}
   * @memberof PagedModelEntityModelPackageDto
   */
  links?: Links

  /**
   * @type {PageMetadata}
   * @memberof PagedModelEntityModelPackageDto
   */
  page?: PageMetadata
}
