<template>
  <v-menu offset-y>
    <template v-slot:activator="{ props }">
      <v-btn
        color="oablue-darken-2"
        variant="elevated"
        v-bind="props"
        class="px-0 custom-button"
        depressed
      >
        {{ $i18n.locale }}
      </v-btn>
    </template>
    <v-list>
      <v-list-item
        v-for="(item, index) in langs"
        :key="index"
        @click="$i18n.locale = item"
        link
      >
        <v-list-item-title
          v-text="item"
        ></v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
import langs from '../../locales/index'
</script>

<style lang="scss">
.v-list-item__content div {
  color: var(--v-text-base) !important;
}

.locale-changer {
  max-width: 80px;
}
</style>
