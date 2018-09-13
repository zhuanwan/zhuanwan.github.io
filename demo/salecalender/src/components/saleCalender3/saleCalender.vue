<template>
  <div class="calender" :class="[{'dayup': isShowWeek, 'daydown': !isShowWeek}]">
    <div class="d-content"  @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd" :style="{transform : 'translate3d(' + translateX + 'rem,' + translateY + 'rem, 0)', 'transition-duration': transitionDuration + 'ms', 'transition-timing-function': 'ease-out'}">
      <div class="list" v-for="(itemParent, indexParent) in listData" :key="indexParent">
        <li v-for="(item, index) in itemParent" :key="index">
          <span :class="[{active: item.active}, setClass(item)]" @click.stop="dayChecked(item, index, indexParent)">{{ item.dates }}</span>
        </li>
      </div>
    </div>
  </div>
</template>
<script>

// 实现前后滑动，一次性要渲染三个月，中间那个月显示，然后左滑或者右滑之后立即加载滑动到的当月的数据，并重新渲染三个月
let pageX = 0,
    pageY= 0,
    distanceX = 0,
    distanceY = 0;
export default {
  data () {
    return {
      today: '',
      year: '',
      month: '',
      weekDay: '', // 滑动标识，以这天为基准渲染三周,三月
      checkedDay: '', //选中的date
      isShowWeek: false,  // 是否显示周
      listData: [],
      translateX: 0,
      translateY: 0,
      transitionDuration: 0, // 左右滑动时间
      slideDistance: 80, //滑动多少就翻页
      transitionendFn: null
    }
  },
  props:[],
  computed: {

  },
  mounted () {
    document.querySelector(".d-content").addEventListener("transitionend", this.transitionend);
  },
  methods: {
    onTouchStart(e){
      pageX = e.touches[0].pageX;
      pageY = pageY = e.touches[0].pageY;
      distanceX = 0;
      distanceY = 0;
    },
    onTouchMove(e){
      // e.preventDefault();
      distanceX = e.touches[0].pageX - pageX;
      distanceY = e.touches[0].pageY - pageY;
      this.transitionDuration = 0;
      this.translateX = - 7.5 + distanceX/100;
    },
    onTouchEnd(e){
      // e.preventDefault();
      this.transitionDuration = 400;
      if(distanceX > this.slideDistance){
        this.translateX = 0;
        this.transitionendFn = this.isShowWeek? this.doLastWeek: this.doLastMonth;
        // this.isShowWeek? this.doLastWeek(): this.doLastMonth();
      }else if(distanceX < -this.slideDistance){
        this.translateX = -15;
        this.transitionendFn = this.isShowWeek? this.doNextWeek: this.doNextMonth;
        // this.isShowWeek? this.doNextWeek(): this.doNextMonth();
      }else{
        this.transitionendFn = null;
        this.translateX = -7.5;
      }
    },
    transitionend(){
      console.log('kaishi')
      if(this.transitionendFn){
        this.transitionendFn();
      }
    },
    // 渲染三周
    // date 滑动到的月-> 选中的date或者第一天
    reDrawWeek(checkedDay, weekDay){
      this.listData = [];
      if(checkedDay){
        this.checkedDay = this._timeToDate(checkedDay);
      }
      let curTime = new Date();
      this.today = this._timeToDate(curTime);
      this.weekDay = weekDay;
      this.year = new Date(weekDay).getFullYear();
      this.month = new Date(weekDay).getMonth() + 1;
      this.$emit('renderYearAndMonth', this.year, this.month);

      let year = weekDay.getFullYear(),
          month = weekDay.getMonth() + 1,
          date = weekDay.getDate(),
          day = weekDay.getDay(),
          list = [];
      for(let j=0; j< 3; j++){
        let childList = [];
        for(let i= 0; i< 7; i++) {
          let d = new Date(year, month-1, date, 0, 0, 0);
          d.setDate(d.getDate() - 7*(1-j) - (day-i) );
          childList[i] = {
            date: d,
            dataDayString: this._dateToString(d),
            dates: d.getDate(),
            isToday: +new Date(d) === +this.today,
            isFirstDay: (d.getFullYear() - this.year === 0) && (d.getMonth() +1 - this.month === 0) && d.getDate() === 1,
            isLastDay: (d.getFullYear() - this.year === 0) && (d.getMonth() +1 - this.month === 0) && d.getDate() === this._daysInMonth(this.year, this.month),
            isInvalidDay: (d.getFullYear() - this.year != 0) || (d.getMonth()+1 - this.month != 0),
            isLessThanToday: d < this.today,
            active: d - this.checkedDay === 0,
            message: '',
          }
          if(childList[i].active && !childList[i].isInvalidDay){
            this.$emit('dayChecked', childList[i]);
          }
        }
        list[j] = childList;
      }
      this.listData = list;
      // 渲染完三周后把中间的居中显示
      this.transitionDuration = 0;
      this.translateX = -7.5;
    },

    // 渲染三个月
    reDrawMonth(checkedDay, weekDay){
      this.listData = [];
      if(checkedDay){
        this.checkedDay = this._timeToDate(checkedDay)
      }
      let curTime = new Date();
      this.today = this._timeToDate(curTime);
      this.weekDay = weekDay? weekDay: new Date();
      this.year = weekDay? new Date(weekDay).getFullYear(): curTime.getFullYear();
      this.month = weekDay? new Date(weekDay).getMonth() + 1: curTime.getMonth() + 1;
      this.$emit('renderYearAndMonth', this.year, this.month);

      for(let i= 0;i< 3; i++){
        this.listData[i] = this.getDateList(this.year, this.month-2+i);
      }

      // 渲染完三个月后把中间的居中显示
      this.transitionDuration = 0;
      this.translateX = -7.5;
    },

    // 渲染三个月结束后，看当前这个月有没有事件
    addSalesData(data){
      if(data && data.length> 0){
        for(let i= 0;i< this.listData[1].length; i++){
          let item = this.listData[1][i];
          for (let j = data.length - 1; j >= 0; j--) {
            if(this._stringServerToDate(data[j]) - item.date === 0){
              item.message = true;
              break;
            }
          }
        }

        let tempList = this.listData.splice(0);
        this.listData = tempList;
      }
    },
    setClass(item){
      return {
        isToday: item.isToday,
        isFirstDay: item.isFirstDay,
        isLastDay: item.isLastDay,
        isInvalidDay: item.isInvalidDay,
        isLessThanToday: item.isLessThanToday,
        hasMessage: item.message
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
            isLessThanToday = false; // 是不是小于今天

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
          }
        }

        let showDate = dates;
        if(dates > totalDays || dates <= 0){
          showDate = newDate.getDate();
        }
        list[i] = {
          date: newDate,
          dataDayString: dataDayString,
          dates: showDate,
          isToday: isToday,
          isFirstDay: isFirstDay,
          isLastDay: isLastDay,
          isInvalidDay: isInvalidDay,
          isLessThanToday: isLessThanToday,
          active: newDate - this.checkedDay === 0,
          message: false,
        }
        if(list[i].active && !list[i].isInvalidDay){
          this.$emit('dayChecked', list[i]);
        }

        i++;
        dates++;
        // isIterateContinue = dates <= totalDays;
        isIterateContinue = i <= 41;
      }
      return list;
    },
    // 一个月多少天
    _daysInMonth(year, month) {
      return new Date(year, month + 1, 0).getDate();
    },
    _stringServerToDate(date){
      date = String(date);
      return new Date(date.slice(0, 4), date.slice(4, 6)-1, date.slice(6));
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
    // 天转换为今天凌晨
    _timeToDate(date){
      date = new Date(date);
      return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0 ,0 ,0);
    },
    // 点击上一个月
    doLastMonth(){
      let newDate = new Date(this.year, this.month-2, 1, 0, 0, 0);
      this.weekDay = newDate;
      this.translateX = 0;
      this.isShowWeek = false;
      this.$emit('changeMonth', newDate);
    },
    // 点击下一个月
    doNextMonth(){
      let newDate = new Date(this.year, this.month, 1, 0, 0, 0);
      this.weekDay = newDate;
      this.translateX = -7.5*2;
      this.isShowWeek = false;
      this.$emit('changeMonth', newDate);
    },
    // 滑动到上一周
    doLastWeek(){
      this.weekDay.setDate(this.weekDay.getDate() -7);
      this.translateX = 0;
      this.$emit('changeWeek', this.weekDay);
    },
    // 滑动下一周
    doNextWeek(){
      this.weekDay.setDate(this.weekDay.getDate() +7);
      this.translateX = -7.5*2;
      this.$emit('changeWeek', this.weekDay);
    },
    doUp(){
      this.transitionendFn = null;
      if(this.isShowWeek){
        return;
      }
      this.isShowWeek = true;
      this.$emit('changeWeek', this.weekDay);
    },
    doDown(){
      this.transitionendFn = null;
      if(!this.isShowWeek){
        return;
      }
      this.isShowWeek = false;
      this.$emit('changeMonth', this.weekDay);
    },
    // 选中天
    dayChecked(item, index, indexParent){
      if(item.isInvalidDay){
        return;
      }
      this.listData.map((j)=> {
        j.map((v)=> {
          v.active = false;
        });
      });

      let newlist = this.listData.slice(0);
      newlist[indexParent][index].active = true;
      this.listData = newlist;
      this.weekDay = new Date(item.date);
      this.checkedDay = new Date(item.date);
      this.$emit('dayChecked', item);
    }
  }
}
</script>

