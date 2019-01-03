<template>
  <div class="stuff-category">
    <div class="tab flex">
      <div :class="['item','flex-1','fz-14',currentIndex === index? 'current': '']" v-for="(item, index) in data.list" :key="index">
        <span @click="changeTab(index)">{{item.classifyName}}</span>
      </div>
    </div>
    <div class="tab-inner">
      <div class="item" v-for="(item, index) in data.list" :key="index" v-show="index === currentIndex">
        <ul>
          <li v-for="(childItem, childIndex) in item.childClassify" :key="childIndex">
            <img :src="childItem.imageUrl" alt="">
            <span class="fz-12">{{childItem.classifyName}}</span>
          </li>
        </ul>
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
      currentIndex: 0
    };
  },
  props: [],
  computed: {

  },
  mounted() {

  },
  methods: {
    changeTab(i) {
      this.currentIndex = i
    }
  }
};
</script>

<style lang="scss" scoped>
.stuff-category{
  .tab{
    height: 45px;
    line-height: 45px;
    border: 1px solid #ccc;
    .item{
      text-align: center;
      &.current{
        span{
          display: inline-block;
          position: relative;
          cursor: pointer;
          &:after{
            position: absolute;
            content: '';
            bottom: 0;
            left: 0;
            right: 0;
            height: 2px;
            background-color: #ccc;
          }
        }
      }
    }
  }
  .tab-inner{
    height: 270px;
    position: relative;
    overflow: hidden;
    .item{
      li{
        width: 125px;
        height: 125px;
        float: left;
        text-align: center;
       
        &:nth-child(-n+3){
          margin-top: 20px;
        }
        img{
          width: 70px;
          height: 70px;
          display: block;
          margin: 0 auto;
          margin-bottom: 10px;
          border-radius: 100%;
          border: 1px solid #ccc;
        }
      }
    }
  }
}
</style>
