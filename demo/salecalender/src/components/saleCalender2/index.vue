<template>
  <div class="sale-calender-content" :class="!activeItem.isLessThanToday?'isBottom':''">
    <div class="calender-box">
      <SaleCalender @dayChecked="dayChecked" ref="saleCalender" @changeMonth="changeMonth" @changeWeek="changeWeek"></SaleCalender>
    </div>
    <div class="time-and-filter">
      <div class="timestr">{{ timestr }}</div>
      <span class="filter-icon" @click.stop="toggleFilter">
        <img src="../../assets/imgs/filter-active.png" alt="" v-if="isShowFilterMenu">
        <img src="../../assets/imgs/filter.png" alt="" v-else>
        <span :class="[{activef: isShowFilterMenu}]">{{choose}}</span>
      </span>
      <div class="filter-tabs" v-show="isShowFilterMenu">
        <div class="item" @click.stop="filterSchedule(item)" v-for="(item, index) in scheduleTypeList" :key="index">
          <img :src="item.src" alt="">
          <span :class="[{activef: item.type === activeScheduleType}]">{{ item.name }}</span>
        </div>
      </div>
    </div>
    <div class="schedule-box" @click="isShowFilterMenu = false">
      <div v-if="selectScheduleData.length<= 0" class="noschedule">
        <img src="../../assets/imgs/noschedule.png" alt="">
        <span>暂无日程</span>
      </div>
      <div v-else class="item" v-for="(item, index) in selectScheduleData" :key="index">
        <span class="time">{{ item.timeStr }}</span>
        <img :src="item.src" alt="">
        <div class="info" @click="toDetail(item.calendarId)">
          <p class="title">{{ item.title }}</p>
          <p class="gl" v-if="item.customers">关联了{{ item.customers }}}位客户</p>
          <p class="remark" v-if="item.remark">备注:{{ item.remark }}</p>
          <i class="arrow"></i>
        </div>
      </div>
    </div>
    <a tag="div" class="add-schedule" v-show="!activeItem.isLessThanToday" @click="addCalendar"><span>新建日程</span></a>
    <!-- <router-link :to="'/createSchedule/0/'+this.activeItem.dataDayString" tag="div" class="add-schedule" v-show="!activeItem.isLessThanToday"><span>新建日程</span></router-link>  -->
    <div class="loading-box" v-show="loading">
      <!-- <img src="../../assets/imgs/logo2.png" alt=""> -->
    </div>
  </div>
</template>

