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
import { RepositoryProjection } from './repository-projection';
import { UserProjection } from './user-projection';
/**
 * 
 * @export
 * @interface EntityModelPackageDto
 */
export interface EntityModelPackageDto {
    /**
     * 
     * @type {number}
     * @memberof EntityModelPackageDto
     */
    id?: number;
    /**
     * 
     * @type {UserProjection}
     * @memberof EntityModelPackageDto
     */
    user?: UserProjection;
    /**
     * 
     * @type {RepositoryProjection}
     * @memberof EntityModelPackageDto
     */
    repository?: RepositoryProjection;
    /**
     * 
     * @type {number}
     * @memberof EntityModelPackageDto
     */
    submissionId?: number;
    /**
     * 
     * @type {string}
     * @memberof EntityModelPackageDto
     */
    name?: string;
    /**
     * 
     * @type {string}
     * @memberof EntityModelPackageDto
     */
    version?: string;
    /**
     * 
     * @type {string}
     * @memberof EntityModelPackageDto
     */
    description?: string;
    /**
     * 
     * @type {string}
     * @memberof EntityModelPackageDto
     */
    author?: string;
    /**
     * 
     * @type {string}
     * @memberof EntityModelPackageDto
     */
    title?: string;
    /**
     * 
     * @type {string}
     * @memberof EntityModelPackageDto
     */
    url?: string;
    /**
     * 
     * @type {string}
     * @memberof EntityModelPackageDto
     */
    source?: string;
    /**
     * 
     * @type {boolean}
     * @memberof EntityModelPackageDto
     */
    active?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof EntityModelPackageDto
     */
    deleted?: boolean;
    /**
     * 
     * @type {string}
     * @memberof EntityModelPackageDto
     */
    technology?: string;
    /**
     * 
     * @type {Array<Link>}
     * @memberof EntityModelPackageDto
     */
    links?: Array<Link>;
}