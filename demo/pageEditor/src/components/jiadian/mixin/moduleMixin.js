export default {
  watch: {
    data: {
      handler: function (val, oldVal) {
        this.$emit('module-value-change', val, this.activeIndex)
      },
      deep: true
    },
    activeIndex() {
      this.data = this.dataObj
    }
  },
  data() {
    return {
      data: this.dataObj
    };
  },
  props: ['dataObj','activeIndex'],
};
