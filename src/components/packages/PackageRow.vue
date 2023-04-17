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
        :center="true"
      />

      <VCheckbox
        id="checkbox-active"
        class="mr-8"
        color="oablue"
        @click.stop
        v-else-if="packageBag"
        v-model="packageBag.active"
        @change="updatePackageActive"
      />
    </VCol>
    <VCol
      id="package-row-actions"
      cols="lg-1"
      class="d-flex justify-center align-center"
      align="center"
    >
      <SortTitle
        v-if="title"
        :text="$t('columns.actions')"
        :sort="false"
        justify="center"
      />
      <span
        v-else-if="packageBag && !packageBag.deleted"
        class="d-flex"
      >
        <VTooltip top>
          <template v-slot:activator="{ props }">
            <VIcon
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
          :name="props.packageBag?.name"
          :set-resource-id="choosePackage"
        />
      </span>
    </VCol>
  </VRow>
</template>

<script setup lang="ts">
import { ref } from '@vue/reactivity'
import router from '@/router'
import { EntityModelPackageDto } from '@/openapi'
import { usePackagesStore } from '@/store/packages'
import DeleteIcon from '@/components/common/action_icons/DeleteIcon.vue'
import SortTitle from '@/components/packages/SortTitle.vue'
import TextRecord from '@/components/packages/TextRecord.vue'

const package_store = usePackagesStore()

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
    router.replace({
      name: 'packageDetails',
      params: {
        name: props.packageBag.id
      }
    })
  }
}
</script>
