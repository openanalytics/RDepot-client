<!--
 R Depot
 
 Copyright (C) 2012-2023 Open Analytics NV
 
 ===========================================================================
 
 This program is free software: you can redistribute it and/or modify
 it under the terms of the Apache License as published by
 The Apache Software Foundation, either version 2 of the License, or
 (at your option) any later version.
 
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 Apache License for more details.
 
 You should have received a copy of the Apache License
 along with this program. If not, see <http://www.apache.org/licenses/>
 
-->

<template>
  <v-menu offset-y>
    <template #activator="{ props }">
      <v-btn
        id="languagesbutton"
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
        @click="
          () => {
            $i18n.locale = item.display
            changeLanguage(item.name)
          }
        "
        link
      >
        <v-list-item-title
          v-text="item.display"
        ></v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
import langs from '@/locales/index'
import { useAuthorizationStore } from '@/store/authorization'

const authorizationStore = useAuthorizationStore()

const changeLanguage = (new_language: string) => {
  var new_settings = authorizationStore.getCurrentSettings()
  new_settings.language = new_language
  authorizationStore.updateSettings(
    authorizationStore.getCurrentSettings(),
    new_settings
  )
}
</script>

<style lang="scss">
.v-list-item__content div {
  color: var(--v-text-base) !important;
}

.locale-changer {
  max-width: 80px;
}
</style>
