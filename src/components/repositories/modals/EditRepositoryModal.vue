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
  <ModalOverlay id="edit-repository-dialog">
    <template #props>
      <EditRepositoryForm />
    </template>
  </ModalOverlay>
</template>

<script setup lang="ts">
import ModalOverlay from '@/components/common/overlay/ModalOverlay.vue'
import EditRepositoryForm from '@/components/repositories/forms/EditRepositoryForm.vue'
</script>
