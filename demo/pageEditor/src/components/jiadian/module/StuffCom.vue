<template>
  <div class="stuff-com-box fz-14">
    <div class="choose-radio">
      <span>显示样式：</span>
      <el-radio v-model="data.type" label="1">样式1</el-radio>
      <el-radio v-model="data.type" label="2">样式2</el-radio>
    </div>
    <div class="mt-5">
      <span>显示文字：</span>
      <el-input v-model="data.title" class="input ml-10" maxLength=6></el-input>
    </div>
    <div class="mt-5">
      <span>描述内容：</span>
      <el-input v-model="data.description" class="input ml-10" maxLength=10></el-input>
    </div>

    <!-- 商品系列 -->
    <div class="type-1-box mt-10" v-show="data.type == 1">
      <p>商品系列：<span class="green">必须且只能添加三组商品</span></p>
      <ul class="com-ul">
        <li v-for="(item, index) in [1,2,3]" :key="index" class="mt-10">
          <div class="flex">
            <div class="name">显示图片：</div>
            <div class="flex-1">
              <Single-Upload-File
                :width="80"
                :height="80"
                :folder="'test/company/jiadian/stuff/com/'"
                :filePath="data.list1[index].img"
                :fileType="1"
                :maxSize="2"
                @update-file="value => updateImg(value, data.list1[index])"></Single-Upload-File>
              <p class="tip fz-12">建议尺寸：xx*xx像素，尺寸不匹配时，图片将被压缩或拉伸以铺满画面。</p>
            </div>
          </div>
          <div class="flex mt-5">
            <div class="name">添加商品：</div>
            <div class="flex-1">
              <el-button>点击添加商品</el-button><span class="tip fz-12"></span>
              <p class="tip fz-12">添加1个商品，点击进入商品详情页；添加多个商品，点击进入商品列表页面。</p>
            </div>
          </div>
        </li>
        </ul>
    </div>

    <!-- 商品模块 -->
    <div class="type-2-box mt-10" v-show="data.type == 2">
      <p>商品模块：<span class="green">支持添加多个；拖动右侧手柄移动顺序</span></p>
      <draggable class="com-ul drag-ul" element="ul" v-model="data.list2" :options="dragOptions" @start="isDragging=true" @end="isDragging=false">
        <transition-group type="transition">
          <li v-for="(item, index) in data.list2" :key="index" class="mt-10 drag-handle">
            <div class="flex">
              <div class="name">显示图片：</div>
              <div class="flex-1">
                <Single-Upload-File
                  :width="111"
                  :height="63"
                  :folder="'test/company/jiadian/stuff/com/'"
                  :filePath="data.list2[index].img"
                  :fileType="1"
                  :maxSize="2"
                  @update-file="value => updateImg(value, data.list2[index])"></Single-Upload-File>
                <p class="tip fz-12">建议尺寸：333*188像素，尺寸不匹配时，图片将被压缩或拉伸以铺满画面。</p>
              </div>
            </div>
            <div class="flex mt-5">
              <div class="name">添加商品：</div>
              <div class="flex-1">
                <el-button>点击添加商品</el-button><span class="tip fz-12"></span>
                <p class="tip fz-12">添加1个商品，点击进入商品详情页；添加多个商品，点击进入商品列表页面。</p>
              </div>
            </div>
            <div class="move-handle"><img src="../images/move.png" alt=""></div>
          </li>
        </transition-group>
      </draggable>
      <div class="add-box fz-20 mt-10" v-if="data.list2.length< 100" @click="addListItem">
        <i class="el-icon-plus"></i>
      </div>
    </div>

  </div>
</template>

<script>
import '@/assets/scss/jd.scss';
import SingleUploadFile from "@/components/com/SingleUploadFile"
import draggable from 'vuedraggable'
import mixin from '../mixin/moduleMixin'

export default {
  mixins: [mixin],
  components: {
    SingleUploadFile,
    draggable
  },
  watch: {

  },
  data() {
    return {

    };
  },
  props: [],
  computed: {
    // 分类拖拽排序
    dragOptions () {
      return  {
        group:{ name: 'stuffcom', pull: false, put:false },
        animation: 0,
        // filter: '.class-level2'
        handle: '.move-handle',
      };
    },
  },
  mounted() {

  },
  methods: {
    // 图片更新
    updateImg(value, item) {
      console.log(111,value,222,item)
      item.img = value
    },
    // 添加list item
    addListItem() {
      this.data.list2.push({})
    },
  }
};
</script>

<style lang="scss" scoped>
.stuff-com-box{
  .type-1-box{
    .com-ul{
      li{
        padding: 10px;
      }
    }
  }
  .choose-radio{
    padding-bottom: 10px;
    border-bottom: 1px solid #e5e5e5;
  }
}
</style>
