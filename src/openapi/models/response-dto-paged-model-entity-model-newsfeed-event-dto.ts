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
import { PagedModelEntityModelNewsfeedEventDto } from './paged-model-entity-model-newsfeed-event-dto';
/**
 * 
 * @export
 * @interface ResponseDtoPagedModelEntityModelNewsfeedEventDto
 */
export interface ResponseDtoPagedModelEntityModelNewsfeedEventDto {
    /**
     * 
     * @type {string}
     * @memberof ResponseDtoPagedModelEntityModelNewsfeedEventDto
     */
    status?: string;
    /**
     * 
     * @type {number}
     * @memberof ResponseDtoPagedModelEntityModelNewsfeedEventDto
     */
    code?: number;
    /**
     * 
     * @type {string}
     * @memberof ResponseDtoPagedModelEntityModelNewsfeedEventDto
     */
    message?: string;
    /**
     * 
     * @type {string}
     * @memberof ResponseDtoPagedModelEntityModelNewsfeedEventDto
     */
    messageCode?: string;
    /**
     * 
     * @type {PagedModelEntityModelNewsfeedEventDto}
     * @memberof ResponseDtoPagedModelEntityModelNewsfeedEventDto
     */
    data?: PagedModelEntityModelNewsfeedEventDto;
}
