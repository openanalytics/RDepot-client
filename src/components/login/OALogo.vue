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
  <v-img
    v-if="logoUrl"
    id="logo-oa"
    :src="logoUrl"
    :height="logoHeight"
    :width="logoWidth"
    :class="logoClasses"
    :style="logoStyle"
    class="mt-3 mb-5 mx-auto"
    contain
  />
</template>

<script setup lang="ts">
import getEnv from '@/utils/env'

const logoUrl = getEnv('VITE_LOGO_BIG_URL')
const logoHeight = getEnv('VITE_LOGO_BIG_HEIGHT')
const logoWidth = getEnv('VITE_LOGO_BIG_WIDTH')
const logoClasses = getEnv('VITE_LOGO_BIG_CLASSES')
const logoStyle = getEnv('VITE_LOGO_BIG_STYLE')
</script>
