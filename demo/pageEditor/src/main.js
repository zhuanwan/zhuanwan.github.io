import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
import Vue from 'vue';
import App from './App';
import router from './router';

Vue.use(ElementUI, { size: 'medium', zIndex: 3000 });
Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
