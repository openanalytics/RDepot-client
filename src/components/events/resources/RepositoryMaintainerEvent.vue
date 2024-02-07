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
  <p class="value" v-if="eventType === 'update'">
    <UpdateDescription :event="event"></UpdateDescription>
  </p>
  <ul v-else class="value">
    <li>
      {{ $t('columns.users.username') }}:
      <strong>{{
        event?.relatedResource?.user.name
      }}</strong>
    </li>
    <li>
      {{ $t('columns.users.email') }}:
      {{ event?.relatedResource?.user.email }}
    </li>
    <li>
      {{ $t('columns.package.repository') }}:
      {{ event?.relatedResource?.repository.name }}
    </li>
    <li>
      {{ $t('columns.package.technology') }}:
      {{ event?.relatedResource?.repository.technology }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import { EntityModelNewsfeedEventDto } from '@/openapi'
import UpdateDescription from '@/components/events/resources/UpdateDescription'

const props = defineProps({
  event: Object as () => EntityModelNewsfeedEventDto,
  eventType: String
})
</script>

<style lang="scss">
.value {
  flex-basis: 70%;
  margin: 10px 0;
}
</style>
