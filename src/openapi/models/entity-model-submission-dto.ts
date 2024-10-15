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

import { EntityModelPackageDto } from './entity-model-package-dto'
import { Links } from './links'
import { UserProjection } from './user-projection'
/**
 *
 *
 * @export
 * @interface EntityModelSubmissionDto
 */
export interface EntityModelSubmissionDto {
  /**
   * @type {number}
   * @memberof EntityModelSubmissionDto
   */
  id?: number

  /**
   * @type {EntityModelPackageDto}
   * @memberof EntityModelSubmissionDto
   */
  packageBag?: EntityModelPackageDto

  /**
   * @type {UserProjection}
   * @memberof EntityModelSubmissionDto
   */
  submitter?: UserProjection

  /**
   * @type {UserProjection}
   * @memberof EntityModelSubmissionDto
   */
  approver?: UserProjection

  /**
   * @type {string}
   * @memberof EntityModelSubmissionDto
   */
  changes?: string

  /**
   * @type {string}
   * @memberof EntityModelSubmissionDto
   */
  state?: EntityModelSubmissionDtoStateEnum

  /**
   * @type {string}
   * @memberof EntityModelSubmissionDto
   */
  created?: string

  /**
   * @type {string}
   * @memberof EntityModelSubmissionDto
   */
  technology?: string

  /**
   * @type {Links}
   * @memberof EntityModelSubmissionDto
   */
  links?: Links
}

/**
 * @export
 * @enum {string}
 */
export enum EntityModelSubmissionDtoStateEnum {
  ACCEPTED = 'ACCEPTED',
  WAITING = 'WAITING',
  CANCELLED = 'CANCELLED',
  REJECTED = 'REJECTED'
}
