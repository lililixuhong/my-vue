import Vue from 'vue'
import common from '../common'
import lazyLoad from './lazyLoad'
import hgt from './hgtTest.js'

Vue.use(lazyLoad)
//注册一个全局自定义指令v-btn
Vue.directive('btn', {
  bind(el) {
    "use strict";
    el.addEventListener('touchstart', () => {
      el.style.opacity = 0.9;
    }, false);
    el.addEventListener('touchend', () => {
      el.style.opacity = 1;
    }, false);
  }
});


Vue.directive('del', {
  bind(el, params, vnode) {
    "use strict";
    el.addEventListener('click', () => {
      vnode.context[params.expression] = '';
    }, false);
  }
});

// 全选与反选
Vue.directive('check-all', {
  bind(el, params, vnode) {
    let arr = el.getAttribute('checkArr');
    el.addEventListener('click', () => {
      vnode.context[arr] = [];
      if (el.checked) {
        vnode.context[arr] = [];
        params.value.forEach((element) => {
          vnode.context[arr].push(element.id);
        });
      }
    }, false)
  }
});


// 获取验证码
Vue.directive('getCode', {
  bind(el, params, vnode) {
    el.addEventListener('click', () => {  
      if (!common.is_tel(el.name)) {
        return
      }
      el.disabled = true;
      var time = 60;
      el.style.color = "#999";
      el.value = --time + 's';
      var time2 = setInterval(function () {
        el.value = --time + 's';
        if (time === 0) {
          clearInterval(time2)
          el.value = "获取验证码";
          el.disabled = false;
          el.style.color = "#11abcf";
        }
      }, 1000)
    }, false)
  }
});

// 裁切图片
Vue.directive('img', {
  bind(el, params, vnode) {}
});
