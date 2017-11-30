import Vue from 'vue';

const MsgConstructor = Vue.extend(require('./test.vue'));

const instance = new MsgConstructor({
  // el: document.createElement('div'),
}).$mount(document.createElement('div'));
console.log(instance, '0-0-00')

MsgConstructor.prototype.closeMsg = function () {
  const el = instance.$el;
  el.parentNode && el.parentNode.removeChild(el);
  typeof this.callback === 'function' && this.callback();
};

const Message = (options = {}) => {
  instance.msg = options.msg;
  instance.timeout = options.timeout || 2000;
  instance.isMask = options.isMask != undefined ? options.isMask : false;
  instance.icon = options.icon;
  instance.callback = options.callback;
  document.body.appendChild(instance.$el);

  const timer = setTimeout(() => {
    clearTimeout(timer);
    instance.closeMsg();
  }, instance.timeout + 100);
};

export default Message;
