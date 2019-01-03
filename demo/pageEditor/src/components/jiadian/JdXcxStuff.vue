<template>
  <div class="jd-main">
    <div class="j-header">
      <el-button @click="publish" class="fr mr-20 mt-10">发布</el-button>
    </div>
    <div class="j-content">
      <div class="j-left">
        <div class="l-header">组件</div>
        <draggable class="l-inner" element="ul" v-model="moduleMenu" :options="dragOptions1" :move="onMove" > 
          <transition-group type="transition">
            <li :class="[item.disabled? 'disabled' : '', 'drag-handle']" v-for="item in moduleMenu" :key="item.type" :data-type="item.type">
              <i :class="[item.icon]"></i>
              <span>{{item.name}}</span>
            </li> 
          </transition-group>
        </draggable>
      </div>
      <div class="j-main">
        <div class="j-center">
          <div class="phone-box">
            <div class="phone-header fz-16">
              xx商城<img src="./images/xcx.png" alt="">
            </div>
            <draggable element="span" v-model="layout" :options="dragOptions2" :move="onMove" @add="onAdd"  @choose="onChoose" @sort="onSort"> 
                <transition-group name="no" class="phone-box-inner" tag="ul" ref="phone-box-inner">
                  <li :class="[index === (currentItem || {}).currentIndex? 'current' : '', 'drag-handle']" v-for="(item, index) in layout" :key="index"> 
                    <span class="m-close ft-12" @click="doRemoveComponent(index)"><i class="el-icon-close"></i></span>
                    <component :is="item.tempModuleName" :dataObj="item.data"></component>
                  </li> 
                </transition-group>
            </draggable>
          </div>
          <div class="app-siderbar" :style="{marginTop: curOffsetTop + 'px'}" v-if="currentItem">
            <div class="app-title fz-14">{{currentItem.name}}</div>
            <div class="siderbar-inner">
              <component :is="currentItem.moduleName" :dataObj="currentItem.data" :activeIndex="currentItem.currentIndex" @module-value-change="moduleValueChange" v-if="currentItem"></component>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '@/assets/scss/jd.scss';
import draggable from 'vuedraggable'
import { moduleMenu, moduleValue } from './moduleStuff.js'

export default {
  name: 'jdXcxIndex',
  components: {
    draggable,
    TempStuffBanner: () => import('./tempModule/StuffBanner.vue'),
    TempStuffCategory: () => import('./tempModule/StuffCategory.vue'),
    TempStuffCom: () => import('./tempModule/StuffCom.vue'),
    TempGoodsRecommend: () => import('./tempModule/GoodsRecommend.vue'),

    StuffBanner: () => import('./module/StuffBanner.vue'),
    StuffCategory: () => import('./module/StuffCategory.vue'),
    StuffCom: () => import('./module/StuffCom.vue'),
    GoodsRecommend: () => import('./module/GoodsRecommend.vue'),
  },
  data () {
    return {
      moduleMenu: moduleMenu,  // 菜单组件
      layout: [],              // 提交的数据
      currentItem: null,       // 中间选中的module
      curOffsetTop: 40,         // 中间选中的module对应的右边offset高度
    }
  },
  created () {
    // 中间、右侧模块初始化
    Object.values(moduleValue).forEach(app => {
      this[`Temp${app.moduleName}`] = `Temp${app.moduleName}`
      this[`${app.moduleName}`] = `${app.moduleName}`
    })


    // 请求数据,如果没有就取默认值
    let data = Object.values(moduleValue)


    // 请求数据后添加字段
    this.layout = data.map(item=> {
      const defaultObj = moduleValue[item.type];
      return {
        ...item,
        tempModuleName: `Temp${defaultObj.moduleName}`,
        moduleName: `${defaultObj.moduleName}`,
        name: defaultObj.name
      }
    })
    this.layout = JSON.parse(JSON.stringify(this.layout))
    // 设置右边默认选中
    this.currentItem = this.layout[0]
    this.currentItem.currentIndex = 0
    // console.log(this.layout)

  },
  methods:{
   onMove ({relatedContext, draggedContext}) {
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
      return (!relatedElement || !relatedElement.disabled) && !draggedElement.disabled
    },
    // 左侧组件添加到中间
    onAdd({item, oldIndex, newIndex}) {
      // console.log(this.layout)
      let data = moduleValue[item.dataset.type]
      data.tempModuleName = `Temp${data.moduleName}`
      this.layout.splice(newIndex, 1, JSON.parse(JSON.stringify(data)))
      // console.log('add...', this.layout)
      // console.log(item.offsetTop)
      // this.curOffsetTop = item.offsetTop -28
      // this.currentItem = this.layout[newIndex]
      // this.currentItem.currentIndex = newIndex
    },
    // 中间模块选中
    onChoose({item, oldIndex}) {
      // console.log('choose...', item.offsetTop)
      this.curOffsetTop = item.offsetTop +40
      this.currentItem = this.layout[oldIndex]
      this.currentItem.currentIndex = oldIndex
      // console.log('choose...',this.currentItem, item, oldIndex)
    },
    // 排序后重新选中最新的
    onSort({target, oldIndex, newIndex}) {
      // console.log('sort...')
      this.curOffsetTop = target.children[newIndex].offsetTop +40
      this.currentItem = this.layout[newIndex]
      this.currentItem.currentIndex = newIndex
        // console.log('sort...', this.currentItem)
    },
    // 中间删除模块
    doRemoveComponent(index) {
      // console.log('remove...')
      this.layout.splice(index, 1)
      let chooseIndex = this.layout.length > index? index: index -1
      if (chooseIndex >= 0) {
        this.currentItem = this.layout[chooseIndex]
        this.currentItem.currentIndex = chooseIndex
        this.curOffsetTop = this.$refs['phone-box-inner'].children[chooseIndex].elm.offsetTop + 40
      } else {
        this.currentItem = null
      }
    },
    // 右侧模块修改更新layout
    moduleValueChange(value, index) {
      // console.log('更新。。。', value)
      this.layout[index].data = value
    },
    // 发布保存
    publish() {
      console.log(this.layout)
    }
  },
  computed: {
    dragOptions1 () {
      return  {
        animation: 0,
        group: {
          name: 'modular',
          pull: 'clone',  // 列表单元移出，移动的为该元素的副本
          put: false      // 不可以从其他列表容器内放入列表单元
        },
        sort: false,      // 列表内是否可以排序
        // ghostClass: 'ghost',
        // fallbackClass: true,
      };
    },
    dragOptions2 () {
      return  {
        animation: 0,
        group: {
          name: 'edit-content',
          put: ['modular']
        },
        ghostClass: 'ghost',
        disabled: false,
        filter: ".m-close"
      };
    },
    // layout: {
    //   get() {
    //     return this.$store.getters.getJdLayout
    //   },
    //   set(value) {
    //     this.$store.commit('setJdLayout', value)
    //   }
    // }
  },
  watch: {
    // isDragging (newValue) {
    //   if (newValue){
    //     this.delayedDragging= true
    //     return
    //   }
    //   this.$nextTick( () =>{
    //        this.delayedDragging =false
    //   })
    // }
  }
}
</script>

<style lang="scss" scoped>

</style>
