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

import AccessTokenEvent from '@/components/events/resources/AccessTokenEvent.vue'
import PackageEvent from '@/components/events/resources/PackageEvent.vue'
import PackageMaintainerEvent from '@/components/events/resources/PackageMaintainerEvent.vue'
import RepositoryEvent from '@/components/events/resources/RepositoryEvent.vue'
import RepositoryMaintainerEvent from '@/components/events/resources/RepositoryMaintainerEvent.vue'
import SubmissionEvent from '@/components/events/resources/SubmissionEvent.vue'
import UserEvent from '@/components/events/resources/UserEvent.vue'
import { z } from 'zod'

const component = z.enum([
  'PACKAGE',
  'REPOSITORY',
  'USER',
  'SUBMISSION',
  'ACCESS TOKEN',
  'PACKAGE MAINTAINER',
  'REPOSITORY MAINTAINER'
])

type Component = z.infer<typeof component>

export default new Map<Component, any>([
  [component.enum['PACKAGE'], PackageEvent],
  [component.enum['REPOSITORY'], RepositoryEvent],
  [component.enum['USER'], UserEvent],
  [component.enum['SUBMISSION'], SubmissionEvent],
  [component.enum['ACCESS TOKEN'], AccessTokenEvent],
  [
    component.enum['PACKAGE MAINTAINER'],
    PackageMaintainerEvent
  ],
  [
    component.enum['REPOSITORY MAINTAINER'],
    RepositoryMaintainerEvent
  ]
])
