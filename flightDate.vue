<template>
  <div class="date">
    <header>
      <div class="top">
        <div class="title">
          <p class="t-place">选择日期</p>
        </div>
      </div>
      <ul class="week">
        <li>日</li>
        <li>一</li>
        <li>二</li>
        <li>三</li>
        <li>四</li>
        <li>五</li>
        <li>六</li>
      </ul>
    </header>
    <div class="calendar">
      <div class="calendar-item-top">
        <div class="calendar-header">
          <span>{{showDate.y}}年{{showDate.m}}月</span>
        </div>
        <div class="calendar-body">
          <ul class="day">
            <li v-for="(d, i) in showDate.days " :key="i">
              <div v-if="d.getMonth()+1 !== showDate.m">
                <span></span>
              </div>
              <div v-else-if="isToday(d)" @click="clickAction(d)" class='today' :class="{'selDate': selDate === d}">
                <p :class="{'redC':(d.getDay() === 6 || d.getDay() === 0)}">今天</p>
                <p :class="{'redC':(d.getDay() === 6 || d.getDay() === 0)}">{{ d.getDate() }}</p>
              </div>
              <div v-else-if="isDep(d)" @click="clickAction(d)" class='depTime'   :class="{'selDate': selDate === d}">
                 <p>{{ d.getDate() }}</p>
                 <p>去程</p>
              </div>
              <div v-else-if="isArr(d)" @click="clickAction(d)" class='arrTime'   :class="{'selDate': selDate === d}">
                 <p>{{ d.getDate() }}</p>
                 <p>回程</p>
              </div>
              <div v-else-if="(d > depTime && d < arrTime && depTime.getMonth() === arrTime.getMonth())"  class='middle'  :class="{'selDate': selDate === d}">
                <span v-if="d < new Date()" class="disabled">{{ d.getDate() }}</span>
                <span v-else @click="clickAction(d)" :class="{'redC':(d.getDay() === 6 || d.getDay() === 0)}">{{d.getDate() }}</span>
              </div>
              <div v-else :class="{'selDate': selDate === d}">
                <span v-if="d < new Date()" class="disabled">{{ d.getDate() }}</span>
                <span v-else @click="clickAction(d)" :class="{'redC':(d.getDay() === 6 || d.getDay() === 0)}">{{d.getDate() }}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="boxScroll">
      <div class='scrollDate'>
        <div class="scrollWrap" v-for="(date, n) in dateArr" :key="n">
          <div class="calendar-header">
            <span>{{date.y}}年{{date.m}}月</span>
          </div>
          <div class="calendar-body">
            <ul class="day">
              <li v-for="(d, i) in date.days" :key="i">
                <div v-if="d.getMonth()+1 !== date.m">
                  <span></span>
                </div>
                <div v-else-if="isDep(d)" @click="clickAction(d)" class='depTime'   :class="{'selDate': selDate === d}">
                  <p>{{ d.getDate() }}</p>
                  <p>去程</p>
                </div>
                <div v-else-if="isArr(d)" @click="clickAction(d)" class='arrTime'   :class="{'selDate': selDate === d}">
                  <p>{{ d.getDate() }}</p>
                  <p>回程</p>
                </div>
                 <div v-else-if="(d > depTime && d < arrTime && depTime.getMonth() === arrTime.getMonth())"  class='middle'  :class="{'selDate': selDate === d}">
                <span v-if="d < new Date()" class="disabled">{{ d.getDate() }}</span>
                <span v-else @click="clickAction(d)" :class="{'redC':(d.getDay() === 6 || d.getDay() === 0)}">{{d.getDate() }}</span>
              </div>
                <div v-else :class="{'selDate': selDate === d}">
                  <span v-if="d < new Date()" class="disabled">{{ d.getDate() }}</span>
                  <span v-else @click="clickAction(d)" :class="{'redC':(d.getDay() === 6 || d.getDay() === 0)}">{{d.getDate() }}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="btn">
      <mt-button @click.native="cancel" class="cancelBtn">取消</mt-button>
      <mt-button @click.native="confirm" class="confirm">确定</mt-button>
    </div>
  </div>
