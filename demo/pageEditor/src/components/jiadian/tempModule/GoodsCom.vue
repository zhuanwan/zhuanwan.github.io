<template>
  <div class="group-com">
    <div class="tit-box">
      <span class="fz-18">{{ data.title }}</span>
      <span class="fz-14">{{ data.description }}</span>
    </div>
    <div class="swiper-box">
      <ul>
        <li :style="{'background':'url('+ item.img +') center/cover',
                     'transform': 'translateX(' + (swiperWidth*(index - swiperIndex) + 21) + 'px)', 
                     'transition-duration': '500ms',
                     'transition-timing-function': 'ease-out'}" 
            v-for="(item, index) in data.list"
            :key="index">
        </li> 
      </ul>
      <span class="arrow arrow-left" @click="doLeft" v-show="swiperIndex > 0">
        <i class="el-icon-arrow-left"></i>
      </span>
      <span class="arrow arrow-right" @click="doRight" v-show="swiperIndex < data.list.length-1">
        <i class="el-icon-arrow-right"></i>
      </span>
    </div>
    <div class="fz-16 mt-10 ml-20 mr-20">公交卡了地方</div>
    <div><img src="../images/look.jpg" alt="" class="block w100 mt-5"></div>
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
      swiperWidth: 340,
      swiperIndex: 0
    };
  },
  props: [],
  computed: {

  },
  mounted() {

  },
  methods: {
   doLeft() {
      if (this.swiperIndex <= 0) {
        return
      }
      this.swiperIndex--
    },
    doRight() {
      if (this.swiperIndex >= this.data.list.length -1) {
        return
      }
      this.swiperIndex++
    }
  }
};
</script>

<style lang="scss" scoped>
  .group-com{
    padding-bottom: 10px;
    .tit-box{
      height: 64px;
      line-height: 64px;
      margin-left: 20px;
    }
    .swiper-box{
      height: 190px;
      overflow: hidden;
      position: relative;
      ul{
        height: 100%;
      }
      li{
        position: absolute;
        top: 0;
        left: 0;
        // float: left;
        width: 333px;
        height: 100%;
        // overflow: hidden;
        margin-right: 7px;
        &:last-child{
          margin-right: 0;
        }
      }
      .arrow{
        position: absolute;
        height: 36px;
        width: 36px;
        line-height: 36px;
        cursor: pointer;
        transition: .3s;
        border-radius: 50%;
        background-color: rgba(31,45,61,.11);
        color: #fff;
        top: 50%;
        z-index: 10;
        transform: translateY(-50%);
        text-align: center;
        font-size: 12px;
        display: none;
        &.arrow-right{
          right: 20px;
        }
        &.arrow-left{
          left: 20px;
        }
      }
      &:hover{
        .arrow{
          display: block;
        }
      }
    }
    .i-price{
      label{
        display: inline-block;
        background-color: #eea0a0;
        color: #fff;
        font-size: 12px;
        padding: 1px 4px;
      }
      .old-price{
        display: inline-block;
        text-decoration: line-through;
      }
    }
  }
</style>
