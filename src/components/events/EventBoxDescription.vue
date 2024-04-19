<!--
 R Depot
 
 Copyright (C) 2012-2024 Open Analytics NV
 
 ===========================================================================
 
 This program is free software: you can redistribute it and/or modify
 it under the terms of the Apache License as published by
 The Apache Software Foundation, either version 2 of the License, or
 (at your option) any later version.
 
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 Apache License for more details.
 
 You should have received a copy of the Apache License
 along with this program. If not, see <http://www.apache.org/licenses/>
 
-->

<template>
  <component
    :is="as"
    :event="event"
    :eventType="eventType"
  ></component>
</template>

<script setup lang="ts">
import { EntityModelNewsfeedEventDto } from '@/openapi'
import PackageEvent from '@/components/events/resources/PackageEvent.vue'
import RepositoryEvent from '@/components/events/resources/RepositoryEvent.vue'
import UserEvent from '@/components/events/resources/UserEvent.vue'
import SubmissionEvent from '@/components/events/resources/SubmissionEvent.vue'
import AccessTokenEvent from '@/components/events/resources/AccessTokenEvent.vue'
import PackageMaintainerEvent from '@/components/events/resources/PackageMaintainerEvent.vue'
import RepositoryMaintainerEvent from '@/components/events/resources/RepositoryMaintainerEvent.vue'
import { z } from 'zod'

const props = defineProps({
  event: Object as () => EntityModelNewsfeedEventDto,
  eventType: String,
  resourceType: String
})

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

const toComponent = new Map<Component, any>([
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

const as = toComponent.get(
  props.resourceType || toComponent.get('PACKAGE')
)
</script>
