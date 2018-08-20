title: vue element-ui
---
vue element-ui遇到的一些问题
<!-- more -->

``` bash
// vue 设置数据视图不更新，参考[官方文档](https://cn.vuejs.org/v2/guide/reactivity.html)
// 按上面用$set有时并不管用,解除引用用以下方法(一个一个赋值也行)
// json
let submitData = JSON.parse(JSON.stringify(this.submitModelForm));
// []
this.submitModelForm = this.submitModelForm.splice(0);
```

``` bash
// element-ui table隐藏显示列 v-if 后面要加key 否则报错 $scopedSlots.default is not a function
<el-table-column prop="hasUsed" label="已使用" v-if="searchObj.status !== 2" key="b"></el-table-column>
```

