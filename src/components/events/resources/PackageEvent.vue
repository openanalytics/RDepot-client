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
  <v-card-title class="d-flex justify-lg-space-between">
    {{ relatedResource?.name }}
    <span class="d-flex ga-3">
      <EventTag
        :value="`v ${relatedResource?.version}`"
        size="small"
        disableCopying
        disableTooltip
      />

      <EventTag
        :value="relatedResource?.technology"
        size="small"
        disableCopying
        disableTooltip
      />

      <EventTag
        :value="getTime(event)"
        size="small"
        disableCopying
        disableTooltip
      />
    </span>
  </v-card-title>
  <v-card-subtitle
    >{{ resourceType }}
    <EventTypeTag :eventType="event?.eventType" />
  </v-card-subtitle>

  <v-divider class="my-2 mx-2" />
  <v-card-text>
    <p
      class="value"
      v-if="event && event.eventType === 'update'"
    >
      <UpdateDescription :event="event"></UpdateDescription>
    </p>
    <div
      class="d-flex flex-wrap ga-1"
      style="max-width: 80%"
    >
      <EventTag
        :value="relatedResource?.submission?.state"
        :prependIcon="
          getStatusIcon(relatedResource?.submission?.state)
        "
        :color="
          getStatusColor(relatedResource?.submission?.state)
        "
        disableCopying
        disableTooltip
      />

      <EventTag
        v-if="relatedResource?.deleted"
        :value="i18n.t('columns.tokens.deleted')"
        color="oared"
        disableCopying
        disableTooltip
      />

      <EventTag
        :value="relatedResource?.user?.login"
        :hoverMessage="i18n.t('columns.package.maintainer')"
      />
      <EventTag
        :value="relatedResource?.repository?.name"
        :hoverMessage="i18n.t('columns.package.repository')"
      />

      <EventTag
        v-if="relatedResource?.repository?.published"
        :value="i18n.t('columns.repository.published')"
        disableCopying
        disableTooltip
      />

      <EventTag
        v-if="relatedResource?.active"
        :value="i18n.t('columns.active')"
        disableCopying
        disableTooltip
      />

      <EventTag
        v-if="relatedResource?.source"
        :value="relatedResource?.source"
        :hoverMessage="i18n.t('columns.package.source')"
      />
    </div>
  </v-card-text>
</template>

<script setup lang="ts">
import {
  EntityModelNewsfeedEventDto,
  EntityModelPackageDto
} from '@/openapi'
import UpdateDescription from '@/components/events/resources/UpdateDescription.vue'
import { useDates } from '@/composable/date'
import { useSubmissionIcons } from '@/composable/submissions/statusIcons'
import EventTag from '../EventTag.vue'
import { i18n } from '@/plugins/i18n'
import { computed } from 'vue'
import EventTypeTag from './EventTypeTag.vue'

const props = defineProps({
  event: Object as () => EntityModelNewsfeedEventDto
})

const relatedResource: EntityModelPackageDto = props.event
  ?.relatedResource as EntityModelPackageDto

const { getTime } = useDates()
const { getStatusIcon, getStatusColor } =
  useSubmissionIcons()

const resourceType = computed(() =>
  i18n.t('resourceType.package').toUpperCase()
)
</script>

<style lang="scss">
.value {
  flex-basis: 70%;
  margin: 10px 0;
}
</style>
