<template>
  <div>
    <v-card class="elevation-2" v-ripple rounded>
      <v-card-text>{{ $t('events.noEvents') }}</v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
div {
  padding: 30px 20px;
  max-width: 500px;
  margin: 0 auto;
  text-align: center;
  font-size: 1.2em;
  font-weight: 600;
}
</style>
