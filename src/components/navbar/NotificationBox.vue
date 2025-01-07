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
  <v-list-item
    :id="`notifications-list-item-${event.id}`"
    class="ma-0 pa-0"
  >
    <template #prepend>
      <UserAvatar
        :username="event.user?.name"
        class="mt-3"
      />
    </template>

    <v-list-item-title
      >{{ getUserLogin }}
    </v-list-item-title>
    <v-list-item-subtitle
      class="d-flex justify-space-between align-start"
    >
      <div>
        {{ getAction }}:
        <strong>
          {{ getResourceName }}
        </strong>

        <div
          style="
            color: rgb(var(--v-theme-oablue)) !important;
          "
        >
          {{ getTime }}
        </div>
      </div>
      <v-icon
        v-tooltip="
          event.resourceType
            ?.replaceAll('_', ' ')
            .toLowerCase()
        "
        color="oablue"
        size="20"
        class="ml-3"
        style="position: relative"
        >{{ getIcon(event?.resourceType)[0] }}
        <v-icon
          v-if="getIcon(event?.resourceType).length > 1"
          color="oablue"
          size="20"
          class="mb-1 mr-1 nestedIcon"
          >{{ getIcon(event?.resourceType)[1] }}</v-icon
        >
      </v-icon>
    </v-list-item-subtitle>
  </v-list-item>
</template>

<script lang="ts" setup>
import {
  EntityModelNewsfeedEventDto,
  EntityModelNewsfeedEventDtoResourceTypeEnum
} from '@/openapi'
import moment from 'moment'
import { computed } from 'vue'
import { useIcons } from '@/composable/icons'
import { i18n } from '@/plugins/i18n'
import UserAvatar from '@/components/common/users/UserAvatar.vue'

const props = defineProps({
  event: {
    type: Object as () => EntityModelNewsfeedEventDto,
    required: true
  }
})

const { getIcon } = useIcons()

const getUserLogin = computed(() => {
  return props.event.user?.name
})

const getTime = computed(() => {
  return moment(props.event?.time).fromNow()
})

const getAction = computed(() => {
  switch (props.event.eventType) {
    case 'update': {
      if (
        props.event.changedProperties &&
        props.event.changedProperties[1] &&
        props.event.changedProperties[1].property
      ) {
        return i18n.t(
          `notifications.events.${props.event.changedProperties[1].property}.${props.event.changedProperties[1].valueAfter}`,
          i18n.t('notifications.events.updated')
        )
      }
      if (
        props.event.changedProperties &&
        props.event.changedProperties[0] &&
        props.event.changedProperties[0].property
      ) {
        return i18n.t(
          `notifications.events.${props.event.changedProperties[0].property}.${props.event.changedProperties[0].valueAfter}`,
          i18n.t('notifications.events.updated')
        )
      }
      return i18n.t('notifications.events.updated')
    }
    default:
      return i18n.t(
        `notifications.events.${props.event.eventType}`
      )
  }
})

const getResourceName = computed(() => {
  switch (props.event.resourceType) {
    case EntityModelNewsfeedEventDtoResourceTypeEnum.PACKAGEMAINTAINER: {
      return props.event.relatedResource?.user?.name
    }
    case EntityModelNewsfeedEventDtoResourceTypeEnum.REPOSITORYMAINTAINER: {
      return props.event.relatedResource?.user?.name
    }
    case EntityModelNewsfeedEventDtoResourceTypeEnum.SUBMISSION: {
      return props.event.relatedResource?.packageBag?.name
    }
    default:
      return props.event.relatedResource?.name
  }
})
</script>
