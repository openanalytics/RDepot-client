<template>
  <EventsModal />
  <v-row class="my-3">
    <EventsFiltrationChips />
    <FiltrationButtons />
  </v-row>
  <EventsTimeLine />
</template>

<script setup lang="ts">
import FiltrationButtons from '@/components/common/FiltrationButtons.vue'
import EventsModal from '@/components/events/EventsModal.vue'
import EventsTimeLine from '@/components/events/EventsTimeLine.vue'
import EventsFiltrationChips from '@/components/events/EventsFiltrationChips.vue'
</script>
