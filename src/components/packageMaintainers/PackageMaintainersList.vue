<template>
  <div>
    <v-expansion-panels
      variant="inset"
      class="v-expansion mx-5"
    >
      <v-expansion-panel class="py-3">
        <PackageMaintainerRow title />
      </v-expansion-panel>
      <EmptyListing
        v-show="!package_maintainers.length"
      ></EmptyListing>
      <v-expansion-panel
        v-for="(item, index) in package_maintainers"
        :key="index"
      >
        <v-expansion-panel-title
          readonly
          id="expansionpaneltitle"
          class="no-icon"
        >
          <PackageMaintainerRow :packageMaintainer="item" />
        </v-expansion-panel-title>
      </v-expansion-panel>
    </v-expansion-panels>
    <Pagination
      :howManyPages="howManyPages"
      :pageSize="pageSize"
      :page="page"
      v-on:newPage="nextPage($event)"
      v-on:newPageSize="newPageSize($event)"
    />
  </div>
</template>

<script setup lang="ts">
import { usePackageMaintainersStore } from '@/store/package_maintainers'
import { computed, onMounted } from 'vue'
import PackageMaintainerRow from './PackageMaintainerRow.vue'
import EmptyListing from '../common/EmptyListing.vue'
import Pagination from '@/components/common/Pagination.vue'
import { useCommonStore } from '@/store/common'

const package_mainatainers_store =
  usePackageMaintainersStore()

const package_maintainers = computed(function () {
  return package_mainatainers_store.maintainers
})

function updateState(): void {
  package_mainatainers_store.fetchMaintainers()
  package_mainatainers_store.fetchRepositories()
  package_mainatainers_store.fetchPackages()
}

const common_store = useCommonStore()

const pageSize = computed(() => {
  return package_mainatainers_store.pageSize
})

const page = computed({
  get: () => {
    if (package_mainatainers_store.page)
      return package_mainatainers_store.page + 1
  },
  set: (value) => {
    if (value) nextPage(value - 1)
  }
})

const howManyPages = computed(function () {
  if (
    package_mainatainers_store.totalNumber &&
    package_mainatainers_store.pageSize
  ) {
    return Math.ceil(
      package_mainatainers_store.totalNumber /
        package_mainatainers_store.pageSize
    )
  }
})

function nextPage(value: number) {
  package_mainatainers_store.setPage(value)
  common_store.updateKey()
}

function newPageSize(value: number) {
  package_mainatainers_store.setPageSize(value)
  common_store.updateKey()
}

onMounted(() => {
  updateState()
})
</script>

<style>
.v-expansion {
  max-width: 96% !important;
}
.v-expansion-panel-title__icon {
  display: none !important;
}
</style>
