<template>
  <div>
    <v-row justify="end" class="my-5 mx-10" align="center">
      <CommonButton
        :title="$t('common.reset')"
        v-on:buttonClicked="
          showOverlay(OverlayEnum.PackagesFiltrationReset)
        "
        class="mx-3"
      />
      {{ overlay }}
      <CommonButton
        :title="$t('filtration.title')"
        v-on:buttonClicked="
          showOverlay(OverlayEnum.PackagesFiltration)
        "
        class="mx-3"
      />
      <Overlay
        :text="$t('filtration.makeSure')"
        :overlay="overlay"
        :opacity="opacity"
        :component="component"
        v-on:overlayClicked="overlayValue"
      />
    </v-row>

    <PackagesList />
    <Pagination :page="page" v-on:newPage="nextPage" />
  </div>
</template>

<script setup lang="ts">
import PackagesList from '@/components/packages/PackagesList.vue'
import Pagination from '@/components/Pagination.vue'
import CommonButton from '@/components/common/Button.vue'
import Overlay from '@/components/common/Overlay.vue'
import { OverlayEnum } from '@/enum/Overlay'
// import { RPackageControllerApiFactory } from '@/openapi'
import { ref, computed } from 'vue'
import { usePackagesStore } from '@/store/packages'

const filtrationDialog = ref(false)
const overlay = ref(false)
const opacity = ref(0.8)
const component = ref(OverlayEnum.PackagesFiltration)

const package_store = usePackagesStore()

const page = computed(function () {
  return package_store.page
})

function nextPage(value: number) {
  package_store.setPage(value)
}

function openFiltrationDialog() {
  filtrationDialog.value = !filtrationDialog.value
}

function resetForm() {
  package_store.clearFiltrationAndFetch()
}

function overlayValue(value: boolean) {
  if (value) {
    resetForm()
  }
  overlay.value = false
}

function showOverlay(value: number) {
  component.value = value
  overlay.value = true
  console.log(component.value)
}
</script>
