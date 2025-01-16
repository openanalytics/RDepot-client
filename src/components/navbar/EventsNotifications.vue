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
  <v-badge
    id="notifications-badge"
    :color="
      notificationStore.newEvents.length
        ? `oared`
        : `rgba(0,0,0,0)`
    "
    :text-color="
      notificationStore.newEvents.length
        ? `text-color`
        : `rgba(0,0,0,0)`
    "
    rounded
    :content="newEvents.length || ''"
  >
    <v-menu @update:model-value="onMenuUpdate">
      <template #activator="{ props }">
        <v-icon
          id="notifications-bell"
          :icon="Icons.get('notification')"
          v-bind="props"
          color="text"
          @click.stop="refresh"
        />
      </template>
      <v-card
        id="notifications-list"
        width="400"
        :loading="loading"
        class="mt-2"
      >
        <v-card-title
          class="d-flex justify-center ga-2 align-center pt-5"
        >
          <span> {{ $t('notifications.title') }}</span>
          <v-icon
            v-tooltip="'refresh'"
            icon="mdi-refresh"
            size="x-small"
            @click.stop="refresh"
          />
        </v-card-title>
        <v-card-text>
          <v-list>
            <div class="d-flex align-center ga-3 mb-2">
              <v-divider></v-divider>
              <div v-if="!newEvents.length" color="grey">
                {{
                  $t(
                    'notifications.events.upToDate'
                  ).replaceAll(' ', '&nbsp;')
                }}
              </div>
              <v-divider
                v-if="!newEvents.length"
              ></v-divider>
            </div>

            <NotificationBox
              v-for="event in newEvents"
              :key="event.id"
              class="ma-0 pa-0"
              density="compact"
              lines="three"
              :event="event"
            />
            <div
              v-if="newEvents.length"
              class="d-flex align-center ga-3"
            >
              <v-divider></v-divider>
              <div color="grey">
                {{
                  $t(
                    'notifications.events.alreadySeen'
                  ).replaceAll(' ', '&nbsp;')
                }}
              </div>
              <v-divider></v-divider>
            </div>

            <NotificationBox
              v-for="event in oldEvents"
              :key="event.id"
              class="ma-0 pa-0"
              density="compact"
              lines="three"
              :event="event"
            />

            <v-list-item class="d-flex justify-center"
              ><v-btn
                id="notifications-see-all-events"
                variant="outlined"
                color="oablue"
                class="mt-5"
                @click="goToEventsPage"
                >see all events</v-btn
              ></v-list-item
            >
          </v-list>
        </v-card-text>
      </v-card>
    </v-menu>
  </v-badge>
</template>

<script setup lang="ts">
import Icons from '@/maps/Icons'
import { useNotificationStore } from '@/store/options/notifications'
import { ref } from 'vue'
import NotificationBox from './NotificationBox.vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

const notificationStore = useNotificationStore()

const { newEvents, oldEvents } = storeToRefs(
  useNotificationStore()
)

const loading = ref(false)
const router = useRouter()

function goToEventsPage() {
  router.push({ name: 'events' })
}

async function refresh() {
  loading.value = true
  await notificationStore.getEventsNotifications()
  loading.value = false
}

function onMenuUpdate(newVal: boolean) {
  if (!newVal) {
    notificationStore.alreadySeenEvents =
      notificationStore.events
  }
}
</script>
