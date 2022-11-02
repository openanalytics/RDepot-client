<template>
    <div class="locale-changer">
      <v-row align="center">
        <v-col cols="5">
            <v-select
            color="oablue"
            id="mySelect"
            v-model="$i18n.locale"
            :items="langs"
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

<style>
    .v-list-item__content{
    color: var(--v-text-base);
    }
    .theme--light.v-list-item:hover:before {
        opacity: 0.14;
    }
</style>