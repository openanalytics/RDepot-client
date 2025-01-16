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

import { Links } from './links'
import { PageMetadata } from './page-metadata'
import { PagedModelEntityModelRepositoryMaintainerDtoEmbedded } from './paged-model-entity-model-repository-maintainer-dto-embedded'
/**
 *
 *
 * @export
 * @interface PagedModelEntityModelRepositoryMaintainerDto
 */
export interface PagedModelEntityModelRepositoryMaintainerDto {
  /**
   * @type {PagedModelEntityModelRepositoryMaintainerDtoEmbedded}
   * @memberof PagedModelEntityModelRepositoryMaintainerDto
   */
  embedded?: PagedModelEntityModelRepositoryMaintainerDtoEmbedded

  /**
   * @type {Links}
   * @memberof PagedModelEntityModelRepositoryMaintainerDto
   */
  links?: Links

  /**
   * @type {PageMetadata}
   * @memberof PagedModelEntityModelRepositoryMaintainerDto
   */
  page?: PageMetadata
}
