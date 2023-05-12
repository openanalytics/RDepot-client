<template>
  <span class="chip-section">
    <v-chip class="pa-4 mr-3" @click="$emit('update')" link>
      {{ label }} <span v-if="value">: {{ value }}</span>
    </v-chip>
    <v-icon
      icon="mdi-close-circle"
      size="s"
      @click="$emit('update')"
      class="icon"
    ></v-icon>
  </span>
</template>

<script lang="ts" setup>
const props = defineProps({
  label: String,
  value: {
    type: Object as () => String | Boolean | String[],
    required: false
  }
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
  }

  &:hover {
    .icon {
      display: block;
    }
  }
}
</style>
