<template>
<div>
    {{title}}
    {{repositories}}
</div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      title: 'repositories' 
    }
},

mounted() {
      this.updateState()
    },

    computed:{
      repositories() {
        return this.$store.state.repositories.repositories
    },
  },

methods: {
      updateState(): void{
        this.$store.dispatch('fetchRepositories');
      }
    }
})
</script>

<style scoped lang="scss">

</style>