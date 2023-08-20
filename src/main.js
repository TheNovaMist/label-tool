import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import { useDataStore } from '@/stores/data'

const app = createApp(App)

app.use(createPinia())
// 初始化数据库连接
const store = useDataStore()
store.openDatabase()

app.use(router)

app.use(ElementPlus)

// register element plus icon globally
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')

