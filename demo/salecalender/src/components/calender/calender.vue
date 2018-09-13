<template>
  <div class="t-calender">
    <div class="ope-box">
      选择时间段
      <span class="cancel" @click="cancel">取消</span>
      <span :class="[twoDayChecked? '': 'disabled', 'sure']" @click="sure">完成</span>
    </div>
    <div class="d-header">
      <li v-for="(t, i) in weekText" :key="i">{{ t }}</li>
    </div>
    <div class="t-header">
      <span class="arrowleft" @click="swiper.slidePrev()"></span>
      <span class="month">{{ year}}年{{ month<=9?'0'+ month: month }}月</span>
      <span class="arrowright" @click="swiper.slideNext()"></span>
    </div>
    <swiper :options="swiperOption" ref="mySwiper" class="d-content">
      <swiper-slide v-for="(itemParent, indexParent) in swiperSlides" :key="indexParent">
        <li v-for="(item, index) in itemParent"
            :key="index"
            :class="[{range: item.range,
                    isInvalidDay: item.isInvalidDay,
                    isStartTimeChecked: item.isStartTimeChecked,
                    isEndTimeChecked: item.isEndTimeChecked}]">
          <span :class="[{isStartTimeChecked: item.isStartTimeChecked,
                        isEndTimeChecked: item.isEndTimeChecked},setClass(item)]"
                @click.stop="dayChecked(item, index, indexParent)">
                {{ item.isInvalidDay? '': item.dates }}</span>
        </li>
      </swiper-slide>
    </swiper>
   
  </div>
