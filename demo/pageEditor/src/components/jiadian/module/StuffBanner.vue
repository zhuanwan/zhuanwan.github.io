<template>
  <div class="stuff-banner-box">
    <draggable class="com-ul" element="ul" v-model="data.list" :options="dragOptions" @start="isDragging=true" @end="isDragging=false">
      <transition-group type="transition">
        <li v-for="(item, index) in data.list" class="drag-handle flex" :key="index">
          <Single-Upload-File
            :width="80"
            :height="80"
            :folder="'test/company/jiadian/stuff/banner/'"
            :filePath="item.img"
            :fileType="1"
            :maxSize="2"
            @update-file="value => updateImg(value, item)"></Single-Upload-File>
          <div class="flex-1 fz-14 mt-10 ml-10">
            <div class="link-src">跳转路径：<span v-if="item.linkName">{{item.linkName}}<i class="el-icon-close" @click="removeLink(item)"></i></span></div>
            <div class="choose-box relative mt-5">
              <span class="choose-span">{{item.linkName? '重新选择': '选择跳转到的页面'}}<i class="el-icon-arrow-down ml-5"></i></span>
              <ul class="choose-inner">
                <li v-for="itemLink in bannerLinkTypeList" @click="chooseLink(itemLink, item)" :key="itemLink.type">{{itemLink.name}}</li>
              </ul>
            </div>  
          </div>
          <span class="close-li" @click="delItem(index)"><i class="el-icon-close fz-12"></i></span>
          <div class="move-handle"><img src="../images/move.png" alt=""></div>
        </li>
      </transition-group>
    </draggable>
    <div class="add-box fz-20" v-if="data.list.length< 10" @click="addListItem">
      <i class="el-icon-plus"></i>
    </div>
    <p class="tip fz-12 mt-5">最多可添加<label>10</label>张图片，拖动右侧手柄可调整顺序，<br/>
    图片宽高均不超过4000px，宽高比不超过1:25!，单张不超过2M</p>

    <!-- 商品选择弹框 -->
    <!-- <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog> -->
  </div>
</template>
  
<script>
import '@/assets/scss/jd.scss';
import SingleUploadFile from "@/components/com/SingleUploadFile"
import draggable from 'vuedraggable' 
import mixin from '../mixin/moduleMixin'
import { bannerLinkTypeList } from '../moduleStuff.js'

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
      bannerLinkTypeList: bannerLinkTypeList
    };
  },
  props: [],
  computed: {
    // 图片拖拽排序
    dragOptions () {
      return  {
        group:{ name: 'banner', pull: false, put:false },
        animation: 0,
        handle: '.move-handle',
        // filter: '.choose-inner'
      };
    },
  },
  mounted() {
    console.log('初始化。。。', this.data)
  },
  methods: {
    // 图片更新
    updateImg(value,item) {
      console.log(111,value,222,item)
      item.img = value
    },
    // 删除跳转路径
    removeLink(item, data) {
      item.linkName = null
    },
    // 选择跳转路径
    chooseLink(itemLink, item) {
      if (itemLink.needDialog) {
        
      } else {
        item.linkName = itemLink.name
        item.linkType = itemLink.type
      }
    },
    // 添加list item
    addListItem() {
      this.data.list.push({})
    },
    // 删除list item
    delItem(i) {
      this.data.list.splice(i, 1);
    }
  }
};
</script>

<style lang="scss" scoped>
  .stuff-banner-box{
    .link-src{
      span{
        display: inline-block;
        border: 1px solid #ccc;
        padding: 0 30px 0 4px;
        position: relative;
        i{
          position: absolute;
          right: 3px;
          top: 3px;
          cursor: pointer;
          &:hover{
            color: #1AAD19;
          }
        }
      }
    }
    .choose-box{
      display: inline-block;
      padding-bottom: 20px;
      .choose-span{
        cursor: pointer;
      }
      .choose-inner{
        border: 1px solid #ccc;
        height: 140px;
        width: 100px;
        overflow: auto;
        position: absolute;
        top: 20px;
        left: 0;
        background-color: #fff;
        z-index: 2;
        display: none;
        li{
          margin: 0;
          padding: 2px 0;
          cursor: pointer;
          border: none;
        }
      }
      &:hover{
        .choose-inner{
          display: block;
        }
        .choose-span{
          color: #1AAD19;
        }
      }
    }
  }
</style>
