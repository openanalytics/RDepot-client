<template>
<v-btn icon @click="toggleDarkMode">
    <v-icon>mdi-theme-light-dark</v-icon>
</v-btn>

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

    methods: {
        toggleDarkMode() {
        this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
        console.log('we are here', this.$vuetify.theme)
        localStorage.setItem("darkTheme", this.$vuetify.theme.dark.toString());
      },
    }
})
</script>