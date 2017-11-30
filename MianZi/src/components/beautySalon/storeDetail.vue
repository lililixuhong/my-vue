<!--服务详情页-->

<template>
  <div class="storeDetail">
    <div class="header scrolled" v-if="scrolled">
      <div class="left lf">
        <span @click="$router.push('/')"><i class="arrow"></i></span>
      </div>
      <h1>{{title}}</h1>
       <div class="right lr">
         <!--<i class="attened"></i>-->
         <!--<i class="share"></i>-->
      </div> 
    </div>
    <div class="header">
      <div class="left lf">
        <span @click="$router.push('/')"><i class="arrow"></i></span>
      </div>
       <div class="right lr" @click="downMenu">
      </div> 
    </div>
    <!--下拉菜单-->
    <div class="layer" @click="hideDownMenu" :class="isHide ? 'hide' : ''">
      <div class="downMenu">
        <div class="triangle"></div>
        <ul>
          <!--<li>
            <a href="../index.html">
              <img src="../../assets/image/beautySalon/storeDetail2 (3).png" class="message"></img>
              <span>消息</span>
              <sup><i></i></sup>
            </a>
          </li>-->
          <li>
            <a href="#/">
              <img src="../../assets/image/beautySalon/storeDetail3 (3).png" class="home"></img>
              <span>首页</span>
              <sup></sup>
            </a>
          </li>
          <li>
            <a href="#/orders">
              <img src="../../assets/image/beautySalon/storeDetail4 (3).png" class="cart"></img>
              <span>订单</span>
              <sup></sup>
            </a>
          </li>
          <li>
            <a href="#/UserCenter">
              <img src="../../assets/image/beautySalon/storeDetail5 (3).png" class="my"></img>
              <span>我的</span>
              <sup></sup>
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div class="content">
      <!-- Swiper start -->
      <div class="banner">
        <swipe :style="styleObj" :speed="500" :auto="2000">
            <swipe-item v-for="(item,index) in imageArr" :key="index">
                <img style="width: 100%; max-width: 800px" :src="item" alt=""/>
            </swipe-item>
            <!--<swipe-item>
                <img style="width: 100%; max-width: 800px" :src="item" alt=""/>
            </swipe-item>-->
        </swipe>
      </div>
      <div class="severInfo clear">
        <div class="lf namePrice">
          <p class="severName">{{getServerData.name}}</p>
          <div class="severPrice"><em>¥{{getServerData.price}}</em><del>¥{{getServerData.marketPrice}}</del><i></i><span>{{getServerData.totalTime}}分钟</span></div>
        </div>
        <div class="lr share" @click="WeChatShare">
          <!--<i class="attenbtn"></i>-->
          <!--<i class="sharebtn"></i>-->
        </div>
      </div>
      <!--<div class="ticket" @click="ticket">
        <em>领券</em>
        <span>满268减50</span>
        <span>满268减50</span>
        <span>满268减50</span>
        <i class="eclip"></i>
      </div>-->
      <!-- 服务介绍 -->
      <div class="severIntro">
        <div class="introTit">服务介绍</div>
        <div class="IntroContent" :class="introduction ? 'introduction' :''">{{getServerData.remarks}}
        </div>
        <!--<div class="lookall" @click="lookall"><i :class="introduction ? 'arrow' : 'uparrow'" ></i></div>-->
      </div>
      <!--<div class="promise" @click="promise">
        <span>迟到升级</span>
        <span>爽约赔偿</span>
        <span>8天修补</span>
        <span>爽约赔偿</span>
        <i class="arrow"></i>
      </div>-->


      <!--购买须知-->
      <!--<div class="severIntro  notice">
        <div class="introTit">购买须知</div>
        <p><span>使用时段：</span><span>14:00-22:00</span></p>
        <p><span>有效期：</span><span>14:00-22:00</span>至<span>14:00-22:00</span></p>
      </div>-->

      <!-- 服务内容 -->
      <div class="severContent">
        <div class="introTit">服务流程（{{getServerData.flowList.length}}）</div>
        <div class="severList clear">
          <div class="severItem" v-for="(item,index) in getServerData.flowList" :key="index">
            <img :src="item.imagePath" alt="">
            <p>{{item.processName}}</p>
            <p class="timer">{{item.duration}}分钟</p>
          </div>
          <div class="severItem">
          </div>
        </div>
      </div>
      <!-- 项目说明 -->
      <div class="severIntro object">
        <div class="introTit">项目说明</div>
        <div class="IntroContent">
          <p><b>适用人群：</b>{{getServerData.serviceGroups | intendedFor}}</p>
          <p><b>适用部位：</b>{{getServerData.goodPlace}}</p>
          <p><b>项目功效：</b>{{getServerData.goodEfficacy}}</p>
          <p><b>注意事项：</b>{{getServerData.considerations}}</p>
        </div>
      </div>
      <div class="severGates" style="height:1rem;width:100%">
      </div>
      <!-- 服务门店 -->
      <!--<div class="severGates">-->
        <!--<div class="gateTit">服务门店 <router-link to=""><span>全部</span> <i class="arrow"></i></router-link></div>-->
        <!--<div class="gateList">
          <div class="gateItem clear">
            <div class="lf gateImg"><img src="../../assets/image/test/banner.png" alt=""></div>
            <div class="lf gateInfo">
              <div class="gateTop lineHidden">丽延康服务保障服务保障美容馆</div>
              <div class="gateMid"><i></i><span>距离 1.5km</span></div>
              <div class="gateBot lineHidden"><i></i>罗湖区深南东路百货广场大厦东座1505</div>
            </div>
          </div>
          <div class="gateItem clear">
            <div class="lf gateImg"><img src="../../assets/image/test/banner.png" alt=""></div>
            <div class="lf gateInfo">
              <div class="gateTop lineHidden">丽延康服务保障服务保障美容馆</div>
              <div class="gateMid"><i></i><span>距离 1.5km</span></div>
              <div class="gateBot lineHidden"><i></i>罗湖区深南东路百货广场大厦东座1505</div>
            </div>
          </div>
          <div class="gateItem clear">
            <div class="lf gateImg"><img src="../../assets/image/test/banner.png" alt=""></div>
            <div class="lf gateInfo">
              <div class="gateTop lineHidden">丽延康服务保障服务保障美容馆</div>
              <div class="gateMid"><i></i><span>距离 1.5km</span></div>
              <div class="gateBot lineHidden"><i></i>罗湖区深南东路百货广场大厦东座1505</div>
            </div>
          </div>
        </div>-->
        <!--<router-link to="" class="allGates">查看全部门店</router-link>-->
      <!--</div>-->
      <!-- 评价 -->
      <!--<div class="assess">
        <div class="assessTit">评价（9）</div>
        <div class="assessList">
          <div class="assessItem">
            <div class="assessPea clear">
              <div class="headImg lf"><img src="../../assets/image/test/banner.png" alt=""></div>
              <div class="headInfo lf">
                <p class="tel">139****3412 <span>2017-01-01</span></p>
                <div class="recomment"><span>超出预期</span><span>超出预期</span></div>
              </div>
            </div>
            <div class="recommentTxt">第一次用美容邦的服务 嘿嘿 好喜欢好专业 感谢小美第一次用美容邦的服务 嘿嘿 好喜欢好专业 感谢小美！</div>
            <div class="recommentImg">
              <img src="../../assets/image/test/banner.png" alt="">
              <img src="../../assets/image/test/banner.png" alt="">
              <img src="../../assets/image/test/banner.png" alt="">
            </div>
            <div class="replay">感谢您的赞美，往后我们会更加努力！</div>
          </div>
          <div class="assessItem">
            <div class="assessPea clear">
              <div class="headImg lf"><img src="../../assets/image/test/banner.png" alt=""></div>
              <div class="headInfo lf">
                <p class="tel">139****3412 <span>2017-01-01</span></p>
                <div class="recomment"><span>超出预期</span><span>超出预期</span></div>
              </div>
            </div>
            <div class="recommentTxt">第一次用美容邦的服务 嘿嘿 好喜欢好专业 感谢小美第一次用美容邦的服务 嘿嘿 好喜欢好专业 感谢小美！</div>
            <div class="recommentImg">
              <img src="../../assets/image/test/banner.png" alt="">
              <img src="../../assets/image/test/banner.png" alt="">
              <img src="../../assets/image/test/banner.png" alt="">
            </div>
            <div class="replay">感谢您的赞美，往后我们会更加努力！</div>
          </div>
        </div>
        <router-link to="" class="allRecomment">查看全部评价</router-link>
      </div>-->
    </div>
    <div class="gobay" v-btn @click="gobay">立即购买</div>
    <!-- 服务方式 -->
    <div :class="typeUp == true ? 'uppop up' : 'uppop'">
      <div class="mask" @click="closeUpPop"></div>
      <div class="content">
        <p class="title">选择服务方式</p>
        <div class="disFlex checkType">
          <div class="flexItem"><i class="gate"><span>推荐</span></i><p>顾客到店</p></div>
          <div class="flexItem"><i class="home"></i><p>技师上门</p></div>
        </div>
        <div class="close" @click="closeUpPop">关闭</div>
      </div>
    </div>
    
    <!-- 服务保证 -->
    <div :class="promiseUp == true ? 'uppop up' : 'uppop'">
      <div class="mask" @click="closeUpPop"></div>
      <div class="content">
        <p class="title">服务保障</p>
        <ul class="promiseIntro">
          <li>
            <p>迟到升级</p>
            <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor 
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
          </li>
          <li>
            <p>迟到升级</p>
            <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor 
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
          </li>
          <li>
            <p>迟到升级</p>
            <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor 
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
          </li>
        </ul>
        <div class="close" @click="closeUpPop">关闭</div>
      </div>
    </div>

    <!-- 优惠券领取 -->
    <div :class="getTicket == true ? 'uppop up' : 'uppop'">
      <div class="mask" @click="closeUpPop"></div>
      <div class="content">
        <p class="title">领优惠券 <i @click="closeUpPop"></i></p>
        <ul class="ticketIntro">
          <li class="clear">
            <label for="ticket1">
              <div class="lf ticketPrice">￥<em>50</em></div>
              <div class="lf ticketDetail">
                <p class="ticketName">平台满减券</p>
                <p class="useCondition">满400减100</p>
                <p class="useCondition">使用期限：2017-12-10前使用</p>
              </div>
              <div class="lr chooseBtn">
                <input type="radio" name="ticket" id="ticket1">
                <div class="showBtn"><i></i></div>
              </div>
            </label>
          </li>
          <li class="clear">
            <label for="ticket2">
              <div class="lf ticketPrice">￥<em>50</em></div>
              <div class="lf ticketDetail">
                <p class="ticketName">平台满减券</p>
                <p class="useCondition">满400减100</p>
                <p class="useCondition">使用期限：2017-12-10前使用</p>
              </div>
              <div class="lr chooseBtn">
                <input type="radio" name="ticket" id="ticket2">
                <div class="showBtn"><i></i></div>
              </div>
            </label>
          </li>
          <li class="clear noGet">
            <label for="ticket3">
              <div class="lf ticketPrice">￥<em>50</em></div>
              <div class="lf ticketDetail">
                <p class="ticketName">平台满减券</p>
                <p class="useCondition">满400减100</p>
                <p class="useCondition">使用期限：2017-12-10前使用</p>
              </div>
              <div class="lr chooseBtn">
                <input type="radio" disabled name="ticket" id="ticket3">
                <div class="showBtn"><i></i></div>
              </div>
            </label>
          </li>
        </ul>
        <div class="close forTicket" @click="closeUpPop">立即领取</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from 'vue-swipe'

