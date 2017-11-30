import Vue from 'vue'
import Axios from 'axios'
import Qs from 'qs'
import store from '../store/index'
import router from '../router'
import common from '../common'

Vue.prototype.$ajax = Axios.create({
  method: 'post',
  responseType: 'json',
  timeout: 15000,
  // params: { // 只在项目运行时取一次
  //   token: common.getcookie('key')
  // },
  // headers: {'X-Requested-With': 'XMLHttpRequest'},
  transformRequest: [(data) => {
    data.token = common.getcookie('key');
    // 这里可以在发送请求之前对请求数据做处理，比如form-data格式化等，这里可以使用开头引入的Qs（这个模块在安装axios的时候就已经安装了，不需要另外安装）
    data = Qs.stringify(data);
    store.dispatch('loading');
    return data;
  }],
  transformResponse: [(data) => {

    // 对 data 进行任意转换处理
    store.dispatch('hideloading');
    if (data.errorCode == 999 && common.getcookie('key')) {
      // 返回 999 清除token信息并跳转到登录页面
      // store.commit(types.LOGOUT);
      common.delCookie('key');
      common.delCookie('nickname');
      common.delCookie('headImg');
      var timer = setTimeout(() => {
        router.push({
          path: '/login/loginin',
          query: {
            redirect: router.currentRoute.fullPath
          }
        });
        clearTimeout(timer);
      }, 3000);
    }
    return data;
  }],
  baseURL: '',
});


Vue.prototype._ajax = (opt) => {
  opt.method = opt.method || 'post'
  Vue.prototype.$ajax({
    url: opt.url,
    method: opt.method,
    params: opt.method == 'get' ? opt.data : {},
    data: opt.method == 'post' ? opt.data : {}
  }).then(res => {
    opt.callback && opt.callback(res.data);
  }, err => {
    opt.fail && opt.fail(err);
  });
}

// 请求拦截（配置发送请求的信息）
Vue.prototype.$ajax.interceptors.request.use(
  config => {

    if ('') {};
    return config;
  },
  err => {

    return Promise.reject(err);
  }
);
// 响应拦截（配置请求回来的信息）
Vue.prototype.$ajax.interceptors.response.use(
  response => {

    return response;
  },
  err => {


    store.dispatch('hideloading');
    if (/timeout/g.test(err)) {
      alert('请求超时！');
      // router.go(-1);
    }
    if (err.response) {
      switch (error.response.status) {
        case 999:
          // 返回 401 清除token信息并跳转到登录页面
          // store.commit(types.LOGOUT);
          router.replace({
            path: '/login/loginin',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
      }
    }
    return Promise.reject(err.response);
  }
);
