import Vue from 'vue'
import App from './App.vue'
import router from './router';

Vue.config.productionTip = false
// 使用$bus必须在vue原型添加$bus
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
