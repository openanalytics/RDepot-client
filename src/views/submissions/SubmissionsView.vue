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
  <EditSubmissionModal />
  <FiltrationBar />
  <submission-list :key="componentKey" />
</template>

<script setup lang="ts">
import SubmissionList from '@/components/submissions/SubmissionsList.vue'
import EditSubmissionModal from '@/components/submissions/modals/EditSubmissionModal.vue'
import FiltrationBar from '@/components/submissions/FiltrationBar.vue'
import { computed } from 'vue'
import { useCommonStore } from '@/store/options/common'

const commonStore = useCommonStore()
const componentKey = computed(() => {
  return commonStore.key
})
</script>
