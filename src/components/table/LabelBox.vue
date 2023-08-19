<script setup>
import { ref, computed } from 'vue'

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

// const isVideoType = ref(true)
const isVideoType = ref(false)
const formData = ref(tableData[0])

// 选项类别
var radioListData = [
  {
    type: 'scale',
    label: '景别',
    items: ['特写', '近景', '中景', '全景', '远景']
  },
  {
    type: 'angle',
    label: '角度',
    items: ['俯', '仰', '平']
  },
  {
    type: 'movement',
    label: '运镜方式',
    items: ['静态', '推', '拉', '左摇', '右摇', '左移', '右移', '跟', '升', '降']
  }
]

// 选项类别的计算属性
const radioList = computed(() => {
  if (isVideoType.value) {
    return radioListData.filter((i) => i.type === 'movement')
  }
  if (!isVideoType.value) {
    return radioListData.filter((i) => i.type !== 'movement')
  }

  return []
})
</script>
<template>
  <div class="m-6">
    <div class="media-box">
      <img src="@/assets/img.jpg" v-if="!isVideoType" />
      <video v-else controls>
        <source src="@/assets/video.mp4" type="video/mp4" />
      </video>
    </div>
    <!-- 切换测试 -->
    <el-button @click="isVideoType = !isVideoType" type="primary">switch</el-button>

    <el-form :model="formData">
      <div
        v-for="radio in radioList"
        :key="radio"
        class="border pl-4 border-gray-300 mb-2 rounded-md bg-white w-[600px]"
      >
        <div class="m-2">{{ radio.label }}</div>
        <el-form-item>
          <el-radio-group v-model="formData[radio.type]">
            <el-radio v-for="item in radio.items" :key="item" :label="item" border class="mb-2" />
          </el-radio-group>
        </el-form-item>
      </div>
      <!-- 图片不需要描述 -->
      <el-form-item
        class="p-4 pt-0 border border-gray-300 rounded-md bg-white w-[600px]"
        v-if="isVideoType"
      >
        <span class="m-2">描述</span>
        <el-input v-model="formData.description" placeholder="输入主体内容的描述" />
      </el-form-item>
    </el-form>
  </div>
</template>
<style scoped>
.media-box * {
  width: 600px;
  height: 450px;
  object-fit: contain;

  background-color: black;
}
</style>
