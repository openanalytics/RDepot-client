<template>
  <v-row :class="{ title: title }" id="packagerow">
    <v-col
      id="package-maintainer-name"
      cols="lg-1 sm-2"
      class="d-flex align-center"
      >{{
        title == true
          ? prepareString($t('maintainers.name'))
          : packageMaintainer
          ? packageMaintainer.userId
          : ''
      }}</v-col
    >
    <v-col
      id="package-maintainer-package"
      cols="9"
      class="d-flex align-center"
      >{{
        title == true
          ? prepareString($t('maintainers.packageName'))
          : packageMaintainer
          ? packageMaintainer.packageName
          : ''
      }}</v-col
    >
    <v-col
      id="package-maintainer-repository"
      cols="lg-1 sm-2"
      class="d-flex align-center"
    >
      {{
        title == true
          ? prepareString($t('maintainers.repository'))
          : packageMaintainer
          ? packageMaintainer.repositoryId
          : ''
      }}</v-col
    >
    <v-col
      id="packagerowactions"
      cols="lg-1"
      class="d-flex justify-center"
    >
      <span v-if="title == true">
        {{ prepareString($t('maintainers.actions')) }}
      </span>
      <span
        v-else
        class="d-flex justify-center align-center"
      >
        <v-tooltip top>
          <template v-slot:activator="{ props }">
            <v-icon
              id="delete-icon"
              @click.stop
              @click="deleteMaintainer()"
              v-bind="props"
              color="oared"
              >mdi-trash-can</v-icon
            >
          </template>
          <span id="action-edit">{{
            $t('maintainers.delete')
          }}</span>
        </v-tooltip>

        <v-tooltip top>
          <template v-slot:activator="{ props }">
            <v-icon
              id="pencil-icon"
              @click.stop
              @click="edit"
              v-bind="props"
              class="ml-3"
              color="oablue"
              >mdi-pencil</v-icon
            >
          </template>
          <span id="action-edit">{{
            $t('maintainers.edit')
          }}</span>
        </v-tooltip>
      </span>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { EntityModelPackageMaintainerDto } from '@/openapi'

const props = defineProps({
  title: {
    type: Boolean,
    default: false
  },
  packageMaintainer: Object as () =>
    | EntityModelPackageMaintainerDto
    | undefined
})
function prepareString(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1)
}
function edit() {}
function deleteMaintainer() {}
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
</style>
