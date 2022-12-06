<template>
  <div>
    <v-row justify="end" class="my-5 mx-10" align="center">
      <Button
        :title="$t('common.reset')"
        v-on:buttonClicked="
          showOverlay(OverlayEnum.PackagesFiltrationReset)
        "
        class="mx-3"
      />
      <Button
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
    <Pagination
      :howMany="howManyPages"
      :page="page"
      v-on:newPage="nextPage"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import PackagesList from '@/components/packages/PackagesList.vue'
import Pagination from '@/components/Pagination.vue'
import store from '@/store'
import Filtration from '@/components/packages/Filtration.vue'
import Button from '@/components/common/Button.vue'
import Overlay from '@/components/common/Overlay.vue'
import { OverlayEnum } from '@/enum/Overlay'

export default Vue.extend({
  data() {
    return {
      filtrationDialog: false,
      overlay: false,
      opacity: 0.8,
      component: OverlayEnum.PackagesFiltration,
      OverlayEnum
    }
  },
  computed: {
    page() {
      return store.state.packages.page
    },
    howManyPages() {
      return store.state.packages.howManyPages
    },
    getFiltrationDialog(): boolean {
      return this.filtrationDialog
    }
  },
  methods: {
    nextPage(value: number) {
      store.dispatch('setPage', value)
    },
    openFiltrationDialog() {
      this.filtrationDialog = !this.filtrationDialog
    },
    resetForm() {
      store.dispatch('clearFiltrationAndFetch')
    },
    overlayValue(value: boolean) {
      if (value) {
        this.resetForm()
      }
      this.overlay = false
    },
    showOverlay(value: number) {
      this.component = value
      this.overlay = true
    }
  },
  components: {
    PackagesList,
    Pagination,
    Filtration,
    Button,
    Overlay
  }
})
</script>
