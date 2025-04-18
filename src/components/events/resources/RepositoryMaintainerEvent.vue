<!--
 R Depot
 
 Copyright (C) 2012-2025 Open Analytics NV
 
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
  <v-card-title class="d-flex justify-lg-space-between">
    {{ relatedResource?.user?.name }} ({{
      relatedResource?.user?.login
    }})
    <span class="d-flex ga-3">
      <EventTag
        :value="getTime(event)"
        size="small"
        disable-copying
        disable-tooltip
      />
    </span>
  </v-card-title>
  <v-card-subtitle
    >{{ resourceType }}
    <EventTypeTag
      v-if="event.eventType"
      :event-type="event.eventType"
    />
  </v-card-subtitle>

  <v-divider class="my-2 mx-2" />
  <v-card-text>
    <p
      v-if="event && event.eventType === 'update'"
      class="value"
    >
      <UpdateDescription :event="event"></UpdateDescription>
    </p>

    <div
      class="d-flex flex-wrap ga-1"
      style="max-width: 80%"
    >
      <EventTag
        v-if="relatedResource?.deleted"
        :value="
          i18n.t('columns.repositoryMaintainer.deleted')
        "
        color="oared"
        disable-copying
        disable-tooltip
      />

      <EventTag
        :value="relatedResource?.repository?.name"
        :hover-message="
          i18n.t('columns.repositoryMaintainer.repository')
        "
      />

      <EventTag
        :value="relatedResource?.repository?.publicationUri"
        :hover-message="
          i18n.t('columns.repository.publicationUri')
        "
      />

      <EventTag
        v-if="relatedResource?.repository?.published"
        :value="i18n.t('columns.repository.published')"
        disable-copying
        disable-tooltip
      />

      <EventTag
        :value="relatedResource?.user?.email"
        :hover-message="i18n.t('columns.users.email')"
      />
    </div>
  </v-card-text>
</template>

<script setup lang="ts">
import {
  EntityModelNewsfeedEventDto,
  EntityModelRepositoryMaintainerDto
} from '@/openapi'
import UpdateDescription from '@/components/events/resources/UpdateDescription.vue'
import { useDates } from '@/composable/date'
import EventTag from '../EventTag.vue'
import { i18n } from '@/plugins/i18n'
import { computed } from 'vue'
import EventTypeTag from './EventTypeTag.vue'

const componentProps = defineProps({
  event: {
    type: Object as () => EntityModelNewsfeedEventDto,
    required: true
  }
})

const relatedResource: EntityModelRepositoryMaintainerDto =
  componentProps.event
    ?.relatedResource as EntityModelRepositoryMaintainerDto

const { getTime } = useDates()

const resourceType = computed(() =>
  i18n.t('resourceType.repositoryMaintainer').toUpperCase()
)
</script>
