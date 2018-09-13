import Vue from 'vue'
import Router from 'vue-router'
import SaleCalender from '@/components/saleCalender'
import SaleCalender2 from '@/components/saleCalender2'
import test from '@/components/test'
import test2 from '@/components/test2'
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
      path: '/1',
      name: 'saleCalender2',
      component: SaleCalender2
    },
    {
      path: '/test2',
      name: 'test2',
      component: test2
    },
    {
      path: '/c',
      name: 'c',
      component: c
    }
  ]
})
