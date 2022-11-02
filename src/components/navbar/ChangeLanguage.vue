<template>
    <div class="locale-changer">
      <v-row align="center" class="my-2">
            <v-select
            id="mySelect"
            v-model="$i18n.locale"
            :items="langs"
            ></v-select>
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

<style lang="scss" >
   .v-list-item__content div 
    // .mdi-menu-down::before 
    {
        color: var(--v-text-base) !important;
    }

    // .theme--light.v-list-item:hover:before {
    //     opacity: 0.14;
    // }

    // .theme--dark.v-text-field > .v-input__control > .v-input__slot:before{
    //     border-color: var(--v-text-base);
    // }

    .locale-changer{
        max-width: 80px;
    }
</style>