<style lang="css" scoped>
.calender{
  color: #151515;
  font-size: 0.32rem;
  width: 7.5rem;
  overflow: hidden;
  height: 4.8rem;
}
.d-content,.d-content .list{
  overflow: hidden;
}
.d-content{width: 22.5rem; position: relative;}
.d-content .list{width: 7.5rem;float: left;}

.d-content li{
  float:left;
  width: 1.07rem;
  height: 0.8rem;
  line-height: 0.8rem;
  text-align: center;
}
.d-content li span{
  width: 0.7rem;
  height: 0.7rem;
  line-height: 0.7rem;
  color: #333;
  margin: 0.05rem auto 0 auto;
  display: block;
  text-align: center;
  position: relative;
  -webkit-tap-highlight-color: transparent;
}

.d-content li span.isInvalidDay{
  color: #ccc;
}
.d-content li .isToday{
  color: #3B83FF;
}
.hasMessage::after{
  content: '';
  position: absolute;
  width: 0.1rem;
  height: 0.1rem;
  background-color: #3B83FF;
  border-radius: 50%;
  bottom: 0.05rem;
  left: 0.3rem;
}
.d-content li span.active{
  color: #fff;
  border-radius: 100%;
  background-color: #3B83FF;
}
.isInvalidDay.hasMessage::after{
  width: 0;
  height: 0;
}
.d-content li span.active.isInvalidDay{
  color: #ccc;
  background-color: #fff;
}
.active.hasMessage::after{
  background-color: #fff;
}
.dayup{
  height: 1rem;
  transition: height 0.3s ease-out;
}
.daydown{
  height: 4.8rem;
  transition: height 0.3s ease-out;
}
</style>
