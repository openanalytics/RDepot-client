/*
 * R Depot
 *
 * Copyright (C) 2012-2024 Open Analytics NV
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

import { PublicConfigurationDto } from './public-configuration-dto'
/**
 *
 *
 * @export
 * @interface ResponseDtoPublicConfigurationDto
 */
export interface ResponseDtoPublicConfigurationDto {
  /**
   * @type {string}
   * @memberof ResponseDtoPublicConfigurationDto
   */
  status?: ResponseDtoPublicConfigurationDtoStatusEnum

  /**
   * @type {number}
   * @memberof ResponseDtoPublicConfigurationDto
   */
  code?: number

  /**
   * @type {string}
   * @memberof ResponseDtoPublicConfigurationDto
   */
  message?: string

  /**
   * @type {string}
   * @memberof ResponseDtoPublicConfigurationDto
   */
  messageCode?: string

  /**
   * @type {PublicConfigurationDto}
   * @memberof ResponseDtoPublicConfigurationDto
   */
  data?: PublicConfigurationDto
}

/**
 * @export
 * @enum {string}
 */
export enum ResponseDtoPublicConfigurationDtoStatusEnum {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  WARNING = 'WARNING'
}
