<template>
  <div class="page">  
    <div class="container"    :style="{width:100*(pages.length||1)+'%'}">
      <div class="item"  @click="clickDt(item)" v-for="(item,index) in pages" :key='index'>
        <img   :style="styleObj"  v-lazyload="{shopImg:item.imageOne,imgType:'member'}">
        <div class="infoPage" v-if="cardType.cardName==='会员卡'">
            <p class="name"><img src="../../assets/image/logo2.png" alt=""></p>
            <p class="money">{{item.cardName}}</p>
            <div class="discount">
              <p class="price">￥{{item.initMoney}}</p>
              <p class="zhe">{{item.deductionMoney}}折</p>
            </div>
        </div>
        <div class="infoPage" v-if="cardType.cardName==='疗程卡'">
            <p class="name"><img src="../../assets/image/logo2.png" alt=""></p>
            <p class="money">{{item.name}}</p>
            <div class="discount">
              <p class="price">￥{{item.sellingPrice}}</p>
              <p class="zhe">{{item.amount}}次</p>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
export default {
  // props: {
  //   pages: {
  //     type: Array,
  //     default() {
  //       return [];
  //     }
  //   },
  //   styleObj: {
  //     type: Object,
  //     default() {
  //       return { width: "10rem", height: "6rem", marginLeft: "1rem" };
  //     }
  //   }
  // },
  props: ["pages", "styleObj", "cardType"],
  data() {
    return {
      currentPage: 0,
      msg: ""
    };
  },
  created() {},
  mounted() {
    this.initPage();
  },
  methods: {
    initPage() {
      var _this = this;
      var elNode = document.querySelector("." + this.cardType.nodeName);
      var el = elNode.querySelector(".container");
      var obj = elNode.querySelector(".item");
      var style;
      if (window.getComputedStyle) {
        style = window.getComputedStyle(obj, null); // 非IE
      } else {
        style = obj.currentStyle; // IE
      }
      var startX, moveEndX, X, distanceX;
      el.addEventListener(
        "touchstart",
        function(e) {
          startX = e.changedTouches[0].pageX;
        },
        false
      );
      el.addEventListener(
        "touchmove",
        function(e) {
          // distanceX = e.changedTouches[0].pageX - startX;
          // console.log(distanceX)
          // if (distanceX > 0) {
          //   el.style.transform = "translateX(" + distanceX + "px)";
          // }
          // if (distanceX < 0) {
          //   el.style.transform = "translateX(" + distanceX + "px)";
          // }
          // console.log(startX,e.changedTouches[0].pageX, "-9-09-09-09");
        },
        false
      );
      el.addEventListener(
        "touchend",
        function(e) {
          moveEndX = e.changedTouches[0].pageX;
          X = moveEndX - startX;
          if (X > 0) {
            console.log("left 2 right");
            if (_this.currentPage <= 0) {
              console.log("过节了");
              return;
            } else {
              _this.currentPage--;
              el.style.transform =
                "translateX(-" +
                parseInt(style.width) * _this.currentPage +
                "px)";
            }
          } else if (X < 0) {
            // console.log("right 2 left");
            if (_this.currentPage >= _this.pages.length - 1) {
              console.log("过节了");
              return;
            } else {
              _this.currentPage++;
              console.log(_this.currentPage);
              el.style.transform =
                "translateX(-" +
                parseInt(style.width) * _this.currentPage +
                "px)";
            }
          } else {
            console.log("just touch");
          }
        },
        false
      );
    },
    clickDt(item) {
      if (this.cardType.cardName === "会员卡") {
        this.$router.push({ path: "/cardDetail", query: { id: item.id } });
      }
      if (this.cardType.cardName === "疗程卡") {
        //treatmentCard
         this.$router.push({ path: "/treatmentCard", query: { id: item.id } });
        console.log('去疗程卡详情页面')
      }
    }
  }
};
</script>

<style scoped lang="scss">
.page {
  width: 100%;
  overflow: hidden;
}
img {
  vertical-align: middle;
}
.container {
  display: flex;
  flex-direction: row;
  transition: transform 0.3s;
  .item {
    position: relative;
    .infoPage {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      color: #fff;
      text-align: left;
      padding-left: 0.5rem;
      p.name {
        height: 2rem;
        position: relative;
        > img {
          width: 2.4rem;
          height: 0.6rem;
          position: absolute;
          top: 0.6rem;
          left: 0.6rem;
        }
      }
      p.money {
        height: 1rem;
        line-height: 1rem;
        font-size: 1.2rem;
        padding-left: 1rem;
        font-weight: 300;
      }
      div.discount {
        padding-left: 1rem;
        padding-top: 0.45rem;
        .price {
          text-align: left;
        }
        .zhe {
          text-align: right;
          padding-right: 1rem;
        }
      }
    }
  }
}
</style>