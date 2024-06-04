<!--
 R Depot
 
 Copyright (C) 2012-2024 Open Analytics NV
 
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
  <v-navigation-drawer
    v-model="drawer"
    :location="xs ? 'start' : 'left'"
    :touchless="mobile ? false : true"
  >
    <v-list nav open-strategy="single">
      <v-list-item
        prepend-icon="mdi-account"
        :title="getUserLogin"
        :subtitle="getSubtitle"
      ></v-list-item>
      <v-divider class="pb-3"></v-divider>
      <v-list-item
        v-if="authorizationStore.can('GET', 'events')"
        prepend-icon="mdi-timetable"
        :title="$t('common.events')"
        :value="$t('common.events')"
        active-class="link-active"
        to="/events"
      >
      </v-list-item>
      <v-list-item
        v-if="authorizationStore.can('POST', 'submissions')"
        id="sidebaruploadpackages"
        prepend-icon="mdi-upload"
        :title="$t('common.uploadPackages')"
        :value="$t('common.uploadPackages')"
        active-class="link-active"
        to="/upload-packages"
      ></v-list-item>

      <v-list-group
        v-if="
          authorizationStore.can(
            'GET',
            'packageMaintainers'
          ) || authorizationStore.can('GET', 'packages')
        "
        tag="Packages"
      >
        <template #activator="{ props }">
          <v-list-item
            v-bind="props"
            prepend-icon="mdi-package"
            :title="$t('common.packages')"
          ></v-list-item>
        </template>

        <v-list-item
          v-if="authorizationStore.can('GET', 'packages')"
          id="sidebarpackageslist"
          :title="$t('common.list')"
          :value="$t('packages.list')"
          active-class="link-active"
          to="/packages"
        ></v-list-item>
        <v-list-item
          v-if="
            authorizationStore.can(
              'GET',
              'packageMaintainers'
            )
          "
          :title="$t('common.maintainers')"
          :value="$t('packages.maintainers')"
          active-class="link-active"
          to="/package-maintainers"
        ></v-list-item>
      </v-list-group>
      <v-list-group
        v-if="
          authorizationStore.can('GET', 'repositories') ||
          authorizationStore.can(
            'GET',
            'repositoryMaintainers'
          )
        "
        tag="Repositories"
      >
        <template #activator="{ props }">
          <v-list-item
            prepend-icon="mdi-folder-network"
            v-bind="props"
            :title="$t('common.repositories')"
          ></v-list-item>
        </template>

        <v-list-item
          v-if="
            authorizationStore.can('GET', 'repositories')
          "
          :title="$t('common.list')"
          :value="$t('repositories.list')"
          active-class="link-active"
          to="/repositories"
        ></v-list-item>
        <v-list-item
          v-if="
            authorizationStore.can(
              'GET',
              'repositoryMaintainers'
            )
          "
          id="sidebarrepositorymintainers"
          :title="$t('common.maintainers')"
          :value="$t('repositories.maintainers')"
          active-class="link-active"
          to="/repository-maintainers"
        ></v-list-item>
      </v-list-group>
      <v-list-item
        v-if="authorizationStore.can('GET', 'users')"
        prepend-icon="mdi-account-multiple"
        :title="$t('common.users')"
        :value="$t('common.users')"
        active-class="link-active"
        to="/users"
      ></v-list-item>

      <v-list-item
        v-if="authorizationStore.can('GET', 'submissions')"
        prepend-icon="mdi-email"
        :title="$t('common.submissions')"
        :value="$t('common.submissions')"
        active-class="link-active"
        to="/submissions"
      ></v-list-item>
      <v-list-group tag="Settings">
        <template #activator="{ props }">
          <v-list-item
            prepend-icon="mdi-cog"
            v-bind="props"
            :title="$t('common.settings')"
          ></v-list-item>
        </template>

        <v-list-item
          :title="$t('settings.tab.general')"
          :value="$t('settings.tab.general')"
          active-class="link-active"
          to="/settings-general"
        ></v-list-item>
        <v-list-item
          :title="$t('settings.tab.token')"
          :value="$t('settings.tab.token')"
          active-class="link-active"
          to="/settings-tokens"
        ></v-list-item>
      </v-list-group>
      <v-list-item
        prepend-icon="mdi-logout"
        :title="$t('common.logout')"
        :value="$t('common.logout')"
        @click="logout"
      ></v-list-item>
    </v-list>

    <template #append>
      <v-list-item style="font-size: 0.7rem">
        v2.2.0
        <span v-if="getEnv('VITE_DEV_MODE') === 'true'"
          >({{
            getEnv('VITE_CURRENT_COMMIT_VERSION')
          }})</span
        >
      </v-list-item>
    </template>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { i18n } from '@/plugins/i18n'
import { useCommonStore } from '@/store/common'
import { useAuthorizationStore } from '@/store/authorization'
import { computed } from 'vue'
import { useDisplay } from 'vuetify/lib/framework.mjs'
import getEnv from '@/utils/env'
import { useMeStore } from '@/store/me'

const { xs, mobile } = useDisplay()
const authorizationStore = useAuthorizationStore()
const meStore = useMeStore()
const commonStore = useCommonStore()
const getUserLogin = computed(() => {
  return meStore.me.name
})

const getSubtitle = computed(() => {
  return meStore.me.name
    ? i18n.t('authorization.logged-in')
    : i18n.t('authorization.not-logged-in')
})

const drawer = computed({
  get() {
    return commonStore.drawer
  },
  set(value: boolean) {
    commonStore.setDrawer(value)
  }
})

function logout() {
  authorizationStore.logout()
}
</script>
