import Vue from 'vue'
import Router from 'vue-router'
import common from '../common.js' // 公共方法
Vue.use(Router);

//  张亮路由

import liangRouter from './zhangling'

// hgt
import hgt from './hgt'
//测试
const Test = resolve => {
  require.ensure(['../components/Hello.vue'], () => {
    resolve(require('../components/Hello.vue'))
  })
};

//美容邦
const HomePage = resolve => {
  // require.ensure 是 Webpack 的特殊语法，用来设置 code-split point
  // （代码分块）
  require.ensure(['../components/homePage/index.vue'], () => {
    resolve(require('../components/homePage/index.vue'))
  })
};
//店铺
const BeautySalon = resolve => {
  require.ensure(['../components/beautySalon/index.vue'], () => {
    resolve(require('../components/beautySalon/index.vue'))
  })
};
const storeDetail = resolve => {
  require.ensure(['../components/beautySalon/storeDetail.vue'], () => {
    resolve(require('../components/beautySalon/storeDetail.vue'))
  })
};
//订单
const Orders = resolve => {
  require.ensure(['../components/orders/index.vue'], () => {
    resolve(require('../components/orders/index.vue'))
  })
};
//我的
const UserCenter = resolve => {
  require.ensure(['../components/userCenter/index.vue'], () => {
    resolve(require('../components/userCenter/index.vue'))
  })
};
const Sets = resolve => {
  require.ensure(['../components/userCenter/set.vue'], () => {
    resolve(require('../components/userCenter/set.vue'))
  })
};
const Account = resolve => {
  require.ensure(['../components/userCenter/account.vue'], () => {
    resolve(require('../components/userCenter/account.vue'))
  })
};
const LoginPwd = resolve => {
  require.ensure(['../components/userCenter/loginPwd.vue'], () => {
    resolve(require('../components/userCenter/loginPwd.vue'))
  })
};
const PayPwd = resolve => {
  require.ensure(['../components/userCenter/payPwd.vue'], () => {
    resolve(require('../components/userCenter/payPwd.vue'))
  })
};
const ActivateCards = resolve => {
  require.ensure(['../components/userCenter/activateCards.vue'], () => {
    resolve(require('../components/userCenter/activateCards.vue'))
  })
};
const Mycards = resolve => {
  require.ensure(['../components/userCenter/mycards.vue'], () => {
    resolve(require('../components/userCenter/mycards.vue'))
  })
};
const CardDetail = resolve => {
  require.ensure(['../components/userCenter/cardDetail.vue'], () => {
    resolve(require('../components/userCenter/cardDetail.vue'))
  })
};
const Qrcode = resolve => {
  require.ensure(['../components/userCenter/qrcode.vue'], () => {
    resolve(require('../components/userCenter/qrcode.vue'))
  })
};
const SetPayPwd = resolve => {
  require.ensure(['../components/userCenter/setPayPwd.vue'], () => {
    resolve(require('../components/userCenter/setPayPwd.vue'))
  })
};
const Recharge = resolve => {
  require.ensure(['../components/userCenter/recharge.vue'], () => {
    resolve(require('../components/userCenter/recharge.vue'))
  })
};
const FindPayPwd = resolve => {
  require.ensure(['../components/userCenter/findPayPwd.vue'], () => {
    resolve(require('../components/userCenter/findPayPwd.vue'))
  })
};
//登录
const Loginin = resolve => {
  require.ensure(['../components/login/loginin.vue'], () => {
    resolve(require('../components/login/loginin.vue'))
  })
};
const Bindacc = resolve => {
  require.ensure(['../components/login/bindacc.vue'], () => {
    resolve(require('../components/login/bindacc.vue'))
  })
};
const Findpwd = resolve => {
  require.ensure(['../components/login/findpwd.vue'], () => {
    resolve(require('../components/login/findpwd.vue'))
  })
};
const Newpwd = resolve => {
  require.ensure(['../components/login/newpwd.vue'], () => {
    resolve(require('../components/login/newpwd.vue'))
  })
};
const Protoct = resolve => {
  require.ensure(['../components/login/protoct.vue'], () => {
    resolve(require('../components/login/protoct.vue'))
  })
};
const Register = resolve => {
  require.ensure(['../components/login/register.vue'], () => {
    resolve(require('../components/login/register.vue'))
  })
};

// 聊天
const Chat = resolve => {
  require.ensure(['../components/chat/room.vue'], () => {
    resolve(require('../components/chat/room.vue'))
  })
};

// 疗程卡消费记录详情页面  hgt添加
const courseCardDetail = resolve => {
  require.ensure(['../components/userCenter/courseCardDetail'], () => {
    resolve(require('../components/userCenter/courseCardDetail'))
  })
};


