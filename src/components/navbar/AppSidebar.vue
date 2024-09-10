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
        :prepend-icon="Icons.get('account')"
        :title="getUserLogin"
        :subtitle="getSubtitle"
      >
        <template #append>
          <v-tooltip location="right">
            <template #activator="{ props }">
              <div
                id="tooltip-activator"
                v-bind="props"
                class="pl-3"
              >
                <v-btn
                  id="logout-button"
                  color="grey-lighten-1"
                  :icon="Icons.get('logout')"
                  variant="text"
                  @click="logout"
                ></v-btn>
              </div>
            </template>
            <span id="tooltip-logout">{{
              $t('common.logout')
            }}</span>
          </v-tooltip>
        </template>
      </v-list-item>
      <v-divider class="pb-3"></v-divider>
      <v-list-item
        v-if="authorizationStore.can('GET', 'events')"
        id="sidebar-events"
        :prepend-icon="Icons.get('events')"
        :title="$t('common.events')"
        :value="$t('common.events')"
        active-class="link-active"
        to="/events"
      >
      </v-list-item>
      <v-list-item
        v-if="authorizationStore.can('POST', 'submissions')"
        id="sidebar-upload-packages"
        :prepend-icon="Icons.get('upload')"
        :title="$t('common.uploadPackages')"
        :value="$t('common.uploadPackages')"
        active-class="link-active"
        to="/upload-packages"
      ></v-list-item>

      <v-list-item
        v-if="authorizationStore.can('GET', 'packages')"
        id="sidebarpackageslist"
        :prepend-icon="Icons.get('package')"
        :title="$t('packages.list')"
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
        id="sidebar-package-maintainers"
        :title="$t('packages.maintainers')"
        :value="$t('packages.maintainers')"
        active-class="link-active"
        to="/package-maintainers"
      >
        <template #prepend>
          <v-icon
            :icon="Icons.get('package')"
            size="22"
          ></v-icon>
          <v-icon
            class="nestedIcon"
            :icon="Icons.get('users')"
            size="22"
          ></v-icon>
        </template>
      </v-list-item>

      <v-list-item
        v-if="authorizationStore.can('GET', 'repositories')"
        id="sidebar-repositories-list"
        :title="$t('repositories.list')"
        :value="$t('repositories.list')"
        :prepend-icon="Icons.get('repositories')"
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
        id="sidebar-repository-maintainers"
        :title="$t('repositories.maintainers')"
        :value="$t('repositories.maintainers')"
        active-class="link-active"
        to="/repository-maintainers"
      >
        <template #prepend>
          <v-icon
            :icon="Icons.get('repositories')"
            size="22"
          ></v-icon>
          <v-icon
            class="nestedIcon"
            :icon="Icons.get('users')"
            size="22"
          ></v-icon>
        </template>
      </v-list-item>

      <v-list-item
        v-if="authorizationStore.can('GET', 'users')"
        id="sidebar-users-page"
        :prepend-icon="Icons.get('users')"
        :title="$t('common.users')"
        :value="$t('common.users')"
        active-class="link-active"
        to="/users"
      ></v-list-item>

      <v-list-item
        v-if="authorizationStore.can('GET', 'submissions')"
        id="sidebar-submissions"
        :prepend-icon="Icons.get('submissions')"
        :title="$t('common.submissions')"
        :value="$t('common.submissions')"
        active-class="link-active"
        to="/submissions"
      ></v-list-item>
      <v-list-group>
        <template #activator="{ props }">
          <v-list-item
            :prepend-icon="Icons.get('settings')"
            v-bind="{
              ...props,
              id: 'sidebar-settings-list'
            }"
            :title="$t('common.settings')"
          ></v-list-item>
        </template>

        <v-list-item
          id="sidebar-settings-general"
          :title="$t('settings.tab.general')"
          :value="$t('settings.tab.general')"
          active-class="link-active"
          to="/settings-general"
        ></v-list-item>
        <v-list-item
          id="sidebar-settings-access-tokens"
          :title="$t('settings.tab.token')"
          :value="$t('settings.tab.token')"
          active-class="link-active"
          to="/settings-tokens"
        ></v-list-item>
      </v-list-group>
    </v-list>

    <template #append>
      <v-list-item style="font-size: 0.7rem">
        v2.4.0
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
import { useCommonStore } from '@/store/options/common'
import { useAuthorizationStore } from '@/store/options/authorization'
import { computed } from 'vue'
import { useDisplay } from 'vuetify/lib/framework.mjs'
import getEnv from '@/utils/env'
import Icons from '@/maps/Icons'

const { xs, mobile } = useDisplay()
const authorizationStore = useAuthorizationStore()
const commonStore = useCommonStore()
const getUserLogin = computed(() => {
  return authorizationStore.me.name
})

const getSubtitle = computed(() => {
  return authorizationStore.me.name
    ? i18n.t('authorization.logged-in')
    : i18n.t('authorization.not-logged-in')
})

const drawer = computed({
  get() {
    return commonStore.drawer
  },
  set(value: boolean) {
    commonStore.drawer = value
  }
})

function logout() {
  authorizationStore.logout()
}
</script>

<style scoped lang="scss">
.nestedIcon {
  position: absolute;
  left: 17px;
  top: 21px;
  z-index: 1;
  opacity: 0.9;
}

.nestedIcon.v-theme--dark {
  color: white;
  text-shadow: -1px 0 #000, 0 1px #000, 1px 0 #000,
    0 -1px #000;
}

.nestedIcon.v-theme--light {
  color: white;
  text-shadow: -1px 0 #000, 0 1px #000, 1px 0 #000,
    0 -1px #000;
}
</style>
