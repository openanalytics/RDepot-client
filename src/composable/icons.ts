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

import { EntityModelNewsfeedEventDtoResourceTypeEnum } from '@/openapi'

export function useIcons() {
  function getIcon(
    resourceType?: EntityModelNewsfeedEventDtoResourceTypeEnum
  ) {
    switch (resourceType) {
      case EntityModelNewsfeedEventDtoResourceTypeEnum.PACKAGE: {
        return ['mdi-package']
      }
      case EntityModelNewsfeedEventDtoResourceTypeEnum.REPOSITORY: {
        return ['mdi-folder-network']
      }
      case EntityModelNewsfeedEventDtoResourceTypeEnum.USER: {
        return ['mdi-account-multiple']
      }
      case EntityModelNewsfeedEventDtoResourceTypeEnum.PACKAGEMAINTAINER: {
        return ['mdi-package', 'mdi-account-multiple']
      }
      case EntityModelNewsfeedEventDtoResourceTypeEnum.REPOSITORYMAINTAINER: {
        return [
          'mdi-folder-network',
          'mdi-account-multiple'
        ]
      }
      case EntityModelNewsfeedEventDtoResourceTypeEnum.SUBMISSION: {
        return ['mdi-email']
      }
      case EntityModelNewsfeedEventDtoResourceTypeEnum.ACCESSTOKEN: {
        return ['mdi-key']
      }
      default:
        return ['']
    }
  }

  return { getIcon }
}