export default {
  name: 'hello',
  data () {
    return {
      getServerData:{
        flowList:[]
      },//服务详情数据
      isHide:true,
      title: '',
      scrolled: false,
      typeUp: false,
      promiseUp: false,
      getTicket: false,
      introduction:true,//是否显示全部
      styleObj: {
          height: (window.innerWidth > 800 ? 800 : window.innerWidth)*0.7 + 'px'
      },
      imageArr:[]//轮播图数组
    }
  },
  filters: {
      intendedFor: function (value) {
        if(value == 0){
          return "男性";
        }else if(value == 1){
          return "女性";
        }else{
          return "男女都适用";
        }
          
      }
  },
  components: {
      Swipe,
      SwipeItem
  },
  created(){
    // 获取服务详情
    this.getServer();
  },
  mounted(){
    var _this = this;
    _this.title = _this.$route.name;
    window.onscroll = () => {
      if(window.pageYOffset > (parseFloat(_this.styleObj.height) + 3 * _this.fn.htmlSize())){
        _this.scrolled = true;
      }else{
        _this.scrolled = false;
      }
    }
  },
  methods: {
    // 查看全部
    lookall(){
      if(this.introduction == true){
        this.introduction = false;
      }else{
        this.introduction = true;
      }
    },
    // 获取服务详情
    getServer(data){
      var _this = this;
          _this._ajax({
              url: _this.fn.wyl + "server/getServer",
              method: 'post',
              data: {id:_this.$route.query.serverId},
              callback(db) {
                  if (db.errorCode == 200) {

                    if(db.datas != null){
                        _this.getServerData = db.datas;
                        if(_this.getServerData.images != ''){
                          _this.imageArr = _this.getServerData.images.split('|')
                        }
                    }else{
                        _this.fn.tip("该服务已下架，请选择其他服务！")
                        _this.$router.back(-1);
                    }
                  } else {
                      _this.fn.tip(db.msg);
                      _this.$router.back(-1);
                  }
              }
          })
    },
    // 微信分享
    WeChatShare(){
      alert("分享到快照，微信，朋友圈，微博");
    },
    // 全屏点击隐藏下拉框
    hideDownMenu(){
        this.isHide=true;//隐藏
    },
    gobay() {
      // this.typeUp = true;
      this.fn.addcookie("user_select_goodId",this.getServerData.id,1);//存储服务id
      localStorage.removeItem('submit_order_remarks');//清除下一页用户输入的备注信息
      this.$router.push({path: '/submitOrder'});
    },
    promise() {
      this.promiseUp = true;
    },
    ticket() {
      this.getTicket = true;
    },
    closeUpPop(){
      this.typeUp = false;
      this.promiseUp = false;
      this.getTicket = false;
    },
    // 下拉菜单
    downMenu(){
      this.isHide=false;
    }
  }
}
</script>
<style>
  .storeDetail .mint-swipe-items-wrap {
    height: inherit;
    overflow: hidden;
  }
