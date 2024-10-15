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
/**
 *
 *
 * @export
 * @interface EntityModelPythonRepositoryDto
 */
export interface EntityModelPythonRepositoryDto {
  /**
   * @type {number}
   * @memberof EntityModelPythonRepositoryDto
   */
  id?: number

  /**
   * @type {number}
   * @memberof EntityModelPythonRepositoryDto
   */
  version?: number

  /**
   * @type {string}
   * @memberof EntityModelPythonRepositoryDto
   */
  publicationUri?: string

  /**
   * @type {string}
   * @memberof EntityModelPythonRepositoryDto
   */
  name?: string

  /**
   * @type {string}
   * @memberof EntityModelPythonRepositoryDto
   */
  serverAddress?: string

  /**
   * @type {boolean}
   * @memberof EntityModelPythonRepositoryDto
   */
  deleted?: boolean

  /**
   * @type {boolean}
   * @memberof EntityModelPythonRepositoryDto
   */
  published?: boolean

  /**
   * @type {boolean}
   * @memberof EntityModelPythonRepositoryDto
   */
  synchronizing?: boolean

  /**
   * @type {string}
   * @memberof EntityModelPythonRepositoryDto
   */
  technology?: string

  /**
   * @type {number}
   * @memberof EntityModelPythonRepositoryDto
   */
  numberOfPackages?: number

  /**
   * @type {string}
   * @memberof EntityModelPythonRepositoryDto
   */
  lastPublicationTimestamp?: string

  /**
   * @type {string}
   * @memberof EntityModelPythonRepositoryDto
   */
  lastModifiedTimestamp?: string

  /**
   * @type {boolean}
   * @memberof EntityModelPythonRepositoryDto
   */
  lastPublicationSuccessful?: boolean

  /**
   * @type {string}
   * @memberof EntityModelPythonRepositoryDto
   */
  hashMethod?: EntityModelPythonRepositoryDtoHashMethodEnum

  /**
   * @type {Links}
   * @memberof EntityModelPythonRepositoryDto
   */
  links?: Links
}

/**
 * @export
 * @enum {string}
 */
export enum EntityModelPythonRepositoryDtoHashMethodEnum {
  MD5 = 'MD5',
  SHA1 = 'SHA1',
  SHA224 = 'SHA224',
  SHA256 = 'SHA256',
  SHA384 = 'SHA384',
  SHA512 = 'SHA512'
}
