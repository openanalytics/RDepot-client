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
  <v-card
    class="pa-5"
    width="400"
    :title="$t('settings.delete')"
  >
    <v-divider></v-divider>
    <v-card-text>
      <p
        v-dompurify-html="
          $t('settings.deleteQuestion', [
            accessTokensStore.currentToken?.name
          ])
        "
      ></p>
    </v-card-text>
    <v-divider></v-divider>
    <CardActions @submit="deleteToken" />
  </v-card>
</template>

<script setup lang="ts">
import CardActions from '@/components/common/overlay/CardActions.vue'
import { useAccessTokensStore } from '@/store/options/accessTokens'

const accessTokensStore = useAccessTokensStore()

function deleteToken() {
  accessTokensStore.delete()
}
</script>
