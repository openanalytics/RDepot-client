<template>
  <v-card-actions>
    <v-row :justify="justify" class="mt-1">
      <template v-for="button in buttons">
        <v-spacer v-if="button.spacer" />
        <v-btn
          :color="color + ' darken-2'"
          @click="button.handler"
          class="mx-1"
        >
          <small>{{ button.text }}</small>
        </v-btn>
      </template>
    </v-row>
  </v-card-actions>
</template>

<script setup lang="ts">
type Justify =
  | 'start'
  | 'end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | 'stretch'

const props = withDefaults(
  defineProps<{
    justify?: Justify
    color?: string
    buttons: {
      spacer?: boolean
      text: string
      handler: Function
    }[]
  }>(),
  { justify: 'space-between', color: 'oablue' }
)
</script>
