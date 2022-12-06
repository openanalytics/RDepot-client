<template>
  <v-row :class="{ title: title }">
    <v-col cols="lg-1 sm-2" class="d-flex align-center">{{
      title == true
        ? prepareString($t('packages.name').toString())
        : packageBag
        ? packageBag.name
        : ''
    }}</v-col>
    <v-col cols="1" class="d-flex align-center">{{
      title == true
        ? prepareString($t('packages.version').toString())
        : packageBag
        ? packageBag.version
        : ''
    }}</v-col>
    <v-col cols="lg-6 sm-2" class="d-flex align-center">
      {{
        title == true
          ? prepareString(
              $t('packages.description').toString()
            )
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
          ? prepareString(
              $t('packages.maintainer').toString()
            )
          : packageBag
          ? packageBag.maintainer
          : ''
      }}</v-col
    >
    <v-col cols="lg-1 sm-2" class="d-flex align-center">
      {{
        title == true
          ? prepareString(
              $t('packages.repository').toString()
            )
          : packageBag
          ? packageBag.reposiotory
          : ''
      }}</v-col
    >
    <v-col cols="1" class="d-flex justify-center">
      <span v-if="title == true">
        {{
          prepareString($t('packages.active').toString())
        }}</span
      >
      <v-checkbox
        color="text"
        dense
        @click.native.stop
        v-else-if="packageBag"
        v-model="packageBag.active"
      />
    </v-col>
    <v-col cls="1" class="d-flex align-center">{{
      title == true
        ? prepareString($t('packages.actions').toString())
        : ''
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
  },
  methods: {
    prepareString(value: String): String {
      return value.charAt(0).toUpperCase() + value.slice(1)
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
