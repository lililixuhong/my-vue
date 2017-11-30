import Vue from 'vue'
//过滤数组
Vue.filter("num", (value) => {
  return value + '你好'
})

Vue.filter("num2", (value) => {
  return value * 10
})
// 去除地址里的省市
Vue.filter("removeProvinceAndCity", (value) => {
  if (value == undefined) {
    return ""
  }
  return value.substring(value.indexOf('市') + 1, value.length);
})

const filterTime = function (time, fmt) { //author: meizz
  if (!time) {
    return ""
  }
  if (!(time instanceof Date) && (typeof time === "string")) {
    time = new Date(time)
  }
  var o = {
    "M+": time.getMonth() + 1, //月份
    "d+": time.getDate(), //日
    "h+": time.getHours(), //小时
    "m+": time.getMinutes(), //分
    "s+": time.getSeconds(), //秒
    "q+": Math.floor((time.getMonth() + 3) / 3), //季度
    "S": time.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (time.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

// 日期过滤器 示例   <span>{{cardData.createTime|fromatDate('yyyy-MM-dd')}}</span>
// <span>{{cardData.createTime|fromatDate('yyyy-MM-dd hh:ss:mm')}}</span>
Vue.filter('fromatDate', (value, type) => {
  return filterTime(value, type)
})