</template>
<script>
import Vue from 'vue'
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
const regex = /^\d{4}-\d{1,2}-\d{1,2}$/;
export default {
  components: {
    swiper,
    swiperSlide
  },
  data () {
    return {
      swiperOption: {
        on: {
          slidePrevTransitionStart: () => {
            this.doLastMonth();
          },
          slideNextTransitionStart: () => {
            this.doNextMonth();
          }
        }
      },
      swiperSlides: [],
      today: '',
      year: '',
      month: '',
      weekText: ['日', '一', '二', '三', '四', '五', '六'],
      startTimeChecked: null,
      endTimeChecked: null,
    }
  },
  props:[],
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
    twoDayChecked(){
      return this.startTimeChecked && this.endTimeChecked;
    }
  },
  mounted () {
    this.today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0, 0);
  },
  methods: {
    // 渲染三个月
    // 如果有开始结束时间，就以开始时间那个月为初始显示的月，否则就取当前月份
    reDrawMonth(startTime, endTime){
      this.startTimeChecked = null;
      this.endTimeChecked = null;
      let curTime = new Date();

      if(startTime && endTime && regex.test(startTime) && regex.test(endTime)){
        let startTimeChecked = this._stringToDate(startTime),
            endTimeChecked = this._stringToDate(endTime);
        if(startTimeChecked - endTimeChecked < 0 && endTimeChecked - this.today < 0){
          this.startTimeChecked = startTimeChecked;
          this.endTimeChecked = endTimeChecked;
          curTime = this.startTimeChecked;
        }
      }
      this.year = curTime.getFullYear();
      this.month = curTime.getMonth() + 1;

      for(let i= 0; i< 3; i++){
        this.swiperSlides[i] = this.getDateList(this.year, this.month-2+i);
      }

      // 渲染完三个月后把中间的居中显示，清除之前的选中，如果有开始结束时间就重新选中
      this.swiper.slideTo(1, 0, false);
      this.clearCheckedTime(this.swiperSlides, 1);
      if(this.startTimeChecked && this.endTimeChecked){
        this.selectRange(this.swiperSlides[1]);
      }
    },
    setClass(item){
      return {
        isToday: item.isToday,
        isFirstDay: item.isFirstDay,
        isLastDay: item.isLastDay,
        isInvalidDay: item.isInvalidDay,
        isLessThanToday: item.isLessThanToday,
        isMoreThanToday: item.isMoreThanToday
      }
    },
    getDateList(year, month){
      let list = [];
      let date = new Date(year, month, 1, 0, 0, 0),
          totalDays = this._daysInMonth(year, month),
          dates = date.getDate() - date.getDay(),
          isIterateContinue = true,
          i= 0;
      while (isIterateContinue) {
        let newDate = new Date(year, month, dates, 0, 0, 0);
        let dataDayString = this._dateToString(newDate),
            isToday = false,        // 是不是今天
            isFirstDay = false,     // 是不是当月第一天
            isLastDay = false,      // 是不是当月最后一天
            isInvalidDay = false,   // 是不是有效的日期,true表示不是当前月的天
            isLessThanToday = false, // 是不是小于今天
            isMoreThanToday = false; // 是不是大于今天

        if(dates === 1) {
          isFirstDay = true;
        }else if(dates === totalDays) {
          isLastDay = true;
        }
        if(dates <= 0 || dates > totalDays) {
            isInvalidDay = true;
        }else {
          if (this._stringToDate(dataDayString) < this.today) {
            isLessThanToday = true;
          } else if (+this._stringToDate(dataDayString) === +this.today) {
            isToday = true;
          } else {
            isMoreThanToday = true;
          }
        }

        let showDate = dates;
        if(dates > totalDays || dates <= 0){
          showDate = newDate.getDate();
        }
        list[i] = {
          date: newDate,
          dataDayString: dataDayString,
          dates: isToday? '今天': showDate,
          isToday: isToday,
          isFirstDay: isFirstDay,
          isLastDay: isLastDay,
          isInvalidDay: isInvalidDay,
          isLessThanToday: isLessThanToday,
          isMoreThanToday: isMoreThanToday,
          isStartTimeChecked: this.startTimeChecked - date === 0,
          isEndTimeChecked: this.endTimeChecked - date === 0,
          rage: (date - this.startTimeChecked >=0 && this.endTimeChecked - date >= 0)
        }
        i++;
        dates++;
        isIterateContinue = i <= 41;
      }
      return list;
    },
    // 一个月多少天
    _daysInMonth(year, month) {
      return new Date(year, month + 1, 0).getDate();
    },
    // 格式化
    _stringToDate(date) {
      date = date.split('-');
      return new Date(date[0], date[1] - 1, date[2], 0, 0, 0);
    },
    // date to string
    _dateToString(date){
      return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    },
    // 点击上一个月
    doLastMonth(){
      let index = this.swiper.activeIndex;
      let tempDate = new Date(this.year, this.month-2, 1, 0, 0, 0);
      this.year = tempDate.getFullYear();
      this.month = tempDate.getMonth() + 1;
      if(index <= 0){
        // console.log('到最前了')
        let newDate = new Date(this.year, this.month-2, 1, 0, 0, 0);
        this.swiperSlides.unshift(this.getDateList(newDate.getFullYear(), newDate.getMonth()));
        this.swiper.slideTo(1, 0, false);
        this.swiper.updateSlides();
        this.judgeSelectedDay(this.swiperSlides, 1);
      }else{
        this.judgeSelectedDay(this.swiperSlides, index);
      }
    },
    // 点击下一个月
    doNextMonth(){
      let index = this.swiper.activeIndex;
      let tempDate = new Date(this.year, this.month, 1, 0, 0, 0);
      this.year = tempDate.getFullYear();
      this.month = tempDate.getMonth() + 1;
      if(index >= this.swiperSlides.length -1){
        // console.log('到最后了')
        let newDate = new Date(this.year, this.month, 1, 0, 0, 0);
        this.swiperSlides.push(this.getDateList(newDate.getFullYear(), newDate.getMonth()));
        this.swiper.slideTo(this.swiperSlides.length -2, 0, false);
        this.swiper.updateSlides();
        this.judgeSelectedDay(this.swiperSlides, this.swiperSlides.length -2);
      }else{
        this.judgeSelectedDay(this.swiperSlides, index);
      }
    },
    // 选中天,只能选今天之前的（不包括今天）
    dayChecked(item, index, indexParent){
      if(item.isInvalidDay || item.isToday || item.isMoreThanToday){
        return;
      }

      let newlist = this.swiperSlides.slice(0);
      let curChildList = newlist[indexParent];

      if(!this.startTimeChecked && !this.endTimeChecked){
        curChildList[index].isStartTimeChecked = true;
        this.startTimeChecked = item.date;
      }else if(this.startTimeChecked && !this.endTimeChecked){
        if(item.date - this.startTimeChecked <= 0){
          this.clearCheckedTime(newlist, indexParent);
          curChildList[index].isStartTimeChecked = true;
          this.startTimeChecked = item.date;
        }else{
          // curChildList[index].isEndTimeChecked = true;
          this.endTimeChecked = item.date;
          this.selectRange(curChildList);
        }
      }else if(this.startTimeChecked && this.endTimeChecked){
        this.clearCheckedTime(newlist, indexParent);
        curChildList[index].isStartTimeChecked = true;
        this.startTimeChecked = item.date;
        this.endTimeChecked = null;
      }
      this.swiperSlides = newlist;
    },
    // 清除当前页/上一页/下一页选定的开始结束时间，以及中间的时间段
    // 之所以上一页，下一页也清除是因为划过去的时候会开始会显示之前选中的时间，不好看
    clearCheckedTime(list, index){
      for(let k= 0; k< 3; k++){
        let listItem = list[index-1+k];
        if(listItem){
          for(let j= 0; j < listItem.length; j++){
            listItem[j].range = false;
            listItem[j].isStartTimeChecked = false;
            listItem[j].isEndTimeChecked = false;
          }
        }
      }
    },
    // 选择当前页开始和结束时间段
    selectRange(list){
      let startDate = this.startTimeChecked,
          endDate = this.endTimeChecked;
      for(let j= 0; j < list.length; j++){
        let item = list[j];
        if(item.date - startDate >= 0 && item.date - endDate <= 0){
          item.range = true;
          if(item.date - startDate === 0){
            item.isStartTimeChecked = true;
          }
          if(item.date - endDate === 0){
            item.isEndTimeChecked = true;
          }
        }else{
          item.range = false;
        }
      }
    },
    // 每次滑到上一页/下一页，判断当前页是否有选中时间
    judgeSelectedDay(list, index){
      this.clearCheckedTime(list, index);
      let startDate = this.startTimeChecked,
          endDate = this.endTimeChecked;
      for(let i = 0; i< list[index].length; i++){
        let item = list[index][i];
        if(startDate && item.date - startDate === 0){
          item.isStartTimeChecked = true;
        }

        if(endDate && item.date - endDate === 0){
          item.isEndTimeChecked = true;
        }

        if(startDate && endDate && item.date - startDate >= 0 && item.date - endDate <= 0){
          item.range = true;
        }else{
          item.range = false;
        }
      }
    },
    // 选择日期完成
    sure(){
      if(!this.startTimeChecked || !this.endTimeChecked){
        return;
      }
      this.$emit('dayChecked', this.startTimeChecked, this.endTimeChecked);
    },
    // 取消选择
    cancel(){
      this.$emit('dayCancel');
    }
  }
}
</script>

