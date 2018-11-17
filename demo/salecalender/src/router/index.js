import Vue from 'vue'
import Router from 'vue-router'
import SaleCalender from '@/components/saleCalender'
import SaleCalender3 from '@/components/saleCalender3'
import test from '@/components/test'
import c from '@/components/calender'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'saleCalender',
      component: SaleCalender
    },
    {
      path: '/3',
      name: 'saleCalender3',
      component: SaleCalender3
    },
    {
      path: '/test',
      name: 'test',
      component: test
    },
    {
      path: '/c',
      name: 'c',
      component: c
    }
  ]
})
