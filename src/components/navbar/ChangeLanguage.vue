<template>
  <v-menu :rounded="rounded" offset-y>
    <template v-slot:activator="{ attrs, on }">
      <v-btn
        color="oablue darken-2"
        v-bind="attrs"
        v-on="on"
        class="px-0"
      >
        {{ $i18n.locale }}
      </v-btn>
    </template>
    <!-- v-model="$i18n.locale" -->
    <v-list>
      <v-list-item
        v-for="(item, index) in langs"
        :key="index"
        @click="changeLang(index)"
        link
      >
        <v-list-item-title
          v-text="item"
        ></v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import Vue from 'vue'
import { langs } from '@/locales/index'

export default Vue.extend({
  data() {
    return {
      langs: langs,
      rounded: true
    }
  },
  methods: {
    changeLang(index: number) {
      console.log(this.$i18n.locale)
      this.$i18n.locale = this.langs[index]
      console.log(this.$i18n.locale)
    }
  }
})
</script>

<style lang="scss">
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

.locale-changer {
  max-width: 80px;
}
</style>
