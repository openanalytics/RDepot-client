<template>
  <v-row class="my-5 mr-9" justify="end">
    <v-dialog
      v-model="dialog"
      scrollable
      max-width="600px"
      @click:outside="changeDialogOptions"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="oablue"
          dark
          dense
          v-bind="attrs"
          v-on="on"
          @click="changeDialogOptions"
        >
          {{ $t('filtration.title') }}
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          {{ $t('packages.filtration') }}
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 300px">
          <v-form ref="form" lazy-validation>
            <v-select
              v-model="filtration.state.value"
              :items="submissionStateSelect"
              :label="filtration.state.label"
              color="text"
            ></v-select>

            <v-select
              v-model="filtration.repository.value"
              :items="repositoryNameSelect"
              :label="filtration.repository.label"
              color="text"
            ></v-select>

            <v-checkbox
              :label="filtration.deleted.label"
              v-model="filtration.deleted.value"
              color="text"
            ></v-checkbox>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn
            color="blue darken-1"
            text
            @click="clearFiltration"
          >
            {{ $t('common.reset') }}
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="setFiltration"
          >
            {{ $t('common.search') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import { PackagesFiltration } from '@/models/Filtration'
import store from '@/store'
import Vue from 'vue'

export default Vue.extend({
  props: {
    dialog: Boolean
  },
  data() {
    return {
      checkbox: false,
      dialogLocal: this.dialog,
      //two below will be fetched and get from vuex store
      submissionStateSelect: ['ACCEPTED', 'CANCELLED'],
      repositoryNameSelect: ['repo1', 'repo2']
    }
  },

  methods: {
    changeDialogOptions() {
      this.$emit('changeOptions')
    },
    async setFiltration() {
      this.changeDialogOptions()
      await store.dispatch('setFiltration', this.filtration)
    },
    clearFiltration() {
      store.dispatch('clearFiltration')
    }
  },
  created() {
    this.clearFiltration()
  },
  computed: {
    filtration(): PackagesFiltration {
      return store.state.packages.filtration
    }
  }
})
</script>
