<template>
  <div class="orders">
    <div class="classify disFlex">
      <!-- //订单状态 0:支付 1未支付 2退款 3:待服务 4:已完成 -->
      <div @click="changeNav('')" :class="ind === '' ? 'flexItem selected' : 'flexItem'">全部</div>
      <div @click="changeNav(1)" :class="ind === 1 ? 'flexItem selected' : 'flexItem'">待付款</div>
      <div @click="changeNav(0)" :class="ind === 0 ? 'flexItem selected' : 'flexItem'">待服务</div>
      <div @click="changeNav(4)" :class="ind === 4 ? 'flexItem selected' : 'flexItem'">已完成</div>
      <div @click="changeNav(2)" :class="ind === 2 ? 'flexItem selected' : 'flexItem'">退款/售后</div>
    </div>
    <ul class="ordersList">
      <li v-for="(item,index) in orderList" :key="index">
        <div class="itemTit">
          <i class="icon"></i>
          <span class="storeName">{{item.sysOfficeName}}</span>
          <!-- <i class="arrow"></i> -->
          <span class="lr status important">
            {{item. statusInfo}}
          </span>
        </div>
        <div @click="toOrderDetail(item)" class="itemInfo clear">
          <i class="itemImg " :class="{isCard:item.type!='0'}"><img :src="item.imgSrc" alt="">  <img class="logo2" v-if="item.type!='0'" src="../../assets/image/logo2.png" alt=""></i>
          <div class="detail">
            <p class="detailName">{{item.goodsName}}</p>
            <p class="detailPrice">{{item.status==='1'||item.status==='5'?"需付款":"已付款"}}：
              <span class="red"> ¥{{item.status==='1'||item.status==='5'?item.amountTotal:item.amountPay }}</span>
            </p>
          </div>
          <!-- <div class="payStatus">¥360</div> -->
        </div>
        <div class="handle">
          <span class="">
            <i @click="leftHandle(item)">{{item.left}}</i>
          </span>
          <span class="important">
            <i @click="rightHandle(item)">{{item.right}}</i>
          </span>
        </div>
      </li>

    </ul>
    <div style="height:1rem"></div>
    <div class="noOrder disFlex-center" v-if="orderList.length===0">
      暂无相关订单信息
    </div>
    <Footer select='3'></Footer>
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
  </div>
</template>

