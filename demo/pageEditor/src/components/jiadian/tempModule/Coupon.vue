<template>
  <div class="coupon">
    <p class="tit fz-18">{{ data.title }}</p>
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
  .coupon{
    // margin-top: 12px;
    height: 172px;
    background: url('../images/coupon.jpg') no-repeat 0 0;
    background-size: 100%;
    .tit{
      height: 64px;
      line-height: 64px;
      margin-left: 20px;
    }
  }
</style>
