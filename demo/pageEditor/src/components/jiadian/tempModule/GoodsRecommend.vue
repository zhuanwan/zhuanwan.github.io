<template>
  <div class="recommend">
    <p class="tit fz-18">{{ data.title }}</p>
    <ul class="list-box mt-10">
      <li v-for="(item, index) in data.list" :key="index">
        <img :src="item.img" alt="" class="block w100">
        <p class="mt-5 w100 overflow">是是是是是是是是是是是是是是是是是是是</p>
        <p><span>&yen;585</span><span class="old-price ml-5 fz-12 gray">&yen;4654</span></p>
      </li>
    </ul>
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
  .recommend{
    padding: 20px;
    .list-box{
      overflow: hidden;
      li{
        width: 160px;
        float: left;
        margin-right: 13px;
        margin-bottom: 10px;
        img{
          height: 160px;
        }
        &:nth-child(2n){
          margin-right: 0;
        }
        .old-price{
          display: inline-block;
          text-decoration: line-through;
        }
      }
    }
  }
</style>
