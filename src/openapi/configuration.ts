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

export interface ConfigurationParameters {
  apiKey?:
    | string
    | Promise<string>
    | ((name: string) => string)
    | ((name: string) => Promise<string>)
  username?: string
  password?: string
  accessToken?:
    | string
    | Promise<string>
    | ((name?: string, scopes?: string[]) => string)
    | ((
        name?: string,
        scopes?: string[]
      ) => Promise<string>)
  basePath?: string
  baseOptions?: any
}

export class Configuration {
  /**
   * parameter for apiKey security
   *
   * @param name security name
   * @memberof Configuration
   */
  apiKey?:
    | string
    | Promise<string>
    | ((name: string) => string)
    | ((name: string) => Promise<string>)

  /**
   * parameter for basic security
   *
   * @type {string}
   * @memberof Configuration
   */
  username?: string

  /**
   * parameter for basic security
   *
   * @type {string}
   * @memberof Configuration
   */
  password?: string

  /**
   * parameter for oauth2 security
   *
   * @param name security name
   * @param scopes oauth2 scope
   * @memberof Configuration
   */
  accessToken?:
    | string
    | Promise<string>
    | ((name?: string, scopes?: string[]) => string)
    | ((
        name?: string,
        scopes?: string[]
      ) => Promise<string>)

  /**
   * override base path
   *
   * @type {string}
   * @memberof Configuration
   */
  basePath?: string

  /**
   * base options for axios calls
   *
   * @type {any}
   * @memberof Configuration
   */
  baseOptions?: any

  constructor(param: ConfigurationParameters = {}) {
    this.apiKey = param.apiKey
    this.username = param.username
    this.password = param.password
    this.accessToken = param.accessToken
    this.basePath = param.basePath
    this.baseOptions = param.baseOptions
  }
}
