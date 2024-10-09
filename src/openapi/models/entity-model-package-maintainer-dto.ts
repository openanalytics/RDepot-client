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

import { Links } from './links'
import { RepositoryProjection } from './repository-projection'
import { UserProjection } from './user-projection'
/**
 *
 *
 * @export
 * @interface EntityModelPackageMaintainerDto
 */
export interface EntityModelPackageMaintainerDto {
  /**
   * @type {number}
   * @memberof EntityModelPackageMaintainerDto
   */
  id?: number

  /**
   * @type {UserProjection}
   * @memberof EntityModelPackageMaintainerDto
   */
  user?: UserProjection

  /**
   * @type {string}
   * @memberof EntityModelPackageMaintainerDto
   */
  packageName?: string

  /**
   * @type {RepositoryProjection}
   * @memberof EntityModelPackageMaintainerDto
   */
  repository?: RepositoryProjection

  /**
   * @type {boolean}
   * @memberof EntityModelPackageMaintainerDto
   */
  deleted?: boolean

  /**
   * @type {Links}
   * @memberof EntityModelPackageMaintainerDto
   */
  links?: Links
}
