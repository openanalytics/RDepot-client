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
import { RepositoryProjection } from './repository-projection'
import { UserProjection } from './user-projection'
/**
 *
 *
 * @export
 * @interface PackageMaintainerDto
 */
export interface PackageMaintainerDto {
  /**
   * @type {number}
   * @memberof PackageMaintainerDto
   */
  id?: number

  /**
   * @type {UserProjection}
   * @memberof PackageMaintainerDto
   */
  user?: UserProjection

  /**
   * @type {string}
   * @memberof PackageMaintainerDto
   */
  packageName?: string

  /**
   * @type {RepositoryProjection}
   * @memberof PackageMaintainerDto
   */
  repository?: RepositoryProjection

  /**
   * @type {boolean}
   * @memberof PackageMaintainerDto
   */
  deleted?: boolean
}