var routerArr = [{ // 美容邦模块
  path: '/test',
  name: '测试',
  component: Test

}, { // 美容邦模块
  path: '/',
  name: '面子',
  component: HomePage

}, { // 店铺模块
  path: '/beautySalon',
  name: '店铺',
  component: BeautySalon
}, {
  path: '/storeDetail',
  name: '服务详情',
  component: storeDetail,
}, { // 订单模块
  path: '/orders',
  name: '订单',
  component: Orders,
  meta: {
    requireAuth: true // 需登录权限字段
  }

}, { // 我的模块
  path: '/userCenter',
  name: '我的',
  component: UserCenter,
  meta: {
    requireAuth: true // 需登录权限字段
  }
}, {
  path: '/set',
  name: '个人设置',
  component: Sets,
  meta: {
    requireAuth: true // 需登录权限字段
  }
}, {
  path: '/account',
  name: '账户与安全',
  component: Account,
  meta: {
    requireAuth: true // 需登录权限字段
  }
}, {
  path: '/loginPwd',
  name: '修改登录密码',
  component: LoginPwd,
  meta: {
    requireAuth: true // 需登录权限字段
  }
}, {
  path: '/payPwd',
  name: '修改支付密码',
  component: PayPwd,
  meta: {
    requireAuth: true // 需登录权限字段
  }
}, {
  path: '/activateCards',
  name: '会员卡激活',
  component: ActivateCards,
  meta: {
    requireAuth: true // 需登录权限字段
  }
}, {
  path: '/mycards',
  name: '我的卡包',
  component: Mycards,
  meta: {
    requireAuth: true // 需登录权限字段
  }
}, {
  path: '/cardDetail/:id',
  name: '会员卡详情',
  component: CardDetail,
  meta: {
    requireAuth: true // 需登录权限字段
  }
}, {
  path: '/qrcode/:num/:id/:key/:d',
  name: '会员卡二维码',
  component: Qrcode,
  meta: {
    requireAuth: true // 需登录权限字段
  }
}, {
  path: '/setPayPwd',
  name: '设置支付密码',
  component: SetPayPwd,
  meta: {
    requireAuth: true // 需登录权限字段
  }
}, {
  path: '/recharge',
  name: '会员卡充值',
  component: Recharge,
  meta: {
    requireAuth: true // 需登录权限字段
  }
}, {
  path: '/findPayPwd',
  name: '找回支付密码',
  component: FindPayPwd,
  meta: {
    requireAuth: true // 需登录权限字段
  }
}, { // 登录模块
  path: '/login/loginin',
  name: '登录',
  component: Loginin,
  meta: {
    loginned: true
  }
}, {
  path: '/login/bindacc',
  name: '绑定账号',
  component: Bindacc,
  meta: {
    loginned: true
  }
}, {
  path: '/login/findpwd',
  name: '找回密码',
  component: Findpwd,
  meta: {
    loginned: true
  }
}, {
  path: '/login/newpwd',
  name: '设置新密码',
  component: Newpwd,
  meta: {
    loginned: true
  }
}, {
  path: '/login/protoct',
  name: '面子服务协议',
  component: Protoct,
  meta: {
    loginned: true
  }
}, {
  path: '/login/register',
  name: '注册',
  component: Register,
  meta: {
    loginned: true
  }
}, { // 聊天
  path: '/chat',
  name: '聊天',
  component: Chat,
  meta: {
    requireAuth: true
  }
},{ // 疗程卡
  path: '/courseCardDetail',
  name: '消费记录',
  component: courseCardDetail,
  meta: {
    requireAuth: true
  }
}]

routerArr = routerArr.concat(liangRouter, hgt)

const router = new Router({
  // history: true,
  routes: routerArr,
})




router.beforeEach((to, from, next) => {
  "use strict";
  if (to.meta.requireAuth) {
    if(!to.meta.loginned && !common.getcookie('key') && !from.meta.loginned){
      common.addcookie('fromPath', from.fullPath);
      console.log(from);
    }
    if (!common.getcookie('key') && !from.meta.loginned) {
      common.tip("未登录，请先登录。")
      setTimeout(function () {
        next({
          path: '/login/loginin',
          query: {
            redirect: to.fullPath
          } // 将跳转的路由path作为参数，登录成功后跳转到该路由
        })
      }, 1500)
    } else {
      next();
    }
  }
  if (to.meta.loginned && common.getcookie('key')) {
    router.push({
      path: '/'
    });
  }
  next();
});
router.afterEach((to, from, next) => {
  "use strict";
  if(from.meta.loginned && !common.getcookie('key') && !to.meta.loginned){
    router.push({
      path: unescape(common.getcookie('fromPath'))
    });
  }
  document.title = to.name;
  window.scrollTo(0, 0);
});

export default router
