<template>
  <div class="stuff-banner">
    <div class="search fz-14"><i class="el-icon-search mr-5"></i>输入商品名称搜索</div>
    <el-carousel trigger="click" height="208px" class="carousel" :autoplay="false">
      <el-carousel-item v-for="(item, index) in data.list" :key="index">
        <div :style="{background:'url('+ item.img +') center/cover', height: '100%'}"></div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import '@/assets/scss/jd.scss';
import mixin from '../mixin/tempModuleMixin'

export default {
  mixins: [mixin],
  components: {

  },
  watch: {
    dataObj: {
      handler: function (val, oldVal) {
        this.data.imgUrls = []
      },
      deep: true
    }
  },
  data() {
    return {
      
    };
  },
  props: [],
  computed: {

  },
  mounted() {

  },
  methods: {

  }
};
</script>

<style lang="scss" scoped>
  .stuff-banner{
    height: 208px;
    position: relative;
    .search{
      position: absolute;
      top: 10px;
      left: 20px;
      right: 20px;
      height: 28px;
      line-height: 28px;
      border: 1px solid #ccc;
      z-index: 2;
      color: #fff;
      background-color: rgba(182, 182, 182, 0.3);
      text-align: center;
      border-radius: 5px;
    }
    .carousel{
      position: relative;
      z-index: 1;
    }
  }
</style>
