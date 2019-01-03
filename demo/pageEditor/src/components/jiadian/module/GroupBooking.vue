<template>
  <div class="group-booking-box">
    <div>
      <span class="fz-14">显示文字：</span>
      <el-input v-model="data.title" class="input ml-10" maxLength=6></el-input>
    </div>
    <p class="red fz-14 mt-5">文字描述建议和拼团相关；比如“低价拼团”,“团购专场”。</p>
    <div class="mt-5">
      <span class="fz-14">拼团商品：</span>
      <el-button class="ml-10">点击添加商品</el-button>
    </div>
    <p class="tip fz-12 mt-5">可选择添加需要展示在首页的拼团商品；支持移动显示顺序。</p>
    
    <!-- 选择商品弹框 -->
    <!-- <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog> -->
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
