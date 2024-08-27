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
/**
 *
 *
 * @export
 * @interface ResponseDtoObject
 */
export interface ResponseDtoObject {
  /**
   * @type {string}
   * @memberof ResponseDtoObject
   */
  status?: ResponseDtoObjectStatusEnum

  /**
   * @type {number}
   * @memberof ResponseDtoObject
   */
  code?: number

  /**
   * @type {string}
   * @memberof ResponseDtoObject
   */
  message?: string

  /**
   * @type {string}
   * @memberof ResponseDtoObject
   */
  messageCode?: string

  /**
   * @type {any}
   * @memberof ResponseDtoObject
   */
  data?: any
}

/**
 * @export
 * @enum {string}
 */
export enum ResponseDtoObjectStatusEnum {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  WARNING = 'WARNING'
}
