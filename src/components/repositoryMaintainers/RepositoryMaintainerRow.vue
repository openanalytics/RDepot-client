<template>
  <v-row
    class="px-5"
    :class="{ title: title }"
    id="repository-maintainer-row"
  >
    <v-col
      id="repository-maintainer-name"
      cols="lg-1 sm-2"
      class="d-flex align-center"
      >{{
        title
          ? prepareString($t('maintainers.name'))
          : repositoryMaintainer
          ? repositoryMaintainer.user?.name
          : ''
      }}</v-col
    >
    <v-col
      id="repository-maintainer-repository"
      cols="lg-10 sm-2"
      class="d-flex align-center"
    >
      {{
        title
          ? prepareString($t('maintainers.repository'))
          : repositoryMaintainer
          ? repositoryMaintainer.repository?.name
          : ''
      }}</v-col
    >
    <v-col
      v-if="
        logged_user_store.can(
          'PATCH',
          'repositoryMaintainers'
        ) ||
        logged_user_store.can(
          'DELETE',
          'repositoryMaintainers'
        )
      "
      id="repository-maintainer-actions"
      cols="lg-1"
      class="d-flex justify-center"
    >
      <span v-if="title">
        {{ prepareString($t('maintainers.actions')) }}
      </span>
      <span
        v-else-if="repositoryMaintainer"
        class="d-flex justify-center align-center"
      >
        <v-tooltip top>
          <template v-slot:activator="{ props }">
            <v-icon
              id="delete-icon"
              @click.stop
              @click="deleteDialog()"
              v-bind="props"
              color="oared"
              >mdi-trash-can</v-icon
            >
          </template>
          <span id="action-delete">{{
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
import { OverlayEnum } from '@/enum/Overlay'
import { EntityModelRepositoryMaintainerDto } from '@/openapi'
import { i18n } from '@/plugins/i18n'
import { useCommonStore } from '@/store/common'
import { useLoggedUserStore } from '@/store/logged_user'
import { useRepositoryMaintainersStore } from '@/store/repository_maintainers'

const props = defineProps({
  title: {
    type: Boolean,
    default: false
  },
  repositoryMaintainer: Object as () =>
    | EntityModelRepositoryMaintainerDto
    | undefined
})

const common_store = useCommonStore()
const logged_user_store = useLoggedUserStore()
const maintainers_store = useRepositoryMaintainersStore()

function prepareString(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1)
}
function edit() {
  maintainers_store.setChosenMaintainer(
    props.repositoryMaintainer || {}
  )
  common_store.setOverlayText(
    i18n.t('maintainers.edit', {
      maintainerName: props.repositoryMaintainer?.user?.id
    })
  )
  common_store.setOverlayModel(true)
  common_store.setOverlayOpacity(0.8)
  common_store.setOverlayComponent('Edit')
}

function deleteDialog() {
  maintainers_store.setChosenMaintainer(
    props.repositoryMaintainer || {}
  )
  common_store.setOverlayText(
    i18n.t('maintainers.deleteQuestion', {
      maintainerName: props.repositoryMaintainer?.user?.id
    })
  )
  common_store.setOverlayModel(true)
  common_store.setOverlayOpacity(0.8)
  common_store.setOverlayComponent('Delete')
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
