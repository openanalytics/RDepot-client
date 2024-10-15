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

/**
 *
 *
 * @export
 * @interface RRepositoryDto
 */
export interface RRepositoryDto {
  /**
   * @type {number}
   * @memberof RRepositoryDto
   */
  id?: number

  /**
   * @type {number}
   * @memberof RRepositoryDto
   */
  version?: number

  /**
   * @type {string}
   * @memberof RRepositoryDto
   */
  publicationUri?: string

  /**
   * @type {string}
   * @memberof RRepositoryDto
   */
  name?: string

  /**
   * @type {string}
   * @memberof RRepositoryDto
   */
  serverAddress?: string

  /**
   * @type {boolean}
   * @memberof RRepositoryDto
   */
  deleted?: boolean

  /**
   * @type {boolean}
   * @memberof RRepositoryDto
   */
  published?: boolean

  /**
   * @type {boolean}
   * @memberof RRepositoryDto
   */
  synchronizing?: boolean

  /**
   * @type {string}
   * @memberof RRepositoryDto
   */
  technology?: string

  /**
   * @type {number}
   * @memberof RRepositoryDto
   */
  numberOfPackages?: number

  /**
   * @type {string}
   * @memberof RRepositoryDto
   */
  lastPublicationTimestamp?: string

  /**
   * @type {string}
   * @memberof RRepositoryDto
   */
  lastModifiedTimestamp?: string

  /**
   * @type {boolean}
   * @memberof RRepositoryDto
   */
  lastPublicationSuccessful?: boolean
}
