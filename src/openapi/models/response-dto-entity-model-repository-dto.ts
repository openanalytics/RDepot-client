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

/* tslint:disable */
/* eslint-disable */
import { EntityModelRepositoryDto } from './entity-model-repository-dto'
/**
 *
 *
 * @export
 * @interface ResponseDtoEntityModelRepositoryDto
 */
export interface ResponseDtoEntityModelRepositoryDto {
  /**
   * @type {string}
   * @memberof ResponseDtoEntityModelRepositoryDto
   */
  status?: ResponseDtoEntityModelRepositoryDtoStatusEnum

  /**
   * @type {number}
   * @memberof ResponseDtoEntityModelRepositoryDto
   */
  code?: number

  /**
   * @type {string}
   * @memberof ResponseDtoEntityModelRepositoryDto
   */
  message?: string

  /**
   * @type {string}
   * @memberof ResponseDtoEntityModelRepositoryDto
   */
  messageCode?: string

  /**
   * @type {EntityModelRepositoryDto}
   * @memberof ResponseDtoEntityModelRepositoryDto
   */
  data?: EntityModelRepositoryDto
}

/**
 * @export
 * @enum {string}
 */
export enum ResponseDtoEntityModelRepositoryDtoStatusEnum {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  WARNING = 'WARNING'
}
