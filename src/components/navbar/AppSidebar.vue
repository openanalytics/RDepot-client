<!--
 R Depot

 Copyright (C) 2012-2026 Open Analytics NV

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
    :rail="!mobile && miniDrawer"
  >
    <v-list nav open-strategy="single">
      <v-list-item
        v-if="!miniDrawer"
        :prepend-icon="Icons.get('account')"
        :title="getUserLogin"
        :subtitle="getSubtitle"
      >
        <template #prepend>
          <UserAvatar
            :username="getUserLogin"
            size="32"
            font-size="0.75rem"
          />
        </template>

        <template #append>
          <v-btn
            id="logout-button"
            v-tooltip:top="$t('actions.general.logout')"
            class="icon-logout"
            color="grey-lighten-1"
            :icon="Icons.get('logout')"
            variant="text"
            @click="logout"
          ></v-btn>
        </template>
      </v-list-item>
      <v-tooltip
        v-if="miniDrawer"
        :text="getUserLogin"
        location="end"
      >
        <template #activator="{ props: tooltipProps }">
          <v-list-item
            v-bind="tooltipProps"
            :prepend-icon="Icons.get('account')"
            class="collapsed-avatar"
          >
            <template #prepend>
              <UserAvatar
                :username="getUserLogin"
                size="32"
                font-size="0.75rem"
              />
            </template>
          </v-list-item>
        </template>
      </v-tooltip>
      <v-divider class="pb-3"></v-divider>
      <v-tooltip
        v-if="authorizationStore.can('GET', 'events')"
        :text="$t('resources.event', 2)"
        location="end"
        :disabled="!miniDrawer"
      >
        <template #activator="{ props: tooltipProps }">
          <v-list-item
            v-bind="tooltipProps"
            id="sidebar-events"
            :prepend-icon="Icons.get('events')"
            :title="$t('resources.event', 2)"
            :value="$t('resources.event', 2)"
            :active="'events' === $route.name"
            to="/events"
          >
          </v-list-item>
        </template>
      </v-tooltip>
      <v-tooltip
        v-if="authorizationStore.can('POST', 'submissions')"
        :text="$t('actions.general.uploadPackages')"
        location="end"
        :disabled="!miniDrawer"
      >
        <template #activator="{ props: tooltipProps }">
          <v-list-item
            v-bind="tooltipProps"
            id="sidebar-upload-packages"
            :prepend-icon="Icons.get('upload')"
            :title="$t('actions.general.uploadPackages')"
            :value="$t('actions.general.uploadPackages')"
            :active="'addSubmission' === $route.name"
            to="/upload-packages"
          ></v-list-item>
        </template>
      </v-tooltip>

      <v-tooltip
        v-if="authorizationStore.can('GET', 'packages')"
        :text="$t('resources.package', 2)"
        location="end"
        :disabled="!miniDrawer"
      >
        <template #activator="{ props: tooltipProps }">
          <v-list-item
            v-bind="tooltipProps"
            id="sidebar-packages-list"
            :prepend-icon="Icons.get('package')"
            :title="$t('resources.package', 2)"
            :value="$t('resources.package', 2)"
            :active="
              'packages' === $route.name ||
              'Home' === $route.name
            "
            to="/packages"
          ></v-list-item>
        </template>
      </v-tooltip>

      <v-tooltip
        v-if="
          authorizationStore.can(
            'GET',
            'packageMaintainers'
          )
        "
        :text="$t('resources.packageMaintainer', 2)"
        location="end"
        :disabled="!miniDrawer"
      >
        <template #activator="{ props: tooltipProps }">
          <v-list-item
            v-bind="tooltipProps"
            id="sidebar-package-maintainers"
            :title="$t('resources.packageMaintainer', 2)"
            :value="$t('resources.packageMaintainer', 2)"
            :active="'packageMaintainers' === $route.name"
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
        </template>
      </v-tooltip>

      <v-tooltip
        v-if="authorizationStore.can('GET', 'repositories')"
        :text="$t('resources.repository', 2)"
        location="end"
        :disabled="!miniDrawer"
      >
        <template #activator="{ props: tooltipProps }">
          <v-list-item
            v-bind="tooltipProps"
            id="sidebar-repositories-list"
            :title="$t('resources.repository', 2)"
            :value="$t('resources.repository', 2)"
            :prepend-icon="Icons.get('repositories')"
            :active="'repositories' === $route.name"
            to="/repositories"
          ></v-list-item>
        </template>
      </v-tooltip>

      <v-tooltip
        v-if="
          authorizationStore.can(
            'GET',
            'repositoryMaintainers'
          )
        "
        :text="$t('resources.repositoryMaintainer', 2)"
        location="end"
        :disabled="!miniDrawer"
      >
        <template #activator="{ props: tooltipProps }">
          <v-list-item
            v-bind="tooltipProps"
            id="sidebar-repository-maintainers"
            :title="$t('resources.repositoryMaintainer', 2)"
            :value="$t('resources.repositoryMaintainer', 2)"
            :active="
              'repositoryMaintainers' === $route.name
            "
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
        </template>
      </v-tooltip>

      <v-tooltip
        v-if="authorizationStore.can('GET', 'users')"
        :text="$t('resources.user', 2)"
        location="end"
        :disabled="!miniDrawer"
      >
        <template #activator="{ props: tooltipProps }">
          <v-list-item
            v-bind="tooltipProps"
            id="sidebar-users-page"
            :prepend-icon="Icons.get('users')"
            :title="$t('resources.user', 2)"
            :value="$t('resources.user', 2)"
            :active="'users' === $route.name"
            to="/users"
          ></v-list-item>
        </template>
      </v-tooltip>

      <v-tooltip
        v-if="authorizationStore.can('GET', 'submissions')"
        :text="$t('resources.submission', 2)"
        location="end"
        :disabled="!miniDrawer"
      >
        <template #activator="{ props: tooltipProps }">
          <v-list-item
            v-bind="tooltipProps"
            id="sidebar-submissions"
            :prepend-icon="Icons.get('submissions')"
            :title="$t('resources.submission', 2)"
            :value="$t('resources.submission', 2)"
            :active="'submissions' === $route.name"
            to="/submissions"
          ></v-list-item>
        </template>
      </v-tooltip>
      <v-list-group v-if="!miniDrawer">
        <template #activator="{ props }">
          <v-list-item
            :prepend-icon="Icons.get('settings')"
            v-bind="{
              ...props,
              id: 'sidebar-settings-list'
            }"
            :title="$t('resources.settings')"
          ></v-list-item>
        </template>

        <v-list-item
          id="sidebar-settings-general"
          :title="$t('resources.generalSettings')"
          :value="$t('resources.generalSettings')"
          :active="'settingsGeneral' === $route.name"
          to="/settings-general"
        ></v-list-item>
        <v-list-item
          id="sidebar-settings-access-tokens"
          :title="$t('resources.accessToken', 2)"
          :value="$t('resources.accessToken', 2)"
          :active="'settingsTokens' === $route.name"
          to="/settings-tokens"
        ></v-list-item>
      </v-list-group>
      <v-tooltip
        v-if="miniDrawer"
        :text="$t('resources.generalSettings')"
        location="end"
      >
        <template #activator="{ props: tooltipProps }">
          <v-list-item
            v-bind="tooltipProps"
            :prepend-icon="Icons.get('settings')"
            :active="'settingsGeneral' === $route.name"
            to="/settings-general"
          ></v-list-item>
        </template>
      </v-tooltip>
      <v-tooltip
        v-if="miniDrawer"
        :text="$t('resources.accessToken', 2)"
        location="end"
      >
        <template #activator="{ props: tooltipProps }">
          <v-list-item
            v-bind="tooltipProps"
            :prepend-icon="Icons.get('access-token')"
            :active="'settingsTokens' === $route.name"
            to="/settings-tokens"
          ></v-list-item>
        </template>
      </v-tooltip>
    </v-list>

    <template #append>
      <template v-if="miniDrawer && !mobile">
        <v-list nav>
          <v-tooltip
            :text="$t('actions.general.logout')"
            location="end"
          >
            <template #activator="{ props: tooltipProps }">
              <v-list-item
                v-bind="tooltipProps"
                class="icon-logout"
                :prepend-icon="Icons.get('logout')"
                @click="logout"
              ></v-list-item>
            </template>
          </v-tooltip>
        </v-list>
      </template>
      <div
        class="d-flex align-center justify-space-between px-4 py-2"
        style="font-size: 0.85rem"
      >
        <span v-if="!miniDrawer" id="sidebar-version">
          v2.9.0
          <span v-if="getEnv('VITE_DEV_MODE') === 'true'"
            >({{
              getEnv('VITE_CURRENT_COMMIT_VERSION')
            }})</span
          >
        </span>
        <v-btn
          v-if="!mobile"
          id="sidebar-collapse-toggle"
          v-tooltip:top="
            miniDrawer
              ? $t('actions.general.expandSidebar')
              : $t('actions.general.collapseSidebar')
          "
          :icon="
            miniDrawer
              ? 'mdi-chevron-right'
              : 'mdi-chevron-left'
          "
          variant="text"
          @click="toggleMiniDrawer"
        ></v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { i18n } from '@/plugins/i18n'
