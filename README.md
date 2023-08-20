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

关于资源路径中 `@` 符号的转义，如果一个 `<img>` 元素使用静态的 `src` 属性中包含 `@` 会自动解释为项目的根目录。但是如果 `src` 属性使用了一个 **响应式变量** ，`@` 会被解释成当前组件文件的路径导致错误。

## TODO

- 表单数据持久化
- 读取本地目录并插入待标注的媒体信息
- 动态的标注选项

## 数据库语句

```sqlite
CREATE TABLE IF NOT EXISTS media_info (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    url TEXT NOT NULL
);
```

```sqlite
INSERT INTO media_info (id, title, url) VALUES 
    (1, 'Example Title 1', '@/assets/file1.jpg'),
    (2, 'Example Title 2', '@/assets/file2.jpg'),
    (3, 'Example Title 3', '@/assets/file3.jpg'),
    (4, 'Example Title 4', '@/assets/file4.jpg'),
    (5, 'Example Title 5', '@/assets/file5.png'),
    (6, 'Example Title 6', '@/assets/file6.mp4'),
    (7, 'Example Title 7', '@/assets/file7.mp4');
```

```sqlite
SELECT * FROM media_info LIMIT 5 OFFSET 0;
```

```sqlite
CREATE TABLE IF NOT EXISTS media_annotation (
    id INTEGER PRIMARY KEY,
    scale TEXT,
    angle TEXT,
    movement TEXT,
    description TEXT
);

INSERT INTO media_annotation (id) VALUES 
    (1),
    (2),
    (3),
    (4),
    (5),
    (6),
    (7);
    
SELECT * FROM media_annotation;
```

```sqlite
INSERT INTO media_annotation (id, scale, angle, movement, description) VALUES (1, NULL, NULL, NULL, NULL);

UPDATE media_annotation SET scale = '特写', angle = NULL, movement = NULL, description = NULL WHERE id = 1;
```

**连表查询**

```sqlite
SELECT *
FROM media_info info
JOIN media_annotation anno ON info.id = anno.id;
```

**统计总数**

```sqlite
SELECT COUNT(*)
FROM media_info info
JOIN media_annotation anno ON info.id = anno.id;
```
