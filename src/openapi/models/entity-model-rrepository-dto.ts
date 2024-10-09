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
/**
 *
 *
 * @export
 * @interface EntityModelRRepositoryDto
 */
export interface EntityModelRRepositoryDto {
  /**
   * @type {number}
   * @memberof EntityModelRRepositoryDto
   */
  id?: number

  /**
   * @type {number}
   * @memberof EntityModelRRepositoryDto
   */
  version?: number

  /**
   * @type {string}
   * @memberof EntityModelRRepositoryDto
   */
  publicationUri?: string

  /**
   * @type {string}
   * @memberof EntityModelRRepositoryDto
   */
  name?: string

  /**
   * @type {string}
   * @memberof EntityModelRRepositoryDto
   */
  serverAddress?: string

  /**
   * @type {boolean}
   * @memberof EntityModelRRepositoryDto
   */
  deleted?: boolean

  /**
   * @type {boolean}
   * @memberof EntityModelRRepositoryDto
   */
  published?: boolean

  /**
   * @type {boolean}
   * @memberof EntityModelRRepositoryDto
   */
  synchronizing?: boolean

  /**
   * @type {string}
   * @memberof EntityModelRRepositoryDto
   */
  technology?: string

  /**
   * @type {number}
   * @memberof EntityModelRRepositoryDto
   */
  numberOfPackages?: number

  /**
   * @type {string}
   * @memberof EntityModelRRepositoryDto
   */
  lastPublicationTimestamp?: string

  /**
   * @type {string}
   * @memberof EntityModelRRepositoryDto
   */
  lastModifiedTimestamp?: string

  /**
   * @type {boolean}
   * @memberof EntityModelRRepositoryDto
   */
  lastPublicationSuccessful?: boolean

  /**
   * @type {Links}
   * @memberof EntityModelRRepositoryDto
   */
  links?: Links
}
