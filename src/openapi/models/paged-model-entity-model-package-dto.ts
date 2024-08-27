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
import { Links } from './links'
import { PageMetadata } from './page-metadata'
import { PagedModelEntityModelPackageDtoEmbedded } from './paged-model-entity-model-package-dto-embedded'
/**
 *
 *
 * @export
 * @interface PagedModelEntityModelPackageDto
 */
export interface PagedModelEntityModelPackageDto {
  /**
   * @type {PagedModelEntityModelPackageDtoEmbedded}
   * @memberof PagedModelEntityModelPackageDto
   */
  embedded?: PagedModelEntityModelPackageDtoEmbedded

  /**
   * @type {Links}
   * @memberof PagedModelEntityModelPackageDto
   */
  links?: Links

  /**
   * @type {PageMetadata}
   * @memberof PagedModelEntityModelPackageDto
   */
  page?: PageMetadata
}
