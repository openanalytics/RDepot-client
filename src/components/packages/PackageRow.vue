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
    <v-col
      cols="lg-1 sm-2"
      class="d-flex align-center justify-center"
    >
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
    <v-col cols="lg-1" class="d-flex justify-center">
      <span v-if="title == true">
        {{
          prepareString($t('packages.active').toString())
        }}</span
      >
      <v-checkbox
        color="oablue"
        @click.stop
        v-else-if="packageBag"
        v-model="packageBag.active"
      />
    </v-col>
    <v-col cols="lg-1" class="d-flex justify-center">
      <span v-if="title == true">
        {{
          prepareString($t('packages.actions').toString())
        }}
      </span>
      <span
        v-else
        class="d-flex justify-center align-center"
      >
        <v-tooltip top>
          <template v-slot:activator="{ props }">
            <v-icon
              @click.stop
              @click="navigate"
              v-bind="props"
              color="oablue"
              >mdi-forward</v-icon
            >
          </template>
          <span>{{ $t('common.details') }}</span>
        </v-tooltip>
      </span>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Package } from '@/models/packages/Package'
import { ref } from '@vue/reactivity'
import router from '@/router'

export default {
  props: {
    title: {
      type: Boolean,
      default: false
    },
    packageBag: Object as () => Package | undefined
  },
  name: 'PackagesRow',
  setup(props: any) {
    const descMaxLength = ref(110)

    function prepareString(value: string): string {
      return value.charAt(0).toUpperCase() + value.slice(1)
    }

    function navigate() {
      if (props.packageBag) {
        router.replace({
          name: 'packageDetails',
          params: {
            name: props.packageBag.name
          }
        })
      }
    }

    return {
      props,
      prepareString,
      navigate,
      descMaxLength
    }
  }
}
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
  padding: 16px 24px;
}

.v-input__control {
  justify-content: center !important;
}
</style>
