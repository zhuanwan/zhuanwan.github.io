<template>
  <div class="recommend-box">
    <div>
      <span class="fz-14">显示文字：</span>
      <el-input v-model="data.title" class="input ml-10" maxLength=6></el-input>
    </div>
    <div class="mt-5">
      <span class="fz-14">选择商品：</span>
      <el-button class="ml-10">点击添加商品</el-button>
    </div>
    
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
