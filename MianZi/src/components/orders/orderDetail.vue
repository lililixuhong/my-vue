<template>
    <div class="ordersDetail">
        <div class="topblue">
            <div class="orderState">{{orderData.orderState}}</div>
            <div class="orderCode">
                <span>订单编号</span>：{{orderData.orderNo}}
            </div>
        </div>
        <div class="orderContent">
            <div class="leftImg " :class="{isCard:orderData.type!='0'}">
              <img :src="orderData.imgSrc" alt="">
               <img  v-if="orderData.type!='0'" class="logo2"   src="../../assets/image/logo2.png" alt=""></div>
            <div class="content">
                <p class="name">{{orderData.goodsName}} </p>
                <p class="describe"></p>
                <p class="price">¥{{orderData.goodPrice}}</p>
            </div>
            <span @click="tobuy">
                <i class="arrow"></i>
                <!-- <router-link :to="{ path: 'storeDetail', query: { serverId: orderData.goodsId } }">
                </router-link> -->
            </span>
        </div>
        <div class="shopsInfo" v-if="orderData.type!='2'">
            <p class="title">商家信息</p>
            <p class="cont">{{orderData.sysOfficeName}}
            </p>
            <p class="ress" @click="toBaiduMap(orderData.address)">
                <i class="ressImg"></i>
                {{orderData.address}}
            </p>
            <div class="phone">
                <div class="disFlex-center">
                    <a :href="`tel:${orderData.sysOfficePhone}`"> <img src="../../assets/image/order/phone.png" alt=""></a>
                </div>
            </div>
        </div>
        <div class="code disFlex-center" v-if="status==='0'">
            <span @click="getCode">查看二维码</span>
        </div>
        <div class="dialogCode" v-if="dialog">
            <div class="codeImg">
                <span @click="dialog = false">X</span>
                <qrcode :value="qrcode" v-if="qrcode" :options="{ size: 170 }"></qrcode>
            </div>
        </div>
        <div class="mask" v-if="dialog"></div>
        <div class="orderInfo">
            <div class="tit">订单信息</div>
            <p>订单号：
                <span>{{orderData.orderNo}}</span>
            </p>
            <p>购买手机号：
                <span>{{orderData.addressPhone}}</span>
            </p>
            <p>下单时间：
                <span>{{orderData.addTime}}</span>
            </p>
            <p>数量：
                <span>{{orderData.nums}}</span>
            </p>
            <p>总价：￥
                <span>{{orderData.amountTotal}}</span>
            </p>
            <p v-if="orderData.payType==='3'">
                优惠：￥
                <span>{{orderData.discount}}</span>
            </p>
            <p>实付：￥
                <span>{{orderData.amountPay}}</span>
            </p>
            <p>支付方式：
                <span>
                    {{orderData.payType==="5"?"现金":""}} {{orderData.payType==="4"?"POS":""}} {{orderData.payType==="3"?"会员卡":""}} {{orderData.payType==="2"?"支付宝":""}} {{orderData.payType==="1"?"微信":""}}
                </span>
            </p>
        </div>
        <div class="moneyBack" v-if="status==='2'">
            <div class="tit">退款明细</div>
            <p>退款原因：
                <span>
                    {{orderData.returnReason}}
                </span>
            </p>
            <p>退款时间：
                <span>
                    {{orderData.returnTime}}
                </span>
            </p>
            <div class="success" v-if="returnStatus==='2'">
                <p> 卖家已同意退款，退款成功</p>
                <p> 退款金额：￥{{orderData.amountPay}}</p>
                <p>退款金额已原路退换到支付账户，到账时间按照银行到账时间为准（约需1-3个工作日）</p>
            </div>
            <div class="errer" v-if="returnStatus==='5'">
                <p>卖家拒绝退款，请联系卖家咨询！</p>
                <p>{{orderData.toExamine}}</p>
                <div class="btn">
                    <a :href="`tel:${orderData.sysOfficePhone}`">联系客服处理</a>
                </div>
            </div>
        </div>

        <div class="operate">
            <span @click="leftHandle" class="left disFlex-center">{{orderData.left}}</span>
            <span @click="rightHandle" class="right disFlex-center">{{orderData.right}}</span>
        </div>
        <div class="bottomInfo" :class="{down:isUp}">
            <div class="title">
                <span @click="offOrder">确定</span>
                <i @click="isUp = false">取消</i>
            </div>
            <p @click="toggleInfo(1,'我不想买了')" :class="{isColor:isColorNum===1}">我不想买了 <img v-if="isColorNum===1" src="../../assets/image/icon/homepage/tick.png" alt=""></p>
            <p @click="toggleInfo(2,'信息填写错误，重新拍 ')" :class="{isColor:isColorNum===2}">信息填写错误，重新拍 <img v-if="isColorNum===2" src="../../assets/image/icon/homepage/tick.png" alt=""></p>
            <p @click="toggleInfo(3,'卖家缺货')" :class="{isColor:isColorNum===3}">卖家缺货 <img v-if="isColorNum===3" src="../../assets/image/icon/homepage/tick.png" alt=""></p>
            <p @click="toggleInfo(4,'同城见面交易')" :class="{isColor:isColorNum===4}">同城见面交易 <img v-if="isColorNum===4" src="../../assets/image/icon/homepage/tick.png" alt=""></p>
            <p @click="toggleInfo(5,'其他原因')" :class="{isColor:isColorNum===5}">其他原因 <img v-if="isColorNum===5" src="../../assets/image/icon/homepage/tick.png" alt=""></p>
        </div>
        <Dialog v-if="dialogT" :msg="dialogTxtT.msg" :btn="dialogTxtT.btn" :okBtn="dialogTxtT.okBtn" :cancelBtn="dialogTxtT.cancelBtn" @sure="suresT" @cancel="cancels">
        </Dialog>
        <div style="height:10rem;width:100%"></div>
    </div>
