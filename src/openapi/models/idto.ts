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

import { IDtoPackageBag } from './idto-package-bag'
import { IDtoRepository } from './idto-repository'
import { IDtoUser } from './idto-user'
/**
 *
 *
 * @export
 * @interface IDto
 */
export interface IDto {
  /**
   * @type {string}
   * @memberof IDto
   */
  name?: string

  /**
   * @type {string}
   * @memberof IDto
   */
  email?: string

  /**
   * @type {string}
   * @memberof IDto
   */
  login?: string

  /**
   * @type {string}
   * @memberof IDto
   */
  role?: string

  /**
   * @type {string}
   * @memberof IDto
   */
  expirationDate?: string

  /**
   * @type {string}
   * @memberof IDto
   */
  creationDate?: string

  /**
   * @type {string}
   * @memberof IDto
   */
  version?: string

  /**
   * @type {string}
   * @memberof IDto
   */
  technology?: string

  /**
   * @type {IDtoRepository}
   * @memberof IDto
   */
  repository?: IDtoRepository

  /**
   * @type {IDtoUser}
   * @memberof IDto
   */
  user?: IDtoUser

  /**
   * @type {string}
   * @memberof IDto
   */
  packageName?: string

  /**
   * @type {string}
   * @memberof IDto
   */
  state?: string

  /**
   * @type {IDtoPackageBag}
   * @memberof IDto
   */
  packageBag?: IDtoPackageBag
}
