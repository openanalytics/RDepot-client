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
 *
 */

import { EntityModelNewsfeedEventDtoResourceTypeEnum } from '@/openapi'
import Icons from '@/maps/Icons'

export function useIcons() {
  function getIcon(
    resourceType?: EntityModelNewsfeedEventDtoResourceTypeEnum
  ) {
    switch (resourceType) {
      case EntityModelNewsfeedEventDtoResourceTypeEnum.PACKAGE: {
        return [Icons.get('package')]
      }
      case EntityModelNewsfeedEventDtoResourceTypeEnum.REPOSITORY: {
        return [Icons.get('repositories')]
      }
      case EntityModelNewsfeedEventDtoResourceTypeEnum.USER: {
        return [Icons.get('users')]
      }
      case EntityModelNewsfeedEventDtoResourceTypeEnum.PACKAGEMAINTAINER: {
        return [Icons.get('package'), Icons.get('users')]
      }
      case EntityModelNewsfeedEventDtoResourceTypeEnum.REPOSITORYMAINTAINER: {
        return [
          Icons.get('repositories'),
          Icons.get('users')
        ]
      }
      case EntityModelNewsfeedEventDtoResourceTypeEnum.SUBMISSION: {
        return [Icons.get('submissions')]
      }
      case EntityModelNewsfeedEventDtoResourceTypeEnum.ACCESSTOKEN: {
        return [Icons.get('access-token')]
      }
      default:
        return ['']
    }
  }

  return { getIcon }
}
