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
