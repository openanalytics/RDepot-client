/* tslint:disable */
/* eslint-disable */
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
import { Link } from './link';
/**
 * 
 * @export
 * @interface EntityModelRepositoryDto
 */
export interface EntityModelRepositoryDto {
    /**
     * 
     * @type {number}
     * @memberof EntityModelRepositoryDto
     */
    id?: number;
    /**
     * 
     * @type {number}
     * @memberof EntityModelRepositoryDto
     */
    version?: number;
    /**
     * 
     * @type {string}
     * @memberof EntityModelRepositoryDto
     */
    publicationUri?: string;
    /**
     * 
     * @type {string}
     * @memberof EntityModelRepositoryDto
     */
    name?: string;
    /**
     * 
     * @type {string}
     * @memberof EntityModelRepositoryDto
     */
    serverAddress?: string;
    /**
     * 
     * @type {boolean}
     * @memberof EntityModelRepositoryDto
     */
    deleted?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof EntityModelRepositoryDto
     */
    published?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof EntityModelRepositoryDto
     */
    synchronizing?: boolean;
    /**
     * 
     * @type {string}
     * @memberof EntityModelRepositoryDto
     */
    technology?: string;
    /**
     * 
     * @type {Array<Link>}
     * @memberof EntityModelRepositoryDto
     */
    links?: Array<Link>;
}