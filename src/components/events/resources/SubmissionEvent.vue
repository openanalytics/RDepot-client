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
    {{ relatedResource?.packageBag?.name }}
    <span class="d-flex ga-3">
      <EventTag
        v-if="relatedResource?.packageBag"
        :value="`v ${relatedResource?.packageBag.version}`"
        size="small"
        disable-copying
        disable-tooltip
      />

      <EventTag
        :value="relatedResource?.technology"
        size="small"
        disable-copying
        disable-tooltip
      />

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
    <div class="d-flex ga-5">
      <v-text-field
        v-if="relatedResource.submitter"
        id="submitter"
        :placeholder="relatedResource.submitter.name"
        :label="i18n.t('columns.submissions.submitter')"
        disabled
        density="compact"
        persistent-placeholder
      ></v-text-field>
      <v-text-field
        v-if="relatedResource?.approver"
        id="approver"
        :placeholder="relatedResource?.approver?.name"
        :label="i18n.t('columns.submissions.approver')"
        disabled
        density="compact"
        persistent-placeholder
      ></v-text-field>
    </div>
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
        :value="
          getTranslationWithFallbackValue(
            relatedResource?.state?.toLowerCase(),
            'states'
          )
        "
        :prepend-icon="
          getStatusIcon(relatedResource?.state)
        "
        :color="getStatusColor(relatedResource?.state)"
        disable-copying
        disable-tooltip
      />

      <EventTag
        v-if="relatedResource?.packageBag?.deleted"
        :value="i18n.t('columns.submissions.deleted')"
        color="oared"
        disable-copying
        disable-tooltip
      />

      <EventTag
        :value="relatedResource?.packageBag?.user?.login"
        :hover-message="
          i18n.t('columns.package.maintainer')
        "
      />

      <EventTag
        v-if="relatedResource?.packageBag?.repository"
        :value="
          relatedResource?.packageBag?.repository?.name
        "
        :hover-message="
          i18n.t('columns.package.repository')
        "
      />

      <EventTag
        v-if="
          relatedResource?.packageBag?.repository?.published
        "
        :value="i18n.t('columns.repository.published')"
        disable-copying
        disable-tooltip
      />

      <EventTag
        v-if="relatedResource?.packageBag?.active"
        :value="i18n.t('columns.active')"
        disable-copying
        disable-tooltip
      />

      <EventTag
        :value="relatedResource?.packageBag?.source"
        :hover-message="i18n.t('columns.package.source')"
      />
    </div>
  </v-card-text>
</template>

<script setup lang="ts">
import {
  EntityModelNewsfeedEventDto,
  EntityModelSubmissionDto
} from '@/openapi'
import UpdateDescription from '@/components/events/resources/UpdateDescription.vue'
import { useDates } from '@/composable/date'
import { useSubmissionIcons } from '@/composable/submissions/statusIcons'
import EventTag from '../EventTag.vue'
import { computed } from 'vue'
import { i18n } from '@/plugins/i18n'
import EventTypeTag from './EventTypeTag.vue'
import { useTranslations } from '@/composable/translations/translations'

const componentProps = defineProps({
  event: {
    type: Object as () => EntityModelNewsfeedEventDto,
    required: true
  }
})

const relatedResource: EntityModelSubmissionDto =
  componentProps.event
    ?.relatedResource as EntityModelSubmissionDto

const { getTime } = useDates()
const { getStatusIcon, getStatusColor } =
  useSubmissionIcons()

const { getTranslationWithFallbackValue } =
  useTranslations()

const resourceType = computed(() =>
  i18n.t('resourceType.submission').toUpperCase()
)
</script>
