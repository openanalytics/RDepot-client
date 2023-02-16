<template>
  <v-row :class="{ title: title }" id="packagerow">
    <v-col
      id="packagerowname"
      cols="lg-1 sm-2"
      class="d-flex align-center"
      >{{
        title == true
          ? prepareString($t('packages.name').toString())
          : packageBag
          ? packageBag.name
          : ''
      }}</v-col
    >
    <v-col
      id="packagerowversion"
      cols="1"
      class="d-flex align-center"
      >{{
        title == true
          ? prepareString($t('packages.version').toString())
          : packageBag
          ? packageBag.version
          : ''
      }}</v-col
    >
    <v-col
      id="packagerowdescription"
      cols="lg-8\7 sm-2"
      class="d-flex align-center"
    >
      {{
        title == true
          ? prepareString($t('packages.title').toString())
          : packageBag && packageBag.title
          ? packageBag.title.length > descMaxLength
            ? packageBag.title.slice(0, descMaxLength) +
              '...'
            : packageBag.title
          : ''
      }}</v-col
    >
    <v-col
      id="packagerowmaintainer"
      cols="lg-2 sm-2"
      class="d-flex align-center justify-center"
    >
      {{
        title == true
          ? prepareString(
              $t('packages.maintainer').toString()
            ) + ' userId'
          : packageBag
          ? packageBag.userId
          : ''
      }}</v-col
    >
    <v-col
      id="packagerowactions"
      cols="lg-1"
      class="d-flex justify-center"
    >
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
              id="navigateicon"
              @click.stop
              @click="navigate"
              v-bind="props"
              color="oablue"
              >mdi-forward</v-icon
            >
          </template>
          <span id="actiondetails">{{
            $t('common.details')
          }}</span>
        </v-tooltip>
      </span>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { ref } from '@vue/reactivity'
import router from '@/router'
import { EntityModelPackageDtoObjectObject } from '@/openapi'

const props = defineProps({
  title: {
    type: Boolean,
    default: false
  },
  packageBag: Object as () =>
    | EntityModelPackageDtoObjectObject
    | undefined
})
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

#packagerow {
  .v-input__details {
    display: none !important;
  }
}
</style>
