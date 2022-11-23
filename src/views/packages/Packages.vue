<template>
  <div>
    <Filtration
      :dialog="getFiltrationDialog"
      @changeOptions="openFiltrationDialog"
    />
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
      console.log(this.filtrationDialog)
      this.filtrationDialog = !this.filtrationDialog
      console.log(this.filtrationDialog)
    }
  },
  components: {
    PackagesList,
    Pagination,
    Filtration
  }
})
</script>

<style scoped lang="scss"></style>
