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
import { UserSettingsProjection } from './user-settings-projection'
/**
 *
 *
 * @export
 * @interface EntityModelUserDto
 */
export interface EntityModelUserDto {
  /**
   * @type {number}
   * @memberof EntityModelUserDto
   */
  id?: number

  /**
   * @type {string}
   * @memberof EntityModelUserDto
   */
  name?: string

  /**
   * @type {string}
   * @memberof EntityModelUserDto
   */
  email?: string

  /**
   * @type {string}
   * @memberof EntityModelUserDto
   */
  login?: string

  /**
   * @type {boolean}
   * @memberof EntityModelUserDto
   */
  active?: boolean

  /**
   * @type {string}
   * @memberof EntityModelUserDto
   */
  lastLoggedInOn?: string

  /**
   * @type {string}
   * @memberof EntityModelUserDto
   */
  createdOn?: string

  /**
   * @type {boolean}
   * @memberof EntityModelUserDto
   */
  deleted?: boolean

  /**
   * @type {number}
   * @memberof EntityModelUserDto
   */
  roleId?: number

  /**
   * @type {string}
   * @memberof EntityModelUserDto
   */
  role?: string

  /**
   * @type {UserSettingsProjection}
   * @memberof EntityModelUserDto
   */
  userSettings?: UserSettingsProjection

  /**
   * @type {Links}
   * @memberof EntityModelUserDto
   */
  links?: Links
}
