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
 * @interface EntityModelPackageMaintainerDto
 */
export interface EntityModelPackageMaintainerDto {
    /**
     * 
     * @type {number}
     * @memberof EntityModelPackageMaintainerDto
     */
    id?: number;
    /**
     * 
     * @type {number}
     * @memberof EntityModelPackageMaintainerDto
     */
    userId?: number;
    /**
     * 
     * @type {string}
     * @memberof EntityModelPackageMaintainerDto
     */
    packageName?: string;
    /**
     * 
     * @type {number}
     * @memberof EntityModelPackageMaintainerDto
     */
    repositoryId?: number;
    /**
     * 
     * @type {boolean}
     * @memberof EntityModelPackageMaintainerDto
     */
    deleted?: boolean;
    /**
     * 
     * @type {Array<Link>}
     * @memberof EntityModelPackageMaintainerDto
     */
    links?: Array<Link>;
}
