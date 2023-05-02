<template>
  <Overlay>
    <template v-slot:props="{ closeModal }">
      <UserEdit
        v-if="common_store.isEdit()"
        v-on:closeModal="closeModal"
      />
    </template>
  </Overlay>
</template>

<script setup lang="ts">
import { useCommonStore } from '@/store/common'
import Overlay from '@/components/common/Overlay.vue'
import UserEdit from '@/components/users/UserEdit.vue'

const common_store = useCommonStore()
</script>
