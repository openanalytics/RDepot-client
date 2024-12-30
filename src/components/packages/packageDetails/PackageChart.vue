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
  <div id="chart" class="d-flex justify-center">
    <apexchart
      id="package-versions-chart"
      :options="chartOptions"
      :series="series"
      width="300"
    ></apexchart>
  </div>
</template>

<script setup lang="ts">
import { EntityModelRPackageDto } from '@/openapi'
import { i18n } from '@/plugins/i18n'
import vuetify from '@/plugins/vuetify'
import { usePackageDetailsStore } from '@/store/options/packageDetails'
import { computed, watch } from 'vue'

const packageDetailsStore = usePackageDetailsStore()
const packageBag = computed<EntityModelRPackageDto>(
  () =>
    packageDetailsStore.packageBag as EntityModelRPackageDto
)

const versions = computed(() =>
  packageDetailsStore.packages.map(
    (item) => item.version || ''
  )
)

const splittedVersionsArray = computed<string[][]>(() =>
  versions.value
    .reduce((arr, obj) => {
      let key: string = obj.split('.')[0]
      console.log(key)
      let value = (arr as any)[key] ? (arr as any)[key] : []
      value.push(obj)
      ;(arr as any)[key] = value
      return arr
    }, [])
    .filter((val) => val != null)
)

const series = computed(() =>
  splittedVersionsArray.value.map(
    (version) => version.length
  )
)

const labels = computed(() =>
  splittedVersionsArray.value.map(
    (version) => `v${version[0].split('.')[0]}.x.x`
  )
)

var chartOptions: any = {
  chart: {
    type: 'donut'
  },
  colors: [
    vuetify.theme.current.value.colors.oablue,
    vuetify.theme.current.value.colors.oared
  ],
  tooltip: {
    enabled: true,
    custom: function (value: { seriesIndex: number }) {
      return `<div class="arrow_box">${labels.value[value.seriesIndex]}:
      ${series.value[value.seriesIndex]} ${i18n.t('packageDetails.package', { count: series.value[value.seriesIndex] })}
      </div>`
    }
  },
  dataLabels: {
    formatter: function () {}
  },
  legend: {
    offsetY: 30,
    labels: {
      colors: 'rgba(var(--v-theme-secondary))'
    },
    itemMargin: {
      vertical: 5
    }
  },
  title: {
    text: packageBag.value.name,
    align: 'center',
    style: {
      fontSize: '18px',
      color: 'rgba(var(--v-theme-secondary))'
    }
  },
  plotOptions: {
    pie: {
      donut: {
        labels: {
          show: true,
          value: {
            show: true,
            fontSize: '14px',
            color: 'rgba(var(--v-theme-secondary))',
            offsetY: 0
          },
          name: {
            offsetY: 2,
            formatter: function () {
              return i18n.t('common.current')
            }
          },
          total: {
            show: true,
            color: 'rgba(var(--v-theme-oablue))',
            formatter: function () {
              return `v${packageBag.value.version}`
            }
          }
        }
      }
    }
  }
}

watch(labels, () => {
  chartOptions = { labels: labels.value }
})
</script>

<style lang="scss">
.current {
  font-weight: 600;
}
.hover {
  cursor: pointer;
}
.arrow_box {
  padding: 2px 10px;
}
</style>
