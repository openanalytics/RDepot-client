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
      >{{
        title == true
          ? prepareString($t('packages.name').toString())
          : packageBag
          ? packageBag.name
          : ''
      }}</VCol
    >
    <VCol
      id="package-row-version"
      cols="1"
      class="d-flex align-center"
      >{{
        title
          ? prepareString($t('packages.version').toString())
          : packageBag?.version
      }}</VCol
    >
    <VCol
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
      }}</VCol
    >
    <VCol
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
      }}</VCol
    >
    <VCol
      id="package-row-repository"
      cols="lg-1 sm-2"
      class="d-flex align-center justify-center"
    >
      {{
        title
          ? prepareString(
              $t('packages.repository').toString()
            )
          : packageBag?.repository?.name
      }}</VCol
    >
    <VCol
      id="package-row-active"
      cols="lg-1"
      class="d-flex justify-center"
    >
      <span v-if="title">
        {{
          prepareString($t('packages.active').toString())
        }}</span
      >
      <VCheckbox
        id="checkbox-active"
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
import DeleteIcon from '../common/action_icons/DeleteIcon.vue'

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
const descMaxLength = ref(110)

function prepareString(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

function choosePackage() {
  package_store.setChosenPackage(props.packageBag?.id)
}

function updatePackageActive() {
  if (
    props.packageBag &&
    props.packageBag.id &&
    props.packageBag.active != undefined
  ) {
    const fields: Map<string, any> = new Map<string, any>()
    fields.set('active', props.packageBag?.active)
    package_store.setChosenPackage(props.packageBag?.id)
    package_store.updatePackage(fields)
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
