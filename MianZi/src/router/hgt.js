//产品
const product = resolve => {
  require.ensure(['../components/homePage/product.vue'], () => {
    resolve(require('../components/homePage/product.vue'))
  })
};

//手机号登录
const phoneLogin = resolve => {
  require.ensure(['../components/login/phoneLogin.vue'], () => {
    resolve(require('../components/login/phoneLogin.vue'))
  })
};



//分类服务
const server = resolve => {
  require.ensure(['../components/homePage/server.vue'], () => {
    resolve(require('../components/homePage/server.vue'))
  })
};

//订单详情
const orderDetail = resolve => {
  require.ensure(['../components/orders/orderDetail.vue'], () => {
    resolve(require('../components/orders/orderDetail.vue'))
  })
};

//退款页面
const reimburse = resolve => {
  require.ensure(['../components/orders/reimburse.vue'], () => {
    resolve(require('../components/orders/reimburse.vue'))
  })
};
//退款规则
const rule = resolve => {
  require.ensure(['../components/orders/rule.vue'], () => {
    resolve(require('../components/orders/rule.vue'))
  })
};
// 会员卡详情
const cardDetail = resolve => {
  require.ensure(['../components/homePage/cardDetails.vue'], () => {
    resolve(require('../components/homePage/cardDetails.vue'))
  })
};
// 疗程卡详情
const treatmentCard = resolve => {
  require.ensure(['../components/homePage/treatmentCard.vue'], () => {
    resolve(require('../components/homePage/treatmentCard.vue'))
  })
};
// 测试
const my = resolve => {
  require.ensure(['../components/homePage/mytest.vue'], () => {
    resolve(require('../components/homePage/mytest.vue'))
  })
};
// 提交疗程卡
const subCourse = resolve => {
  require.ensure(['../components/beautySalon/subCourse.vue'], () => {
    resolve(require('../components/beautySalon/subCourse.vue'))
  })
};
export default [{
    path: '/my',
    name: '我的测试',
    component: my
  }, {
    path: '/product',
    name: '全部商品',
    component: product
  },
  { // 手机号登录
    path: '/login/phone',
    name: '手机号登录',
    component: phoneLogin,
    meta: {
      loginned: true
    }
  },
  {
    path: '/server',
    name: '服务',
    component: server
  },
  {
    path: '/orderDetail',
    name: '订单详情',
    component: orderDetail,
    meta: {
      requireAuth: true // 需登录权限字段
    }
  },
  {
    path: '/reimburse',
    name: '退款原因',
    component: reimburse,
    meta: {
      requireAuth: true // 需登录权限字段
    }
  },
  {
    path: '/rule',
    name: '退款规则',
    component: rule,
    meta: {
      requireAuth: true // 需登录权限字段
    }
  },
  {
    path: '/cardDetail',
    name: '会员卡',
    component: cardDetail
  },
  {
    path: '/treatmentCard',
    name: '疗程卡',
    component: treatmentCard
  },
  { // 提交疗程卡
    path: '/subCourse',
    name: '提交疗程卡',
    component: subCourse,
    meta: {
      requireAuth: true // 需登录权限字段
    }
  }, { // 未知页面全部跳转首页
    path: '/*',
    redirect: '/'
  }
]
//treatmentCard
