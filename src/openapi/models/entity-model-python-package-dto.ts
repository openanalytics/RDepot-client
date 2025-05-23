/*
 * R Depot
 *
 * Copyright (C) 2012-2025 Open Analytics NV
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
 * RDEPOT API
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: v2
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

import { Links } from './links'
import { RepositoryProjection } from './repository-projection'
import { SubmissionProjection } from './submission-projection'
import { UserProjection } from './user-projection'
/**
 *
 *
 * @export
 * @interface EntityModelPythonPackageDto
 */
export interface EntityModelPythonPackageDto {
  /**
   * @type {number}
   * @memberof EntityModelPythonPackageDto
   */
  id?: number

  /**
   * @type {UserProjection}
   * @memberof EntityModelPythonPackageDto
   */
  user?: UserProjection

  /**
   * @type {RepositoryProjection}
   * @memberof EntityModelPythonPackageDto
   */
  repository?: RepositoryProjection

  /**
   * @type {SubmissionProjection}
   * @memberof EntityModelPythonPackageDto
   */
  submission?: SubmissionProjection

  /**
   * @type {string}
   * @memberof EntityModelPythonPackageDto
   */
  name?: string

  /**
   * @type {string}
   * @memberof EntityModelPythonPackageDto
   */
  version?: string

  /**
   * @type {string}
   * @memberof EntityModelPythonPackageDto
   */
  source?: string

  /**
   * @type {boolean}
   * @memberof EntityModelPythonPackageDto
   */
  active?: boolean

  /**
   * @type {boolean}
   * @memberof EntityModelPythonPackageDto
   */
  deleted?: boolean

  /**
   * @type {string}
   * @memberof EntityModelPythonPackageDto
   */
  technology?: string

  /**
   * @type {boolean}
   * @memberof EntityModelPythonPackageDto
   */
  binary?: boolean

  /**
   * @type {string}
   * @memberof EntityModelPythonPackageDto
   */
  description?: string

  /**
   * @type {string}
   * @memberof EntityModelPythonPackageDto
   */
  author?: string

  /**
   * @type {string}
   * @memberof EntityModelPythonPackageDto
   */
  title?: string

  /**
   * @type {string}
   * @memberof EntityModelPythonPackageDto
   */
  url?: string

  /**
   * @type {string}
   * @memberof EntityModelPythonPackageDto
   */
  descriptionContentType?: string

  /**
   * @type {string}
   * @memberof EntityModelPythonPackageDto
   */
  authorEmail?: string

  /**
   * @type {string}
   * @memberof EntityModelPythonPackageDto
   */
  classifiers?: string

  /**
   * @type {string}
   * @memberof EntityModelPythonPackageDto
   */
  homePage?: string

  /**
   * @type {string}
   * @memberof EntityModelPythonPackageDto
   */
  keywords?: string

  /**
   * @type {string}
   * @memberof EntityModelPythonPackageDto
   */
  license?: string

  /**
   * @type {string}
   * @memberof EntityModelPythonPackageDto
   */
  maintainer?: string

  /**
   * @type {string}
   * @memberof EntityModelPythonPackageDto
   */
  maintainerEmail?: string

  /**
   * @type {string}
   * @memberof EntityModelPythonPackageDto
   */
  platform?: string

  /**
   * @type {string}
   * @memberof EntityModelPythonPackageDto
   */
  projectUrl?: string

  /**
   * @type {string}
   * @memberof EntityModelPythonPackageDto
   */
  providesExtra?: string

  /**
   * @type {string}
   * @memberof EntityModelPythonPackageDto
   */
  requiresDist?: string

  /**
   * @type {string}
   * @memberof EntityModelPythonPackageDto
   */
  requiresExternal?: string

  /**
   * @type {string}
   * @memberof EntityModelPythonPackageDto
   */
  requiresPython?: string

  /**
   * @type {string}
   * @memberof EntityModelPythonPackageDto
   */
  summary?: string

  /**
   * @type {string}
   * @memberof EntityModelPythonPackageDto
   */
  hash?: string

  /**
   * @type {Links}
   * @memberof EntityModelPythonPackageDto
   */
  links?: Links
}
