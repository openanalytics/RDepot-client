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
 /**
 * 
 *
 * @export
 * @interface EntityModelRepositoryDto
 */
export interface EntityModelRepositoryDto {

    /**
     * @type {number}
     * @memberof EntityModelRepositoryDto
     */
    id?: number;

    /**
     * @type {number}
     * @memberof EntityModelRepositoryDto
     */
    version?: number;

    /**
     * @type {string}
     * @memberof EntityModelRepositoryDto
     */
    publicationUri?: string;

    /**
     * @type {string}
     * @memberof EntityModelRepositoryDto
     */
    name?: string;

    /**
     * @type {string}
     * @memberof EntityModelRepositoryDto
     */
    serverAddress?: string;

    /**
     * @type {boolean}
     * @memberof EntityModelRepositoryDto
     */
    deleted?: boolean;

    /**
     * @type {boolean}
     * @memberof EntityModelRepositoryDto
     */
    published?: boolean;

    /**
     * @type {boolean}
     * @memberof EntityModelRepositoryDto
     */
    synchronizing?: boolean;

    /**
     * @type {string}
     * @memberof EntityModelRepositoryDto
     */
    technology?: string;

    /**
     * @type {boolean}
     * @memberof EntityModelRepositoryDto
     */
    requiresAuthentication?: boolean;

    /**
     * @type {number}
     * @memberof EntityModelRepositoryDto
     */
    numberOfPackages?: number;

    /**
     * @type {string}
     * @memberof EntityModelRepositoryDto
     */
    lastPublicationTimestamp?: string;

    /**
     * @type {string}
     * @memberof EntityModelRepositoryDto
     */
    lastModifiedTimestamp?: string;

    /**
     * @type {boolean}
     * @memberof EntityModelRepositoryDto
     */
    lastPublicationSuccessful?: boolean;

    /**
     * @type {Links}
     * @memberof EntityModelRepositoryDto
     */
    links?: Links;
}