</template>
  <script>
import Lib from 'assets/js/Lib'
export default {
  props: ['aroud', 'bfDate'],
  data () {
    return {
      depTime: '',
      arrTime: '',
      dateArr: [],
      showDate: {},
      currentDate: {
        currentDay: null,
        currentMonth: null,
        currentYear: null
      },
      nums: [],
      selDate: new Date()
    }
  },
  created () {
    Lib.B.setREM()
  },
  mounted () {
    for (let i = 0; i < this.aroud; i++) {
      let days = this.dateInit(this.currentDate.currentYear, this.currentDate.currentMonth)
      let timeObj = {
        y: this.currentDate.currentYear,
        m: this.currentDate.currentMonth,
        days
      }
      if (i === 0) {
        this.showDate = timeObj
      } else {
        this.dateArr.push(timeObj)
      }
    }
    this.depTime = new Date(this.bfDate.depTime)
    this.arrTime = new Date(this.bfDate.arrTime)
  },
  methods: {
    clickAction (date) {
      if (this.selDate === date) {
        this.selDate = ''
      } else {
        this.selDate = date
      }
    },
    confirm () {
      this.$emit('newDate', this.selDate)
    },
    cancel () {
      this.$emit('cancel', this.selDate)
    },
    back () {
      history.back()
    },
    dateInit (year, month) {
      let date, d
      let days = []
      if (year == null || month == null) {
        let _date = new Date()
        d = new Date(_date.getFullYear(), _date.getMonth() - 1, 1)
      } else {
        d = new Date(year, month - 1, 1)
      }
      d.setDate(42)
      date = new Date(d.getFullYear(), d.getMonth(), 1)
      this.getDay(date)
      for (let i = this.currentDate.currentWeek - 1; i >= 0; i--) {
        let curDay = new Date(this.currentDate.currentYear, this.currentDate.currentMonth - 1, this.currentDate.currentDay)
        curDay.setDate(curDay.getDate() - i)
        days.push(curDay)
      }
      for (let i = 1; i <= 42 - this.currentDate.currentWeek; i++) {
        let curDay = new Date(this.currentDate.currentYear, this.currentDate.currentMonth - 1, this.currentDate.currentDay)
        curDay.setDate(curDay.getDate() + i)
        days.push(curDay)
      }
      return days
    },
    getDay (date) {
      this.currentDate.currentDay = date.getDate()
      this.currentDate.currentYear = date.getFullYear()
      this.currentDate.currentMonth = date.getMonth() + 1
      this.currentDate.currentWeek = date.getDay() + 1
      if (this.currentDate.currentWeek === 0) {
        this.currentDate.currentWeek = 7
      }
    },
    getNum (date) {
      let lastDay = this.nums.length && this.nums(this.nums.length - 1).reTravelDate
      let day = this.formatDate(date.getFullYear(), date.getMonth() + 1, date.getDate())
      if (day > lastDay) {
        return ''
      }
    },
    formatDate (year, month, day) {
      let y = year
      let m = month
      if (m < 10) m = '0' + m
      let d = day
      if (d < 10) d = '0' + d
      return y + '-' + m + '-' + d
    },
    getCurrentDate () {
      let d = this.currentDate
      if (d) {
        return this.formatDate(d.getFullYear(), d.getMonth() + 1, d.getDate())
      } else {
        d = new Date()
        return this.formatDate(d.getFullYear(), d.getMonth() + 1, d.getDate())
      }
    },
    isCurrentDay (day) {
      let d = this.selectDate
      if (d != null) {
        return day.getFullYear() === d.getFullYear() && day.getMonth() === d.getMonth() && day.getDate() === d.getDate()
      } else {
        return day.getFullYear() === new Date().getFullYear() && day.getMonth() === new Date().getMonth() && day.getDate() === new Date().getDate()
      }
    },
    isToday (day) {
      return day.getFullYear() === new Date().getFullYear() && day.getMonth() === new Date().getMonth() && day.getDate() === new Date().getDate()
    },
    isDep (day) {
      return day.getFullYear() === this.depTime.getFullYear() && day.getMonth() === this.depTime.getMonth() && day.getDate() === this.depTime.getDate()
    },
    isArr (day) {
      return day.getFullYear() === this.arrTime.getFullYear() && day.getMonth() === this.arrTime.getMonth() && day.getDate() === this.arrTime.getDate()
    }
  }
}
</script>
  <style lang="scss">
