<template>
  <v-expansion-panel>
    <v-expansion-panel-header expand-icon="">
      <PackageRow :packageBag="packageBag" />
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-divider class="content-divider" />
      <div class="content">{{ packageBag.desc }}</div>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script lang="ts">
import Vue from 'vue'
import { Package } from '@/models/packages/Package'
import PackageRow from './PackageRow.vue'

export default Vue.extend({
  props: {
    packageBag: Object as () => Package
  },
  name: 'PackagesList',
  components: {
    PackageRow
  },
  mounted() {
    this.updateState()
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
  }
})
</script>

<style scoped lang="scss">
.content-divider {
  padding: 0 0 30px 0;
}
.content {
  // margin: 0 auto 10px auto;
  text-align: justify;
  padding: 0 40px 0 0;
}
</style>
