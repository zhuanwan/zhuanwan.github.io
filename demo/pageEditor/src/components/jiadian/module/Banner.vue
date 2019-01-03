<template>
  <div class="banner-box">
    <div class="swpier-list">
      <draggable element="ul" v-model="data.imgUrls" :options="dragOptions" @start="isDragging=true" @end="isDragging=false">
        <transition-group type="transition">
          <li v-for="(item, index) in data.imgUrls" class="drag-handle" :key="index">
            <img :src="item">
            <i class="close el-icon-circle-close fz-18" @click.stop="delImg(index)"></i>
          </li>
        </transition-group>
      </draggable>
      <Multiple-Upload-Img
        style="float: left"
        @upload-img-return-url="uploadImgReturnUrl"
        v-if="data.imgUrls && data.imgUrls.length < 10"
        :maxLength='10'
        :folder="'test/company/jiadian/index/banner/'"
        ref="multipleUploadImg">
        <li class="cicle-border">
          <i class="el-icon-plus"></i>
        </li>
      </Multiple-Upload-Img>
    </div>
    <p class="tip fz-12 mt-5">建议尺寸<label>375*208</label>，可以拖拽图片调整顺序，最多上传<label>10</label>张，<br/>
    图片宽高均不超过4000px，宽高比不超过1:25!，单张不超过2M</p>
  </div>
</template>

<script>
import '@/assets/scss/jd.scss';
import MultipleUploadImg from '@/components/com/MultipleUploadImg.vue'
import draggable from 'vuedraggable' 
import mixin from '../mixin/moduleMixin'

export default {
  mixins: [mixin],
  components: {
    MultipleUploadImg,
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
    // 图片拖拽排序
    dragOptions () {
      return  {
        group:{ name: 'banner', pull: false, put:false },
        animation: 0,
      };
    },
  },
  mounted() {
    console.log('初始化。。。', this.data)
  },
  methods: {
    // 图片删除
    delImg(index) {
      this.dataObj.imgUrls.splice(index, 1);
    },
    // 上传图片
    uploadImgReturnUrl(imgurl){
      this.dataObj.imgUrls.push(imgurl);
    }, 
  }
};
</script>

<style lang="scss" scoped>
  .banner-box{
    .swpier-list{
      overflow: hidden;
      .close {
        display: none;
        position: absolute;
        width: 20px;
        height: 20px;
        top: 0;
        right: 0;
        border-radius: 50%;
        background-color: #fff;
        line-height: 20px;
        text-align: center;
        cursor: pointer;
      }
      li{
        position: relative;
        float: left;
        width: 80px;
        height: 80px;
        line-height: 80px;
        border: 1px solid #ccc;
        margin-right: 12px;
        margin-bottom: 5px;
        img{
          width: 100%;
          height: 100%;
        }
        &:hover {
          .close {
            display: block;
          }
        }
      }
    }
    .cicle-border {
      border: 1px dotted #409eff !important;
      border-radius: 5px;
      text-align: center;
    }
    .drag-handle{
      cursor: move;
    }
  }
</style>
