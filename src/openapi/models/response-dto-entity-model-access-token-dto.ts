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

/* eslint-disable */

import { EntityModelAccessTokenDto } from './entity-model-access-token-dto'
/**
 *
 *
 * @export
 * @interface ResponseDtoEntityModelAccessTokenDto
 */
export interface ResponseDtoEntityModelAccessTokenDto {
  /**
   * @type {string}
   * @memberof ResponseDtoEntityModelAccessTokenDto
   */
  status?: ResponseDtoEntityModelAccessTokenDtoStatusEnum

  /**
   * @type {number}
   * @memberof ResponseDtoEntityModelAccessTokenDto
   */
  code?: number

  /**
   * @type {string}
   * @memberof ResponseDtoEntityModelAccessTokenDto
   */
  message?: string

  /**
   * @type {string}
   * @memberof ResponseDtoEntityModelAccessTokenDto
   */
  messageCode?: string

  /**
   * @type {EntityModelAccessTokenDto}
   * @memberof ResponseDtoEntityModelAccessTokenDto
   */
  data?: EntityModelAccessTokenDto
}

/**
 * @export
 * @enum {string}
 */
export enum ResponseDtoEntityModelAccessTokenDtoStatusEnum {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  WARNING = 'WARNING'
}
