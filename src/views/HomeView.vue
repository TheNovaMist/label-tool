<script setup>
import LabelBox from '../components/table/LabelBox.vue'
import TaskTable from '../components/table/TaskTable.vue'
</script>

<template>
  <main>
    <div class="flex">
      <TaskTable />
      <RouterView>
        <LabelBox />
      </RouterView>
    </div>
  </main>
</template>

