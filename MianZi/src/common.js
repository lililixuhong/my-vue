const common = {


  // wyl: 'http://172.16.20.93:8080/facebook/a/wapApi/',
  // xqq: 'http://172.16.20.93:8080/facebook/a/wapApi/',


  // wyl: 'http://172.16.20.92:8080/facebook/a/wapApi/',
  // xqq: 'http://172.16.20.92:8080/facebook/a/wapApi/',
  // xqq:"http://amqq.ittun.com/facebook/a/wapApi/",
  // wyl:"http://amqq.ittun.com/facebook/a/wapApi/",



  // 测试服务器
  wyl: 'http://facetest.amyun.cn/facebook/a/wapApi/',
  xqq: 'http://facetest.amyun.cn/facebook/a/wapApi/',



  // // // 正式环境服务器 119.29.36.174
  // wyl: 'http://face.amyun.cn/facebook/a/wapApi/',
  // xqq: 'http://face.amyun.cn/facebook/a/wapApi/',


  // wyl: '/facebook/a/wapApi/',
  // xqq: '/facebook/a/wapApi/',


  // 会员卡支付跳转页面专用


  // 计算rem根值
  htmlSize() {
    var w = document.documentElement.clientWidth,
      size = '';
    if (w > 800) {
      w = 800;
      document.body.style.width = w + 'px';
      document.body.style.margin = '0 auto';
    }
    size = 20 * w / 375;
    document.documentElement.style.fontSize = size + 'px';
    return size;
  },
  // 添加cookie
  addcookie(name, value, expireHours) {
    var cookieString = name + "=" + escape(value) + "; path=/";
    //判断是否设置过期时间
    if (expireHours > 0) {
      var date = new Date();
      date.setTime(date.getTime() + expireHours * 3600 * 1000);
      cookieString = cookieString + ";expires=" + date.toGMTString();
    }
    document.cookie = cookieString;
  },
  // 得到cookie
  getcookie(name) {
    var strcookie = document.cookie;
    var arrcookie = strcookie.split("; ");
    for (var i = 0; i < arrcookie.length; i++) {
      var arr = arrcookie[i].split("=");
      if (arr[0] == name) return arr[1];
    }
    return "";
  },
  // 删除cookie
  delCookie(name) { //删除cookie
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = this.getcookie(name);
    if (cval != null) document.cookie = name + "=" + cval + "; path=/;expires=" + exp.toGMTString();
  },
  // 判断微信
  is_weixn() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
      return true;
    } else {
      return false;
    }
  },
  // 验证表单是否可以提交
  authFn(opt) {

    for (var i in opt) {
      if (!opt[i]) {
        return false;
      }
    }
    return true;
  },
  // 验证手机号码
  is_tel(phone) {
    if (!(/^1(3|4|5|7|8)\d{9}$/.test(phone))) {
      return false;
    }
    return true;
  },
  // 验证密码规则
  is_pwd(pwd) {
    if (!(/^[a-zA-Z0-9]{6,20}$/.test(pwd))) {
      return false;
    }
    return true;
  },
  // 一个简单的消息提示框
  tip(str, width) {
    var el = document.querySelector('.tipinfo');
    if (el) {
      return
    }
    var node = document.createElement("div");
    node.setAttribute("class", "tipinfo");

    node.innerHTML = '<div style="width:' + width + ';" class="tip"><div style="padding: 0 0.5rem;">' + str + '</div></div >'
    document.body.appendChild(node)
    setTimeout(function () {
      document.body.removeChild(node)
    }, 3000);
  },
  // 是否加载更多
  isLoadMore() {
    //获取滚动条当前的位置 
    function getScrollTop() {
      var scrollTop = 0;
      if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop;
      } else if (document.body) {
        scrollTop = document.body.scrollTop;
      }
      return scrollTop;
    }

    //获取当前可视范围的高度 
    function getClientHeight() {
      var clientHeight = 0;
      if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
      } else {
        clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
      }
      return clientHeight;
    }

    //获取文档完整的高度 
    function getScrollHeight() {
      return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    }

    return getScrollTop() + getClientHeight() == getScrollHeight();
  },
  saveLocation(params) {
    sessionStorage.setItem('userLocation', JSON.stringify(params));
  },
  removeLocation() {
    sessionStorage.removeItem('userLocation');
  },
  getLocation() {
    return JSON.parse(sessionStorage.getItem('userLocation'));
  },
  // 得到经纬度
  getLatitude() {
    new BMap.Geolocation().getCurrentPosition(function (position) {
      if (this.getStatus() == BMAP_STATUS_SUCCESS) { //通过Geolocation类的getStatus()可以判断是否成功定位。  
        common.saveLocation({
          currla: position.latitude, //维度  
          currlo: position.longitude, //经度
          address: position.address //地址
        })
      } else {
        switch (this.getStatus()) {
          case 2:
            console.log('位置结果未知 获取位置失败.');
            break;
          case 3:
            console.log('导航结果未知 获取位置失败..');
            break;
          case 4:
            console.log('非法密钥 获取位置失败.');
            break;
          case 5:
            console.log('对不起,非法请求位置  获取位置失败.');
            break;
          case 6:
            console.log('对不起,当前 没有权限 获取位置失败.');
            break;
          case 7:
            console.log('对不起,服务不可用 获取位置失败.');
            break;
          case 8:
            console.log('对不起,请求超时 获取位置失败.');
            break;
        }
      }
    });
  }





}

export default common
