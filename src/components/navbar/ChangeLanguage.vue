<!--
 R Depot
 
 Copyright (C) 2012-2025 Open Analytics NV
 
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
  <v-menu
    v-if="
      authorizationStore.me &&
      Object.keys(authorizationStore.me).length > 0
    "
    location="bottom center"
  >
    <template #activator="{ props }">
      <v-icon
        id="change-language-navbar-button"
        v-tooltip="$t('actions.settings.changeLanguage')"
        color="text"
        v-bind="props"
        depressed
        icon="mdi-translate"
      >
      </v-icon>
    </template>
    <v-list>
      <v-list-item
        v-for="(item, index) in availableLanguages"
        :id="item.name"
        :key="index"
        :active="$i18n.locale == item.abbreviation"
        link
        @click="
          () => {
            $i18n.locale = item.abbreviation
            changeLanguage(item.name)
          }
        "
      >
        <v-list-item-title
          >{{ item.display }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
import langs from '@/locales/index'
import { useAuthorizationStore } from '@/store/options/authorization'
import { useConfigStore } from '@/store/options/config.ts'
import { computed } from 'vue'

const authorizationStore = useAuthorizationStore()

const configStore = useConfigStore()

const availableLanguages = computed(() =>
  langs.filter((lang) =>
    configStore.supportedLanguages.includes(lang.name)
  )
)

const changeLanguage = async (new_language: string) => {
  if (await authorizationStore.isUserLoggedIn()) {
    let new_settings =
      authorizationStore.getCurrentSettings()
    new_settings.language = new_language
    authorizationStore.updateSettings(
      authorizationStore.getCurrentSettings(),
      new_settings
    )
  }
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
