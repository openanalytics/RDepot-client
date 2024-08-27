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
import { Links } from './links'
import { RepositoryProjection } from './repository-projection'
import { SubmissionProjection } from './submission-projection'
import { UserProjection } from './user-projection'
/**
 *
 *
 * @export
 * @interface EntityModelPackageDto
 */
export interface EntityModelPackageDto {
  /**
   * @type {number}
   * @memberof EntityModelPackageDto
   */
  id?: number

  /**
   * @type {UserProjection}
   * @memberof EntityModelPackageDto
   */
  user?: UserProjection

  /**
   * @type {RepositoryProjection}
   * @memberof EntityModelPackageDto
   */
  repository?: RepositoryProjection

  /**
   * @type {SubmissionProjection}
   * @memberof EntityModelPackageDto
   */
  submission?: SubmissionProjection

  /**
   * @type {string}
   * @memberof EntityModelPackageDto
   */
  name?: string

  /**
   * @type {string}
   * @memberof EntityModelPackageDto
   */
  version?: string

  /**
   * @type {string}
   * @memberof EntityModelPackageDto
   */
  source?: string

  /**
   * @type {boolean}
   * @memberof EntityModelPackageDto
   */
  active?: boolean

  /**
   * @type {boolean}
   * @memberof EntityModelPackageDto
   */
  deleted?: boolean

  /**
   * @type {string}
   * @memberof EntityModelPackageDto
   */
  technology?: string

  /**
   * @type {boolean}
   * @memberof EntityModelPackageDto
   */
  binary?: boolean

  /**
   * @type {string}
   * @memberof EntityModelPackageDto
   */
  description?: string

  /**
   * @type {string}
   * @memberof EntityModelPackageDto
   */
  author?: string

  /**
   * @type {string}
   * @memberof EntityModelPackageDto
   */
  title?: string

  /**
   * @type {string}
   * @memberof EntityModelPackageDto
   */
  url?: string

  /**
   * @type {Links}
   * @memberof EntityModelPackageDto
   */
  links?: Links
}
