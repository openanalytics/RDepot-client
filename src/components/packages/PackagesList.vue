<template>
  <div>
    <v-expansion-panels inset>
      <PackagesListTitle />
      <PackageItem
        v-for="(item, index) in packages.data"
        :key="index"
        :packageBag="item"
      />
    </v-expansion-panels>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import packages from '@/tmpLists/packages.json'
import PackageItem from './PackageItem.vue'
import PackagesListTitle from './PackagesListTitle.vue'

export default Vue.extend({
  name: 'PackagesList',
  mounted() {
    this.updateState()
  },
  data() {
    return {
      packages: packages
    }
  },
  computed: {
    //uncomment while fetch packages from database
    //   packages() {
    //     return this.$store.state.packages.packages
    // },
  },
  methods: {
    updateState(): void {
      this.$store.dispatch('fetchPackages')
    }
  },
  components: { PackageItem, PackagesListTitle }
})
</script>
