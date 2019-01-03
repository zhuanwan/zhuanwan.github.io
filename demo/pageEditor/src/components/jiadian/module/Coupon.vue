<template>
  <div class="coupon-box">
    <div>
      <span class="fz-14">显示文字：</span>
      <el-input v-model="data.title" class="input ml-10" maxLength=6></el-input>
    </div>
    <div class="red fz-14 mt-5">优惠券：目前只有特权优惠券，由导购自己设置。如果导购有设置，则显示；反之则不显示。</div>
    <div class="tip fz-12 mt-5">TA们都领取了”，默认已有5人领取；头像显示最近领取的5个用户的头像</div>
  </div>
</template>

<script>
import '@/assets/scss/jd.scss';
import mixin from '../mixin/moduleMixin'

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

</style>
