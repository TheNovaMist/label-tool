# label-tool

## 文档和工具

- [Button | Element Plus](https://element-plus.org/en-US/component/button.html)
- [Free Open Source Tailwind CSS Components | HyperUI](https://www.hyperui.dev/) 使用了登录表单组件
- [Width - Tailwind CSS](https://tailwindcss.com/docs/width)
- [Create Database in SQLite - W3schools](https://www.w3schools.blog/create-database-sqlite)
- [sql-js/sql.js: A javascript library to run SQLite on the web.](https://github.com/sql-js/sql.js)
- [sql.js 文档](https://sql.js.org/documentation/Database.html#%5B%22prepare%22%5D)

## 记录

使用数据文件 `data.db` 初始化数据库连接，但是对数据库的修改不是持久化的。

只在 `main.js` 中初始化数据库连接，获取 Store 中的 db 实例。

Store 中存放组件使用到的数据，并且通过组件调用 fetch 方法进行更新等操作。

1. 调用方法
2. `onMounted()`
3. `watch()`

表单组件需要声明本地的表单数据，通过提交操作调用 Store 中的方法更新数据库。

监视 **路由参数** 的变化

```js
import { watch } from 'vue'

watch(routeId, async (id, prevId) => {
  console.log('routeId change from {} to {}', prevId, id)
  if (isVideoType.value) {
    const videoPlayer = document.querySelector('video')
    videoPlayer.load()
  }
  formData.value = await store.getMediaAnnotation(id)
  mediaInfo.value = await store.getMediaInfo(id)
})
```

>上面代码中，因为 video 标签更改资源路径需要调用 `load()` 方法重新加载资源。
`getMediaInfo()` 方法请求图片或视频的路径，`getMediaAnnotation()` 方法请求表单组件需要使用的数据。

使用路由参数作为请求数据的参数时，需要对路由切换的逻辑进行限制，考虑 **越界问题**，并且路由参数是一个字符串。

Pinia 在 Composition API 格式中使用到了 `ref()` / `computed()`，导出的 state / getter 在组件中不需要加上 `.value` 访问。

`computed()` 可以使用另一个 `computed()` 响应式变量，并且保持响应性。

使用 `?.` [可选链运算符（?.） - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Optional_chaining) 避免组件访问对象属性时产生 undefined 报错。
