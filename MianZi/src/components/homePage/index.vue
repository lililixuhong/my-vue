<template>
  <div class="homePage">

    <div class="content">
      <!-- Swiper start -->
      <div class="banner">
        <swipe :style="styleObj">
          <swipe-item>
            <img style="width: 100%; max-width: 800px" src="../../assets/image/icon/homepage/banner1.jpg" alt="" />
          </swipe-item>
          <swipe-item>
            <img style="width: 100%; max-width: 800px" src="../../assets/image/icon/homepage/banner2.jpg" alt="" />
          </swipe-item>
          <swipe-item>
            <img style="width: 100%; max-width: 800px" src="../../assets/image/icon/homepage/banner3.jpg" alt="" />
          </swipe-item>
        </swipe>
      </div>

      <!-- Swiper end -->
      <!-- nav start -->
      <div class="index-nav">
        <div v-for="(item,index) in navList" class="flexItem" @click="toServer(item,index)" :key="index">
          <img :src="require('../../assets/image/home/nav'+index+'.png')" :alt="item.name">
          <p>{{item.name}}</p>
        </div>
      </div>
      <!-- nav end -->
      <!-- 新版面子公告 -->
      <div class="bannerNews">
         <img src="../../assets/image/home/bannerNews.jpg" alt="">
      </div>
      <div class="message">
        <div class="productImg disFlex">
          <div class="left">
            <router-link :to="{path:'storeDetail',query:{serverId:'ae498991437340a6840c5ceac53fad55'}}">
            <img src="../../assets/image/home/message0.jpg" alt="">
            </router-link>
          </div>
          <div class="right">
            <div class="top">
              <router-link :to="{path:'storeDetail',query:{serverId:'1abee8c4472340e6bf43357397e29d4b'}}">
             <img src="../../assets/image/home/message1.jpg" alt="">
            </router-link>
            </div>
            <div class="bottom">
                <router-link :to="{path:'storeDetail',query:{serverId:'06f16d53860a4c5da20fcffc82cb7368'}}">
             <img src="../../assets/image/home/message2.jpg" alt="">
            </router-link>
            </div>
          </div>
        </div>
      </div>

      <!--美肤推荐-->
      <div class="skinBeauty">
        <h2 class="">
          美肤推荐
        </h2>
        <ul class="product">
          <li v-for="(item,index) in skinBeautyList" :key="index">
            <div class="left" @click="toDetails(item)">
              <div>
                <!-- v-lazyload="item.imgUrl" -->
                <img v-lazyload="{shopImg:item.imgSrc,imgType:'service'}" alt="">
              </div>
            </div>
            <div class="right">
              <p class="oneLineHidden">
                {{item.name}}
              </p>
              <div class="divPrice">
                <span class="left">￥{{item.price}}</span>
                <span class="right">已售：
                  <i>{{item.saleNum}}</i>件</span>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div class="member">
        <div class="title">
         <div @click="toCard(1)"> <span>会员卡</span>  <i class="arrow"></i></div>
        </div>
        <div class="memberImg">
            <slide :cardType="cardType1" :styleObj="styleInit" :pages="pageList" v-if="isShowSlide">
            </slide>
        </div>
      </div>

    </div>
    <Dialog v-if="dialog" :msg="dialogTxt.msg" :btn="dialogTxt.btn" :okBtn="dialogTxt.okBtn" :cancelBtn="dialogTxt.cancelBtn" @sure="sures" @cancel="cancels">
      <div slot="dialogHtml">
        数量
        <input type='text' name='dialogTxt'>
        <br> 方式
        <input type='password' name='dialogType'>
        <br> 这里是内容
      </div>
    </Dialog>

    <Footer :select='1'></Footer>
    <div v-if="isTop" class="back" @click="backTop"><img src="../../assets/image/home/backTop.png" alt=""></div>

    <div class="member">
        <div class="title">
         <div @click="toCard(2)"> <span>疗程卡</span>  <i class="arrow"></i></div>
        </div>
        <div class="memberImg memberImg2">
            <slide :cardType="cardType2" :styleObj="styleInit" :pages="pageListTwo" v-if="isPageListTwo">
            </slide>
        </div>
    </div>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from "vue-swipe";

