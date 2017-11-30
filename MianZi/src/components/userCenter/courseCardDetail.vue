<template>
<div>
  <div class="card">
    <div class="cardImg">
      <div class="photo">  
        <div class="carImgInfo"> 
          <!-- <img  v-lazyload="{shopImg:cardData.imageOne,imgType:'member'}"  alt=""> -->
            <img  v-if="cardData.isValid||cardData.surplusDay===0" :src="cardData.imageOne" alt="">
              <img class="cardInfo" v-if="!cardData.isValid||!cardData.surplusDay===0" src="../../assets/image/courseDefault.png" alt="">
       <div class="cardNumber" v-if="!cardData.isValid||!cardData.surplusDay===0">{{cardData.isValid?"次数不足":"卡已过期"}}</div>
        </div>
       <div class="cardInfo">
         <div class="cardName"><span>{{cardData.courseName}}</span></div>
         <div class="price"><span>sadf{{cardData.courseNumber}}</span></div>
         <div class="discount"  v-if="cardData.isValid||cardData.surplusDay===0" >次数：{{cardData.amount}}次/有效期：{{cardData.surplusDay}}天</div>
       </div>
       <img class="logo2" src="../../assets/image/logo2.png" alt="">
      </div>
    </div>
  </div>

  <div class="cardInfoDate">
      <div>
          <span>开卡日期</span>
           <span>{{cardData.createTime|fromatDate('yyyy-MM-dd')}}</span>
      </div>
      <div>
          <span>剩余次数</span>
           <span>{{cardData.validSum}}</span>
      </div>
       <div>
          <span>使用范围</span>
           <span>面子全国连锁店</span>
      </div>
  </div>
  <div class="runningWater">
      <h3>消费流水</h3>
      <div v-if="cardList.length>0" class="itemList">
        <div class="item" v-for="(item,index) in cardList" :key="index">
          <div>
              <span>消费 - {{item.courseGoodsName}}</span>
              <span>{{item.createTime}}</span>
          </div>
          <div>1次</div>
        </div>
      </div>
      <div v-else class="none">暂无记录</div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      cardData: "",
      cardList: []
    };
  },
  created() {
    this.getCardDetails();
  },
  methods: {
    getCardDetails() {
      var _this = this;
      this._ajax({
        url: this.fn.xqq + "course/getCourseRecord",
        method: "post",
        data: {
          courseCardId: this.$route.query.id,
          pageSize: -1
        },
        callback(db) {
          if (db.errorCode === "200") {
            _this.cardData = db.datas.courseMember;
            _this.cardList = db.datas.recordList.list;
          } else {
            _this.fn.tip("服务器繁忙");
          }
        }
      });
    }
  }
};
</script>
<style scoped lang="scss">
@import "~@/assets/css/util";
.card {
  background-color: #fff;
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
        .cardNumber {
          position: absolute;
          right: 1rem;
          bottom: 0.75rem;
          @include wh(124,40);
          @include sc(24, #c2c5cc);
          background-color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
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
.cardInfoDate {
  display: flex;
  padding: px2rem(40) 0;
  background-color: #fff;
  > div {
    flex: 1;
    display: flex;
    flex-direction: column;
    span {
      padding: px2rem(15) 0;
      @include sc(24,#333);
    }
    span:nth-child(1) {
      @include sc(24,#8c8c8c);
    }
    &:nth-child(2) {
      border-right: 1px solid #ececec;
      border-left: 1px solid #ececec;
      span:nth-child(2) {
        @include sc(32,#08bae3);
      }
    }
  }
}
.runningWater {
  margin-top: 0.75rem;
  background-color: #fff;
  > h3 {
    height: px2rem(80);
    @include sc(28,#292929);
    display: flex;
    align-items: center;
    text-align: left;
    border-bottom: 1px solid #e2e2e2;
    padding-left: 0.75rem;
  }
  .itemList {
    padding: 0 0.75rem;
    > .item {
      height: px2rem(140);
      display: flex;
      justify-content: space-between;
      align-items: center;
      > div:nth-child(1) {
        display: flex;
        flex-direction: column;
        text-align: left;
        span {
          line-height: 2;
        }
        span:nth-child(1) {
          @include sc(30,#333);
        }
        span:nth-child(2) {
          @include sc(24,#666);
        }
      }
      > div:nth-child(2) {
        @include sc(24,#333);
      }
    }
  }
  .none {
    padding: 1rem;
  }
}
</style>
