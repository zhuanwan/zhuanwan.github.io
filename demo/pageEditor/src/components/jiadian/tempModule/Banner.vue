<template>
  <div class="banner">
    <div class="default fz-20">banner图</div>
    <el-carousel trigger="click" height="208px" class="carousel" :autoplay="false">
      <el-carousel-item v-for="item in data.imgUrls" :key="item">
        <div :style="{background:'url('+ item +') center/cover', height: '100%'}"></div>
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
  .banner{
    height: 208px;
    position: relative;
    .default{
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      line-height: 200px;
      text-align: center;
      z-index: 1;
    }
    .carousel{
      position: relative;
      z-index: 2;
    }
  }
</style>
