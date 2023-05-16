<template>
  <span
    :id="getId"
    class="chip-section"
    @click="$emit('update')"
  >
    <v-chip class="pa-4 mr-3" link>
      {{ label }} <span v-if="value">: {{ value }}</span>
    </v-chip>
    <v-icon
      icon="mdi-close-circle"
      size="s"
      class="icon"
    ></v-icon>
  </span>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  label: String,
  value: {
    type: Object as () => String | Number,
    required: false
  }
})

const getId = computed(() => {
  return props.label?.split(' ').join('_')
})
</script>

<style scoped lang="scss">
.chip-section {
  position: relative;
  .icon {
    display: none;
    z-index: 10;
    position: absolute;
    right: 8px;
    top: -8px;

    &:hover {
      cursor: pointer;
    }
  }

  &:hover {
    .icon {
      display: block;
    }
  }
}
</style>
