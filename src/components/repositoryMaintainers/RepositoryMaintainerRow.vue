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
          : repositoryMaintainer?.user?.name
      }}</v-col
    >
    <v-col
      id="repository-maintainer-repository"
      cols="lg-9 sm-2"
      class="d-flex align-center"
    >
      {{
        title
          ? prepareString($t('maintainers.repository'))
          : repositoryMaintainer?.repository?.name
      }}</v-col
    >
    <v-col
      id="repository-maintainer-technology"
      cols="lg-1 sm-2"
      class="d-flex align-center justify-center"
    >
      {{
        title == true
          ? prepareString($t('repositories.technology'))
          : repositoryMaintainer?.repository?.technology
      }}</v-col
    >

    <v-col
      id="repository-maintainer-actions"
      cols="lg-1"
      class="d-flex justify-center"
    >
      <span v-if="title">
        {{ prepareString($t('maintainers.actions')) }}
      </span>
      <span
        v-else-if="
          repositoryMaintainer &&
          !repositoryMaintainer.deleted
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
          :name="props.repositoryMaintainer?.user?.name"
          :set-resource-id="chooseMaintainer"
        />
      </span>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { OverlayEnum } from '@/enum/Overlay'
import { EntityModelRepositoryMaintainerDto } from '@/openapi'
import { i18n } from '@/plugins/i18n'
import { useCommonStore } from '@/store/common'
import { useRepositoryMaintainersStore } from '@/store/repository_maintainers'
import DeleteIcon from '@/components/common/action_icons/DeleteIcon.vue'

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
const maintainers_store = useRepositoryMaintainersStore()

function prepareString(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1)
}
function edit() {
  chooseMaintainer()
  common_store.setOverlayText(
    i18n.t('maintainers.edit', {
      maintainerName: props.repositoryMaintainer?.user?.id
    })
  )
  common_store.setOverlayModel(true)
  common_store.setOverlayOpacity(0.8)
  common_store.setOverlayComponent(OverlayEnum.Edit)
}

function chooseMaintainer() {
  maintainers_store.setChosenMaintainer(
    props.repositoryMaintainer?.id
  )
}
</script>
