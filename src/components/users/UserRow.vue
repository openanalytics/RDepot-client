<template>
  <v-row
    class="px-5"
    :class="{ title: title }"
    id="user-row"
  >
    <v-col
      id="user-name"
      cols="lg-3 sm-2"
      class="d-flex align-center"
    >
      <SortTitle v-if="title" :text="$t('columns.name')" />
      <TextRecord v-else :text="user?.name" />
    </v-col>
    <v-col
      id="user-email"
      cols="lg-3"
      class="d-flex align-center"
    >
      <SortTitle v-if="title" :text="$t('columns.email')" />
      <TextRecord v-else :text="user?.email" />
    </v-col>
    <v-col
      id="user-username"
      cols="lg-2 sm-2"
      class="d-flex align-center"
    >
      <SortTitle
        v-if="title"
        :text="$t('columns.username')"
        sortField="login"
      />
      <TextRecord v-else :text="user?.login" />
    </v-col>
    <v-col
      id="user-role"
      cols="lg-2 sm-2"
      class="d-flex align-center"
    >
      <SortTitle
        v-if="title"
        :text="$t('columns.role')"
        sortField="roleId"
      />
      <TextRecord v-else :text="getRole" />
    </v-col>
    <v-col
      id="user-active"
      cols="lg-1"
      class="d-flex justify-center"
    >
      <SortTitle
        v-if="title"
        :text="$t('columns.active')"
        center
      />
      <v-checkbox
        id="checkbox-active"
        color="oablue"
        @click.stop
        disabled
        v-else-if="user"
        v-model="user.active"
      />
    </v-col>
    <v-col
      id="user-actions"
      cols="lg-1"
      class="d-flex justify-center"
    >
      <SortTitle
        v-if="title"
        :text="$t('columns.actions')"
        center
        no-sort
      />
      <span
        v-else-if="user"
        class="d-flex justify-center align-center"
      >
        <v-tooltip top>
          <template v-slot:activator="{ props }">
            <v-icon
              id="pencil-icon"
              @click.stop
              @click="edit"
              v-bind="props"
              class="ml-3"
              color="oablue"
              :disabled="
                !logged_user_store.can('PATCH', 'users')
              "
              >mdi-pencil</v-icon
            >
          </template>
          <span id="action-edit">{{
            $t('users.edit.tooltip')
          }}</span>
        </v-tooltip>
      </span>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { EntityModelUserDto } from '@/openapi'
import SortTitle from '@/components/common/resources/SortTitle.vue'
import TextRecord from '@/components/common/resources/TextRecord.vue'
import { roleToString } from '@/enum/UserRoles'
import { useLoggedUserStore } from '@/store/logged_user'
import { useUserStore } from '@/store/users'
import { useCommonStore } from '@/store/common'
import { i18n } from '@/plugins/i18n'
import { OverlayEnum } from '@/enum/Overlay'

const logged_user_store = useLoggedUserStore()
const user_store = useUserStore()
const common_store = useCommonStore()

const props = defineProps({
  title: {
    type: Boolean,
    default: false
  },
  user: Object as () => EntityModelUserDto | undefined
})

const getRole = computed(() => {
  return roleToString.parse((props.user?.roleId || 1) - 1)
})

function edit() {
  chosenUser()
  common_store.setOverlayText(
    i18n.t('users.edit.overlay', {
      user_login: user_store.chosenUser.login
    })
  )
  common_store.setOverlayModel(true)
  common_store.setOverlayOpacity(0.8)
  common_store.setOverlayComponent(OverlayEnum.enum.Edit)
}

function chosenUser() {
  if (props.user) {
    user_store.chosenUser = props.user
  }
}
</script>
