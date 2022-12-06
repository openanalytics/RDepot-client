<template>
  <div class="text-center">
    <v-container>
      <v-row justify="center">
        <v-col cols="8">
          <v-container class="max-width">
            <v-pagination
              v-model="page"
              class="my-4"
              :length="howMany"
            ></v-pagination>
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
    return {}
  },
  methods: {
    changePageNo() {
      this.$emit('changePage', this.page)
    }
  },
  watch: {
    page(value) {
      this.$emit('newPage', value)
    }
  }
})
</script>
