<template>
  <div>
         <div class="numberCard">
          <div v-for="(item,index) in cardList" :key="index" @click="toCardDetails(item)">
            <div class="imgInfo">
               <img    v-lazyload="{shopImg:item.imageOne,imgType:'member'}">
               <div class="cardInfo">
                 <div class="cardName">{{item.name}} </div>
                 <div class="cardPrice">￥{{item.sellingPrice}}</div>
                 <div class="zhe">{{item.amount}}次</div>
               </div>
            </div>
          </div>
        </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 促销卡列表
      cardList: [],
      // 促销卡页数 和当前页
      cardPageNumber: "",
      cardCurrentPage: 1,
      isFirst: false
    };
  },
  methods: {
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
    },
    // 促销卡下拉公洞
    cardScrooll() {
      var _this = this;
      window.onscroll = function() {
        //   判断是不是第一次加载
        if (!_this.isFirst) {
          return false;
        }
        // 浏览器 窗口高度
        var windowHeight = document.documentElement.clientHeight
          ? document.documentElement.clientHeight
          : document.body.clientHeight;
        if (_this.getScrollTop() + windowHeight == _this.getScrollHeight()) {
          if (
            _this.cardPageNumber < _this.cardCurrentPage &&
            _this.cardPageNumber != ""
          ) {
            _this.fn.tip("没有卡啦亲");
          } else {
            _this.getCard();
          }
        }
      };
    },
    getCard() {
      var _this = this;
      this._ajax({
        url: this.fn.xqq + "course/courseList",
        method: "post",
        data: {
          pageNo: this.cardCurrentPage,
          pageSize: 20,
          type: "0"
        },
        callback(db) {
          if (db.errorCode === "200") {
            if (!_this.isFirst) {
              _this.isFirst = true;
            }
            var data = db.datas;
            _this.cardCurrentPage += 1;
            _this.cardPageNumber = Math.ceil(data.count / data.pageSize);
            _this.cardList = _this.cardList.concat(data.list);
          } else {
            _this.fn.tip("服务器繁忙");
          }
        }
      });
    },
    toCardDetails(item) {
      this.$router.push({
        path: "/treatmentCard",
        query: {
          id: item.id
        }
      });
    }
  },
  destroyed() {
    this.onscroll = null;
  },
  mounted() {
    this.cardScrooll();
  },
  created() {
    this.getCard();
  }
};
</script>
<style scoped lang="scss">
@import "~@/assets/css/util";
.numberCard {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0.5rem 0.5rem;
  background-color: #fff;
  > div {
    width: 50%;
    padding: 0.25rem;
    > div.imgInfo {
      height: 4.35rem;
      width: 100%;
      position: relative;
      .cardInfo {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        color: #fff;
        padding: 0 0.5rem;
        .cardName {
          font-size: 0.7rem;
          padding-top: 1rem;
          font-weight: 600;
        }
        .cardPrice {
          padding-top: 0.3rem;
        }
        .zhe {
          text-align: right;
          font-size: 0.5rem;
        }
      }
      > img {
        border-radius: 0.2rem;
        vertical-align: middle;
      }
    }
  }
}
</style>

