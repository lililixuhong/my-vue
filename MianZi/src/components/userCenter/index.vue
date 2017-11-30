<template>
  <div class="userCenter">
    <div class="top">
      <div class="handle">
        <!-- <router-link to="/test" style="font-size: .6rem;">test</router-link> -->
        <!-- <router-link to="/login/loginin" style="font-size: .6rem;">点击登录</router-link> -->
        <!-- <router-link to="/chat" class="msg"><i></i></router-link> -->
        <router-link to="/set" class="set"></router-link>
      </div>
      <div class="info">
        <div class="headImg"><img :src="info.headImg" alt=""></div>
        <div class="name">
           <div>{{info.nickname}}</div>
           <div class="identity" v-if="isExperience"> <i class="icon"></i> 首席体验馆</div>
        </div>
        <div class="vip">
          <router-link to="/activateCards">会员卡激活
            <i class="arrow"></i>
          </router-link>
        </div>
      </div>
    </div>
    <div class="amTopM">
      <router-link :to="{path:'orders',query:{type:''}}" class="title">我的订单
        <span class="allOrders">全部订单
          <i class="arrow"></i>
        </span>
      </router-link>
      <div class="statusList clear">
        <router-link :to="{path:'orders',query:{type:1}}">
          <i class="pay">
            <div class="message" v-if="orderNum.unpaidSum">{{orderNum.unpaidSum}}</div></i> 
          </i>
          <p>待付款</p>
        </router-link>
        <router-link :to="{path:'orders',query:{type:0}}">
          <i class="server">   <div class="message" v-if="orderNum.forServiceSum">{{orderNum.forServiceSum}}</div></i>
          <p>待服务</p>
        </router-link>
        <router-link :to="{path:'orders',query:{type:4}}">
          <i class="finish"></i>
          <p>已完成</p>
        </router-link>
        <router-link :to="{path:'orders',query:{type:2}}">
          <i class="refund"> <div class="message" v-if="orderNum.refundSum">{{orderNum.refundSum}}</div></i>   
          <p>退款</p>
        </router-link>
      </div>
    </div>
    <div class="amMidM">
      <ul>
        <li>
          <router-link to="/mycards">我的卡包
            <i class="arrow lr"></i>
          </router-link>
        </li>
        <li>
          <router-link to="/recharge">会员卡充值
            <i class="arrow lr"></i>
          </router-link>
        </li>
        <li>
          <router-link to="/set">个人信息
            <i class="arrow lr"></i>
          </router-link>
        </li>
        <li>
          <router-link to="/account">账户与安全
            <i class="arrow lr"></i>
          </router-link>
        </li>
      </ul>
    </div>
    <Footer select='4'></Footer>
  </div>
</template>

<script>
export default {
  name: "hello",
  data() {
    return {
      title: this.$route.name,
      headImg: "",
      nickname: "",
      info: "",
      isExperience:false,
      orderNum:""
    };
  },
  components: {},
  mounted() {
    var self = this;
    self._ajax({
      url: self.fn.wyl + "member/getMemberInfo",
      data: {},
      method: "post",
      callback(db) {
        if (db.errorCode == 200) {
          self.info = db.datas.member;
          self.isExperience = db.datas.experience;
          self.orderNum = db.datas.ordersStatistics;
        } else {
          self.fn.tip(db.msg);
        }
      }
    });
    this.headImg = decodeURIComponent(this.fn.getcookie("headImg"));
    this.nickname = unescape(this.fn.getcookie("nickname"));
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../assets/css/userCenter/index.scss";

.userCenter .top .info {
  display: flex;
  .name {
    line-height: normal;
    display: inline-flex;
    flex-direction: column ;
    justify-content: center;
    .identity{
      font-size: 0.6rem;
      display: inline-flex;
      align-items: center;
      .icon{
        display: inline-block;
        width: 0.7rem;
        height: 0.65rem;
        margin-right: 0.2rem;
        background: url(../../assets/image/diamond.png) no-repeat center center;
        background-size: 100% 100%;
      }
    }
  }
}

.statusList {
  i {
    position: relative;
  }
  .message {
    position: absolute;
    width: 0.75rem;
    height: 0.75rem;
    background-color: red;
    border-radius: 50%;
    top: -0.3rem;
    right: -0.25rem;
    font-size: 0.45rem;
    color: #fff;
    line-height: 0.75rem;
    text-align: center;
    font-weight: 600;
  }
}
</style>
