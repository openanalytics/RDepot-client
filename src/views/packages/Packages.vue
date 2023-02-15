<template>
  <div>
    <v-row justify="end" class="my-5 mx-10" align="center">
      <CommonButton
        id="reset-packages-filtration"
        :title="$t('common.reset')"
        v-on:buttonClicked="
          showOverlay(OverlayEnum.PackagesFiltrationReset)
        "
        class="mx-3"
      />
      <CommonButton
        :title="$t('filtration.title')"
        v-on:buttonClicked="
          showOverlay(OverlayEnum.PackagesFiltration)
        "
        class="mx-3"
      />
    </v-row>
    <PackagesList />
    <Pagination :page="page" v-on:newPage="nextPage" />
  </div>
</template>

<script setup lang="ts">
import PackagesList from '@/components/packages/PackagesList.vue'
import Pagination from '@/components/common/Pagination.vue'
import CommonButton from '@/components/common/Button.vue'
import { OverlayEnum } from '@/enum/Overlay'
import { computed } from 'vue'
import { usePackagesStore } from '@/store/packages'
import { useCommonStore } from '@/store/common'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const common_store = useCommonStore()
const package_store = usePackagesStore()

const page = computed(function () {
  return package_store.page
})

function nextPage(value: number) {
  package_store.setPage(value)
}

function showOverlay(value: number) {
  common_store.setOverlayText(t('filtration.makeSure'))
  common_store.setOverlayModel(true)
  common_store.setOverlayOpacity(0.8)
  common_store.setOverlayComponent(value)
}
</script>
