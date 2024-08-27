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
import { ChangedVariableDto } from './changed-variable-dto'
import { IDto } from './idto'
import { Links } from './links'
import { UserProjection } from './user-projection'
/**
 *
 *
 * @export
 * @interface EntityModelNewsfeedEventDto
 */
export interface EntityModelNewsfeedEventDto {
  /**
   * @type {number}
   * @memberof EntityModelNewsfeedEventDto
   */
  id?: number

  /**
   * @type {string}
   * @memberof EntityModelNewsfeedEventDto
   */
  technology?: string

  /**
   * @type {string}
   * @memberof EntityModelNewsfeedEventDto
   */
  time?: string

  /**
   * @type {UserProjection}
   * @memberof EntityModelNewsfeedEventDto
   */
  user?: UserProjection

  /**
   * @type {string}
   * @memberof EntityModelNewsfeedEventDto
   */
  eventType?: string

  /**
   * @type {number}
   * @memberof EntityModelNewsfeedEventDto
   */
  resourceId?: number

  /**
   * @type {string}
   * @memberof EntityModelNewsfeedEventDto
   */
  resourceType?: EntityModelNewsfeedEventDtoResourceTypeEnum

  /**
   * @type {Array<ChangedVariableDto>}
   * @memberof EntityModelNewsfeedEventDto
   */
  changedProperties?: Array<ChangedVariableDto>

  /**
   * @type {IDto}
   * @memberof EntityModelNewsfeedEventDto
   */
  relatedResource?: IDto

  /**
   * @type {Links}
   * @memberof EntityModelNewsfeedEventDto
   */
  links?: Links
}

/**
 * @export
 * @enum {string}
 */
export enum EntityModelNewsfeedEventDtoResourceTypeEnum {
  PACKAGE = 'PACKAGE',
  REPOSITORY = 'REPOSITORY',
  SUBMISSION = 'SUBMISSION',
  REPOSITORYMAINTAINER = 'REPOSITORY_MAINTAINER',
  PACKAGEMAINTAINER = 'PACKAGE_MAINTAINER',
  USER = 'USER',
  EVENT = 'EVENT',
  ROLE = 'ROLE',
  USERSETTINGS = 'USER_SETTINGS',
  ACCESSTOKEN = 'ACCESS_TOKEN'
}
