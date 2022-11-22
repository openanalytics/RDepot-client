<template>
  <div>
    <PackagesList />
    {{ page }}
    <Pagination
      :howMany="howManyPages"
      :page="page"
      v-on:next="nextPage"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import PackagesList from '@/components/packages/PackagesList.vue'
import Pagination from '@/components/Pagination.vue'
import store from '@/store'

export default Vue.extend({
  data() {
    return {}
  },
  computed: {
    page() {
      return store.state.packages.page
    },
    howManyPages() {
      return store.state.packages.howManyPages
    }
  },
  components: {
    PackagesList,
    Pagination
  },
  methods: {
    nextPage(value: Number) {
      console.log(value)
      store.dispatch('setPage', value)
    }
  }
})
</script>

<style scoped lang="scss"></style>
