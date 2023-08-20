import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import initSqlJs from 'sql.js'

export const useDataStore = defineStore('data', () => {
  // database instance
  const db = ref(null)

  // 表格参数
  const start = ref(1)
  const limit = ref(5)
  const pageSize = ref(3)
  // data
  const data = ref([])

  /**
   * 数据表的总行数
   */
  const total = computed(() => {
    const result = db.value.exec(
      `
      SELECT COUNT(*)
FROM media_info info
JOIN media_annotation anno ON info.id = anno.id
      `
    )
    const rowCount = result[0].values[0][0]
    return rowCount
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
  /**
   * 获取媒体标签
   */
  function getMediaAnnotation(id) {
    const stmt = db.value.prepare('SELECT * FROM media_annotation WHERE id = ?')
    stmt.bind([id])

    const results = []
    while (stmt.step()) {
      const row = stmt.getAsObject()
      results.push(row)
    }
    return results[0]
  }
  /**
   * 更新媒体标签
   */
  function updateMediaAnnotation(formData) {
    const { id, scale, angle, movement, description } = formData
    console.log('🚀 ~ file: data.js:79 ~ updateMediaAnnotation ~ formData:', formData)

    // 未指定 id
    if (id === null) return

    const stmt = db.value.prepare(
      'UPDATE media_annotation SET scale = ?, ' +
        'angle = ?, movement = ?, description = ? WHERE id = ?'
    )
    stmt.bind([scale, angle, movement, description, id])

    return stmt.step()
  }

  /**
   * 获取表格数据
   */
  function fetchTableData() {
    var left = (start.value - 1) * pageSize.value

    const stmt = db.value.prepare(
      `
      SELECT *
      FROM media_info info
      JOIN media_annotation anno ON info.id = anno.id
      LIMIT ? OFFSET ?
      `
    )
    stmt.bind([pageSize.value, left])
    const results = []
    while (stmt.step()) {
      const row = stmt.getAsObject()
      results.push(row)
    }
    data.value = results
  }

  return {
    start,
    limit,
    pageSize,
    data,
    total,
    openDatabase,
    getMediaInfo,
    getMediaAnnotation,
    updateMediaAnnotation,
    fetchTableData
  }
})
