<template>
<div>
    <v-select
          :items="repositories"
          :label="$t('addSubmission.step1Title')"
          item-text="name"
          dense
        ></v-select>
</div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props:{
    step: String
  },
  data() {
    return {
        repositories: [
            {
                id: '1',
                name: 'repository1'
            },
            {
                id: '2',
                name: 'repository2'
            }
        ]
    }
  },

  mounted() {
  },

  computed: {
  },

})
</script>