<script>
import SaleCalender from './saleCalender.vue'
// import {mapGetters} from 'vuex'
const dayToWeekStr = {0: '日', 1: '一', 2: '二', 3: '三', 4: '四', 5: '五', 6: '六'};
const queryDateListApi = 'http://192.168.0.122:8310/saleCalendar/queryDateList';
const queryCalendarListApi = 'http://192.168.0.122:8310/saleCalendar/queryCalendarList';
const identify = '49a070741a6e4faeb3b226bf5cbdf543';
const BASE_URL2 = 'https://kaifa.aijiatui.com';
export default {
  components: {
    SaleCalender
  },
  data () {
    return {
      loading: false,
      choose: '筛选',
      tmpCardId: 'aced0dfd12d1261d',
      toWhere: true,
      activeItem: {}, //选中的day item
      isFirstEnter: true, // 是否是第一次进入页面
      scheduleData: [], //选中当天的日程
      selectScheduleData: [], //选中当天的日程(筛选后)
      isShowFilterMenu: false, //是否显示筛选项
      scheduleTypeList: [
          {src: require('../../assets/imgs/filter-0.png'), type: 0, name: '全部'},
          {src: require('../../assets/imgs/filter-1.png'), type: 1, name: '日常工作'},
          {src: require('../../assets/imgs/filter-2.png'), type: 2, name: '拜访'},
          {src: require('../../assets/imgs/filter-3.png'), type: 3, name: '会议'},
          {src: require('../../assets/imgs/filter-4.png'), type: 4, name: '预约'},
          {src: require('../../assets/imgs/filter-5.png'), type: 5, name: '生日'},
        ],
      activeScheduleType: 0  // 选中的scheduleTypeList->type
    }
  },
  computed: {
    timestr(){
      let d = new Date(this.activeItem.date);
      return d.getMonth()+1 + '月' + d.getDate() + '日'+ ' ' + '周' + dayToWeekStr[d.getDay()];
    },
    // ...mapGetters([
    //   'cardInfo'
    // ])
  },
  mounted () {
    let dateObj;
    let regex = /\d{8}/;
    if(this.$route.query.begin_date && this.$route.query.end_date && this.$route.query.checked_day && regex.test(this.$route.query.begin_date) && regex.test(this.$route.query.end_date) && regex.test(this.$route.query.checked_day)){
      dateObj = {
        firstDate: this.$route.query.begin_date,
        endDate: this.$route.query.end_date,
        checkedDay: this.$route.query.checked_day
      }
    }else{
      dateObj = this.getMonthFirstAndEndDate();
    }
    this.queryDateList(dateObj.firstDate, dateObj.endDate, dateObj.checkedDay, 'changeMonth');

    // 禁止微信下拉
    this.overscroll(document.querySelector('.schedule-box'));
    document.body.addEventListener('touchmove', this.moveFn);
  },
  beforeRouteLeave (to, from, next) {
    document.body.removeEventListener('touchmove', this.moveFn);
    next()
  },
  methods: {

    // 选中day回调
    dayChecked(item){
      this.activeItem = item;
      this.queryCalendarList(this.formatDate(item.date));
      console.log(item)
    },
    // 点击筛选
    toggleFilter(){
      this.isShowFilterMenu = !this.isShowFilterMenu;
      if(this.isShowFilterMenu && !this.$refs.saleCalender.isShowWeek){
        this.$refs.saleCalender.doUp();
      }
    },
    // 点击筛选项
    filterSchedule(item){
      if(item.name=='日常工作'){
        let tmp = '日常'
        this.choose = tmp
      }else{
        this.choose = item.name
      }
      this.isShowFilterMenu = false;
      let list = [];
      this.scheduleData.map((value, key)=> {
        if(item.type ===0 || value.type === item.type){
          list.push(value);
        }
      });
      this.selectScheduleData = list;
      this.activeScheduleType = item.type;
    },
    /**
     * [getMonthFirstAndEndDate 得到date这个月的第一天和最后一天]
     * @param  {[date]} date [传入的时间]
     * @return {[obj]}      [第一天，最后一天]
     */
    getMonthFirstAndEndDate(date){
      let firstDate,
          endDate;

      firstDate = date? new Date(date): new Date();
      firstDate.setDate(1);
      endDate = new Date(firstDate);
      endDate.setMonth(firstDate.getMonth()+1);
      endDate.setDate(0);

      firstDate = this.formatDate(firstDate);
      endDate = this.formatDate(endDate);
      return{
        firstDate: firstDate,
        endDate: endDate
      }
    },
    // 翻页(选择月)
    changeMonth(date){
      let dateObj = this.getMonthFirstAndEndDate(date);
      this.queryDateList(dateObj.firstDate, dateObj.endDate, undefined, 'changeMonth', date);
    },
    // 滑动周
    changeWeek(date){
      let day = new Date(date).getDay();
      let beginDate = new Date(date);
      let endDate = new Date(date);
      beginDate.setDate(beginDate.getDate() - day);
      endDate.setDate(endDate.getDate() - (day-6));
      beginDate = this.formatDate(beginDate);
      endDate = this.formatDate(endDate);
      this.queryDateList(beginDate, endDate, undefined, 'changeWeek', date);
    },
    /**
     * 查询开始时间到结束时间的day有没有事件
     * @param  {string} beginDate  传给后台的开始时间
     * @param  {string} endDate    传给后台的结束时间
     * @param  {string} checkedDay 选中的时间
     * @param  {string} type       周还是月
     * @param  {string} weekDay    天标识，需要根据他来渲染月或周
     * @return {none}
     */
    queryDateList(beginDate, endDate, checkedDay, type, weekDay){
      if(checkedDay){
        checkedDay = this._stringServerToDate(checkedDay);
      }
      let me= this;
      me.beforeRenderData(beginDate, endDate, checkedDay, type, weekDay);
      me.loading = true;

      this.$http.post(BASE_URL2+'/additional-provider/saleCalendar/queryDateList', {
        beginDate: beginDate,
        endDate: endDate,
        // cardId: this.cardInfo.card_id || this.tmpCardId,
        cardId: '00267f05f8cbcd86',
        identify: identify,
        scenes: 'radarh5'
      })
      .then(function (res) {
        me.loading = false;
        if(!res.data || res.data.code !=0){
          console.log('出错啦');
          return;
        }
        // let serverTime = 1528279100043;  // 从服务器获取当前时间(这个功能暂时不用)
        let serverTime = new Date();

        // 如果没有weekDay, 第一次进入的时候（分外部链接和刷新）
        if(!weekDay){
          if(checkedDay){
            weekDay = new Date(checkedDay);
          }else{
            weekDay = new Date(serverTime);
          }
        }

        // 第一次进入，如果没有选中，默认选中今天
        if(me.isFirstEnter && !checkedDay){
          me.isFirstEnter = false;
          checkedDay = new Date(serverTime);
        }
        if(type == 'changeMonth'){
          me.$refs.saleCalender.reDrawMonth(serverTime, checkedDay, res.data.data, weekDay);
        }else if(type == 'changeWeek'){
          me.$refs.saleCalender.reDrawWeek(serverTime, checkedDay, res.data.data, weekDay);
        }
      },e=>{
        me.loading = false;
      });
    },
        // 解决接口没出来前页面不显示日历问题
    beforeRenderData(beginDate, endDate, checkedDay, type, weekDay){
        let serverTime = new Date();

        // 如果没有weekDay, 第一次进入的时候（分外部链接和刷新）
        if(!weekDay){
          if(checkedDay){
            weekDay = new Date(checkedDay);
          }else{
            weekDay = new Date(serverTime);
          }
        }

        // 第一次进入，如果没有选中，默认选中今天
        if(this.isFirstEnter && !checkedDay){
          checkedDay = new Date(serverTime);
        }

      if(type == 'changeMonth'){
        this.$refs.saleCalender.reDrawMonth(serverTime, checkedDay, [], weekDay);
      }else if(type == 'changeWeek'){
        this.$refs.saleCalender.reDrawWeek(serverTime, checkedDay, [], weekDay);
      }
    },
    _stringServerToDate(date){
      date = String(date);
      return new Date(date.slice(0, 4), date.slice(4, 6)-1, date.slice(6));
    },
    // 查询选中的日期的事件
    queryCalendarList(date){
      let me= this;
      me.loading = true;
      this.$http.post(BASE_URL2+'/additional-provider/saleCalendar/queryCalendarList', {
        calendarDate: date,
        // cardId: this.cardInfo.card_id || this.tmpCardId,
        cardId: '00267f05f8cbcd86',
        identify: identify,
        scenes: 'radarh5'
      })
      .then(function (res) {
        me.loading = false;
        if(!res.data || res.data.code !=0){
          console.log('出错啦');
          return;
        }
        let data = res.data.data;
        for(let i=0; i<data.length; i++){
          data[i].timeStr = data[i].isAllDay? '全天': data[i].calendarTimeStr.substr(11);
          data[i].src = require('../../assets/imgs/filter-'+ data[i].type +'.png');
        }
        me.scheduleData = data;
        me.selectScheduleData = data;
        me.activeScheduleType = 0;
      },e=>{
         me.loading = false;
      });
    },

    formatDate(date) {
      let d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();

      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;
      return [year, month, day].join('');
    },
    overscroll(el) {
      el.addEventListener('touchstart', function() {
        var top = el.scrollTop
          , totalScroll = el.scrollHeight
          , currentScroll = top + el.offsetHeight
        //If we're at the top or the bottom of the containers
        //scroll, push up or down one pixel.
        //
        //this prevents the scroll from "passing through" to
        //the body.
        if(top === 0) {
          el.scrollTop = 1
        } else if(currentScroll === totalScroll) {
          el.scrollTop = top - 1
        }
      })
      el.addEventListener('touchmove', function(evt) {
        //if the content is actually scrollable, i.e. the content is long enough
        //that scrolling can occur
        if(el.offsetHeight < el.scrollHeight)
          evt._isScroller = true
      })
    },
    moveFn(evt){
      if (evt.cancelable) {
        // 判断默认行为是否已经被禁用
          if (!evt.defaultPrevented) {
            if(!evt._isScroller) {
              evt.preventDefault()
            }
              // evt.preventDefault();
          }
      }
      
    },
    addCalendar(){
      this.$router.push('/createSchedule/0/'+this.activeItem.dataDayString)
    },
    toDetail(id){
      this.$router.push('/scheduleDetail/'+id)
    }
  },
  // beforeRouteLeave(to, from, next) {
  //   next();
  // }
}
</script>

