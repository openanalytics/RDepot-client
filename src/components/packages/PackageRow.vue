<template>
  <VRow
    class="px-5"
    :class="{ title: title }"
    id="package-row"
  >
    <VCol
      id="package-row-name"
      cols="lg-1 sm-2"
      class="d-flex align-center"
    >
      <SortTitle v-if="title" :text="$t('columns.name')" />
      <TextRecord v-else :text="packageBag?.name" />
    </VCol>
    <VCol
      id="package-row-version"
      cols="1"
      class="d-flex align-center"
    >
      <SortTitle
        v-if="title"
        :text="$t('columns.version')"
      />
      <TextRecord v-else :text="packageBag?.version" />
    </VCol>
    <VCol
      id="package-row-title"
      cols="lg-5 sm-2"
      class="d-flex align-center"
    >
      <SortTitle
        v-if="title"
        :text="$t('packages.title')"
      />
      <TextRecord v-else :text="packageBag?.title" />
    </VCol>
    <VCol
      id="package-row-maintainer"
      cols="lg-1 sm-2"
      class="d-flex align-center justify-center"
      align="center"
    >
      <SortTitle
        v-if="title"
        :text="$t('columns.maintainer')"
      />
      <TextRecord v-else :text="packageBag?.user?.name" />
    </VCol>
    <VCol
      id="package-row-technology"
      cols="lg-1 sm-2"
      class="d-flex align-center justify-center"
    >
      <SortTitle
        v-if="title"
        :text="$t('columns.technology')"
      />
      <TextRecord v-else :text="packageBag?.technology" />
    </VCol>
    <VCol
      id="package-row-repository"
      cols="lg-1 sm-2"
      class="d-flex align-center justify-center"
    >
      <SortTitle
        v-if="title"
        :text="$t('columns.repository')"
      />
      <TextRecord
        v-else
        :text="packageBag?.repository?.name"
      />
    </VCol>
    <VCol
      id="package-row-active"
      cols="lg-1"
      class="d-flex justify-center"
    >
      <SortTitle
        v-if="title"
        :text="$t('columns.active')"
        center
      />

      <VCheckbox
        id="checkbox-active"
        class="mr-8"
        color="oablue"
        @click.stop
        v-else-if="packageBag"
        v-model="packageBag.active"
        @change="updatePackageActive"
        :disabled="
          !logged_user_store.can('PATCH', 'package')
        "
      />
    </VCol>
    <VCol
      v-if="
        logged_user_store.can('GET', 'packageDetails') ||
        logged_user_store.can('DELETE', 'package')
      "
      id="package-row-actions"
      cols="lg-1"
      class="d-flex justify-center align-center"
      align="center"
    >
      <SortTitle
        v-if="title"
        :text="$t('columns.actions')"
        no-sort
        justify="center"
      />
      <span
        v-else-if="packageBag && !packageBag.deleted"
        class="d-flex"
      >
        <VTooltip top>
          <template v-slot:activator="{ props }">
            <VIcon
              v-if="
                logged_user_store.can(
                  'GET',
                  'packageDetails'
                )
              "
              id="navigate-icon"
              @click.stop
              @click="navigate"
              v-bind="props"
              color="oablue"
              >mdi-forward</VIcon
            >
          </template>
          <span id="action-details">{{
            $t('common.details')
          }}</span>
        </VTooltip>
        <DeleteIcon
          v-if="logged_user_store.can('DELETE', 'package')"
          :name="props.packageBag?.name"
          :set-resource-id="choosePackage"
        />
        <v-tooltip top>
          <template v-slot:activator="{ props }">
            <v-icon
              v-if="
                logged_user_store.can('DELETE', 'package')
              "
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
    </VCol>
  </VRow>
</template>

<script setup lang="ts">
import router from '@/router'
import { EntityModelPackageDto } from '@/openapi'
import { usePackagesStore } from '@/store/packages'
import DeleteIcon from '@/components/common/action_icons/DeleteIcon.vue'
import SortTitle from '@/components/common/resources/SortTitle.vue'
import TextRecord from '@/components/common/resources/TextRecord.vue'

const package_store = usePackagesStore()
import { useCommonStore } from '@/store/common'
import { useI18n } from 'vue-i18n'
import { useLoggedUserStore } from '@/store/logged_user'
import { OverlayEnum } from '@/enum/Overlay'

const common_store = useCommonStore()
const logged_user_store = useLoggedUserStore()
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

function choosePackage() {
  package_store.setChosenPackage(props.packageBag?.id)
}

function updatePackageActive() {
  if (
    props.packageBag &&
    props.packageBag.id &&
    props.packageBag.active != undefined
  ) {
    package_store.activatePackage(props.packageBag)
  }
}

function navigate() {
  if (props.packageBag?.name) {
    router.push({
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
  common_store.setOverlayComponent(OverlayEnum.enum.Delete)
}
</script>
