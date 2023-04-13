<template>
  <v-row
    class="px-5"
    :class="{ title: title }"
    id="package-maintainer-row"
  >
    <v-col
      id="package-maintainer-name"
      cols="lg-1 sm-2"
      class="d-flex align-center"
      >{{
        title == true
          ? prepareString($t('maintainers.name'))
          : packageMaintainer?.user?.name
      }}</v-col
    >
    <v-col
      id="package-maintainer-package"
      cols="lg-8"
      class="d-flex align-center"
      >{{
        title
          ? prepareString($t('maintainers.packageName'))
          : packageMaintainer?.packageName
      }}</v-col
    >
    <v-col
      id="package-maintainer-technology"
      cols="lg-1 sm-2"
      class="d-flex align-center justify-center"
    >
      {{
        title
          ? prepareString($t('repositories.technology'))
          : packageMaintainer?.repository?.technology
      }}</v-col
    >
    <v-col
      id="package-maintainer-repository"
      cols="lg-1 sm-2"
      class="d-flex align-center"
    >
      {{
        title
          ? prepareString($t('maintainers.repository'))
          : packageMaintainer?.repository?.name
      }}</v-col
    >
    <v-col
      id="package-maintainer-actions"
      cols="lg-1"
      class="d-flex justify-center"
    >
      <span v-if="title">
        {{ prepareString($t('maintainers.actions')) }}
      </span>
      <span
        v-else-if="
          packageMaintainer && !packageMaintainer.deleted
        "
        class="d-flex justify-center align-center"
      >
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
        <delete-icon
          :name="props.packageMaintainer?.user?.name"
          :set-resource-id="chooseMaintainer"
        />
      </span>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { EntityModelPackageMaintainerDto } from '@/openapi'
import { usePackageMaintainersStore } from '@/store/package_maintainers'
import DeleteIcon from '../common/action_icons/DeleteIcon.vue'

const props = defineProps({
  title: {
    type: Boolean,
    default: false
  },
  packageMaintainer: Object as () =>
    | EntityModelPackageMaintainerDto
    | undefined
})

const maintainers_store = usePackageMaintainersStore()

function prepareString(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1)
}
function edit() {
  //   maintainers_store.setChosenMaintainer(
  //     props.packageMaintainer || {}
  //   )
  //   common_store.setOverlayText(
  //     i18n.t('maintainers.edit', {
  //       maintainerName: props.packageMaintainer?.user?.id
  //     })
  //   )
  //   common_store.setOverlayModel(true)
  //   common_store.setOverlayOpacity(0.8)
  //   common_store.setOverlayComponent(OverlayEnum.Edit)
}

function chooseMaintainer() {
  maintainers_store.setChosenMaintainer(
    props.packageMaintainer?.id
  )
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
</style>
