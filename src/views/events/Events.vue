<!--
 R Depot
 
 Copyright (C) 2012-2023 Open Analytics NV
 
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
  <TopScrollButton />
  <EventsModal />
  <v-row class="my-3">
    <FiltrationChips :store="eventsStore" />
    <FiltrationButtons />
  </v-row>
  <EventsTimeLine />
</template>

<script setup lang="ts">
import FiltrationButtons from '@/components/common/FiltrationButtons.vue'
import FiltrationChips from '@/components/common/chips/FiltrationChips.vue'
import TopScrollButton from '@/components/common/TopScrollButton.vue'
import EventsModal from '@/components/events/EventsModal.vue'
import EventsTimeLine from '@/components/events/EventsTimeLine.vue'
import { useEventsStore } from '@/store/events'

const eventsStore = useEventsStore()
</script>
