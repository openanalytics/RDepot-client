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

import { EntityModelSubmissionDto } from './entity-model-submission-dto'
/**
 *
 *
 * @export
 * @interface ResponseDtoEntityModelSubmissionDto
 */
export interface ResponseDtoEntityModelSubmissionDto {
  /**
   * @type {string}
   * @memberof ResponseDtoEntityModelSubmissionDto
   */
  status?: ResponseDtoEntityModelSubmissionDtoStatusEnum

  /**
   * @type {number}
   * @memberof ResponseDtoEntityModelSubmissionDto
   */
  code?: number

  /**
   * @type {string}
   * @memberof ResponseDtoEntityModelSubmissionDto
   */
  message?: string

  /**
   * @type {string}
   * @memberof ResponseDtoEntityModelSubmissionDto
   */
  messageCode?: string

  /**
   * @type {EntityModelSubmissionDto}
   * @memberof ResponseDtoEntityModelSubmissionDto
   */
  data?: EntityModelSubmissionDto
}

/**
 * @export
 * @enum {string}
 */
export enum ResponseDtoEntityModelSubmissionDtoStatusEnum {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  WARNING = 'WARNING'
}
