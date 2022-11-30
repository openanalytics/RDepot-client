<template>
  <div>
    <v-row justify="end" class="my-5 mx-10" align="center">
      <Button
        :title="$t('common.reset')"
        v-on:buttonClicked="resetForm"
        class="mx-3"
      />
      <Filtration
        :dialog="getFiltrationDialog"
        @changeOptions="openFiltrationDialog"
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

export default Vue.extend({
  data() {
    return {
      filtrationDialog: false
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
    nextPage(value: Number) {
      store.dispatch('setPage', value)
    },
    openFiltrationDialog() {
      this.filtrationDialog = !this.filtrationDialog
    },
    resetForm() {
      store.dispatch('clearFiltrationAndFetch')
    }
  },
  components: {
    PackagesList,
    Pagination,
    Filtration,
    Button
  }
})
</script>

<style scoped lang="scss"></style>
