<template>
  <v-row
    class="px-5"
    :class="{ title: title }"
    id="package-row"
  >
    <v-col
      id="package-row-name"
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
      id="package-row-version"
      cols="1"
      class="d-flex align-center"
      >{{
        title
          ? prepareString($t('packages.version').toString())
          : packageBag?.version
      }}</v-col
    >
    <v-col
      id="package-row-title"
      cols="lg-6 sm-2"
      class="d-flex align-center"
    >
      {{
        title
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
      id="package-row-maintainer"
      cols="lg-1 sm-2"
      class="d-flex align-center justify-center"
    >
      {{
        title
          ? prepareString(
              $t('packages.maintainer').toString()
            )
          : packageBag?.user?.name
      }}</v-col
    >
    <v-col
      id="package-row-repository"
      cols="lg-1 sm-2"
      class="d-flex align-center justify-center"
    >
      {{
        title
          ? prepareString(
              $t('packages.repository').toString()
            )
          : packageBag?.repository?.id
      }}</v-col
    >
    <v-col
      id="package-row-active"
      cols="lg-1"
      class="d-flex justify-center"
    >
      <span v-if="title">
        {{
          prepareString($t('packages.active').toString())
        }}</span
      >
      <v-checkbox
        id="checkbox-active"
        color="oablue"
        @click.stop
        v-else-if="packageBag"
        v-model="packageBag.active"
        @change="updatePackageActive"
      />
    </v-col>
    <v-col
      id="package-row-actions"
      cols="lg-1"
      class="d-flex justify-center"
    >
      <span v-if="title == true">
        {{
          prepareString($t('packages.actions').toString())
        }}
      </span>
      <span
        v-else-if="packageBag && !packageBag.deleted"
        class="d-flex justify-center align-center"
      >
        <v-tooltip top>
          <template v-slot:activator="{ props }">
            <v-icon
              id="navigate-icon"
              @click.stop
              @click="navigate"
              v-bind="props"
              color="oablue"
              >mdi-forward</v-icon
            >
          </template>
          <span id="action-details">{{
            $t('common.details')
          }}</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ props }">
            <v-icon
              id="delete-icon"
              @click.stop
              @click="deleteDialog"
              v-bind="props"
              color="oared"
              class="ml-3"
              >mdi-trash-can</v-icon
            >
          </template>
          <span id="action-delete">{{
            $t('common.delete')
          }}</span>
        </v-tooltip>
      </span>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { ref } from '@vue/reactivity'
import router from '@/router'
import { EntityModelPackageDto } from '@/openapi'
import { useCommonStore } from '@/store/common'
import { useI18n } from 'vue-i18n'
import { OverlayEnum } from '@/enum/Overlay'
import { usePackagesStore } from '@/store/packages'

const common_store = useCommonStore()
const package_store = usePackagesStore()
const { t } = useI18n()

const props = defineProps({
  title: {
    type: Boolean,
    default: false
  },
  packageBag: Object as () =>
    | EntityModelPackageDto
    | undefined
})
const descMaxLength = ref(110)

function prepareString(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

function updatePackageActive() {
  if (
    props.packageBag &&
    props.packageBag.id &&
    props.packageBag.active != undefined
  ) {
    package_store.activatePackage(
      props.packageBag?.id,
      props.packageBag?.active
    )
  }
}

function navigate() {
  if (props.packageBag?.name) {
    router.replace({
      name: 'packageDetails',
      params: {
        name: props.packageBag.id
      }
    })
  }
}

function deleteDialog() {
  common_store.setOverlayText(
    t('packages.deleteQuestion', {
      package_name: props.packageBag?.name
    })
  )
  common_store.setOverlayModel(true)
  common_store.setOverlayOpacity(0.8)
  common_store.setOverlayComponent(OverlayEnum.Delete)
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
