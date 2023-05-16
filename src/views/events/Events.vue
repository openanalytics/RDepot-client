<template>
  <EventsModal />
  <v-row class="my-3">
    <FiltrationChips :store="events_store" />
    <FiltrationButtons />
  </v-row>
  <EventsTimeLine />
</template>

<script setup lang="ts">
import FiltrationButtons from '@/components/common/FiltrationButtons.vue'
import FiltrationChips from '@/components/common/chips/FiltrationChips.vue'
import EventsModal from '@/components/events/EventsModal.vue'
import EventsTimeLine from '@/components/events/EventsTimeLine.vue'
import { useEventsStore } from '@/store/events'

const events_store = useEventsStore()
</script>
