// 使用一行代码使用toast
import Toast   from './Toast';

// toast第一步:创建obj对象,并导出,第二部进入main.js
const obj ={}

// toast第三步:导入Toast,并在obj.install里面把$toast绑定到vue原型上(install的第一个参数就是vue对象),第四步进入Toast.vue

obj.install = function(Vue){
    
  //toast第五步:把Toast.vue里面的模板代码挂载到div上,第六步使用toast:  this.$toast.show('',2000)
    // 5.1.创建组件构造器
    const toastContrustor = Vue.extend(Toast)
    // 5.2.new的方式,根据组件构造器,可以创建出一个组件对象
    const toast = new toastContrustor();
    // 5.3.将组件对象,手动挂载到某一个元素上
    toast.$mount(document.createElement('div'))
    // 5.4.toast.$el对应的就是div
    document.body.appendChild(toast.$el)

    Vue.prototype.$toast = toast
}

export default obj