<style lang="css" scoped>
.sale-calender-content{
  position:absolute; 
  overflow:hidden; 
  top:0; 
  left:0; 
  bottom:0; 
  right:0;
  display: flex;
  flex-direction: column;
  background-color: #F2F2F2;
  color: #333;
  touch-action: none;
}
.sale-calender-content.isBottom {
  bottom: 1rem;
}
.calender-box{
  position: relative;
  overflow: hidden;
  margin-bottom: 0.2rem;
  /*border-bottom: 1px solid red;*/
}
.loading-box{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* background-color: rgba(0,0,0,0.2); */
  color: #fff;
  font-size: 0;
  text-align: center;
  line-height: 3rem;
  z-index: 3;
}
.loading-box img{
  position: absolute;
  width: 1.14rem;
  height: 1.11rem;
  top: 50%;
  left: 50%;
  margin-top: -0.55rem;
  margin-left: -0.55rem;
  animation: rotate 2s infinite;
}

.time-and-filter{
  background: #fff;
  height: 0.8rem;
  position: relative;
  /* border-bottom: 1px solid #eeeeee; */
  z-index: 2;
}
.time-and-filter::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    background: #eeeeee;
    width: 100%;
    height: 1px;
    transform: scaleY(.5);
    transform-origin: 0 0;
}
.time-and-filter .timestr{
  line-height: 0.8rem;
  font-size: 0.28rem;
  margin-left: 0.36rem;
}

