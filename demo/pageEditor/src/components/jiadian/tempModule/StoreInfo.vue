<template>
  <!-- <div class="store-info" :style="{background:'url('+ data.backgroundImg+') center/cover'}">  背景图暂时不做 -->
  <div class="store-info">
    <div class="logo">logo</div>
    <div class="info">
      <div class="title fz-0 mt-10">
        <span class="tit overflow fz-18">标题标题标题标题标题标题标题标题标题标题标题标题标题标题</span>
        <span class="rz fz-12">认证</span>
        <i class="el-icon-arrow-right fz-16"></i>
      </div>
      <p class="overflow position c-999 fz-14 mt-5">描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述</p>
    </div>
    <div class="distance fz-12 green">
      <i class="iconfont icon-lock"></i><br>
      <span>12km</span>
    </div>
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
.store-info{
  height: 65px;
  padding: 20px 0;
  display: flex;
  .logo{
    width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    border-radius: 100%;
    border: 1px solid #ccc;
    margin: 0 10px 0 20px;
  }
  .info{
    flex: 1;
    .title{
      .tit{
        display: inline-block;
        max-width: 142px;
      }
      .rz{
        background-color: #c8af71;
        display: inline-block;
        padding: 0 6px 2px 6px;
        color: #fff;
        border-radius: 8px;
        margin-left: 5px;
        position: relative;
        top: -6px;
        margin-right: 0;
      }
      i{
        position: relative;
        top: -3px;
      }
    }
    .position{
      width: 200px;
    }
  }
  .distance{
    margin: 0 18px 0 10px;
    width: 55px;
    text-align: right;
    margin-top: 26px;
    i{
      display: inline-block;
      margin-bottom: 1px;
    }
  }
}
</style>
