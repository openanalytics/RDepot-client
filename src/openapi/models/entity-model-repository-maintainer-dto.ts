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

import { Links } from './links'
import { RepositoryProjection } from './repository-projection'
import { UserProjection } from './user-projection'
/**
 *
 *
 * @export
 * @interface EntityModelRepositoryMaintainerDto
 */
export interface EntityModelRepositoryMaintainerDto {
  /**
   * @type {number}
   * @memberof EntityModelRepositoryMaintainerDto
   */
  id?: number

  /**
   * @type {UserProjection}
   * @memberof EntityModelRepositoryMaintainerDto
   */
  user?: UserProjection

  /**
   * @type {RepositoryProjection}
   * @memberof EntityModelRepositoryMaintainerDto
   */
  repository?: RepositoryProjection

  /**
   * @type {boolean}
   * @memberof EntityModelRepositoryMaintainerDto
   */
  deleted?: boolean

  /**
   * @type {Links}
   * @memberof EntityModelRepositoryMaintainerDto
   */
  links?: Links
}
