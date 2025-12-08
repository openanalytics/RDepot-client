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
*/
/* tslint:disable */
/* eslint-disable */


import { Links } from './links';
import { UserProjection } from './user-projection';
 /**
 * 
 *
 * @export
 * @interface EntityModelAccessTokenDto
 */
export interface EntityModelAccessTokenDto {

    /**
     * @type {number}
     * @memberof EntityModelAccessTokenDto
     */
    id?: number;

    /**
     * @type {string}
     * @memberof EntityModelAccessTokenDto
     */
    name?: string;

    /**
     * @type {string}
     * @memberof EntityModelAccessTokenDto
     */
    value?: string;

    /**
     * @type {string}
     * @memberof EntityModelAccessTokenDto
     */
    creationDate?: string;

    /**
     * @type {string}
     * @memberof EntityModelAccessTokenDto
     */
    expirationDate?: string;

    /**
     * @type {boolean}
     * @memberof EntityModelAccessTokenDto
     */
    active?: boolean;

    /**
     * @type {boolean}
     * @memberof EntityModelAccessTokenDto
     */
    deleted?: boolean;

    /**
     * @type {UserProjection}
     * @memberof EntityModelAccessTokenDto
     */
    user?: UserProjection;

    /**
     * @type {string}
     * @memberof EntityModelAccessTokenDto
     */
    lastUsed?: string;

    /**
     * @type {Links}
     * @memberof EntityModelAccessTokenDto
     */
    links?: Links;
}
