<!--
 R Depot
 
 Copyright (C) 2012-2023 Open Analytics NV
 
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
  <p
    class="value"
    v-if="description"
    v-html="description"
  />
</template>

<script setup lang="ts">
import { EntityModelNewsfeedEventDto } from '@/openapi'
import { computed } from 'vue'
import { i18n } from '@/plugins/i18n'

const props = defineProps({
  event: Object as () => EntityModelNewsfeedEventDto,
  eventType: String,
  resourceType: String
})

const description = computed(() => {
  switch (props.resourceType) {
    case 'PACKAGE':
      return packageDescription()
    case 'REPOSITORY':
      return repositoryDescription()
    case 'USER':
      return userDescription()
    case 'SUBMISSION':
      return submissionDescription()
    case 'ACCESS TOKEN':
      return accessTokenDescription()
    case 'PACKAGE MAINTAINER':
      return packageMaintainerDescription()
    case 'REPOSITORY MAINTAINER':
      return repositoryMaintainerDescription()
    default:
      return undefined
  }
})

function packageDescription() {
  switch (props.eventType) {
    case 'update':
      return updateDescription()
    case 'upload':
    case 'create':
    case 'delete':
      return `<ul> 
                <li>${i18n.t(
                  'columns.submissions.package'
                )}: <strong>${
        props.event?.relatedResource.name
      }</strong></li>
                <li>${i18n.t('columns.package.version')}: ${
        props.event?.relatedResource?.version
      }</li>
                <li>${i18n.t(
                  'columns.package.repository'
                )}: ${
        props.event?.relatedResource?.repository.name
      }</li>
                <li>${i18n.t(
                  'columns.package.technology'
                )}: ${
        props.event?.relatedResource?.technology
      }</li>    
            </ul>`
    default:
      return undefined
  }
}

function repositoryDescription() {
  switch (props.eventType) {
    case 'update':
      return updateDescription()
    case 'create':
    case 'delete':
      return `<ul> 
                <li>${i18n.t(
                  'columns.package.repository'
                )}: <strong>${
        props.event?.relatedResource?.name
      }</strong> </li>
                <li>${i18n.t(
                  'columns.repository.technology'
                )}: ${
        props.event?.relatedResource?.technology
      }</li>    
            </ul>`
    default:
      return undefined
  }
}
function userDescription() {
  switch (props.eventType) {
    case 'update':
      return updateDescription()
    case 'create':
    case 'delete':
      return `<ul> 
                <li>${i18n.t(
                  'columns.users.name'
                )}: <strong>${
        props.event?.relatedResource?.name
      }</strong> </li>
                <li>${i18n.t('columns.users.email')}: ${
        props.event?.relatedResource?.email
      }</li>    
                <li>${i18n.t('columns.users.username')}: ${
        props.event?.relatedResource?.login
      }</li>    
                <li>${i18n.t('columns.users.role')}: ${
        props.event?.relatedResource?.role
      }</li>    
            </ul>`
    default:
      return undefined
  }
}
function submissionDescription() {
  switch (props.eventType) {
    case 'update':
      return updateDescription()
    case 'upload':
    case 'create':
    case 'delete':
      return `<ul> 
                <li>Package name: <strong>${
                  props.event?.relatedResource?.packageBag
                    .name
                }</strong> </li>
                <li>${i18n.t('columns.package.version')}: ${
        props.event?.relatedResource?.packageBag.version
      }</li>    
                <li>${i18n.t(
                  'columns.package.technology'
                )}: ${
        props.event?.relatedResource?.technology
      }</li>    
                <li>${i18n.t(
                  'columns.package.repository'
                )}: ${
        props.event?.relatedResource?.packageBag.repository
          .name
      }</li>    
                <li>${i18n.t('columns.state')}: ${
        props.event?.relatedResource?.state
      }</li>    
            </ul>`
    default:
      return undefined
  }
}

function accessTokenDescription() {
  switch (props.eventType) {
    case 'update':
      return updateDescription()
    case 'create':
    case 'delete':
      return `<ul> 
                <li>Name: <strong>${props.event?.relatedResource?.name}</strong> </li>
                <li>Created: ${props.event?.relatedResource?.creationDate}</li>    
                <li>Expired : ${props.event?.relatedResource?.expirationDate}</li>    
            </ul>`
    default:
      return undefined
  }
}

function packageMaintainerDescription() {
  switch (props.eventType) {
    case 'update':
      return updateDescription()
    case 'create':
    case 'delete':
      return `<ul> 
                <li>${i18n.t(
                  'columns.users.username'
                )}: <strong>${
        props.event?.relatedResource?.user.name
      }</strong> </li>
                <li>${i18n.t('columns.users.email')}: ${
        props.event?.relatedResource?.user.email
      }</li>    
                <li>${i18n.t(
                  'columns.packageMaintainer.packageName'
                )}: ${
        props.event?.relatedResource?.packageName
      }</li>    
                <li>${i18n.t(
                  'columns.package.repository'
                )}: ${
        props.event?.relatedResource?.repository.name
      }</li>    
                <li>${i18n.t(
                  'columns.package.technology'
                )}: ${
        props.event?.relatedResource?.repository.technology
      }</li>    
            </ul>`
    default:
      return undefined
  }
}

function repositoryMaintainerDescription() {
  switch (props.eventType) {
    case 'update':
      return updateDescription()
    case 'create':
    case 'delete':
      return `<ul> 
                <li>${i18n.t(
                  'columns.users.username'
                )}: <strong>${
        props.event?.relatedResource?.user.name
      }</strong> </li>
                <li>${i18n.t('columns.users.email')}: ${
        props.event?.relatedResource?.user.email
      }</li>    
                <li>${i18n.t(
                  'columns.package.repository'
                )}: ${
        props.event?.relatedResource?.repository.name
      }</li>    
                <li>${i18n.t(
                  'columns.package.technology'
                )}: ${
        props.event?.relatedResource?.repository.technology
      }</li>    
            </ul>`
    default:
      return undefined
  }
}

function updateDescription() {
  let message = '<ul>'
  props.event?.changedProperties.forEach((property) => {
    message +=
      '<li>' +
      property.property +
      ' <ul style="margin-left: 3%"><li>Before: ' +
      property.valueBefore +
      '</li><li>After: ' +
      property.valueAfter +
      '</li></ul></li>'
  })
  message += '</ul>'
  return message
}
</script>

<style lang="scss">
.value {
  flex-basis: 70%;
  margin: 10px 0;
}
</style>
