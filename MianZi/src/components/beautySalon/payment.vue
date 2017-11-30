<!--立即购买页-->
<template>
    <div class="payment" :class="displayOrHide ? 'eventDisable' : ''">
        <!--头部-->
        <!--<header>
        <!--订单金额-->
        <section class="orderAmount">
            <div>订单金额</div>
            <div>￥
                <span>{{amountTotal}}</span>
            </div>
        </section>

        <!--选择支付方式-->
        <section class="paymentMethods">
            <div class="paymentMethodsTitle">选择支付方式</div>
            <!--微信支付-->
            <div class="weChat" @click="weChatPaymentAmount">
                <img src="../../assets/image/beautySalon/payment (3).png" />
                <label for="weChat">微信支付</label>
                <input type="radio" id="weChat" v-model="payType" value="3" name="payment" class="hidden-input" />
                <span :class=" isWeChatpayment ? 'isWeChatpayment' : 'addBorder' "></span>
            </div>
            <!--分割线-->
            <div class="partingline">
                <div></div>
            </div>
            <!--会员卡支付-->
            <div v-if="isMemberCard!='2'">
                <div class="member" @click.prevent="cardDiscountm(false)">
                <img src="../../assets/image/beautySalon/payment2 (3).png" />
                <label for="member">
                    <div>会员卡支付
                        <div class="recommend">推荐</div>
                    </div>
                    <div>享永久购物折扣</div>
                </label>

                <input type="radio" id="member" v-model="payType" value="2" name="payment" class="hidden-input" />
                <span :class="isMemberPayment ? 'isMemberPayment' : 'addBorder'"></span>
                  </div>
                <div class="memberCardType" @click="openMemberCardDialog">
                <div>{{defaultCard}}</div>
                <div>
                    <span>{{deductionMoney}}{{selectMemberCard.length===0?'':'折'}}</span>
                    <i class="arrow"></i>
                </div>
                 </div>
            </div>
            
        </section>

        <!--底部-->
        <footer>
            <div class="paymentContent disFlex">
                <span class="paymentTitle">待支付:</span>
                <span class="paymentSymbol">￥</span>
                <span class="paymentMoney">{{discountMoney == 0 ? "0.0" : discountMoney}}</span>
                <span class="paymentPreferential">
                    已优惠:
                    <span>￥</span>
                    {{amountReduce || '0'}}
                </span>
            </div>
            <div class="confirmPayment" @click="confirmPayment">确认支付</div>
        </footer>

        <!--弹出框-选择会员卡-->
        <div class="paymentMethods layer" :class="displayOrHide ? 'eventAble' : 'hide'">
            <div class="dialog">
                <h4>选择会员卡
                    <i @click="closeSelectCard"></i>
                </h4>
                <div class="weChat card" v-for="(item,index) in selectMemberCard" :key="index">
                    <!-- cardBlue  cardPink cardYellow -->
                    <img  v-lazyload="{shopImg:item.cardType.imageTwo,imgType:'member'}"/>
                    <label :for="'selectCard' + index" @click="selectCard(item,$event)">
                        <div class="surplus">
                            <div>{{item.cardName}}</div>
                            <div>
                                <span>余额：
                                    <i>￥</i>{{item.availableMoney}}
                                </span>
                            </div>
                        </div>
                    </label>
                    <input type="radio" :id="'selectCard' + index" name="paymentCard" class="hidden-input" />
                    <span class="addBorder"></span>
                </div>
            </div>
        </div>

        <!--待用户输入支付密码弹出框-->
        <Dialog v-if="dialog" :msg="dialogTxt.msg" :btn="dialogTxt.btn" :okBtn="dialogTxt.okBtn" :cancelBtn="dialogTxt.cancelBtn" @sure="sures" @cancel="cancels">
            <div slot="dialogHtml" class="payPassWord">
                支付密码:
                <input style="-webkit-appearance: none;" type='password' name='payPwd' @keyup.enter="sures" v-model="payPwd" placeholder=" 请输入支付密码" />
                <input style="display: none" />
                <!--阻止表单按回车提交-->
            </div>
        </Dialog>

        <!--会员卡余额不足弹出框-->
        <Dialog v-if="dialogM" :msg="dialogTxtM.msg" :btn="dialogTxtM.btn" :okBtn="dialogTxtM.okBtn" :cancelBtn="dialogTxtM.cancelBtn" :closeBtn="dialogTxtM.closeBtn" @sure="suresM" @cancel="cancelsM" @close="closeM">

            <div slot="dialogHtmlM" class="payPassWord">
            </div>
        </Dialog>

        <!--无会员卡弹出框-->
        <Dialog v-if="dialogW" :msg="dialogTxtW.msg" :btn="dialogTxtW.btn" :okBtn="dialogTxtW.okBtn" :cancelBtn="dialogTxtW.cancelBtn" :closeBtn="dialogTxtW.closeBtn" @sure="suresW" @cancel="cancelsW" @close="closeW">
            <div slot="dialogHtmlW" class="payPassWord">
            </div>
        </Dialog>

        <!--未设置支付密码-->
        <Dialog v-if="dialogT" :msg="dialogTxtT.msg" :btn="dialogTxtT.btn" :okBtn="dialogTxtT.okBtn" :cancelBtn="dialogTxtT.cancelBtn" @sure="suresT" @cancel="cancels">
        </Dialog>
    </div>
