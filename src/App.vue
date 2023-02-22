<template>
  <v-app>
    <Navbar style="max-width: 100%" />
    <Overlay />
    <div class="d-flex">
      <v-row style="margin: 0">
        <Sidebar />
        <ProgressCircular />
        <v-main>
          <router-view style="margin: 0 15px"></router-view>
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
import Overlay from '@/components/common/Overlay.vue'
import ProgressCircular from './components/common/progress/ProgressCircular.vue'
</script>

<style>
.v-overlay--absolute,
.v-overlay--contained .v-overlay__scrim {
  position: fixed !important;
}
</style>
