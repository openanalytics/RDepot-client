<template>
  <v-stepper-content step="3">
    <v-card class="mb-12 px-10 py-5 step" height="250px">
      <div class="ml-4">{{ choosenRepository }}</div>

      <v-virtual-scroll
        :items="choosenPackages"
        :item-height="50"
        height="200"
      >
        <template v-slot:default="{ item }">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>{{
                item.name
              }}</v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn depressed small>
                remove

                <v-icon color="orange darken-4" right>
                  mdi-open-in-new
                </v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </template>
      </v-virtual-scroll>
    </v-card>
    <div class="d-flex justify-space-between">
      <v-btn color="oablue" @click="nextStep">
        go back
      </v-btn>

      <v-btn color="oablue"> submit </v-btn>
    </div>
  </v-stepper-content>
</template>

<script lang="ts">
import store from '@/store'
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {}
  },

  mounted() {},

  computed: {
    choosenRepository() {
      return store.state.submission.repository
    },
    choosenPackages() {
      return store.state.submission.packages
    }
  },
  methods: {
    changeRepository(value: number) {
      store.dispatch('setRepository', value)
    },
    nextStep() {
      this.$emit('next', 2)
    }
  }
})
</script>