</style>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import '../../assets/css/common.scss';
  @import '../../assets/css/vue-swipe.css';
  @import '../../assets/css/beautySalon/storeDetail.scss';

  @media screen and (max-width: 320px){
    .storeDetail .content .severIntro .IntroContent{
      font-size: 12px;
    }
  }

  @media screen and (max-width: 375px) and (min-width:321px) {
      .storeDetail .content .severIntro .IntroContent{
        font-size: 14px;
      }
  }
  @media screen and (max-width: 414px) and (min-width:376px) {
    .storeDetail .content .severIntro .IntroContent{
      font-size: 16px;
    }
  }

  /*.storeDetail .introduction{
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
  }*/
  /*去掉手机端元素被点击时候呈现的灰色*/
  .storeDetail .content .severIntro .lookall{
    -webkit-tap-highlight-color:transparent;
  }

  .storeDetail .content .severIntro .lookall .arrow{
    width: 0.65rem;
    height: 0.65rem;
  }

  .storeDetail .content .severIntro .lookall .uparrow{
    transform: rotate(-45deg);
    width: 0.65rem;
    height: 0.65rem;
    border-color: #11abcf;
    margin-top: -.3rem;
    border-right: .05rem solid #11abcf;
    border-top: .05rem solid #11abcf;
    display: inline-block;
    vertical-align: middle;
  }

  /*下拉菜单*/
  .storeDetail .downMenu{
    width: 6rem;
    /*height:9rem;*/
    background: gray;
    border-radius: 0.15rem;
    background: #ffffff;
    position: absolute;
    top:2.2rem;
    right:0.75rem;
    z-index: 1000;
  }

  /*三角形*/
  .storeDetail .downMenu .triangle{
    width: 0;
    height: 0;
    border-right: 0.5rem solid transparent;
    border-bottom: 0.5rem solid #ffffff;
    border-left: 0.5rem solid transparent;
    position: absolute;
    top:-0.45rem;
    right:0.5rem;
  }

  .storeDetail .downMenu ul{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
  .storeDetail .downMenu ul li{
    flex: 0 0 2.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width:5rem;
    border-bottom: 0.025rem solid #cccccc;

    font-family: PingFangSC;
    font-size: 0.75rem;
    color: #333333;
  }
  .storeDetail .downMenu ul li:last-child{
    border-bottom: none;
  }
  .storeDetail .downMenu ul li img{
    display: inline-block;
    height: 0.8rem;
    width: 0.8rem;
    vertical-align: middle;
  }
  .storeDetail .downMenu ul li span{
    vertical-align: middle;
    margin-left:0.6rem;
  }
  .storeDetail .downMenu ul li a{
    position: relative;
  }
  .storeDetail .downMenu ul li a sup i{
    display: inline-block;
    height: 0.3rem;
    width: 0.3rem;
    background: red;
    border-radius: 0.15rem;
    position: absolute;
    top: 0.125rem;
    right: 0;
  }
  .storeDetail .hide{
    display: none !important;
  }
  .storeDetail .layer{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background:transparent;
    z-index: 1000;
  }

  .storeDetail .notice{
    font-family: PingFangSC;
    font-size: 0.6rem;
    font-weight: 7.5rem;
    letter-spacing: 0.06rem;
    text-align: left;
    color: #666666;
  }
  .storeDetail .notice p{
    margin-top:0.6rem; 
    margin-bottom:0.8rem; 
  }
</style>