import { useCommonStore } from '@/store/options/common'
import { useAuthorizationStore } from '@/store/options/authorization'
import { computed } from 'vue'
import { useDisplay } from 'vuetify'
import getEnv from '@/utils/env'
import Icons from '@/maps/Icons'
import UserAvatar from '@/components/common/users/UserAvatar.vue'

const { xs, mobile } = useDisplay()
const authorizationStore = useAuthorizationStore()
const commonStore = useCommonStore()
const getUserLogin = computed(() => {
  return authorizationStore.me.name
})

const getSubtitle = computed(() => {
  return authorizationStore.me.name
    ? i18n.t('messages.authorization.loggedIn')
    : i18n.t('messages.authorization.notLoggedIn')
})

const drawer = computed({
  get() {
    return commonStore.drawer
  },
  set(value: boolean) {
    commonStore.drawer = value
  }
})

const miniDrawer = computed(() => {
  return commonStore.miniDrawer
})

function toggleMiniDrawer() {
  commonStore.miniDrawer = !commonStore.miniDrawer
}

function logout() {
  authorizationStore.logout()
}
</script>

<style scoped lang="scss">
.collapsed-avatar {
  min-height: 56px;
  min-width: 56px;
  justify-content: center;
}

.nestedIcon {
  position: absolute;
  left: 17px;
  top: 21px;
  z-index: 1;
  opacity: 0.9;
}

.nestedIcon.v-theme--dark {
  color: white;
  text-shadow:
    -1px 0 #000,
    0 1px #000,
    1px 0 #000,
    0 -1px #000;
}

.nestedIcon.v-theme--light {
  color: white;
  text-shadow:
    -1px 0 #000,
    0 1px #000,
    1px 0 #000,
    0 -1px #000;
}

.icon-logout :deep(.v-icon),
.icon-logout:deep(.v-list-item__prepend .v-icon) {
  transition: transform 0.25s ease;
}

.icon-logout:hover :deep(.v-icon),
.icon-logout:hover:deep(.v-list-item__prepend .v-icon) {
  transform: translateX(3px);
}
</style>
