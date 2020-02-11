import Vue from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';

// toast第二步:导入toast的index,默认为index,并安装toast插件,第三步进入:index.js
import toast from './components/common/toast';

//解决移动端点击延迟
import FastClick from 'fastclick';

Vue.config.productionTip = false
// 使用$bus必须在vue原型添加$bus
Vue.prototype.$bus = new Vue()

//安装toast插件
Vue.use(toast)

FastClick.attach(document.body)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
