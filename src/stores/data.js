import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { data as testdata } from './testdata'

import initSqlJs from 'sql.js'

export const useDataStore = defineStore('data', () => {
  // database instance
  const db = ref(null)

  const start = ref(1)
  const limit = ref(5)
  const pageSize = ref(15)
  // data
  const data = ref(testdata)
  const testData = ref([[]])

  // 当前媒体信息
  var media_info = reactive([])

  // getter
  const total = computed(() => data.value.length)

  // 分页数据
  const getTableData = computed(() => {
    var left = (start.value - 1) * pageSize.value
    var right = start.value * pageSize.value
    return data.value.slice(left, right)
  })

  /**
   * 连接数据库
   */
  async function openDatabase() {
    try {
      const sqlPromise = initSqlJs({
        locateFile: (file) => `https://sql.js.org/dist/${file}`
      })
      const dataPromise = fetch('http://localhost:5173/src/assets/data.db').then((res) =>
        res.arrayBuffer()
      )

      const [SQL, buf] = await Promise.all([sqlPromise, dataPromise])
      db.value = new SQL.Database(new Uint8Array(buf))
    } catch (error) {
      console.error('Error fetching data.db:', error)
    }
  }
  /**
   * 获取媒体信息
   */
  async function getMediaInfo(id) {
    const stmt = db.value.prepare('SELECT * FROM media_info WHERE id = ?')
    stmt.bind([id])

    const results = []
    while (stmt.step()) {
      const row = stmt.getAsObject()
      results.push(row)
    }
    return results
  }

  return {
    start,
    limit,
    testData,
    pageSize,
    data,
    total,
    getTableData,
    openDatabase,
    getMediaInfo,
    media_info
  }
})
