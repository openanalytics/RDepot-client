<template>
  <div class="text-center">
    <v-container>
      <v-row justify="center">
        <v-col>
          <v-container class="mt-4">
            <v-row
              justify="space-between"
              class="ml-10"
              align="center"
            >
              <div></div>
              <v-pagination
                v-model="page"
                class="my-4"
                :length="howManyPages"
              ></v-pagination>
              <v-row class="pageSize">
                <v-text-field
                  style="flex: 1"
                  width="40"
                  v-model="pageSize"
                  type="number"
                  color="text"
                  :label="$t('pagination.size')"
                ></v-text-field>
              </v-row>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Pagination',
  props: {
    howMany: Number,
    page: Number
  },
  data() {
    return {
      allPackages: 100 as number
    }
  },
  methods: {
    changePageNo() {
      this.$emit('changePage', this.page)
    }
  },
  computed: {
    howManyPages(): number {
      return (
        this.allPackages / store.state.packages.pageSize
      )
    },
    pageSize: {
      get() {
        return store.state.packages.pageSize
      },
      set(value: number) {
        store.commit('setPackagePageSize', value)
      }
    }
  },
  watch: {
    page(value) {
      this.$emit('newPage', value)
    }
  }
})
</script>

<style lang="scss" scoped>
.pageSize {
  max-width: 100px !important;
}
</style>