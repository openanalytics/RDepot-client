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
        title
          ? prepareString($t('maintainers.name'))
          : packageMaintainer?.user?.name
      }}</v-col
    >
    <v-col
      id="package-maintainer-package"
      cols="lg-9"
      class="d-flex align-center"
      >{{
        title
          ? prepareString($t('maintainers.packageName'))
          : packageMaintainer?.packageName
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
          : packageMaintainer?.repository?.id
      }}</v-col
    >
    <v-col
      v-if="
        logged_user_store.can(
          'PATCH',
          'packageMaintainers'
        ) ||
        logged_user_store.can(
          'DELETE',
          'packageMaintainers'
        )
      "
      id="package-maintainer-actions"
      cols="lg-1"
      class="d-flex justify-center"
    >
      <span v-if="title">
        {{ prepareString($t('maintainers.actions')) }}
      </span>
      <span
        v-else-if="packageMaintainer"
        class="d-flex justify-center align-center"
      >
        <v-tooltip top>
          <template v-slot:activator="{ props }">
            <v-icon
              v-if="
                logged_user_store.can(
                  'DELETE',
                  'packageMaintainers'
                )
              "
              id="delete-icon"
              @click.stop
              @click="deleteDialog()"
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
              v-if="
                logged_user_store.can(
                  'PATCH',
                  'packageMaintainers'
                )
              "
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
import { OverlayEnum } from '@/enum/Overlay'
import { EntityModelPackageMaintainerDto } from '@/openapi'
import { i18n } from '@/plugins/i18n'
import { useCommonStore } from '@/store/common'
import { useLoggedUserStore } from '@/store/logged_user'
import { usePackageMaintainersStore } from '@/store/package_maintainers'

const props = defineProps({
  title: {
    type: Boolean,
    default: false
  },
  packageMaintainer: Object as () =>
    | EntityModelPackageMaintainerDto
    | undefined
})

const logged_user_store = useLoggedUserStore()
const common_store = useCommonStore()
const maintainers_store = usePackageMaintainersStore()

function prepareString(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1)
}
function edit() {
  maintainers_store.setChosenMaintainer(
    props.packageMaintainer || {}
  )
  common_store.setOverlayText(
    i18n.t('maintainers.edit', {
      maintainerName: props.packageMaintainer?.user?.id
    })
  )
  common_store.setOverlayModel(true)
  common_store.setOverlayOpacity(0.8)
  common_store.setOverlayComponent(OverlayEnum.enum.Edit)
}

function deleteDialog() {
  maintainers_store.setChosenMaintainer(
    props.packageMaintainer || {}
  )
  common_store.setOverlayText(
    i18n.t('maintainers.deleteQuestion', {
      maintainerName: props.packageMaintainer?.user?.id
    })
  )
  common_store.setOverlayModel(true)
  common_store.setOverlayOpacity(0.8)
  common_store.setOverlayComponent(OverlayEnum.enum.Delete)
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