.time-and-filter .filter-icon{
  -webkit-tap-highlight-color: transparent;
  position: absolute;
  right: 0;
  top: 0;
  height: 0.5rem;
  width: 1.2rem;
  font-size: 0.24rem;
  color: #999999;
  padding-top: 0.24rem;
}
.time-and-filter .filter-icon .activef{
  color: #333;
}
.time-and-filter .filter-icon img{
  width: 0.24rem;
  height: 0.25rem;
  padding-right: 0.1rem;
  position: relative;
  top: 0.03rem;
}
.filter-tabs{
  position: absolute;
  width: 2.6rem;
  /* overflow: hidden; */
  padding-bottom: 0.2rem;
  background-color: #fff;
  top: 0.86rem;
  right: 0.2rem;
  border: 0.01rem solid #e0e0e0;
  z-index: 666;
  box-shadow: 0 0.02rem 0.06rem 0 rgba(0,0,0,0.10);
  border-radius: 0.1rem;
}
.filter-tabs::after, .filter-tabs::before{
  content: '';
  position: absolute;
  bottom: 100%;
  width: 0;
  height: 0;
  border-width: 0.16rem;
  border-style: solid;
  border-color: transparent transparent #ccc transparent;
  right: 0.4rem;
}
.filter-tabs::after{
  border-bottom-color: #fff;
  border-width: 0.14rem;
  right: 0.42rem;
}
.filter-tabs .item{
  -webkit-tap-highlight-color: transparent;
  font-size: 0.28rem;
  margin-top: 0.3rem;
}
.filter-tabs .item span{
  position: relative;
  top: 0.01rem;
  color: #999;
}
.filter-tabs .item span.activef{
  color: #333;
}
.filter-tabs .item img{
  width: 0.4rem;
  height: 0.4rem;
  margin-left: 0.3rem;
  margin-right: 0.1rem;
}
.add-schedule{
  box-shadow: 0 -0.03rem 0.08rem rgba(0,0,0,0.06);
  position: fixed;
  height: 1rem;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  background: #FAFAFC;
}
.add-schedule span{
  color: #3B83FF;
  width: 2rem;
  height: 0.6rem;
  line-height: 0.6rem;
  font-size: 0.28rem;
  display: inline-block;
  border: 0.02rem solid #3B83FF;
  border-radius: 0.3rem;
  margin-top: 0.2rem;
}
.schedule-box{
  background-color: #fff;
  flex: 1;
  overflow: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  position: relative;
  color: #333333;
}
.schedule-box .item{
  display: flex;
  padding-top: 0.2rem;
}
.schedule-box .item .time{
  display: block;
  margin-left: 0.4rem;
  width: 1.2rem;
  font-size: 0.32rem;
}
.schedule-box .item img{
  display: block;
  position: relative;
  top: 0.03rem;
  width: 0.4rem;
  height: 0.4rem;
  margin-right: 0.2rem;
}
.schedule-box .info{
  flex: 1;
  padding-bottom: 0.2rem;
  position: relative;
  overflow: hidden;
  /* border-bottom: 1px solid #eeeeee; */
}
.schedule-box .info::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  background: #eeeeee;
  width: 100%;
  height: 1px;
  transform: scaleY(.5);
  transform-origin: 0 0;
}
.schedule-box .info .title{
  font-size: 0.32rem;
}
.schedule-box .info .gl, .schedule-box .info .remark{
  font-size: 0.24rem;
  color: #999;
}
.schedule-box .info .title,.schedule-box .info .gl, .schedule-box .info .remark{
  width: 90%;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.schedule-box .arrow{
  position: absolute;
  right: 0.2rem;
  top: 50%;
  width: 0.28rem;
  height: 0.28rem;
  margin-top: -0.24rem;
}
.schedule-box .arrow:after, .schedule-box .arrow:before {
  border: 0.12rem solid transparent;
  border-left: 0.12rem solid #fff;
  width: 0;
  height: 0;
  position: absolute;
  top: 0rem;
  right: 0rem;
  content: ' ';
}
.schedule-box .arrow:before {
  border-left-color: #ccc;
  right: -0.04rem;
}
.noschedule{
  position: absolute;
  width: 1.2rem;
  height: 1.1rem;
  top: 50%;
  left: 50%;
  margin-top: -1.1rem;
  margin-left: -0.6rem;
}
.noschedule img{
  width: 100%;
  height: 100%;
}
.noschedule span {
  font-size: 0.24rem;
  color: #CCCCCC;
  letter-spacing: 0;
  margin-left: 0.12rem;
  margin-top: 0.1rem;
}
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(180deg);
  }
  50% {
    transform: rotate(180deg);
  }
  75% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
