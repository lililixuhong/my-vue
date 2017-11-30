// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import common from './common.js' // 公共方法
//  ajax  数据请求模块
import ajax from './httpAjax/index'
// 自定义全局组件
import tmpl from './components/tmpl/index'
Vue.use(tmpl);
// 全局组件
import Message from './components/tmpl/message/message.js';
Vue.component(Message.name, Message)
Vue.prototype.$message = Message

Vue.config.productionTip = false
// 导入全局指令
import Directive from './directive/index'
// 导入过滤器
import Filter from './filter/index'
// 公共方法
Vue.prototype.fn = common;

/* eslint-disable no-new */
var vm = new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: {
    App
  }
});





//绑定浏览器缩放与加载时间
var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
window.addEventListener(resizeEvt, common.htmlSize, false);
document.addEventListener('DOMContentLoaded', common.htmlSize, false);
