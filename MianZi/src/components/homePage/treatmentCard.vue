<template>
<div>
  <!-- <div class="tit"> <i  class="arrow"   @click="$router.go(-1)"></i> <div class="name">{{cardData.cardName}} </div></div> -->
  <div class="card">
    <div class="cardImg">
      <div class="photo">  
        <div class="carImgInfo"> 
          <!-- <img  v-lazyload="{shopImg:cardData.imageOne,imgType:'member'}"  alt=""> -->
            <img  :src="cardData.imageOne" alt="">
        </div>
       <div class="cardInfo">
         <div class="cardName"><span>{{cardData.name}}</span></div>
         <div class="price"><span>￥{{cardData.sellingPrice}}</span></div>
         <div class="discount"> 次数：{{cardData.amount}}次/有效期：{{cardData.validDay}}天</div>
       </div>
       <img class="logo2" src="../../assets/image/logo2.png" alt="">
      </div>
      <div class="equity">会员卡权益</div>
    </div>
  </div>
  <div class="serviceList">
      <div class="serviceItem" v-for="(item,index) in courseGoodsList" :key="index">
          <div class="serviceImg">
            <img :src="item.imgSrc" alt="">
          </div>
           <div class="serviceName">
               <span class="name">{{item.goodsName}} </span>
               <span class="number">共{{item.amount}}次</span>
           </div>
            <div class="lookService"> <router-link :to="{ path: '/storeDetail',query:{serverId:item.goodsId}}"> <span>查看服务 <i class="arrow"></i> </span></router-link></div>
      </div>
  </div>
  <!-- <div class="service">
    <div class="service_1">
       <span class="cardlogo"></span>
      <div>
        <div class="service_2">全店通用</div>
        <div class="service_3">{{cardData.deductionMoney}}折</div>
      </div>
    </div>
    <div>
      <router-link :to="{ path: '/product',query:{shopType:0}}"> <span>查看服务 <i class="arrow"></i> </span></router-link>
    </div>
  </div> -->
  <div class="buy" >
    <div @click="toBuy" class="buyBtn">立即购买{{cardData.initMoney}}</div>
  </div>
</div>
  
</template>

<script>
export default {
  data() {
    return {
      cardData: "",
      courseGoodsList: ""
    };
  },
  created() {
    this.getCardDetails();
  },
  methods: {
    getCardDetails() {
      var _this = this;
      this._ajax({
        url: this.fn.xqq + "course/courseById",
        method: "post",
        data: {
          courseCardId: this.$route.query.id
        },
        callback(db) {
          if (db.errorCode === "200") {
            _this.cardData = db.datas.courseCard;
            _this.courseGoodsList = db.datas.courseGoodsList;
            _this.courseGoodsList.forEach(function(val, index) {
              if (val.goodImages != null) {
                if (val.goodImages.indexOf("|") == -1) {
                  val.imgSrc = val.goodImages;
                } else {
                  val.imgSrc = val.goodImages.split("|")[0];
                }
              } else {
                val.imgSrc = "";
              }
            });

            console.log(_this.courseGoodsList)
          } else {
            _this.fn.tip("服务器繁忙");
          }
        }
      });
    },
    toBuy() {
      this.$router.push({
        path: "/subCourse",
        query: { id: this.$route.query.id }
      });
    }
  }
};
</script>
<style scoped lang="scss">
@import "~@/assets/css/util";
.serviceList {
  @include bc($fc);
  .serviceItem {
    display: flex;
    align-items: center;
    margin-left: 0.75rem;
    border-bottom: 1px solid #eee;
    padding: 0.5rem 0;
    position: relative;
    .serviceImg {
      @include wh(230,160);
      img {
        border-radius: 0.2rem;
      }
    }
    .serviceName {
      padding-left: 0.75rem;
      text-align: left;
      display: flex;
      flex-direction: column;
      .name {
        @include sc(30);
        font-weight: 500;
        letter-spacing: 2px;
      }
      .number {
        @include sc(24,#08bae3);
        margin-top: 0.5rem;
      }
    }
    .lookService {
      position: absolute;
      right: 0.75rem;
    }
  }
}
.tit {
  height: 2.5rem;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  .arrow {
    transform: rotate(225deg);
    position: absolute;
    top: 1rem;
    left: 0.75rem;
    width: 0.6rem;
    height: 0.6rem;
    border-right: 0.08rem solid #000;
    border-top: 0.08rem solid #000;
  }
  .name {
    font-size: 0.9rem;
    font-weight: 500;
  }
}
.card {
  background-color: #fff;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  .cardImg {
    display: flex;
    flex-direction: column;
    padding: 0.75rem;
    .photo {
      position: relative;
      .carImgInfo {
        width: 17.25rem;
        height: 9rem;
        img {
          border-radius: 0.5rem;
        }
      }
      .logo2 {
        position: absolute;
        width: 2.85rem;
        height: 0.6rem;
        top: 1rem;
        left: 1rem;
      }
      .cardInfo {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        color: #fff;
        text-align: left;
        .cardName {
          margin-top: 3rem;
          padding: 0 1.25rem;
          font-size: 1.8rem;
          font-weight: 300;
        }
        .price {
          padding: 0.5rem 1.25rem;
        }
        .discount {
          padding: 0 1.25rem;

          font-weight: 400;
          font-size: 0.65rem;
          text-align: right;
        }
      }
    }
    .equity {
      padding: 1rem 0;
      padding-bottom: 0.5rem;
      font-size: 0.8rem;
      color: #000;
    }
  }
}
.service {
  padding: 0 1rem;
  height: 3rem;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  .service_1 {
    display: flex;
    align-items: center;
  }
  .service_2 {
    font-size: 0.7rem;
    font-weight: 400;
  }
  .service_3 {
    font-size: 0.5rem;
    font-weight: 400;
    color: #08acd0;
    text-align: left;
  }
  .cardlogo {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    background: url("../../assets/image/icon/cardlogo.png") no-repeat center
      center;
    background-size: 100% 100%;
    margin-right: 1rem;
  }
}
.buy {
  background-color: #fdfdfd;
  height: 17rem;
  .buyBtn {
    height: 2.2rem;
    width: 16rem;
    margin: 0 1.375rem;
    background-color: #08acd0;
    border-radius: 1.1rem;
    position: fixed;
    bottom: 1.5rem;
    left: 0;
    z-index: 10000;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.8rem;
  }
}
</style>
