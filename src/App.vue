<template>
  <v-app>
    <Navbar style="max-width: 100%" />
    <div class="d-flex">
      <v-row style="margin: 0">
        <Sidebar />
        <ProgressCircular />
        <v-main>
          <router-view
            :key="componentKey"
            style="margin: 0 15px"
          ></router-view>
        </v-main>
      </v-row>
    </div>
    <notifications
      position="top right"
      :max="5"
      pauseOnHover
    />
  </v-app>
</template>

<script setup lang="ts">
import Sidebar from '@/components/navbar/Sidebar.vue'
import Navbar from '@/components/navbar/Navbar.vue'
import ProgressCircular from './components/common/progress/ProgressCircular.vue'
import { computed } from 'vue'
import { useCommonStore } from './store/common'

const common_store = useCommonStore()
const componentKey = computed(() => {
  return common_store.key
})
</script>
