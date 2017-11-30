<template>
  <div class="storeDetail shopList">

    <!--<div class="header">
          <div class="left lf">
            <span @click="$router.back(-1)"><i class="arrow"></i></span>
          </div>
          <div class="flexItem"><span  data-top="2">店铺列表</span></div>
        </div>-->

    <!--排序条件-->
    <div class="sortCriteria">
      <div @click="distance">
        <span>距离</span>
        <div class="triangle">
          <input type="radio" name="sortCriteria">
          <div class="triangle-up" :class="distanceConditionUp ? 'upBlueColor' : 'upGrayColor'"></div>
          <div class="triangle-down" :class="distanceConditionDown ? 'downBlueColor' : 'downGrayColor'"></div>
        </div>
      </div>
      <!--<div @click="salesVolume">
            <span>销量</span>
            <div class="triangle">
              <input type="radio" name="sortCriteria">
              <div class="triangle-up" :class="salesVolumeConditionUp ? 'upBlueColor' : 'upGrayColor'"></div>
              <div class="triangle-down" :class="salesVolumeConditionDown ? 'downBlueColor' : 'downGrayColor'"></div>
            </div>
          </div>-->
      <div @click="shop">
        <span>城市</span>
        <div class="triangle">
          <input type="radio" name="sortCriteria">
          <div class="triangle-up" :class="shopConditionUp ? 'upBlueColor' : 'upGrayColor'"></div>
          <div class="triangle-down" :class="shopConditionDown ? 'downBlueColor' : 'downGrayColor'"></div>
        </div>
      </div>
    </div>

    <div class="content">
      <!-- 服务门店 -->
      <div class="severGates">
        <div class="gateList">
          <div class="gateItem clear" v-for="(item,index) in findPageData" :key="index" @click="chooseShop(item)">
            <label :for="'chooseShop' + index">
              <input type="radio" :id="'chooseShop' + index" name="chooseShop" class="hidden-input" />
              <span></span>

              <!--采用背景图的方式，只显示中间部分-->
              <div class="lf gateImg" :style="'background: url(' + item.imgUrl + ');background-size: 7.546875rem 3.5rem;background-position: center;'">
              </div>

              <!--原代码-->
              <!--<div class="lf gateImg"><img v-lazyload="item.imgUrl" alt=""></div>-->

              <div class="lf gateInfo">
                <div class="gateTop lineHidden">{{item.name}}</div>
                <div class="gateMid">
                  <i :class="'star' + item.grade"></i>
                  <span>已售 {{item.soldSum}}份</span>
                  <span>距离 {{item.distance}}km</span>
                </div>
                <div class="gateBot">
                  <i></i>{{item.address | removeProvinceAndCity}}</div>
              </div>
            </label>
          </div>
          <!--<div class="gateItem clear">
                <input type="radio" name="chooseShop" class="hidden-input"/><span></span>
                <div class="lf gateImg"><img src="../../assets/image/test/banner.png" alt=""></div>
                <div class="lf gateInfo">
                  <div class="gateTop lineHidden">丽延康服务保障服务保障美容馆</div>
                  <div class="gateMid"><i></i><span>距离 1.5km</span></div>
                  <div class="gateBot lineHidden"><i></i>罗湖区深南东路百货广场大厦东座1505</div>
                </div>
              </div>-->
        </div>
      </div>

    </div>
    <div style="height:3rem;line-height: 3rem;border: none">{{loadingMessage}}</div>

    <div :class="typeLeft ? 'aleft left' : 'aleft'" class="shopListSelectCity">
      <div class="citySelect">
        <div class="province">
          <ul>
            <li v-for="(item,index) in city" :key="index" @click="selectCity(item)">{{item.name}}</li>
          </ul>
        </div>
        <div class="city">
          <ul>
            <li v-show="isAllArea" @click="selectAllArea()">全部</li>
            <li v-for="(item,index) in area" :key="index" @click="selectArea(item)">{{item.name}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from 'vue-swipe'

export default {
  name: 'hello',
  data() {
    return {
      isAllArea: false,//是否显示“全部”
      typeLeft: false,//城市选项是否显示
      loadingMessage: "正在加载数据……",//列表加载信息
      city: [],//用户选择的城市
      area: [],//用户选择的区域
      selectCityId: "",//用户选择的市id
      selectAreaId: "",//用户选择的区id
      type: "",//查询条件
      defaultCity: "深圳",//默认城市&用户选择
      defaultArea: "",//默认区域&用户选择
      distanceConditionUp: false,
      distanceConditionDown: false,
      salesVolumeConditionUp: true,
      salesVolumeConditionDown: true,
      shopConditionUp: false,
      shopConditionDown: false,
      findPageData: [],
      page: {},
      currla: "",// 本地维度
      currlo: "",// 本地经度
      location: {},//定位信息
      positionCityId: "",//定位城市id
      sortName: "distance",//排序名，（soldSum销量desc，默认），（grade级别desc）,(distance距离asc)
      areaFindAllData: "",//区域名称数据
      isSelectArea: false,//是否选中区域
      page: {
        curPage: 1,//当前页码
        totalPage: 1//总页数
      },//页码数据
      isFirstLoad: false,

    }
  },
  components: {
    Swipe,
    SwipeItem
  },
  mounted() {
    // var _this = this;
    // _this.title = _this.$route.name;
    // window.onscroll = () => {
    //   if(window.pageYOffset > (parseFloat(_this.styleObj.height) + 3 * _this.fn.htmlSize())){
    //     _this.scrolled = true;
    //   }else{
    //     _this.scrolled = false;
    //   }
    // }

    var _this = this;
    window.onscroll = function() {
      if (_this.fn.isLoadMore()) {
        var data = {
          name: "",//条件搜索之——美容院名称
          areaId: _this.positionCityId,//区域编码
          type: _this.type,//查询条件
          sortName: _this.sortName,//排序名，（soldSum销量desc，默认），（grade级别desc）,(distance距离asc)	
          longitude: _this.currlo,//经度
          latitude: _this.currla,//纬度
          curPage: ++_this.page.curPage,//当前页码
          pageSize: 10//页面大小
        }
        if (_this.isFirstLoad) {
          _this.findPage(data);
        }

      }
    }
  },
  created() {
    // 获取本地经纬度和地址
    this.location = this.fn.getLocation();
    this.currla = this.location.currla;
    this.currlo = this.location.currlo;
    this.defaultCity = this.location.address.city.substring(0, this.location.address.city.length - 1);
    // 根据定位城市查城市id
    this.getCityId(this.defaultCity);
    // 获取城市列表
    this.getCityList();
  },
  methods: {
    // 获取城市列表
    getCityList() {
      var _this = this;
      _this._ajax({
        url: _this.fn.xqq + "office/areaFind",
        method: 'post',
        data: { name: "", type: "3" },
        callback(db) {
          if (db.errorCode == 200) {

            _this.city = db.datas;
          } else {
            _this.fn.tip(db.msg)
          }
        }
      })
    },
    // 根据市名获取区信息
    areaFindAll(item) {
      var _this = this;
      _this._ajax({
        url: _this.fn.xqq + "office/areaByParentId",
        method: 'post',
        data: { areaId: item.id },
        callback(db) {
          if (db.errorCode == 200) {

            _this.area = db.datas;
          } else {
            _this.fn.tip(db.msg)
          }
        }
      })
    },
    // 用户选择城市
    selectCity(item) {
      this.areaFindAll(item);
      this.defaultCity = item.name;
      this.isAllArea = true;//显示“全部”
      this.selectCityId = item.id;//用户选择的市id
      this.selectAreaId = "";
    },
    // 用户选择区域
    selectArea(item) {
      var _this = this;
      _this.type = "4";
      _this.selectAreaId = item.id;
      _this.selectCityId = "";
      var data = {
        name: "",//条件搜索之——美容院名称
        areaId: _this.selectAreaId,//区域编码
        type: _this.type,//查询条件
        sortName: _this.sortName,//排序名，（soldSum销量desc，默认），（grade级别desc）,(distance距离asc)	
        longitude: _this.currlo,//经度
        latitude: _this.currla,//纬度
        curPage: 1,//当前页码
        pageSize: 10//页面大小
      }
      _this.findPage(data);
      _this.defaultArea = item.name;
      _this.typeLeft = false;
    },
    // 选择全部区域（整个市）
    selectAllArea() {
      var _this = this;
      _this.typeLeft = false;
      _this.type = "";
      var data = {
        name: "",//条件搜索之——美容院名称
        areaId: _this.selectCityId,//区域编码
        type: _this.type,//查询条件
        sortName: _this.sortName,//排序名，（soldSum销量desc，默认），（grade级别desc）,(distance距离asc)	
        longitude: _this.currlo,//纬度
        latitude: _this.currla,//经度
        curPage: 1,//当前页码
        pageSize: 10//页面大小
      }
      _this.findPage(data);
    },
    // 跳回到立即购买页
    chooseShop(office) {
      var _this = this;
      setTimeout(function() {
        _this.$router.push({
          path: '/submitOrder', query: {
            office: JSON.stringify(office)
          }
        });
      }, 300);

    },
    // 距离排序
    distance() {
      this.salesVolumeConditionUp = false;
      this.salesVolumeConditionDown = false;
      this.shopConditionUp = false;
      this.shopConditionDown = false;
      this.findPageData = [];
      if (this.distanceConditionUp == true) {
        this.distanceConditionUp = false;
        this.distanceConditionDown = false;
      } else {
        this.distanceConditionUp = true;
        this.distanceConditionDown = true;
      }
      this.sortName = "distance";
      this.typeLeft = false;
      this.type = "3";//
      // 距离排序请求
      var data = {
        name: "",//条件搜索之——美容院名称
        areaId: this.selectAreaId || this.selectCityId,//区域编码
        type: this.type,//查询条件
        sortName: this.sortName,//排序名，（soldSum销量desc，默认），（grade级别desc）,(distance距离asc)	
        longitude: this.currlo,//经度
        latitude: this.currla,//纬度
        curPage: 1,//当前页码
        pageSize: 10//页面大小
      };
      this.findPage(data);
    },
    // 销量排序
    salesVolume() {
      this.distanceConditionUp = false;
      this.distanceConditionDown = false;
      this.shopConditionUp = false;
      this.shopConditionDown = false;
      this.findPageData = [];
      if (this.salesVolumeConditionUp == true) {
        this.salesVolumeConditionUp = false;
        this.salesVolumeConditionDown = false;
      } else {
        this.salesVolumeConditionUp = true;
        this.salesVolumeConditionDown = true;
      }
      this.sortName = "soldSum";
      // 销量排序请求
      var data = {
        name: "",//条件搜索之——美容院名称
        areaId: "",//区域编码
        sortName: this.sortName,//排序名，（soldSum销量desc，默认），（grade级别desc）,(distance距离asc)	
        longitude: this.currlo,//经度
        latitude: this.currla,//纬度
        curPage: 1,//当前页码
        pageSize: 10//页面大小
      };
      this.findPage(data);
    },
    // 城市选择
    shop() {
      this.salesVolumeConditionUp = false;
      this.salesVolumeConditionDown = false;
      this.distanceConditionUp = false;
      this.distanceConditionDown = false;
      this.findPageData = [];
      if (this.shopConditionUp == true) {
        this.shopConditionUp = false;
        this.shopConditionDown = false;
      } else {
        this.shopConditionUp = true;
        this.shopConditionDown = true;
      }

      this.typeLeft = true;


      // 店铺排序请求
      // this.sortName = "grade";
      // var data = {
      //     name:"",//条件搜索之——美容院名称
      //     areaId: "",//区域编码
      //     sortName: this.sortName,//排序名，（soldSum销量desc，默认），（grade级别desc）,(distance距离asc)	
      //     longitude:this.currlo,//经度
      //     latitude:this.currla,//纬度
      //     curPage:1,//当前页码
      //     pageSize:10//页面大小
      // };
      // this.findPage(data);

    },
    // 店铺列表
    findPage(data) {
      if (data.curPage > this.page.totalPage) {
        return
      }
      this.loadingMessage = "正在加载信息……";
      var _this = this;
      _this._ajax({
        url: _this.fn.xqq + "office/findPage",
        method: 'post',
        data: data,
        callback(db) {
          if (db.errorCode == 200) {
            _this.findPageData = _this.findPageData.concat(db.datas.officeList);//列表数据
            _this.page = db.datas.page;//页码数据
            if (_this.page.totalPage == 0) {
              _this.page.totalPage = 1;
            }
            _this.isFirstLoad = true;
            if (_this.page.totalPage == _this.page.curPage) {
              _this.loadingMessage = "已经加载全部信息";
            }
          } else {
            _this.fn.tip(db.msg)
          }
        }
      })
    },
    // 根据定位城市查城市id
    getCityId(defaultCity) {
      var _this = this;
      _this._ajax({
        url: _this.fn.xqq + "office/areaByName",
        method: 'post',
        data: { name: defaultCity, type: 3 },
        callback(db) {
          if (db.errorCode == 200) {
            if (db.datas.length > 0) {
              _this.positionCityId = db.datas[0].id;
            }
            // 首次加载美容院列表信息
            _this.firstGetFindPage();
          } else {
            _this.fn.tip(db.msg)
          }
        }
      })
    },
    // 首次加载美容院列表信息
    firstGetFindPage() {
      var data = {
        name: "",//条件搜索之——美容院名称
        areaId: this.positionCityId,//区域编码
        sortName: "distance",//排序名，（soldSum销量desc，默认），（grade级别desc）,(distance距离asc)	
        longitude: this.currlo,//经度
        latitude: this.currla,//纬度
        curPage: 1,//当前页码
        pageSize: 10//页面大小
      };
      // 获取美容院列表数据
      this.findPage(data);
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

.citySelect {
  display: flex;
  border-top: 0.025rem solid #e6e6e6;
}

.citySelect .similCity li {
  text-align: left;
  padding-left: 1rem;
  height: 2rem;
  /*background: #e6e6e6;*/
  color: $theme-blue;
  border-bottom: 0.025rem solid #e6e6e6;
}

.citySelect>.province {
  /*flex:1;*/
  width: 4rem;
  background: white;
  overflow-y: scroll;
}

.citySelect>.province::-webkit-scrollbar {
  display: none;
}

.citySelect>.province li {
  height: 2rem;
  line-height: 2rem;
  border-bottom: 0.025rem solid #f2f2f2;
}

.citySelect>.city {
  flex: 1;
  background: #f2f2f2;
}

.citySelect>.city li {
  height: 2rem;
  line-height: 2rem;
  text-align: left;
  padding-left: 2rem;
  border-bottom: 0.025rem solid #ffffff;
}

.shopListSelectCity {
  z-index: 500;
  top: 2rem;
}

.shopList .sortCriteria {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
}

.shopList .content {
  margin-top: 2rem;
}

.shopList .content .severGates .gateList .gateItem {
  position: relative;
  text-align: left;
}

.shopList .content .severGates .gateList .gateItem .gateImg {
  margin-left: 0.75rem;
}

.shopList .content .severGates .gateList .gateItem .gateInfo .gateBot {
  /*display: inline-block;*/
  /*width: 9rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  vertical-align: top;*/
  width: 13rem;
  line-height: 1rem;
}

.shopList .content .severGates .gateList .gateItem label>input {
  /*float: left;*/
  width: 0.7rem;
  height: 0.7rem;
  position: absolute;
  top: 2.1rem;
  left: -0.3rem;
  opacity: 0;
  z-index: 101;
}

.shopList .content .severGates .gateList .gateItem label>input[type=radio]+span {
  /*float: left;*/
  width: 0.7rem;
  height: 0.7rem;
  position: absolute;
  top: 2.1rem;
  left: -0.3rem;
  display: inline-block;
  height: 0.7rem;
  width: 0.7rem;
  border-radius: 0.7rem;
  border: 0.025rem solid gray;
}

.shopList .content .severGates .gateList .gateItem label>input[type=radio]:checked+span {
  background-image: url('../../assets/image/beautySalon/payment1 (3).png');
  background-size: contain;
  border: none;
}

.shopList .header {
  position: static !important;
}

.shopList .sortCriteria {
  display: flex;
  height: 2rem;
  line-height: 2rem;
  align-items: center;
  background-color: #fafafa;
  box-shadow: 0px 0.025rem 0 0 #e6e6e6;

  font-family: PingFangSC;
  font-size: 0.65rem;
  font-weight: 7.5rem;
  color: $theme-blue;
}

.shopList .sortCriteria>div {
  flex: 1;
  height: 0.9rem;
  line-height: 0.9rem;
  border-left: 0.025rem solid #e6e6e6;
}

.shopList .sortCriteria div:first-child {
  border: none;
}

.shopList .sortCriteria .triangle {
  display: inline-block;
  width: 0.7rem;
  height: 0.7rem;
  position: relative;
}

.shopList .sortCriteria span {
  display: inline-block;
}

.shopList .sortCriteria .triangle-up {
  display: inline-block;
  width: 0;
  height: 0;
  border-left: 0.175rem solid transparent;
  border-right: 0.175rem solid transparent;
  border-bottom: 0.175rem solid #999999;
  position: absolute;
  left: 0.13rem;
  top: 0.2rem;
}

.shopList .sortCriteria .triangle-down {
  display: inline-block;
  width: 0;
  height: 0;
  border-left: 0.175rem solid transparent;
  border-right: 0.175rem solid transparent;
  border-top: 0.175rem solid #999999;
  position: absolute;
  left: 0.13rem;
  bottom: 0;
}

.shopList .sortCriteria .triangle input[type=radio] {
  height: 2rem;
  width: 2rem;
  position: absolute;
  left: -1rem;
  top: -0.5rem;
  opacity: 0;
}



/*上灰*/

.shopList .sortCriteria .triangle>.upGrayColor {
  border-left: 0.175rem solid transparent;
  border-right: 0.175rem solid transparent;
  border-bottom: 0.175rem solid #999999;
}



/*下灰*/

.shopList .sortCriteria .triangle>.downGrayColor {
  border-left: 0.175rem solid transparent;
  border-right: 0.175rem solid transparent;
  border-top: 0.175rem solid #999999;
}



/*上蓝*/

.shopList .sortCriteria .triangle>.upBlueColor {
  border-left: 0.175rem solid transparent;
  border-right: 0.175rem solid transparent;
  border-bottom: 0.175rem solid $theme-blue;
}



/*下蓝*/

.shopList .sortCriteria .triangle>.downBlueColor {
  border-left: 0.175rem solid transparent;
  border-right: 0.175rem solid transparent;
  border-top: 0.175rem solid $theme-blue;
}

.storeDetail .content .severGates .gateList .gateItem .gateInfo .gateMid>span {
  width: 4.3rem;
  display: inline-block;
}

.storeDetail .content .severGates .gateList .gateItem .gateInfo .gateMid i.star1 {
  width: 0.5rem;
}

.storeDetail .content .severGates .gateList .gateItem .gateInfo .gateMid i.star2 {
  width: 1rem;
}

.storeDetail .content .severGates .gateList .gateItem .gateInfo .gateMid i.star3 {
  width: 1.5rem;
}

.storeDetail .content .severGates .gateList .gateItem .gateInfo .gateMid i.star4 {
  width: 2rem;
}

.storeDetail .content .severGates .gateList .gateItem .gateInfo .gateMid i.star5 {
  width: 2.5rem;
}

.storeDetail .content .severGates .gateList .gateItem .gateInfo .gateMid i {
  display: block;
}
</style>
