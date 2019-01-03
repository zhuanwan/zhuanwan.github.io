export default {
  watch: {
    dataObj: {
      handler: function(val, oldVal) {
        this.$nextTick(_ => {
          this.data = JSON.parse(JSON.stringify(val));
        });
      },
      deep: true
    }
  },
  data() {
    return {
      data: JSON.parse(JSON.stringify(this.dataObj))
    };
  },
  props: ['dataObj']
};
