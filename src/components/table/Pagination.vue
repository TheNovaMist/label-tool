<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="mb-4 bg-white p-2 rounded-md">
    <el-pagination
      v-model:current-page="store.start"
      v-model:page-size="store.pageSize"
      :page-sizes="sizes"
      background
      :layout="layout"
      :total="store.total"
      @current-change="store.fetchTableData"
    />
  </div>
</template>

<script setup>
import { useDataStore } from '@/stores/data'

const store = useDataStore()
const layout = 'total, sizes, prev,pager,next'
const sizes = [10, 15, 20]
</script>
