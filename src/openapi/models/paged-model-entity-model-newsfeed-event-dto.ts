/*
 * R Depot
 *
 * Copyright (C) 2012-2025 Open Analytics NV
 *
 * ===========================================================================
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the Apache License as published by
 * The Apache Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * Apache License for more details.
 *
 * You should have received a copy of the Apache License
 * along with this program. If not, see <http://www.apache.org/licenses/>
 *
 */

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
import { PagedModelEntityModelNewsfeedEventDtoEmbedded } from './paged-model-entity-model-newsfeed-event-dto-embedded'
/**
 *
 *
 * @export
 * @interface PagedModelEntityModelNewsfeedEventDto
 */
export interface PagedModelEntityModelNewsfeedEventDto {
  /**
   * @type {PagedModelEntityModelNewsfeedEventDtoEmbedded}
   * @memberof PagedModelEntityModelNewsfeedEventDto
   */
  embedded?: PagedModelEntityModelNewsfeedEventDtoEmbedded

  /**
   * @type {Links}
   * @memberof PagedModelEntityModelNewsfeedEventDto
   */
  links?: Links

  /**
   * @type {PageMetadata}
   * @memberof PagedModelEntityModelNewsfeedEventDto
   */
  page?: PageMetadata
}
