<template>
  <div class="fz-14">暂无设置</div>
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
.store-info{
  height: 94px;
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

    }
    .position{
      width: 200px;
    }
  }
  .distance{
    margin: 0 18px 0 10px;
    width: 55px;
  }
}
</style>
