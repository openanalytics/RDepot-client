<template>
  <v-row
    class="px-5"
    :class="{ title: title }"
    id="package-maintainer-row"
  >
    <v-col
      id="package-maintainer-name"
      cols="lg-2 sm-2"
      class="d-flex align-center"
    >
      <SortTitle v-if="title" :text="$t('columns.name')" />
      <TextRecord
        v-else
        :text="packageMaintainer?.user?.name"
      />
    </v-col>
    <v-col
      id="package-maintainer-package"
      cols="lg-7"
      class="d-flex align-center"
    >
      <SortTitle
        v-if="title"
        :text="$t('columns.packageName')"
      />
      <TextRecord
        v-else
        :text="packageMaintainer?.packageName"
      />
    </v-col>
    <v-col
      id="package-maintainer-technology"
      cols="lg-1 sm-2"
      class="d-flex align-center justify-center"
    >
      <SortTitle
        v-if="title"
        center
        no-sort
        :text="$t('columns.technology')"
      />
      <TextRecord
        v-else
        :text="packageMaintainer?.repository?.technology"
        no-margin
      />
    </v-col>
    <v-col
      id="package-maintainer-repository"
      cols="lg-1 sm-2"
      class="d-flex align-center justify-center"
    >
      <SortTitle
        v-if="title"
        :text="$t('columns.repository')"
      />
      <TextRecord
        v-else
        :text="packageMaintainer?.repository?.name"
      />
    </v-col>
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
      <SortTitle
        v-if="title"
        true
        center
        no-sort
        :text="$t('columns.actions')"
        justify="center"
      />
      <span
        v-else-if="
          packageMaintainer && !packageMaintainer.deleted
        "
        class="d-flex justify-center align-center"
      >
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
        <delete-icon
          :name="props.packageMaintainer?.user?.name"
          :set-resource-id="chooseMaintainer"
          v-if="
            logged_user_store.can(
              'DELETE',
              'packageMaintainers'
            )
          "
        />
      </span>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { EntityModelPackageMaintainerDto } from '@/openapi'
import { i18n } from '@/plugins/i18n'
import { useCommonStore } from '@/store/common'
import { useLoggedUserStore } from '@/store/logged_user'
import { usePackageMaintainersStore } from '@/store/package_maintainers'
import DeleteIcon from '../common/action_icons/DeleteIcon.vue'
import SortTitle from '../packages/SortTitle.vue'
import TextRecord from '../packages/TextRecord.vue'
import { OverlayEnum } from '@/enum/Overlay'

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

function chooseMaintainer() {
  maintainers_store.setChosenMaintainer(
    props.packageMaintainer || {}
  )
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
