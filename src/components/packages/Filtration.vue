<template>
  <v-card class="pa-5" width="400">
    <v-card-title>
      {{ $t('packages.filtration') }}
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text style="height: 300px">
      <v-form ref="form" lazy-validation>
        <v-select
          v-model="getFiltration.state.value"
          :items="submissionStateSelect"
          :label="getFiltration.state.label"
          color="text"
        ></v-select>

        <v-select
          v-model="getFiltration.repository.value"
          :items="repositoryNameSelect"
          :label="getFiltration.repository.label"
          color="text"
        ></v-select>

        <v-checkbox
          :label="getFiltration.deleted.label"
          v-model="getFiltration.deleted.value"
          color="text"
        ></v-checkbox>
      </v-form>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-row justify="space-between" class="mt-1">
        <v-btn
          color="blue darken-1"
          @click="changeDialogOptions"
          class="mx-1"
        >
          <small>
            {{ $t('common.cancel') }}
          </small>
        </v-btn>
        <v-row class="my-0" justify="end">
          <v-btn
            color="blue darken-1"
            class="mx-1"
            @click="clearFiltration"
          >
            <small>
              {{ $t('common.clearForm') }}
            </small>
          </v-btn>
          <v-btn
            color="blue darken-1"
            class="mx-1"
            @click="setFiltration"
          >
            <small>
              {{ $t('common.apply') }}
            </small>
          </v-btn>
        </v-row>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { PackagesFiltration } from '@/models/Filtration'
import store from '@/store'
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      checkbox: false,
      //two below will be fetched and get from vuex store
      submissionStateSelect: ['ACCEPTED', 'CANCELLED'],
      repositoryNameSelect: ['repo1', 'repo2'],
      filtration: {} as PackagesFiltration
    }
  },

  methods: {
    changeDialogOptions() {
      this.updateFiltration()
      this.$emit('changeOptions')
    },
    async setFiltration() {
      store.dispatch('setFiltration', this.filtration)
      this.changeDialogOptions()
    },
    clearFiltration() {
      this.filtration.state.value = ''
      this.filtration.repository.value = ''
      this.filtration.deleted.value = false
    },
    updateFiltration() {
      this.filtration = JSON.parse(
        JSON.stringify(store.state.packages.filtration)
      )
    }
  },
  created() {
    this.updateFiltration()
  },
  computed: {
    getFiltration(): PackagesFiltration {
      return this.filtration
    }
  }
})
</script>
