<template>
    <div class="locale-changer">
      <v-row align="center">
        <v-col cols="5">
            <v-select
            v-model="$i18n.locale"
            :items="langs"
            menu-props="auto"
            label="Select"
            hide-details
            prepend-icon="mdi-flag"
            single-line
            ></v-select>
        </v-col>
      </v-row>  
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { langs } from '@/locales/index'

export default Vue.extend({
    data() {
        return {
            langs: langs,
        }
    },
})
</script>