<style lang="css" scoped>
.t-calender{
  color: #333;
  font-size: 0.32rem;
  background-color: #fff;
}
/* 选择时间段 */
.t-calender .ope-box{
  text-align: center;
  font-size: 0.34rem;
  position: relative;
  height: 1.1rem;
  line-height: 1.1rem;
}
.t-calender .ope-box .cancel,.t-calender .ope-box .sure{
  position: absolute;
  top: 0.02rem;
  font-size: 0.3rem;
  color: #1B88EE;
}
.t-calender .ope-box .cancel{
  left: 0.2rem;
}
.t-calender .ope-box .sure{
  right: 0.2rem;
}
.t-calender .ope-box .sure.disabled{
  color: #ccc;
}
/* 月份 */
.t-header{
  height: 0.8rem;
  line-height: 0.8rem;
  text-align:center;
  overflow: hidden;
  font-size: 0.30rem;
}
.t-header .arrowleft{
  position: relative;
  margin-left: 0.4rem;
  width: 0.5rem;
  height: 100%;
  display: inline-block;
}
.t-header .month{
  position: relative;
  top: -0.3rem;
}
.t-header .arrowright{
  position: relative;
  margin-right: 0.4rem;
  width: 0.5rem;
  height: 100%;
  display: inline-block;
}
.t-header .arrowleft:after,.t-header .arrowleft:before {
  border: 0.14rem solid transparent;
  border-right: 0.14rem solid #fff;
  width: 0;
  height: 0;
  position: absolute;
  top: 0.25rem;
  left: -0.12rem;
  content: ' ';
}

.t-header .arrowleft:before {
  border-right-color: #ccc;
  left: -0.16rem;
}

.t-header .arrowright:after,.t-header .arrowright:before {
  border: 0.14rem solid transparent;
  border-left: 0.14rem solid #fff;
  width: 0;
  height: 0;
  position: absolute;
  top: 0.25rem;
  right: 0.02rem;
  content: ' ';
}

.t-header .arrowright:before {
  border-left-color: #ccc;
  right: -0.02rem;
}
/* 星期 */
.d-header{
  font-size: 0.24rem;
  overflow: hidden;
}

.d-header li{
  float:left;
  width: 1.07rem;
  height: 0.8rem;
  line-height: 0.8rem;
  text-align: center;
}
.t-calender .d-content li{
  float:left;
  width: 1.07rem;
  height: 0.7rem;
  line-height: 0.7rem;
  margin-top: 0.1rem;
  padding-top: 0;
  text-align: center;
  position: relative;
}
.t-calender .d-content span{
  width: 0.7rem;
  height: 0.7rem;
  line-height: 0.7rem;
  color: #333;
  display: block;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 2;
  -webkit-tap-highlight-color: transparent;
}

.t-calender .d-content .isToday, .t-calender .d-content .isMoreThanToday{
  color: #ccc;
}
.t-calender .d-content span.isStartTimeChecked,.t-calender .d-content span.isEndTimeChecked{
  color: #fff;
  border-radius: 100%;
  background-color: #3B83FF;
}
.t-calender .d-content li.range{
  background-color: #e5f3ff;
}
.t-calender .d-content li.range.isInvalidDay{
  background-color: #fff;
}
.t-calender .d-content li.isEndTimeChecked:after{
  position: absolute;
  content: '';
  top: 0;
  right: 0;
  bottom: 0;
  width: 0.535rem;
  background-color: #fff;
  z-index: 1;
}
.t-calender .d-content li.isStartTimeChecked:after{
  position: absolute;
  content: '';
  top: 0;
  left: 0;
  bottom: 0;
  width: 0.535rem;
  background-color: #fff;
  z-index: 1;
}
.t-calender .d-content span.isInvalidDay.isStartTimeChecked,.t-calender .d-content span.isInvalidDay.isEndTimeChecked{
  color: #fff;
  background-color: #fff;
}
</style>
