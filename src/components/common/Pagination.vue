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
                :total-visible="
                  pagination.totalVisiblePages
                "
                :length="howManyPages"
              ></v-pagination>
              <v-row class="pageSize">
                <v-text-field
                  id="page-size-input"
                  style="flex: 1"
                  width="40"
                  v-model="localPageSize"
                  type="number"
                  color="text"
                  aria-valuemin="1"
                  :label="$t('pagination.size')"
                  @blur="setPageSize()"
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
import { usePagination } from '@/composable/pagination'
import { usePaginationStore } from '@/store/pagination'
import { ref } from 'vue'

const { howManyPages, page, newPageSize } = usePagination()
const pagination = usePaginationStore()
const localPageSize = ref(pagination.pageSize)

function setPageSize() {
  newPageSize(localPageSize.value || 10)
}
</script>

<style lang="scss" scoped>
.pageSize {
  max-width: 100px !important;
}
</style>
