<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDataStore } from '@/stores/data'

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

// 路由切换
const route = useRoute()
const router = useRouter()
const routeId = computed(() => route.params.id)

function moveBack() {
  router.push({
    name: 'media',
    params: {
      id: Math.max(parseInt(routeId.value) - 1, 1)
    }
  })
}
function moveForward() {
  router.push({
    name: 'media',
    params: {
      id: Math.min(parseInt(routeId.value) + 1, 7)
    }
  })
}

// 本地数据
var formData = ref({
  scale: null,
  angle: null,
  movement: null,
  description: null
})

// 提交数据
async function submit() {
  console.log('submit form data: ', formData.value)
  const res = await store.updateMediaAnnotation(formData.value)
  console.log('🚀 ~ file: LabelBox.vue:71 ~ submit ~ res:', res)
  await store.fetchTableData()
}

const store = useDataStore()
const mediaInfo = ref([])

onMounted(async () => {
  mediaInfo.value = await store.getMediaInfo(routeId.value)
  console.log('🚀 ~ file: LabelBox.vue:92 ~ onMounted ~ mediaInfo:', mediaInfo)
  formData.value = await store.getMediaAnnotation(routeId.value)
})

watch(routeId, async (id, prevId) => {
  console.log('routeId change from {} to {}', prevId, id)
  if (isVideoType.value) {
    const videoPlayer = document.querySelector('video')
    videoPlayer.load()
  }
  formData.value = await store.getMediaAnnotation(id)
  mediaInfo.value = await store.getMediaInfo(id)
})

const url = computed(() =>
  mediaInfo.value.length !== 0
    ? 'http://localhost:5173' + mediaInfo.value[0].url.replace('@', '/src')
    : 'not found'
)

/**
 * 判断文件类型
 */
const isVideoType = computed(() => url.value.endsWith('.mp4'))
</script>
<template>
  <div class="m-6">
    {{ mediaInfo }}
    {{ url }}

    <br />
    {{ formData }}
    <div class="media-box">
      <img :src="url" v-if="!isVideoType" />
      <video ref="videoPlayer" v-else controls>
        <source :src="url" type="video/mp4" />
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
    <div class="flex justify-center">
      <el-button @click="moveBack">
        <el-icon><ArrowLeftBold /></el-icon>
      </el-button>
      <el-button @click="moveForward">
        <el-icon><ArrowRightBold /></el-icon>
      </el-button>
      <el-button type="primary" @click="submit">提交</el-button>
    </div>
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
