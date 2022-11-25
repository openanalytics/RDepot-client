<template>
 <v-stepper-content step=2 >
      <v-card class="mb-12 px-10 py-5 step"  height="250px" >
        <v-file-input
    multiple
    counter
    placeholder="Choose packages" 
    prepend-icon="mdi-paperclip"
    v-on:change="addPackages"
  >
  <template v-slot:selection="{ index, text }">
      <v-chip
        v-if="index < 5"
        color="oablue"
        dark
        label
        small
        class="mt-3 p-2"
        @click="removePackage"
      >
        {{ text }}
      </v-chip>

      <span
        v-else-if="index === 5"
        class="text-overline primary--text text--darken-3 mx-2"
      >
        +{{ files.length - 5 }} File(s)
      </span> 
    </template>
  </v-file-input>
      </v-card>
      <div class="d-flex justify-space-between">
      <v-btn color="oablue" @click="$emit('next', 1)">
        go back
      </v-btn>
      <v-btn color="oablue" @click="nextStep">
        Continue
      </v-btn>
    </div>
    </v-stepper-content>
 
</template>

<script lang="ts">
import store from '@/store';
import Vue from 'vue'

export default Vue.extend({
  props:{
    step: String
  },
  data() {
    return {
      files: [],
    }
  },

  mounted() {
  },

  methods:{
    removePackage(){
    },
   addPackage(){

   },
   addPackages(value: File[]){
    console.log(value)
    store.dispatch("setPackages", value)
   },
   deleteAllExistingPackagesAndAddNewPackages(){
    
   },
   nextStep(){
    if(store.state.submission.packages.length > 0){
      this.$emit('next', 3);
    }else{
      this.$notify({
        group: 'rdepot',
        text: 'no packages choosen',
        type: 'warn'
      })
    }
   }
  }
})
</script>