<script>
export default {
  name: "hello",
  data() {
    return {
      title: "订单",
      ind: "",
      isUp: false,
      orderList: [],
      orderState: "",
      memberId: "",
      currentPage: 1,
      pageNumber: "",
      status: "", //订单状态 0:支付 1未支付 2退款 3:待服务 4:已完成,
      isColorNum: "",
      Info: "",
      currentItem: "",
      isClick: false,
      dialogT: false,
      dialogTxtT: {
        btn: "",
        okBtn: "删除",
        cancelBtn: "取消",
        msg: "订单删除后将无法恢复，是否确定删除？"
      }
    };
  },
  components: {},

  created() {
    if (this.$route.query.type === undefined) {
      this.ind = "";
      this.status = this.ind;
    } else {
      this.ind =
        this.$route.query.type === "" ? "" : this.$route.query.type - 0;
      this.status = this.ind;
    }

    this.getOrderList();
    this.downScroll();
  },
  destroyed() {
    window.onscroll = null;
  },
  methods: {
    suresT() {
      // 确定删除
      this.dialogT = false;
      this.moveOrder(this.currentItem);
    },
    cancels() {
      // 取消删除
      this.dialogT = false;
    },
    // 切换订单
    changeNav(i) {
      this.isClick = false;
      this.ind = i;
      this.status = i;
      this.$router.push({ query: { type: i } });
      this.currentPage = 1;
      this.pageNumber = "";
      this.orderList = [];
      this.getOrderList();
    },
    toOrderDetail(item) {
      this.$router.push({ path: "orderDetail", query: { id: item.id } });
    },
    leftHandle(val) {
      this.currentItem = val;
      if (val.status === "2") {
        if (val.returnStatus === "2") {
          //退款成功 删除订单
          this.moveOrder(val);
        }
        if (val.returnStatus === "4" || val.returnStatus === "5") {
          // 联系客服
          this.callPhone(val);
        }
      } else {
        if (val.status === "0" || val.status === "3") {
          //预约服务时间
          this.callPhone(val);
        }
        if (val.status === "1") {
          //   取消订单
          this.isColorNum = "";
          this.abolishOrder(val);
        }
        if (val.status === "4" || val.status === "6" || val.status === "5") {
          //  删除订单
          // this.moveOrder(val)
          this.dialogT = true;
        }
      }
    },
    rightHandle(val) {
      // 申请退款  取消退款  支付    再次购买
      if (val.status === "2") {
        // 退款成功  再次购买
        if (val.returnStatus === "2") {
          this.$router.push({
            path: "storeDetail",
            query: { serverId: val.goodsId }
          });
        }
        //  取消退款
        if (val.returnStatus === "4") {
          this.offreimburse(val);
        }
        // 退款失败 取消退款
        if (val.returnStatus === "5") {
          this.offreimburse(val);
        }
      } else {
        if (val.status === "0" || val.status === "3") {
          this.toReimburse(val);
          // 申请退款
        }
        if (val.status === "1") {
          //   去支付
          this.toPayment(val);
        }
        // 再次购买
        if (val.status === "4" || val.status === "6" || val.status === "5") {
          if (val.status === "4" && val.type === "2") {
            // 单独处理会员卡
            this.callPhone(val);
            return;
          }

          if (val.status === "4" && val.type === "5") {
            // 单独处理疗程卡
            this.$router.push({
              path: "/beautySalon"
            });
            return;
          }
          
          if (val.type === "2") {
            this.$router.push({
              path: "cardDetail",
              query: { id: val.goodsId }
            });
            return;
          }
          this.$router.push({
            path: "storeDetail",
            query: { serverId: val.goodsId }
          });
        }
      }
    },
    // 去支付
    toPayment(item) {
      this.$router.push({
        path: "payment",
        query: {
          orderNo: item.orderNo,
          amountTotal: item.amountTotal,
          id: item.id
        }
      });
    },
    // 取消订单
    abolishOrder(params) {
      this.isUp = true;
      this.currentItem = params;
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
          orderNo: this.currentItem.orderNo,
          cancelReason: this.Info
        },
        callback(db) {
          if (db.errorCode === "200") {
            _this.fn.tip("取消成功");
            _this.currentPage = 1;
            _this.pageNumber = "";
            _this.orderList = [];
            _this.getOrderList();
          }
        }
      });
    },
    callPhone(params) {
      var a = document.createElement("a");
      a.href = "tel:" + params.sysOfficePhone;
      a.click();
    },
    // 去退款
    toReimburse(params) {
      this.$router.push({
        path: "reimburse",
        query: { orderNo: params.orderNo }
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
            _this.currentPage = 1;
            _this.pageNumber = "";
            _this.orderList = [];
            _this.getOrderList();
          }
        }
      });
    },
    // 取消退款
    offreimburse(params) {
      var url = this.fn.wyl + "orders/cancelApplyRefund";
      var _this = this;
      this._ajax({
        url: url,
        method: "post",
        data: {
          orderNo: params.orderNo
        },
        callback(db) {
          if (db.errorCode === "200") {
            _this.fn.tip("取消成功");
            _this.currentPage = 1;
            _this.pageNumber = "";
            _this.orderList = [];
            _this.getOrderList();
          }
        }
      });
    },
    getOrderList() {
      var _this = this;
      this._ajax({
        url: this.fn.wyl + "orders/getOrderList",
        method: "post",
        data: {
          pageNo: this.currentPage,
          pageSize: 10,
          status: this.status
        },
        callback(db) {
          if (db.errorCode === "200") {
            _this.isClick = true;
            _this.currentPage += 1;
            _this.pageNumber = Math.ceil(db.datas.count / db.datas.pageSize);
            _this.orderList = _this.orderList.concat(db.datas.list);

            _this.orderList.forEach(function(val, index) {
              // 处理图片
              if (val.goodImages != null) {
                if (val.goodImages.indexOf("|") == -1) {
                  val.imgSrc = val.goodImages;
                } else {
                  val.imgSrc = val.goodImages.split("|")[0];
                }
              } else {
                val.imgSrc = "";
              }

              if (val.status === "2") {
                if (val.returnStatus === "2") {
                  val.statusInfo = "退款成功";
                  val.left = "删除订单";
                  val.right = "再次购买";
                }
                if (val.returnStatus === "4") {
                  val.statusInfo = "待退款";
                  val.left = "联系客服";
                  val.right = "取消退款";
                }
                if (val.returnStatus === "5") {
                  val.statusInfo = "退款失败";
                  val.left = "联系客服";
                  val.right = "取消退款";
                }
              } else {
                if (val.status === "0" || val.status === "3") {
                  val.statusInfo = "待服务";
                  val.left = "预约服务时间";
                  val.right = "申请退款";
                }
                if (val.status === "1") {
                  val.statusInfo = "待支付";
                  val.left = "取消订单";
                  val.right = "去支付";
                }
                if (val.status === "4") {
                  val.statusInfo = "已完成";
                  val.left = "删除订单";
                  val.right = "再次购买";
                  // 单独处理会员卡
                  if (val.type === "2") {
                    val.right = "联系客服";
                  }
                  // 单独处理疗程卡
                  if (val.type === "5") {
                    val.right = "选择门店";
                  }
                }
                if (val.status === "6") {
                  val.statusInfo = "已取消";
                  val.left = "删除订单";
                  val.right = "再次购买";
                }
                if (val.status === "5") {
                  val.statusInfo = "已取消";
                  val.left = "删除订单";
                  val.right = "再次购买";
                }
              }
            });
          }
        }
      });
    },
    // 下拉公洞
    downScroll() {
      window.onscroll = this.foo;
    },
    backTop() {
      document.documentElement.scrollTop = document.body.scrollTop = 0;
    },
    foo() {
      if (!this.isClick) {
        return;
      }
      var _this = this;
      // 浏览器 窗口高度
      var windowHeight = document.documentElement.clientHeight
        ? document.documentElement.clientHeight
        : document.body.clientHeight;

      if (_this.getScrollTop() + windowHeight >= _this.getScrollHeight()) {
        if (_this.pageNumber < _this.currentPage && _this.pageNumber != "") {
          _this.fn.tip("没有订单啦亲");
        } else {
          _this.getOrderList();
        }
      }
    },
    //滚动条在Y轴上的滚动距离
    getScrollTop() {
      var scrollTop = 0,
        bodyScrollTop = 0,
        documentScrollTop = 0;
      if (document.body) {
        bodyScrollTop = document.body.scrollTop;
      }
      if (document.documentElement) {
        documentScrollTop = document.documentElement.scrollTop;
      }
      scrollTop =
        bodyScrollTop - documentScrollTop > 0
          ? bodyScrollTop
          : documentScrollTop;
      return scrollTop;
    },
    //文档的总高度
    getScrollHeight() {
      var scrollHeight = 0,
        bodyScrollHeight = 0,
        documentScrollHeight = 0;
      if (document.body) {
        bodyScrollHeight = document.body.scrollHeight;
      }
      if (document.documentElement) {
        documentScrollHeight = document.documentElement.scrollHeight;
      }
      scrollHeight =
        bodyScrollHeight - documentScrollHeight > 0
          ? bodyScrollHeight
          : documentScrollHeight;
      return scrollHeight;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../assets/css/orders/index.scss";
</style>