</template>
<script>
export default {
  data: function() {
    return {
      // 是否会员卡支付
      isMemberPayment: false,
      // 是否微信支付
      isWeChatpayment: false,
      // 会员卡折后价
      discountMoney: "",
      //订单id
      id: "",
      // 默认显示的会员卡name
      defaultCard: "您还没有会员卡",
      // 默认显示的会员卡的折扣
      deductionMoney: "",
      // 卡的余额
      availableMoney: "",
      // 选中的卡id
      cardId: "",
      // 是否显示弹窗
      displayOrHide: false,
      //选择会员卡数据
      selectMemberCard: [],
      // 订单编号
      orderNo: "",
      // 订单金额
      amountTotal: "",
      // 优惠额度
      amountReduce: "",
      // 支付类型
      payType: "",
      // 支付密码
      payPwd: "",
      // 微信数据
      weChatData: {},
      // 会员卡选择弹框
      dialog: false,
      // 会员支付密码弹框
      dialogTxt: {
        btn: "",
        okBtn: "",
        cancelBtn: "",
        msg: ""
      },
      // 未设置密码弹出框
      dialogT: false,
      dialogTxtT: {
        btn: "",
        okBtn: "去设置",
        cancelBtn: "取消",
        msg: "未设置支付密码，请先去账户与安全中去设置！"
      },
      // 余额不足弹出框
      dialogM: false,
      dialogTxtM: {
        btn: "",
        okBtn: "选择其他卡片",
        cancelBtn: "去充值",
        closeBtn: true, //显示关闭按钮
        msg: ""
      },
      // 无会员卡弹出框
      dialogW: false,
      dialogTxtW: {
        btn: "",
        okBtn: "查看门店",
        cancelBtn: "取消",
        closeBtn: false, //显示关闭按钮
        msg: "<b>您还没用会员卡</b><br/>去门店办理面子会员卡，购买服务享受永久折扣。"
      },
      // 判断支付方式  typechar(1) NULL订单类型 0.到店服务订单 1.上门服务订单 2.开卡 3:直接收钱 4:卡充值
      isMemberCard: "",
      cardTypeId: ""
    };
  },
  created() {
    this.amountTotal = this.$route.query.amountTotal; //订单金额
    this.discountMoney = this.$route.query.amountTotal; //折扣金额
    this.orderNo = this.$route.query.orderNo; //订单编号
    this.id = this.$route.query.id; //订单id
    this.cardTypeId = this.$route.query.cardTypeId || "";
    // 获取会员卡列表
    this.cardList();

    // 获取订单详情
    this.getOderDetail();
  },
  methods: {
    // 获取订单详情 http://amxqq.ittun.com/facebook/a/wapApi/orders/ordersDetails
    getOderDetail() {
      var url = this.fn.wyl + "orders/ordersDetails";
      var _this = this;
      this._ajax({
        url: url,
        method: "post",
        data: {
          id: this.id
        },
        callback(db) {
          var res = db.datas;
          _this.amountTotal = res.amountTotal;
          _this.discountMoney = res.amountTotal;
          _this.isMemberCard = res.type;
          // 如果是会员卡  默认选中微信支付
          if (_this.isMemberCard === "2") {
            _this.weChatPaymentAmount();
          }
        }
      });
    },

    /**************无会员卡弹出框**************/
    // 查看门店
    suresW() {
      this.$router.push({ path: "/beautySalon" });
    },
    // 关闭
    closeW() {
      this.dialogW = false;
    },
    // 取消
    cancelsW() {
      this.dialogW = false;
    },
    /***********余额不足弹出框***************/
    // 关闭弹框
    closeM() {
      this.dialogM = false;
    },
    // 选择其他卡片
    suresM() {
      this.dialogM = false; //关闭当前弹框
      this.displayOrHide = true; //弹出会员卡选择弹框
    },
    // 去充值
    cancelsM() {
      this.dialogM = false; //关闭当前弹框
      this.$router.push({ path: "/recharge" });
    },
    /***********未设会员卡支付密码弹出框***********/
    suresT() {
      this.dialogT = false;
      this.$router.push({ path: "/setPayPwd" });
    },
    // 关闭会员支付密码弹出框
    cancels() {
      this.payPwd = "";
      this.dialog = false;
    },
    // 调后台支付接口
    sures() {
      var _this = this;
      _this.dialog = false;
      var data = {
        orderNo: this.orderNo, //订单编号
        payType: _this.payType, //支付类型：1微信2卡	3微信（优化）
        cardId: _this.cardId, //卡id,payTpey选择2时必填参数
        callBackUrl:
          location.origin +
          location.pathname +
          (_this.isMemberCard != "2"
            ? "#/successPay?orderNo="
            : "#/SuccessPayBuyCard?orderNo=") +
          _this.orderNo +
          "&id=" +
          _this.id +
          "&cardTypeId=" +
          _this.cardTypeId, //支付成功或失败回调路径
        cancelUrl: location.origin + location.pathname + "#/orders?type=1", //取消支付回调路径（到待支付列表有页）
        cardPwd: _this.payPwd //支付密码
      };
      _this._ajax({
        url: _this.fn.wyl + "pay/wapPay",
        method: "post",
        data: data,
        callback(db) {
          // 清除会员卡支付密码
          _this.payPwd = "";

          // 会员卡支付
          if (data.payType == 2) {
            if (db.errorCode == 200) {
              _this.$router.push({
                path: "successPay",
                query: { orderNo: _this.orderNo, id: _this.id }
              });
            } else if (db.errorCode == 899) {
              //未设置会员卡支付密码
              _this.dialogT = true;
            } else {
              _this.fn.tip(db.msg, "12rem");
              // _this.dialog = true;
            }
          }

          // 微信支付
          if (data.payType == 1) {
            if (db.errorCode == 998) {
              //未授权
              location.href = db.datas;
            } else if (db.errorCode == 200) {
              //调起微信支付
              _this.weChatData = db.datas;
              _this.callpay();
            } else {
              _this.fn.tip(db.msg, "12rem");
            }
          }
          // 微信支付（优化）
          if (data.payType == 3) {
            if (db.errorCode == 200) {
              location.href = db.datas.payUrl;
            } else {
              _this.fn.tip(db.msg, "12rem");
              _this.$router.push({ path: "/orders", query: { type: 1 } }); //支付失败跳转到订单待支付列表
            }
          }
        }
      });
    },
    // 获取会员卡信息
    cardList() {
      var _this = this;
      _this._ajax({
        url: _this.fn.xqq + "card/cardList",
        method: "post",
        data: {},
        callback(db) {
          if (db.errorCode == 200) {
            _this.selectMemberCard = db.datas;
            // 默认显示的会员卡
            if (_this.selectMemberCard.length != 0) {
              _this.defaultCard = _this.selectMemberCard[0].cardName;
              _this.cardId = _this.selectMemberCard[0].id;
              _this.deductionMoney =
                _this.selectMemberCard[0].cardType.deductionMoney;
            }
          } else {
            _this.fn.tip(db.msg);
          }
        }
      });
    },
    // 打开会员选择弹窗
    openMemberCardDialog() {
      if (this.selectMemberCard.length == 0) {
        return;
      }
      this.displayOrHide = true;
    },
    // 选择会员卡
    selectCard(item, $event) {
      var _this = this;
      _this.payType = 2;
      _this.defaultCard = item.cardName;
      _this.deductionMoney = item.cardType.deductionMoney;
      _this.cardId = item.id;
      if (item) {
        setTimeout(function() {
          _this.displayOrHide = false;
        }, 200);
      }
      // 获取会员卡折后价
      _this.cardDiscountm(false);
    },
    // 关闭会员卡选择
    closeSelectCard() {
      this.displayOrHide = false;
    },
    // 去门店列表页
    gotoShopList() {
      this.$router.push({ path: "shopList" });
    },
    // 判断是否在微信中
    callpay() {
      var _this = this;
      if (typeof WeixinJSBridge == "undefined") {
        if (document.addEventListener) {
          document.addEventListener(
            "WeixinJSBridgeReady",
            _this.onBridgeReady,
            false
          );
        } else if (document.attachEvent) {
          document.attachEvent("WeixinJSBridgeReady", _this.onBridgeReady);
          document.attachEvent("onWeixinJSBridgeReady", _this.onBridgeReady);
        }
      } else {
        _this.onBridgeReady();
      }
    },
    // 调用微信支付接口
    onBridgeReady() {
      var _this = this;
      WeixinJSBridge.invoke(
        "getBrandWCPayRequest",
        {
          appId: _this.weChatData.appId,
          timeStamp: _this.weChatData.timeStamp,
          nonceStr: _this.weChatData.nonceStr,
          package: _this.weChatData.package,
          signType: _this.weChatData.signType,
          paySign: _this.weChatData.paySign
        },
        function(res) {
          // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回  ok，但并不保证它绝对可靠。
          //alert(res.err_msg);
          if (res.err_msg == "get_brand_wcpay_request:ok") {
            // alert("支付成功");
            _this.fn.tip("支付成功");
            _this.$router.push({
              path: "successPay",
              query: { orderNo: _this.orderNo, id: _this.id }
            }); //到支付成功页
          }
          if (res.err_msg == "get_brand_wcpay_request:cancel") {
            // alert("交易取消");
            _this.fn.tip("交易取消");
            _this.$router.push({ path: "orders", query: { type: 1 } }); //到订单页（待付款）
          }
          if (res.err_msg == "get_brand_wcpay_request:fail") {
            // alert("支付失败");
            _this.fn.tip("支付失败");
            _this.$router.push({ path: "orders", query: { type: 1 } }); //到订单页（待付款）
          }
        }
      );
    },
    // 点击确认支付
    confirmPayment() {
      var _this = this;
      if (_this.payType == "") {
        _this.fn.tip("请选择支付方式！");
        return;
      }
      if (_this.payType == 2 && _this.selectMemberCard.length == 0) {
        _this.dialogW = true;
        // _this.fn.tip("您还没有会员卡，请选择其他支付方式！", "15rem");
        return;
      }
      if (_this.payType == 2 && _this.selectMemberCard.length > 0) {
        //会员卡支付
        _this.cardDiscountm(true);
      }
      if (_this.payType == 1) {
        //微信支付
        _this.sures();
      }
      if (_this.payType == 3) {
        //微信支付
        _this.sures();
      }
    },
    // 获取折扣金额
    cardDiscountm(isGotoPayment) {
      var _this = this;
      _this.payType = 2; //会员卡支付
      _this.isWeChatpayment = false;
      _this.isMemberPayment = true;
      if (_this.cardId == "") {
        _this.dialogW = true;
        return;
        // _this.fn.tip("您还没有会员卡")
      }
      // debugger;
      _this._ajax({
        url: _this.fn.xqq + "orders/cardDiscountm",
        method: "post",
        data: {
          orderNo: _this.orderNo, //订单id
          cardId: _this.cardId //卡id
        },
        callback(db) {
          if (db.errorCode == 200) {
            console.log(db, "-----------");
            if (_this.payType == 2) {
              _this.discountMoney = db.datas.discountMoney;
            } else {
              _this.discountMoney = _this.amountTotal;
            }

            _this.amountReduce = db.datas.amountReduce; //优惠额度

            if (db.datas.ispay) {
              //会员卡可支付
              if (isGotoPayment) {
                _this.dialog = true;
              }
            } else {
              //余额不足
              _this.dialogTxtM.msg =
                "您当前的" +
                (db.datas.cardName || "会员卡") +
                "可用余额为：<span style='color:#f25d5d;'>" +
                db.datas.cardMoney +
                "</span>元," +
                "折扣后需支付<span style='color:#f25d5d;'>" +
                _this.discountMoney +
                "</span>元，现余额不足！";
              _this.dialogM = true;
            }
          } else {
            _this.fn.tip(db.msg);
          }
        }
      });
    },
    // 微信支付金额
    weChatPaymentAmount() {
      this.payType = 3; //微信支付
      this.isMemberPayment = false;
      this.isWeChatpayment = true;
      this.discountMoney = this.amountTotal;
      this.amountReduce = 0;
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../assets/css/common.scss";
.payment .payPassWord {
  border: 0.2rem;
  font-size: 0.8rem;
}

.payment .payPassWord input {
  margin-left: 0.4rem;
  border-radius: 0.2rem;
  height: 1.5rem;
  /*color:transparent;
    text-shadow:0 0 0 black;*/
}
.dialog {
  position: static !important;
}
.payment {
  /*position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;*/
  background: $theme-background-gray;
}

.payment header {
  height: 2rem;
  line-height: 2rem;
  background-color: $theme-blue;

  font-family: PingFangSC;
  font-size: 0.6rem;
  font-weight: 7.5rem;
  letter-spacing: 0.03rem;
  color: #ffffff;
}

.payment .orderAmount {
  display: flex;
  justify-content: space-between;
  height: 3rem;
  line-height: 3rem;
  background-color: #ffffff;
  padding-left: 0.725rem;
  padding-right: 0.725rem;
  font-family: PingFangSC;
  font-size: 0.75rem;
  font-weight: 7.5rem;
  letter-spacing: 0.03rem;
  color: $price-color;
}

.payment .orderAmount div:first-child {
  color: #333333;
}

.payment .paymentMethods {
  background-color: rgba(0, 0, 0, 0);
}

.payment .paymentMethods .dialog .weChat {
  position: relative;
}

.payment .paymentMethods .dialog .weChat span {
  position: absolute;
  right: 0px;
  top: 1rem;
}

.payment .paymentMethods .dialog .weChat label span {
  position: absolute;
  left: 6.5rem;
}

.payment .paymentMethods .dialog .weChat label span {
  position: static;
}

.payment .paymentMethods .dialog .weChat input[type="radio"]:checked + span {
  background-image: url("../../assets/image/beautySalon/payment1 (3).png");
  background-size: contain;
  border: none;
}

.payment .paymentMethods .paymentMethodsTitle {
  text-align: left;
  height: 3rem;
  line-height: 3rem;
  padding-left: 0.725rem;

  font-family: PingFangSC;
  font-size: 0.6rem;
  font-weight: 300;
  letter-spacing: 0.03rem;
  color: #999999;
}

.payment .paymentMethods .partingline {
  padding-left: 0.75rem;
  /*background: white;*/
  border: 0.4rem solid #f0f0f0;
}

/*.payment .paymentMethods .partingline div{
    height:0.025rem;
    border:none;
    border-top:0.025rem solid #e6e6e6;
}*/

.payment .paymentMethods .weChat,
.paymentMethods .member {
  text-align: left;
  height: 3rem;
  /*line-height: 3rem;*/
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  background: white;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.payment .paymentMethods.layer .weChat,
.paymentMethods.layer .member {
  padding-left: 0;
  padding-right: 0;
  margin-left: 0.75rem;
  margin-right: 0.75rem;
}

.paymentMethods .member {
  border-bottom: 0.025rem solid #e6e6e6;
}

.payment .paymentMethods .weChat img,
.paymentMethods .member img {
  width: 0.9rem;
  height: 0.825rem;
}

.payment .paymentMethods .weChat label,
.paymentMethods .member label {
  flex: 1;
  margin-left: 0.8rem;
}

.payment .paymentMethods .weChat.card label {
  height: 100%;
  // background-color: #cccccc;
  > div {
    height: 100%;
    > div {
      height: 50%;
      display: flex;
      align-items: center;
    }
  }
}

.paymentMethods .member label div:first-child .recommend {
  display: inline-block;
  border: 2px solid #08bae3;
  border-radius: 4px;
  position: relative;
  top: -0.3rem;
  color: #08bae3;
  padding: 0 5px;
  font-size: 12px;
  height: 20px;
  width: 38px;
}

.paymentMethods .member label div:last-child {
  font-size: 0.5rem;
}

.payment .paymentMethods .weChat .hidden-input,
.paymentMethods .member .hidden-input {
  opacity: 0;
  position: relative;
  left: 1rem;
  z-index: 10;
}

.payment .paymentMethods .weChat .hidden-input {
  display: none;
}

.payment .weChat input[type="radio"] + span {
  display: inline-block;
  height: 1rem;
  width: 1rem;
  border-radius: 1rem;
  /*border: 0.025rem solid gray;*/
}

.payment .paymentMethods .weChat .selectedCard {
  background-image: url("../../assets/image/beautySalon/payment1 (3).png");
  background-size: contain;
  border: none;
}

.payment .weChat .isMemberPayment {
  background-image: url("../../assets/image/beautySalon/payment1 (3).png");
  background-size: contain;
  border: none;
}

.payment .member input[type="radio"] + span {
  display: inline-block;
  height: 1rem;
  width: 1rem;
  border-radius: 1rem;
  /*border: 0.025rem solid gray;*/
}

.payment .addBorder {
  border: 0.025rem solid gray;
  pointer-events: none;
}

.payment .member .isMemberPayment,
.payment .weChat .isWeChatpayment {
  background-image: url("../../assets/image/beautySalon/payment1 (3).png");
  background-size: contain;
  border: none;
}

.payment .memberCardType {
  display: flex;
  justify-content: space-between;
  height: 2.5rem;
  line-height: 2.5rem;
  background: white;
  padding-left: 2.425rem;
  padding-right: 0.75rem;
  font-family: PingFangSC;
  font-size: 0.6rem;
  font-weight: 7.5rem;
  letter-spacing: 0.03rem;
  color: #666666;
}

.payment .memberCardType span {
  font-family: PingFangSC;
  font-size: 0.5rem;
  font-weight: 7.5rem;
  letter-spacing: 0.025rem;
  color: #999999;
}

.payment .memberCardType i {
  margin-bottom: 0.1rem;
  margin-left: 0.2rem;
}

.payment footer {
  position: fixed;
  bottom: 0px;
  left: 0px;
  right: 0px;
  height: 2.45rem;
  line-height: 2.45rem;
  background: #ffffff;
  display: flex;
}

.payment footer div {
  flex: 1;
}

.payment footer div:first-child {
  background: #ffffff;
  flex: 0 0 70.93333333333334%;
}

.payment footer .confirmPayment {
  background-color: $theme-blue;
  font-family: PingFangSC;
  font-size: 0.75rem;
  font-weight: 700;
  color: #ffffff;
}

.payment footer .paymentContent {
  text-align: left;
  padding-left: 0.5rem;
  font-family: PingFangSC;
  font-size: 0.7rem;
  font-weight: 500;
  color: #333333;
  width: 72%;
}

.payment footer .paymentContent .paymentSymbol {
  color: $price-color;
  font-weight: $font-weight;
}

.payment footer .paymentContent .paymentMoney {
  color: $price-color;
  font-weight: 800;
  padding-right: 0.3rem;
}

.payment footer .paymentContent .paymentPreferential {
  color: #999999;
  border-left: 1px solid #999999;
  padding-left: 0.6rem;
}

/*弹出框部分*/

.payment .layer {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.payment .layer .dialog {
  background: white;
  width: 15rem;
  border-radius: 0.25rem;
}

.payment .layer .dialog h4 {
  height: 2rem;
  line-height: 2rem;
  text-align: left;
  border-bottom: 0.025rem solid #c0c0c0;
  margin-left: 0.75rem;
  margin-right: 0.75rem;
}

.payment .layer .dialog h4 i {
  /*text-align: right;*/
  float: right;

  display: inline-block;
  color: #999;
  font-size: 1.2rem;
  width: 1.5rem;
  height: 2rem;
  background: url(../../assets/image/icon/close.png) no-repeat center center;
  background-size: 40%;
  margin-right: -0.4rem;
  margin-top: -0.1rem;
}

.payment .layer .weChat {
  // height: 2rem;
  border-bottom: 0.025rem solid #c0c0c0;
  margin-bottom: 0;
}

.payment .layer .dialog img {
  height: 1.5rem;
  width: 2rem;
}

.payment .hide {
  display: none;
}

/*页面禁止点击*/

.eventDisable {
  pointer-events: none;
}

/*页面可点击*/

.eventAble {
  pointer-events: auto;
}
</style>