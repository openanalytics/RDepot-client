<template>
  <div class="text-center">
    <v-container>
      <v-row justify="center">
        <v-col>
          <v-container class="mt-4">
            <v-row
              justify="space-between"
              class="ml-10"
              align="center"
            >
              <div></div>
              <v-pagination
                v-model="page"
                class="my-4"
                :length="howManyPages"
              ></v-pagination>
              <v-row class="pageSize">
                <v-text-field
                  id="page-size-input"
                  ref="pageSizeInput"
                  style="flex: 1"
                  width="40"
                  v-model="pageSize"
                  type="number"
                  color="text"
                  aria-valuemin="1"
                  :label="$t('pagination.size')"
                ></v-text-field>
              </v-row>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { usePackagesStore } from '@/store/packages'
import { computed, ref } from 'vue'

const emit = defineEmits(['newPage', 'newPageSize'])
const package_store = usePackagesStore()

const pageSizeInput = ref<HTMLDivElement>()

const howManyPages = computed(function () {
  if (package_store.totalNumber && package_store.pageSize) {
    return Math.ceil(
      package_store.totalNumber / package_store.pageSize
    )
  }
  // return 2
})

const pageSize = computed({
  get() {
    return package_store.pageSize
  },
  set: (value) => {
    if (pageSizeInput.value && pageSizeInput)
      console.log(pageSizeInput.value.hasAttribute('focus'))

    if (
      pageSizeInput.value &&
      !pageSizeInput.value.hasAttribute('focus')
    )
      emit('newPageSize', value)
  }
})

const page = computed({
  get: () => {
    if (package_store.page) return package_store.page + 1
  },
  set: (value) => {
    if (value) emit('newPage', value - 1)
  }
})
</script>

<style lang="scss" scoped>
.pageSize {
  max-width: 100px !important;
}
</style>
