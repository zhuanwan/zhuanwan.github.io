<template>
  <div class="stuff-com">
    <div class="tit-box">
      <span class="fz-18">{{ data.title }}</span>
      <span class="fz-14">{{ data.description }}</span>
    </div>
    <div class="type-1-box" v-if="data.type == 1">
      <div class="img-box m1"><img :src="data.list1[0].img" alt=""></div>
      <div class="img-box m2"><img :src="data.list1[1].img" alt=""></div>
      <div class="img-box m3"><img :src="data.list1[2].img" alt=""></div>
    </div>
    <div class="type-2-box" v-if="data.type == 2">
      <div class="swiper-box">
        <ul>
          <li :style="{'transform': 'translateX(' + (swiperWidth*(index - swiperIndex) + 21) + 'px)', 
                      'transition-duration': '500ms',
                      'transition-timing-function': 'ease-out'}" 
              v-for="(item, index) in data.list2"
              :key="index">
              <div class="t-img-box"><img :src="item.img" alt=""></div>
              <div class="b-img-box">
                <div class="item" v-for="(childItem, childIndex) in item.productList" :key="childIndex">
                  <img :src="childItem.mainPic" alt="">
                  <div class="total-num" v-if="item.productList.length > 4 && childIndex === 3"></div>
                </div>
              </div>
          </li> 
        </ul>
        <span class="arrow arrow-left" @click="doLeft" v-show="swiperIndex > 0">
          <i class="el-icon-arrow-left"></i>
        </span>
        <span class="arrow arrow-right" @click="doRight" v-show="swiperIndex < data.list2.length-1">
          <i class="el-icon-arrow-right"></i>
        </span>
      </div>
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
      if (this.swiperIndex >= this.data.list2.length -1) {
        return
      }
      this.swiperIndex++
    }
  }
};
</script>

<style lang="scss" scoped>
.stuff-com{
  padding-bottom: 20px;
  .tit-box{
    height: 64px;
    line-height: 64px;
    margin-left: 20px;
  }
  .type-1-box{
    position: relative;
    height: 190px;
    width: 100%;
    overflow: hidden;
    .img-box{
      position: absolute;
      overflow: hidden;
      width: 164px;
      &.m1{
        top: 0;
        bottom: 0;
        left: 20px;
      }
      &.m2{
        top: 0;
        right: 20px;
        height: 92px;
      }
      &.m3{
        bottom: 0;
        right: 20px;
        height: 92px;
      }
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
  .type-2-box{
    height: 272px;
  }

  .swiper-box{
    height: 100%;
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
      // margin-right: 7px;
      &:last-child{
        margin-right: 0;
      }
      img{
        width: 100%;
        height: 100%;
      }
      .t-img-box{
        width: 100%;
        height: 188px;
        margin-bottom: 2px;
      }
      .b-img-box{
        width: 100%;
        height: 82px;
        overflow: hidden;
        white-space:nowrap;
        .item{
          float: none;
          display: inline-block;
          width: 82px;
          height: 82px;
          margin-right: 2px;
        }
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
}
</style>
