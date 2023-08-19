<template>
  <div class="max-w-md m-6">
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="scale" label="景别" />
      <el-table-column prop="angle" label="角度" />
      <el-table-column prop="movement" label="运镜" />
      <el-table-column prop="description" label="描述" />
    </el-table>
  </div>
</template>
<script setup>
const tableData = [
  {
    title: 'test1',
    scale: '',
    angle: '',
    movement: '',
    description: ''
  },
  {
    title: 'test2',
    scale: '',
    angle: '',
    movement: '',
    description: ''
  },
  {
    title: 'test3',
    scale: '',
    angle: '',
    movement: '',
    description: ''
  }
]
</script>
