<template>
  <v-row :class="{ title: title }">
    <v-col cols="lg-1 sm-2" class="d-flex align-center">{{
      title == true
        ? 'Name'
        : packageBag
        ? packageBag.name
        : ''
    }}</v-col>
    <v-col cols="1" class="d-flex align-center">{{
      title == true
        ? 'Version'
        : packageBag
        ? packageBag.version
        : ''
    }}</v-col>
    <v-col cols="lg-6 sm-2" class="d-flex align-center">
      {{
        title == true
          ? 'Description'
          : packageBag
          ? packageBag.desc.length > descMaxLength
            ? packageBag.desc.slice(0, descMaxLength) +
              '...'
            : packageBag.desc
          : ''
      }}</v-col
    >
    <v-col cols="lg-1 sm-2" class="d-flex align-center">
      {{
        title == true
          ? 'Maintainer'
          : packageBag
          ? packageBag.maintainer
          : ''
      }}</v-col
    >
    <v-col cols="lg-1 sm-2" class="d-flex align-center">
      {{
        title == true
          ? 'Repository'
          : packageBag
          ? packageBag.reposiotory
          : ''
      }}</v-col
    >
    <v-col cols="1" class="d-flex justify-center">
      <span v-if="title == true"> Active </span>
      <v-checkbox
        color="text"
        dense
        @click.native.stop
        v-else-if="packageBag"
        v-model="packageBag.active"
      />
    </v-col>
    <v-col cls="1" class="d-flex align-center">{{
      title == true ? 'Actions' : ''
    }}</v-col>
  </v-row>
</template>

<script lang="ts">
import { Package } from '@/models/packages/Package'
import Vue from 'vue'

export default Vue.extend({
  props: {
    title: {
      type: Boolean,
      default: false
    },
    packageBag: Object as () => Package | undefined
  },
  name: 'PackagesRow',
  data() {
    return {
      descMaxLength: 110
    }
  }
})
</script>

<style lang="scss">
.v-col {
  padding: 10px !important;
  font-size: 13px !important;
}
.col {
  line-height: 1.3;
}
.title {
  font-weight: 600 !important;
}
</style>
