import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

export default new Router({
  routes: [{
    path: '/jdXcxIndex',
    name: 'jdXcxIndex',
    component: resolve => { require(['@/components/jiadian/JdXcxIndex.vue'], resolve) },
    meta: {
      keepAlive: false,
      whitePath: true
    }
  },{
    path: '/jdXcxStuff',
    name: 'jdXcxStuff',
    component: resolve => { require(['@/components/jiadian/JdXcxStuff.vue'], resolve) },
    meta: {
      keepAlive: false,
      whitePath: true
    }
  }],
});