export default {
  name: "hello",
  data() {
    return {
      title: "",
      dialogTxt: {
        btn: "",
        okBtn: "",
        cancelBtn: "",
        msg: ""
      },
      skinBeautyList: [],
      navList: [],
      dialog: false,
      styleObj: {
        height:
          (window.innerWidth > 800 ? 800 : window.innerWidth) * 0.48 + "px"
      },
      isTop: false,
      styleInit: {
        width: "11.5rem",
        height: "6rem",
        marginLeft: "0.5rem",
        borderRadius: "0.2rem"
      },
      pageList: [],
      isShowSlide: false,
      cardType1: {
        nodeName: "memberImg",
        cardName: "会员卡"
      },
      pageListTwo: [],
      isPageListTwo: false,
      cardType2: {
        nodeName: "memberImg2",
        cardName: "疗程卡"
      }
    };
  },
  components: {
    Swipe,
    SwipeItem
  },

  created() {
    this.title = this.$route.name;
    this.getShopList();
    this.getNavList();
    this.getCard();
    this.getCardTwo();
  },
  mounted() {
    this.fn.getLatitude();
    this.top();
  },
  methods: {
    top() {
      var _this = this;
      window.onscroll = function() {
        var scrolltop =
          document.documentElement.scrollTop || document.body.scrollTop;
        if (scrolltop > 500) {
          _this.isTop = true;
        } else {
          _this.isTop = false;
        }
      };
    },
    backTop() {
      document.documentElement.scrollTop = document.body.scrollTop = 0;
    },
    onSlideChangeStart(currentPage) {},
    onSlideChangeEnd(currentPage) {},
    loadFn() {
      this.dialog = true;
      this.dialogTxt = {
        okBtn: "发布",
        msg: "",
        okBtn: "发布",
        cancelBtn: "取消"
      };
    },
    sures(data) {
      this.dialog = false;
    },
    cancels() {
      this.dialog = false;
    },
    //  跳转到服务详情页面
    toDetails(item) {
      this.$router.push({
        path: "storeDetail",
        query: { serverId: item.id, shopType: 0 }
      });
    },
    // 去服务列表
    toServer(item, index) {
      this.$router.push({
        path: "product",
        query: { id: item.id, index: index, shopType: 0 }
      });
    },
    getNavList() {
      var _this = this;
      this._ajax({
        url: this.fn.wyl + "server/serverTypeList",
        method: "post",
        data: {},
        callback(db) {
          if (db.errorCode === "200") {
            _this.navList = db.datas;
          } else {
            _this.fn.tip("服务器繁忙");
          }
        }
      });
    },
    getShopList() {
      var _this = this;
      this._ajax({
        url: this.fn.wyl + "server/recommendList",
        method: "post",
        data: {},
        callback(db) {
          if (db.errorCode === "200") {
            var data = db.datas;
            data.forEach(function(val, index) {
              if (val.images != null) {
                if (val.images.indexOf("|") == -1) {
                  val.imgSrc = val.images;
                } else {
                  val.imgSrc = val.images.split("|")[0];
                }
              } else {
                val.imgSrc = "";
              }
            });
            _this.skinBeautyList = data;
          } else {
            _this.fn.tip("服务器繁忙");
          }
        }
      });
    },
    // 会员卡数据
    getCard() {
      var _this = this;
      this._ajax({
        url: this.fn.xqq + "card/getCardTypeList",
        method: "post",
        data: {
          type: "1"
        },
        callback(db) {
          if (db.errorCode === "200") {
            var data = db.datas;
            _this.pageList = data.list;
            _this.isShowSlide = true;
          } else {
            _this.fn.tip("服务器繁忙");
          }
        }
      });
    },
    // 去会员卡
    toCard(num) {
      this.$router.push({
        path: "product",
        query: { shopType: num }
      });
    },
    getCardTwo() {
      var _this = this;
      this._ajax({
        url: this.fn.xqq + "course/courseList",
        method: "post",
        data: {
          type: "1",
          pageSize: -1
        },
        callback(db) {
          if (db.errorCode === "200") {
            var data = db.datas.list;
            console.log(data);
            _this.pageListTwo = data;
            _this.isPageListTwo = true;
          } else {
            _this.fn.tip("服务器繁忙");
          }
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../assets/css/vue-swipe.css";
@import "../../assets/css/homepage/index.scss";
.index-nav {
  .flexItem {
    margin: 1rem 0;
    p {
      padding-top: 0.4rem;
    }
  }
  .flexItem:nth-child(1) {
    margin-bottom: 0;
  }
  .flexItem:nth-child(2) {
    margin-bottom: 0;
  }
  .flexItem:nth-child(3) {
    margin-bottom: 0;
  }
  .flexItem:nth-child(4) {
    margin-bottom: 0;
  }
}

.homePage {
  padding-top: 0;
}

.message {
  background-color: #fff;
  border-bottom: 1px solid #e2e2e2;
  .tit {
    position: relative;
    padding: 0.375rem 0;
    img {
      vertical-align: top;
      width: 100%;
      height: 1.2rem;
    }
    p {
      position: absolute;
      font-family: PingFangSC;
      font-size: 0.55rem;
      letter-spacing: 1px;
      color: #08bae3;
      top: 0;
      left: 4.975rem;
      height: 2rem;
      line-height: 2rem;
    }
  }
  .productImg {
    height: 11rem;
    img {
      vertical-align: middle;
      width: 100%;
      height: 100%;
    }
    .left {
      width: 50%;
      height: 11rem;
    }
    .right {
      width: 50%;
      height: 11rem;
      border-left: 1px solid #e2e2e2;
      .top {
        height: 5.5rem;
      }
      .bottom {
        height: 5.5rem;
        border-top: 1px solid #e2e2e2;
      }
    }
  }
}

.bannerNews {
  img {
    height: 6rem;
    vertical-align: top;
  }
}

.skinBeauty {
  h2 {
    font-size: 0.85rem;
    font-weight: 700;
    color: #282828;
    letter-spacing: 2px;
    line-height: 3rem;
    text-align: center;
    font-family: MicrosoftYaHei;
    height: 3rem;
  }
}

.homePage .content .skinBeauty ul.product {
  background-color: #fff;
  display: flex;
  flex-wrap: wrap;
  > li {
    width: 50%;
    padding-bottom: 1.2rem;
    .left {
      > div {
        width: 100%;
        height: 6.65rem;
        img {
          height: 100%;
          width: 100%;
        }
      }
    }
    .right {
      text-align: left;
      padding-right: 0.2rem;
      p {
        width: 7.4rem;
        margin: 0.5rem 0;
        margin-bottom: 0.1rem;
        white-space: normal;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
      .divPrice {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 1rem;
      }
      span {
        display: inline-block;
        height: 100%;
        display: flex;
        align-items: center;
      }
      span.left {
        font-family: PingFangSC;
        font-size: 0.75rem;
        letter-spacing: 1px;
        color: #f25d5d;
      }
      span.right {
        font-family: PingFangSC;
        font-size: 0.6rem;
        letter-spacing: 1px;
        color: #999999;
        i {
          color: #f25d5d;
        }
      }
    }
  }
  > li:nth-child(even) {
    padding-left: 1%;
  }
  > li:nth-child(odd) {
    padding-right: 1%;
  }
}

.back {
  position: fixed;
  bottom: 4rem;
  right: 0.7rem;
  z-index: 100;
  img {
    width: 2rem;
    height: 2rem;
  }
}
.member {
  background-color: #fff;
  border-top: 1px solid #eee;
  .title {
    display: flex;
    height: 2.875rem;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    font-weight: 600;
    vertical-align: middle;
  }
  .memberImg {
    padding-left: 0.5rem;
  }
}
</style>
