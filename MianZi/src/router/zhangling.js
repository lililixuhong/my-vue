//测试
const Test = resolve => {
  require.ensure(['../components/Hello.vue'], () => {
    resolve(require('../components/Hello.vue'))
  })
};

//提交订单
const SubmitOrder = resolve => {
  require.ensure(['../components/beautySalon/submitOrder.vue'], () => {
    resolve(require('../components/beautySalon/submitOrder.vue'))
  })
};

//店铺列表
const ShopList = resolve => {
  require.ensure(['../components/beautySalon/shopList.vue'], () => {
    resolve(require('../components/beautySalon/shopList.vue'))
  })
};

//支付订单
const Payment = resolve => {
  require.ensure(['../components/beautySalon/payment.vue'], () => {
    resolve(require('../components/beautySalon/payment.vue'))
  })
};

//支付成功
const SuccessPay = resolve => {
  require.ensure(['../components/beautySalon/successPay.vue'], () => {
    resolve(require('../components/beautySalon/successPay.vue'))
  })
};

// 支付成功(购买会员卡)
const SuccessPayBuyCard = resolve => {
  require.ensure(['../components/beautySalon/successPayBuyCard.vue'], () => {
    resolve(require('../components/beautySalon/successPayBuyCard.vue'))
  })
};


export default [
    {// 测试
    path: '/test',
    name: '你的测试',
    component: Test
    },
    {//提交订单页
      path: '/submitOrder',
      name: '提交订单',
      component: SubmitOrder,
      meta: {
        requireAuth: true // 需登录权限字段
      }

    },
    {//店铺列表页
      path: '/shopList',
      name: '店铺列表',
      component: ShopList

    },
    {//支付订单
      path: '/payment',
      name: '支付订单',
      component: Payment,
      meta: {
        requireAuth: true // 需登录权限字段
      }

    },
    {//支付成功
      path: '/successPay',
      name: '支付成功',
      component: SuccessPay,
      meta: {
        requireAuth: true // 需登录权限字段
      }
    },
    {//支付成功(购买会员卡)
      path: '/successPayBuyCard',
      name: '成功',
      component: SuccessPayBuyCard,
      meta: {
        requireAuth: true // 需登录权限字段
      }
    }
  ]
