import Vue from 'vue'

// 注册一全局指令 使用v-focus
Vue.directive('focus', {
  // inserted: 是被绑定元素插入父节点时调用 (父节点存在即可调用，不必存在于 document 中)。
  inserted(el, binding, vnode) {
    /**
     * 三个形参的意义
     * 
     * el: 指令所绑定的元素，可以用来直接操作 DOM 。
     * binding: 一个对象，包含以下属性
     *    binding:{
     *          name：指令名，不包括 v- 前缀。
                value：指令的绑定值，例如：v-my-directive="1 + 1", value 的值是 2。
     *      }
     * 
     * **/
    console.log(binding)
    el.focus()
  }
});

Vue.directive('demo', {
  bind: function (el, binding, vnode) {
    var s = JSON.stringify
    el.innerHTML =
      'name: ' + s(binding.name) + '<br>' +
      'value: ' + s(binding.value) + '<br>' +
      'expression: ' + s(binding.expression) + '<br>' +
      'argument: ' + s(binding.arg) + '<br>' +
      'modifiers: ' + s(binding.modifiers) + '<br>' +
      'vnode keys: ' + Object.keys(vnode).join(', ')
  }
})
