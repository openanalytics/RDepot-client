<template>
  <div>
    <v-expansion-panels
      inset
      class="v-expansion mt-8 mx-10"
    >
      <PackagesListTitle />
      <PackageItem
        v-for="(item, index) in packages"
        :key="index"
        :packageBag="item"
      />
    </v-expansion-panels>
  </div>
</template>

<script lang="ts">
import { Package } from '@/models/packages/Package'
import Vue from 'vue'
import PackageItem from './PackageItem.vue'
import PackagesListTitle from './PackagesListTitle.vue'

export default Vue.extend({
  name: 'PackagesList',
  mounted() {
    this.updateState()
  },
  data() {
    return {}
  },
  computed: {
    packages(): Package[] {
      return this.$store.state.packages.packages
    }
  },
  methods: {
    updateState(): void {
      this.$store.dispatch('fetchPackages')
    }
  },
  components: { PackageItem, PackagesListTitle }
})
</script>

<style scoped>
.v-expansion {
  max-width: 96% !important;
}
</style>
