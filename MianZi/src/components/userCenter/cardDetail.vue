<template>
    <div class="mycards">
            <div class="cardDetail">
                  <!-- <img class="cardInfo" v-lazyload="{shopImg:info.imageOne,imgType:'member'}"> -->
                <img class="cardInfo" :src="info.imageOne" alt="">
                <div class="nameInfo">
                    <img class="backgroundImg" src="../../assets/image/logo2.png" alt="">
                    <div class="nameImg">
                        <span>{{info.cardName}}</span> 
                        <!-- <img class="erweimaImg"  src="../../assets/image/erweima.png" alt=""> -->
                    </div>
                    <div class="cardCode">{{info.cardNumber}}</div>
                    <div class="zhe">{{info.deductionMoney}}折</div>
                </div>
            </div>
        <div class="transactionDetails">
            <p>交易明细
                <span>余额：{{info.availableMoney}}元</span>
            </p>
            <div id="content">
                <ul class="detailList" v-if="orderList.length">
                    <li v-for="(item, index) in orderList" :key="index">
                        <div class="nameTime">
                            <p class="name">{{item.remarks}}{{item.goodsName!=null?'—'+item.goodsName:""}}</p>
                            <p class="time">{{item.payTime}}</p>
                        </div>
                        <span class="money">{{item.amountPay}}</span>
                    </li>
                </ul>
                <div v-else class="nodata" style="top: 50%;">暂无交易信息</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "hello",
  data() {
    return {
      id: "",
      info: { },
      pageNo: 1,
      pageSize: 10,
      orderList: [],
      hasmore: true
    };
  },
  components: {},
  mounted() {
    var self = this;
    self._ajax({
      url: self.fn.wyl + "card/cardDetail",
      method: "post",
      data: {
        id: self.$route.params.id
      },
      callback(db) {
        if (db.errorCode == 200) {
          self.info = db.datas;

          let el = document.getElementById("content");
          let nDivHight = el.offsetHeight;
          el.onscroll = () => {
            let nScrollHight = el.scrollHeight;
            let nScrollTop = el.scrollTop;
            if (nScrollTop + nDivHight >= nScrollHight) {
              if (self.hasmore) {
                self.pageNo++;
                self.getList();
              } else {
                self.fn.tip("没有更多数据了！");
              }
            }
          };

          self.getList();
        } else {
          self.fn.tip(db.msg);
        }
      }
    });
  },
  methods: {
    getList() {
      var self = this;
      self._ajax({
        url: self.fn.wyl + "card/transactList",
        method: "post",
        data: {
          id: self.$route.params.id,
          pageNo: self.pageNo,
          pageSize: self.pageSize
        },
        callback(db) {
          if (db.errorCode == 200) {
            self.orderList = db.datas.list.length
              ? self.orderList.concat(db.datas.list)
              : "";
            self.hasmore =
              self.pageNo < Math.ceil(db.datas.count / self.pageSize)
                ? true
                : false;
          } else {
            self.fn.tip(db.msg);
          }
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../assets/css/userCenter/index.scss";

.transactionDetails {
  margin-top: 0.75rem;
}
.cardDetail {
  position: relative;
  // padding-bottom: 0.75rem;
  .cardInfo {
    border-radius: 0.3rem;
    vertical-align: middle;
  }
  .nameInfo {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    padding-left: 1rem;
    color: #fff;
    text-align: left;
    .nameImg {
      font-size: 1.25rem;
      font-weight: 300;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-right: 1.5rem;
      padding-top: 2rem;
    }
    .cardCode {
      padding-top: 0.75rem;
      text-align: left;
    }
    .zhe {
      // 这里用定位是为了解决苹果手机的不兼容 显示
      position: absolute;
      bottom: 0.5rem;
      text-align: right;
      right: 1rem;
    }
    > img.backgroundImg {
      margin-top: 1rem;
      width: 2.85rem;
      height: 0.6rem;
    }
    .erweimaImg {
      width: 1.4rem;
      height: 1.4rem;
      vertical-align: middle;
    }
  }
}
</style>
