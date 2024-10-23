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

import { EntityModelPackageMaintainerDto } from './entity-model-package-maintainer-dto'
/**
 *
 *
 * @export
 * @interface ResponseDtoEntityModelPackageMaintainerDto
 */
export interface ResponseDtoEntityModelPackageMaintainerDto {
  /**
   * @type {string}
   * @memberof ResponseDtoEntityModelPackageMaintainerDto
   */
  status?: ResponseDtoEntityModelPackageMaintainerDtoStatusEnum

  /**
   * @type {number}
   * @memberof ResponseDtoEntityModelPackageMaintainerDto
   */
  code?: number

  /**
   * @type {string}
   * @memberof ResponseDtoEntityModelPackageMaintainerDto
   */
  message?: string

  /**
   * @type {string}
   * @memberof ResponseDtoEntityModelPackageMaintainerDto
   */
  messageCode?: string

  /**
   * @type {EntityModelPackageMaintainerDto}
   * @memberof ResponseDtoEntityModelPackageMaintainerDto
   */
  data?: EntityModelPackageMaintainerDto
}

/**
 * @export
 * @enum {string}
 */
export enum ResponseDtoEntityModelPackageMaintainerDtoStatusEnum {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  WARNING = 'WARNING'
}