@function px2rem($w) {
  @return $w / 750 * 23.5rem
}

$themeA: #6092ff;
.date {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: 200;
  text-align: center;
  color: #333;
  font-size: px2rem(32);
  background: white;
  .depTime, .arrTime {
     span {
      color: #fff !important;
    }
    background-color: $themeA !important;
    p {
      color: #fff !important;
      font-size: px2rem(12);
      line-height: px2rem(41);
    }
  }
  .middle {
    background-color: rgba(135, 206, 250, .2)
  }
  .cc {
    color: white !important;
  }
  .nums {
    color: #37B7FA;
  }
  .redC {
    color: red;
  }
  div.selDate {
    span {
      color: #fff !important;
    }
    background-color: #7FFFD4 !important;
    p {
      color: #fff !important;
    }
  }
  .today {
    background-color: #FFD700;
    p {
      line-height: px2rem(41);
      font-size: px2rem(12)
    }
  }
  span[class=disabled] {
    color: #CCCCCC;
  }
  header {
    background: $themeA;
    height: px2rem(150);
    .back {
      color: white;
      box-shadow: none;
    }
    .title {
      width: 100%;
      text-align: center;
      p {
        color: #b5ccff;
        font-size: .7rem;
        height: px2rem(80);
        line-height: px2rem(80);
      }
      .t-place {
        font-size: 1rem;
      }
    }
    .week {
      padding: px2rem(10) 0;
      width: 100%;
      display: flex;
      display: -webkit-flex;
      justify-content: flex-start;
      color: white;
      li {
        flex: 1;
        text-align: center;
        line-height: px2rem(60);
        height: px2rem(60);
      }
    }
  }
  .calendar {
    .calendar-item-top {
      border-bottom: 1px solid #e5e5e5;
      padding-bottom: px2rem(35)
    }
  }
  .calendar-header {
    padding-top: px2rem(15);
    font-size: px2rem(28);
    line-height: px2rem(80);
  }
  .calendar-body {
    ul {
      flex-flow: row wrap;
      display: flex;
      align-content: flex-start;
      display: -webkit-flex;
      justify-content: space-around;
      li {
        text-align: center;
        line-height: px2rem(80);
        vertical-align: middle;
        border: none;
        color: #797979;
        flex: 14%;
        -webkit-box-flex: 14%;
        background-color: #fff;
        border: none;
        font-weight: medium;
      }
    }
  }
  .boxScroll {
    width: 100%;
    height: 40%;
    overflow: hidden;
    -webkit-overflow-scrolling: touch;
    -webkit-overflow-scrolling: auto;
    margin-bottom: px2rem(10);
    .scrollDate {
      width: 100%;
      height: 100%;
      overflow-x: hidden;
      overflow-y: scroll;
      .scrollWrap {
        padding-bottom: px2rem(30)
      }
    }
  }
  .btn {
    width: 100%;
    .confirm,
    .cancelBtn {
      border-radius: px2rem(40);
      width: 40%;
      position: absolute;
      border: 1px solid #fff;
      background-color: $themeA;
    }
    .confirm {
      right: 5%;
      color: #fff;
    }
    .cancelBtn {
      left: 5%;
      background-color: #fff;
      color: $themeA;
      border: 1px solid
    }
  }
}
</style>

