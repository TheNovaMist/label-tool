import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { data as testdata } from './testdata'

export const useDataStore = defineStore('data', () => {
  const start = ref(1)
  const limit = ref(5)
  const pageSize = ref(15)
  // data
  const data = ref(testdata)

  // getter
  const total = computed(() => data.value.length)

  // 分页数据
  const getTableData = computed(() => {
    var left = (start.value - 1) * pageSize.value
    var right = start.value * pageSize.value
    return data.value.slice(left, right)
  })

  return { start, limit, pageSize, data, total, getTableData }
})
