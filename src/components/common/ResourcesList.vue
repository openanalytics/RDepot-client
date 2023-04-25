<template>
  <v-expansion-panels
    variant="inset"
    class="v-expansion mx-8"
  >
    <v-expansion-panel class="py-3">
      <slot name="title" :title="true"></slot>
    </v-expansion-panel>
    <EmptyListing
      v-show="resources === undefined || !resources.length"
    />
    <v-expansion-panel
      class="mx-5"
      v-for="(item, index) in resources"
      :key="index"
    >
      <v-expansion-panel-title
        :readonly="!expand"
        id="expansion-panel-title"
        class="no-icon"
        @click="handleClick(item)"
      >
        <slot
          name="expansion-row"
          v-if="item"
          :resource="item"
        ></slot>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <div class="content mt-2">
          <slot
            name="expansion-text"
            :resource="item"
          ></slot>
        </div>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup lang="ts">
import EmptyListing from './EmptyListing.vue'

const props = defineProps({
  resources: {
    type: Array,
    required: true
  },
  onClickAction: {
    type: Function,
    required: false
  },
  expand: {
    type: Boolean,
    required: false,
    default: false
  }
})

function handleClick(item: any) {
  if (props.onClickAction != undefined) {
    props.onClickAction(item)
  }
}
</script>

<style lang="scss">
.v-expansion {
  max-width: 96% !important;
}

.content {
  text-align: justify;
  font-size: 14px;
  padding: 0 40px 0 0;
}

.v-expansion-panel-title__icon {
  display: none !important;
}

.v-expansion-panel-title {
  padding: 0 !important;
}

.v-col {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}

.no-icon {
  .v-input__details {
    display: none !important;
  }
}
</style>
