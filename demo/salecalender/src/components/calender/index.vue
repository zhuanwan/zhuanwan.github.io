<template>
  <div class="calender-content">
    <button @click="showCalender">点击显示日历</button>
    <p></p>
    <p></p>
    <p></p>
    <div>
      <p>开始时间：{{startTime}}</p>
      <p>开始时间：{{endTime}}</p>
    </div>
    <div :class="[isHiddenCalender? 'hide': 'show', 'mask']" @click="hideCalender"></div>
    <div :class="[isHiddenCalender? 'hide': 'show', 'bottom-calender']">
      <Calender
        @dayChecked="dayChecked"
        @dayCancel="dayCancel"
        ref="calender">
      </Calender>
    </div>
  </div>
</template>

<script>
import Calender from './calender.vue'


export default {
  components: {
    Calender
  },
  data () {
    return {
      isHiddenCalender: true,  // 是否隐藏日历，默认隐藏
      // startTime: null,
      // endTime: null,
      startTime: '2018-07-02',
      endTime: '2018-08-02'
    }
  },
  computed: {

  },
  mounted () {
    this.$refs.calender.reDrawMonth();
  },
  methods: {
    // 选择日期回调
    dayChecked(startTime, endTime){
      console.log(startTime, endTime) // 这里是时间
      this.startTime = this._dateToString(startTime);
      this.endTime = this._dateToString(endTime);
      this.hideCalender();
    },
    // 取消选择回调
    dayCancel(){
      this.hideCalender();
    },
    // 点击弹出日历
    showCalender(){
      this.isHiddenCalender = false;
      this.$refs.calender.reDrawMonth(this.startTime, this.endTime);
    },
    // 隐藏日历
    hideCalender(){
      this.isHiddenCalender = true;
    },
    // date to string
    _dateToString(date){
      if(!date) return '';
      return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    },
  },
  filters: {

  }
}
</script>

<style lang="css" scoped>
.calender-content{
  position:absolute;
  overflow:hidden;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: #fff;
  color: #333;
  touch-action: none;
}
/* 遮罩层 */
.mask{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.2);
  z-index: 2;
}
.mask.hide{
  display: none;
}
.mask.show{
  display: block;
}
/* 日历 */
.bottom-calender{
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 0;
  background-color: #fff;
  z-index: 3;
  display: block;
  transition: height 0.3s ease-out;
}
.bottom-calender.hide{
  height: 0;
}
.bottom-calender.show{
  height: 7rem;
}

</style>