</template>

<script>
import Qrcode from "vue-qrcode";
export default {
  name: "hello",
  data() {
    return {
      title: "订单详情",
      orderId: "",
      orderState: "",
      orderCode: "hdsfhkj290138902804932",
      currlo: "",
      currla: "",
      id: "",
      orderData: "",
      status: "", //订单状态 0:支付 1未支付 2退款 3:待服务 4:已完成,  //退换货，0表示无申请，1退换货,2以退 3充值 4待退 5不通过
      dialog: false,
      num: "",
      qrcode: "",
      returnStatus: "",
      isUp: false,
      isColorNum: "",
      info: "",
      dialogT: false,
      dialogTxtT: {
        btn: "",
        okBtn: "删除",
        cancelBtn: "取消",
        msg: "订单删除后将无法恢复，是否确定删除？"
      }
    };
  },
  components: {
    qrcode: Qrcode
  },
  created() {
    this.id = this.$route.query.id;
    this.getShop();
  },
  methods: {
    // 到百度地图
    toBaiduMap(address) {
      window.location.href =
        "https://map.baidu.com/mobile/webapp/search/search/qt=s&wd=" +
        address +
        "/vt=map&ecom=0";
    },
    // 单独请求二维码数据
    getCode() {
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
          if (db.errorCode === "200") {
            if (res.status === "0" || res.status === "3") {
              _this.qrcode = `key=${res.key};orderId=${res.id}`;
            }
            _this.dialog = true;
          }
        }
      });
    },
    suresT() {
      // 确定删除
      this.dialogT = false;
      this.moveOrder(this.orderData);
    },
    cancels() {
      // 取消删除
      this.dialogT = false;
    },
    changeNav(i) {
      this.ind = i;
    },
    leftHandle() {
      if (this.orderData.status === "2") {
        if (this.orderData.returnStatus === "2") {
          // 删除订单
          // this.moveOrder(this.orderData)
          this.dialogT = true;
        }
        if (
          this.orderData.returnStatus === "5" ||
          this.orderData.returnStatus === "4"
        ) {
          // 联系客服
          this.callPhone();
        }
      } else {
        if (this.orderData.status === "0" || this.orderData.status === "3") {
          // 预约服务时间
          this.callPhone();
        }
        if (this.orderData.status === "1") {
          //"取消订单";
          this.abolishOrder();
        }
        if (
          this.orderData.status === "4" ||
          this.orderData.status === "5" ||
          this.orderData.status === "6"
        ) {
          // res.left = "删除订单";
          // this.moveOrder(this.orderData)
          this.dialogT = true;
        }
      }
    },
    rightHandle() {
      if (this.orderData.status === "2") {
        if (this.orderData.returnStatus === "2") {
          // 再次购买
          this.$router.push({
            path: "storeDetail",
            query: { serverId: this.orderData.goodsId }
          });
        }
        if (
          this.orderData.returnStatus === "5" ||
          this.orderData.returnStatus === "4"
        ) {
          // 取消退款
          this.offreimburse();
        }
      } else {
        if (this.orderData.status === "0" || this.orderData.status === "3") {
          // 申请退款
          this.toReimburse();
        }
        if (this.orderData.status === "1") {
          //去支付
          this.toPayment();
        }
        if (
          this.orderData.status === "4" ||
          this.orderData.status === "5" ||
          this.orderData.status === "6"
        ) {
          if (this.orderData.status === "4") {
            // 这里是单独处理会员卡的打电话
            if (this.orderData.type === "2") {
              this.callPhone();
              return;
            }
            if(this.orderData.type==='5'){
              this.$router.push({path:"/beautySalon"})
              return
            }
          }
          if (this.orderData.type === "2") {
            this.$router.push({
              path: "cardDetail",
              query: { id: this.orderData.goodsId }
            });
            return;
          }

          //再次购买
          this.$router.push({
            path: "storeDetail",
            query: { serverId: this.orderData.goodsId }
          });
        }
      }
    },
    // 联系客服 或者预约服务时间
    callPhone() {
      var a = document.createElement("a");
      a.href = "tel:" + this.orderData.sysOfficePhone;
      a.click();
    },
    // 取消退款
    offreimburse() {
      var url = this.fn.wyl + "orders/cancelApplyRefund";
      var _this = this;
      this._ajax({
        url: url,
        method: "post",
        data: {
          orderNo: this.orderData.orderNo
        },
        callback(db) {
          if (db.errorCode === "200") {
            _this.fn.tip("取消成功");
            _this.$router.push({
              path: "orders",
              query: { type: _this.orderData.status }
            });
          }
        }
      });
    },
    // 删除订单
    moveOrder(params) {
      var url = this.fn.wyl + "orders/delOrders";
      var _this = this;
      this._ajax({
        url: url,
        method: "post",
        data: {
          orderNo: params.orderNo
        },
        callback(db) {
          if (db.errorCode === "200") {
            _this.fn.tip("删除成功");
            _this.$router.push({ path: "orders", query: { type: "" } });
          }
        }
      });
    },
    // 去支付
    toPayment() {
      this.$router.push({
        path: "payment",
        query: {
          orderNo: this.orderData.orderNo,
          amountTotal: this.orderData.amountTotal
        }
      });
    },
    // 取消订单
    abolishOrder() {
      this.isUp = true;
    },
    toggleInfo(num, str) {
      this.isColorNum = num;
      this.Info = str;
    },
    //订单取消的ajax
    offOrder() {
      this.isUp = false;
      var url = this.fn.wyl + "orders/cancelOrders";
      var _this = this;
      this._ajax({
        url: url,
        method: "post",
        data: {
          orderNo: this.orderData.orderNo,
          cancelReason: this.Info
        },
        callback(db) {
          if (db.errorCode === "200") {
            _this.fn.tip("取消成功");
            _this.$router.push({
              path: "orders",
              query: { type: _this.orderData.status }
            });
          }
        }
      });
    },
    // 去退款
    toReimburse() {
      this.$router.push({
        path: "reimburse",
        query: { orderNo: this.orderData.orderNo }
      });
    },
    // 得到订单商品详情
    getShop() {
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
          // 处理图片
          if (res.goodImages != null) {
            if (res.goodImages.indexOf("|") == -1) {
              res.imgSrc = res.goodImages;
            } else {
              res.imgSrc = res.goodImages.split("|")[0];
            }
          } else {
            res.imgSrc = "";
          }

          if (db.errorCode === "200") {
            _this.status = res.status;

            if (res.status === "2") {
              _this.returnStatus = res.returnStatus;
              if (res.returnStatus === "2") {
                res.orderState = "退款成功";
                res.left = "删除订单";
                res.right = "再次购买";
              }
              if (res.returnStatus === "4") {
                res.orderState = "待退款";
                res.left = "联系客服";
                res.right = "取消退款";
              }
              if (res.returnStatus === "5") {
                res.orderState = "退款失败";
                res.left = "联系客服";
                res.right = "取消退款";
              }
            } else {
              if (res.status === "0" || res.status === "3") {
                res.orderState = "待服务";
                res.left = "预约服务时间";
                res.right = "申请退款";
              }
              if (res.status === "1") {
                res.orderState = "待支付";
                res.left = "取消订单";
                res.right = "去支付";
              }
              if (res.status === "4" || res.status === "6") {
                res.orderState = "已完成";
                res.left = "删除订单";
                res.right = "再次购买";
                // 这里是单独处理会员卡的状态
                if (res.type === "2") {
                  res.right = "联系客服";
                }
                 // 这里是单独处理疗程卡的状态
                if (res.type === "5") {
                  res.right = "选择门店";
                }
              }
              if (res.status === "5") {
                res.orderState = "已取消";
                res.left = "删除订单";
                res.right = "再次购买";
              }
            }
          }

          _this.orderData = res;
        }
      });
    },
    // 跳转到页面详情
    tobuy() {
      // 不同的商品更跳转不同的商品详情页面
      if (this.orderData.type != "2") {
        this.$router.push({
          path: "storeDetail",
          query: { serverId: this.orderData.goodsId }
        });
      } else {
        this.$router.push({
          path: "cardDetail",
          query: { id: this.orderData.goodsId }
        });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../assets/css/orders/orderDetail.scss";
.code {
  background-color: #fff;
  height: 2rem;
  margin-top: 0.5rem;
}

.mask {
  position: fixed;
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 10;
  background-color: #000;
  opacity: 0.5;
}

.dialogCode {
  position: fixed;
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  .codeImg {
    position: relative;
    background-color: #8c8c8c;
    width: 9rem;
    height: 9rem;
    opacity: 1;
    border: 0.25rem solid #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    > span {
      position: fixed;
      z-index: 200;
      left: 0;
      right: 0;
      top: 12rem;
      bottom: 0;
      margin: auto;
      width: 1.2rem;
      height: 1.2rem;
      border: 1px solid #ccc;
      border-radius: 0.75rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}

.bottomInfo {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  transform: translateY(100%);
  transition: transform 0.3s;
  &.down {
    transform: translateY(0%);
  }
  .title {
    text-align: right;
    background-color: #f2f2f2;
    height: 1.5rem;
    line-height: 1.5rem;
    span {
      padding-right: 0.5rem;
    }
    i {
      margin-right: 0.5rem;
      padding: 0 0.5rem;
    }
  }
  > p {
    height: 1.5rem;
    line-height: 1.5rem;
    border-bottom: 1px solid #e6e6e6;
    position: relative;
    img {
      width: 0.625rem;
      height: 0.5rem;
      position: absolute;
      top: 0.5rem;
      right: 1rem;
    }
  }
  p.isColor {
    color: #11abcf;
  }
}
</style>
