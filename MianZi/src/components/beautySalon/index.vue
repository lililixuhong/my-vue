<template>
  <div class="beautySalon">
    <div class="header">
      <div class="left lf">
        <span @click="left">{{defaultCity}}<i class="arrow"></i></span>
      </div>
      <div class="searchInput"><i></i><input type="text" v-model="searchKeyword" @keyup.enter="searchNearby" placeholder="搜索附近美容院"></div>
      <div class="right lr" @click="searchNearby">
        <router-link to="">搜索</router-link>
      </div>
    </div>

    <div class="storeList">
      <div v-for="(item,index) in findPageData" @click="toBaiduMap(item.address)" :key="index">
        <router-link class="storeItem" to="">
          <!--<div class="recommend"><i></i><span>580</span><i></i><span>100%</span></div>-->
          <div class="haha"></div>
          <img v-lazyload="{shopImg:item.imgUrl,imgType:'shop'}">
          <div class="storeName">{{item.name}}</div>
          <div class="storeAddress"><i></i><span>{{item.address | removeProvinceAndCity}}</span><span>{{item.distance}}km</span><span>{{item.soldSum}}人已预约</span></div>
        </router-link>
      </div>

    </div>

    <div style="height:3rem;line-height: 3rem;border: none">{{loadingMessage}}</div>

    <Footer :select='2'></Footer>

    <!-- 左边弹出框 -->
    <div  :class="typeLeft ? 'aleft left' : 'aleft'">
      <!--<div class="return" @click="hideLeft">返回</div>-->
      <!--头部-->
      <div class="header" style="position:static">
        <div class="left lf">
          <span @click="left">{{defaultCity}}<i class="arrow"></i></span>
        </div>
        <div @click="bot" class="searchInput"><i></i><input type="text" placeholder="搜索城市名"  disabled="disabled"></div>
        <div class="right lr"  @click="hideLeft">
          <router-link to="">取消</router-link>
        </div>
      </div>

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

      <!--区域-->
      <!--<div class="category">
        <h4>区域</h4>
        <ul>
            <li v-for="(item,index) in areaFindAllData" @click="selectArea(item.id)" :key="index">
              <input type="radio" :id="item.id" name="isSelectArea">
              <div><label :for="item.id">{{item.name}}</label></div>
            </li>
        </ul>

      </div>-->

      <!--<div class="partingLine"></div>-->
      <!--类目-->
      <!--<div class="category">
        <h4>类别</h4>
        <ul>
          <li v-for="item in areaFindAllData"><div>{{item.name}}</div></li>
        </ul>
      </div>-->

      <!--底部取消确认按钮-->
      <!--<footer>
        <div class="cancel" @click="hideLeft">取消</div>
        <div class="ok" @click="confirmSelect">确定</div>
      </footer>-->
    </div>


    <!--城市搜索弹出框-->
    <div class="citySelect" :class="typeBot ? 'abot left' : 'abot'">
        <!--头部-->
      <div class="header" style="position:static">
        <!--<div class="left lf">
          <span @click="left">深圳 <i class="arrow"></i></span>
        </div>-->
        <div class="searchInput"><i></i><input type="text"  @input="screenCity" v-model="searchCity" placeholder="搜索城市名"></div>
        <div class="right lr" @click="hidebot">
          <router-link to="">取消</router-link>
        </div>
        <ul class="similCity">
          <li v-for="(item,index) in similCity" @click="areaFindAll(item)" :key="index">{{item.name}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

// import LazyLoad from '../../directive/lazyLoad.js'
// import Vue from 'vue'

// Vue.use(LazyLoad);

export default {
  name: 'hello',
  data () {
    return {
      isAllArea:false,//是否显示“全部”
      loadingMessage:"正在加载数据……",//加载数据列表提示
      similCity:[],//模糊搜索的城市数据
      city:[],//城市数据
      area:[],//区域数据
      selectCityId:"",//用户选择的市id
      selectAreaId:"",//用户选择的区id
      type:"4",//查询方式 3市，4区
      defaultCity:"深圳",//默认城市&用户选择
      defaultArea:"",//默认区域&用户选择
      title: this.$router.name,
      typeLeft: false,
      typeBot: false,
      findPageData:[],// 美容院列表数据
      currla:"",// 本地维度
      currlo:"",// 本地经度
      sortName: "distance",//排序名，（soldSum销量desc，默认），（grade级别desc）,(distance距离asc)
      areaFindAllData:"",//区域名称数据
      isSelectArea:false,//是否选中区域
      page:{
        curPage:1,//当前页码
        totalPage:1//总页数
      },
      pageSize:5,//每页条数
      searchKeyword:"",//搜索附近美容院
      searchCity:"",//搜索城市
      location:{},//定位地址信息
      positionCityId:""//定位城市id
    }
  },
  components: {

  },
  mounted(){
    var _this = this;
    window.onscroll = function(){
      if (_this.fn.isLoadMore()){

        var data={
            name:_this.searchKeyword,//条件搜索之——美容院名称
            areaId: _this.positionCityId,//区域编码
            type:_this.type,//根据区查询
            sortName: _this.sortName,//排序名，（soldSum销量desc，默认），（grade级别desc）,(distance距离asc)
            longitude:_this.currlo,//经度
            latitude:_this.currla,//纬度
            curPage:++_this.page.curPage,//当前页码
            pageSize:_this.pageSize//页面大小
        }
        _this.findPage(data);
      }
    }
  },
  destroyed(){
    window.onscroll = null;
  },
  created(){
    // 获取本地经纬度和地址
    if(this.fn.getLocation() != null){
      this.location = this.fn.getLocation();
      this.currla = this.location.currla;
      this.currlo = this.location.currlo;
      this.defaultCity = this.location.address.city.substring(0,this.location.address.city.length-1);
    }

    // 根据定位城市查城市id
    this.getCityId(this.defaultCity);
    // 获取城市列表
    this.getCityList();

  },
  methods: {
    // 通过美容院名搜索
    searchNearby(){
      var _this = this;
      _this.type = "3";//查全市
      _this.findPageData = [];
      var data={
        name:_this.searchKeyword,//条件搜索之——美容院名称
        areaId: "",//区域编码
        type:_this.type,//查询条件
        sortName: _this.sortName,//排序名，（soldSum销量desc，默认），（grade级别desc）,(distance距离asc)
        longitude:_this.currlo,//经度
        latitude:_this.currla,//纬度
        curPage: 1,//当前页码
        pageSize:_this.pageSize//页面大小
      }
        _this.findPage(data);
    },
    // 到百度地图
    toBaiduMap(address){
      window.location.href="https://map.baidu.com/mobile/webapp/search/search/qt=s&wd="+ address +"/vt=map&ecom=0";
    },
    // 地区条件查询
    confirmSelect(){
        var _this = this;
        _this.findPageData = [];
        var data={
          name:_this.searchKeyword,//条件搜索之——美容院名称
          areaId: "",//区域编码
          type:_this.type,//查询条件
          sortName: "",//排序名，（soldSum销量desc，默认），（grade级别desc）,(distance距离asc)
          longitude:_this.currlo,//经度
          latitude:_this.currla,//纬度
          curPage:1,//当前页码
          pageSize:_this.pageSize//页面大小
      }
      _this.findPage(data);
      _this.typeLeft = false;
    },
    // 选择城市
    selectCity(item){
      this.defaultCity = item.name;
      this.areaFindAll(item);
    },
    // 选择区域
    selectArea(item){
      var _this = this;
      _this.selectAreaId = item.id;//区域id
      _this.defaultArea = item.name;
      _this.typeLeft = false;
      _this.typeBot = false;
      _this.type = "4";
      _this.findPageData = [];
      var data={
        name: "",//条件搜索之——美容院名称
        areaId: _this.selectAreaId,//区域编码
        type:_this.type,//查询条件
        sortName: _this.sortName,//排序名，（soldSum销量desc，默认），（grade级别desc）,(distance距离asc)
        longitude:_this.currlo,//纬度
        latitude:_this.currla,//经度
        curPage:1,//当前页码
        pageSize:_this.pageSize//页面大小
      }
      _this.findPage(data);
    },
    // 选择全部区域（整个市）
    selectAllArea(){
      var _this = this;
      _this.typeLeft = false;
      _this.typeBot = false;
      _this.type = "3";
      _this.findPageData = [];
      var data={
        name: "",//条件搜索之——美容院名称
        areaId: _this.selectCityId,//区域编码
        type:_this.type,//查询条件
        sortName: _this.sortName,//排序名，（soldSum销量desc，默认），（grade级别desc）,(distance距离asc)
        longitude:_this.currlo,//纬度
        latitude:_this.currla,//经度
        curPage:1,//当前页码
        pageSize:_this.pageSize//页面大小
      }
      _this.findPage(data);
    },
    // 获取城市列表
    getCityList(){
      var _this = this;
          _this._ajax({
              url: _this.fn.xqq + "office/areaFind",
              method: 'post',
              data: {name:"",type:"3"},
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
    areaFindAll(item){
      var _this = this;
          _this.defaultCity = item.name;
          _this.selectCityId = item.id;//用户选择的市id
          _this.selectAreaId = "";
          _this.isAllArea = true;
          _this.typeBot = false;
          _this._ajax({
              url: _this.fn.xqq + "office/areaByParentId",
              method: 'post',
              data: {areaId:item.id},
              callback(db) {
                  if (db.errorCode == 200) {
                    _this.area = db.datas;
                  } else {
                      _this.fn.tip(db.msg)
                  }
              }
          })
    },// 首次加载美容院列表信息
    firstGetFindPage(){
      var _this = this;
      _this.findPageData = [];
      var data = {
              name: "",//条件搜索之——美容院名称
              areaId: _this.positionCityId,//区域编码
              type:_this.type,//查询条件
              sortName: _this.sortName,//排序名，（soldSum销量desc，默认），（grade级别desc）,(distance距离asc)
              longitude:_this.currlo,//经度
              latitude:_this.currla,//纬度
              curPage:1,//当前页码
              pageSize:_this.pageSize//页面大小
          };
      // 获取美容院列表数据
      _this.findPage(data);
    },
    // 美容院列表
    findPage(data){
      if(data.curPage > this.page.totalPage){
        return
      }
      var _this = this;
          _this._ajax({
              url: _this.fn.xqq + "office/findPage",
              method: 'post',
              data: data,
              callback(db) {
                  if (db.errorCode == 200) {
                    _this.findPageData = _this.findPageData.concat(db.datas.officeList);//列表数据
                    _this.page =  db.datas.page;//页码数据
                    if(_this.page.totalPage == 0){
                      _this.page.totalPage = 1;
                    }
                    if(_this.page.totalPage == _this.page.curPage){
                      _this.loadingMessage = "已经加载完全部数据";
                    }
                  } else {
                      _this.fn.tip(db.msg)
                  }
              }
          })
    },
    // 根据定位城市查城市id
    getCityId(defaultCity){
      var _this = this;
          _this._ajax({
              url: _this.fn.xqq + "office/areaByName",
              method: 'post',
              data: {name:defaultCity,type:3},
              callback(db) {
                  if (db.errorCode == 200) {
                    if(db.datas.length > 0){
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
    left(){
      this.typeLeft = true
      this.typeBot = false;
    },
    hideLeft(){
      this.typeLeft = false
    },

    bot(){

      this.typeBot = true;
    },
    hidebot(){
      this.typeBot = false;
    },
    screenCity(){
      var _this = this;
          _this._ajax({
              url: _this.fn.xqq + "office/areaFind",
              method: 'post',
              data: {name:_this.searchCity,type:"3"},
              callback(db) {
                  if (db.errorCode == 200) {

                    _this.similCity = db.datas;
                  } else {
                      _this.fn.tip(db.msg)
                  }
              }
          })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import '../../assets/css/beautySalon/index.scss';

  .haha{
    height: 3rem;
    width: 100%;
    /*background: red;*/
    background:linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.7));
    position: absolute;
    bottom:0;
  }

  .citySelect{
    display: flex;
    border-top:0.025rem solid #e6e6e6;
  }
  .citySelect .similCity li{
    text-align: left;
    padding-left: 1rem;
    height: 2rem;
    /*background: #e6e6e6;*/
    color: #08bae3;
    border-bottom: 0.025rem solid #e6e6e6;
  }
  .citySelect>.province{
    /*flex:1;*/
    width: 4rem;
    background: white;
    overflow-y: scroll;
  }
  .citySelect>.province::-webkit-scrollbar {
    display: none;
  }
  .citySelect>.province li{
    height: 2rem;
    line-height: 2rem;
    border-bottom: 0.025rem solid #f2f2f2;
  }
  .citySelect>.city{
    flex:1;
    background: #f2f2f2;
  }
  .citySelect>.city li{
    height: 2rem;
    line-height: 2rem;
    text-align: left;
    padding-left: 2rem;
    border-bottom: 0.025rem solid #ffffff;
  }
  .beautySalon .storeList .storeItem{
    color: #ffffff;
  }
  .beautySalon .storeList .storeItem .storeAddress{
    font-size: 0.5rem;
  }

  .beautySalon .storeList .storeItem .storeAddress span:last-child{
    /*text-align: right;*/
    display: inline-block;
    position: absolute;
    right:0.75rem;
  }
  .beautySalon .storeList .storeItem .storeAddress span:nth-child(2){
    vertical-align: bottom;
  }
  .beautySalon .storeList .storeItem .storeAddress i+span{
    display: inline-block;
    width: 9rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    vertical-align: top;
  }

   .beautySalon .storeList .storeItem .storeAddress i{
    display: inline-block;
    width: .6rem;
    height: .6rem;
    margin-right: .3rem;
    background: url('../../assets/image/beautySalon/position (3).png') no-repeat center center;
    background-size: contain;
    vertical-align: text-top;
   }

  .beautySalon .category{
    margin-top:0.8rem;
    margin-bottom: 0.8rem;
    padding-left: 0.7rem;
    padding-right: 0.7rem;

  }

  .beautySalon .category h4{
    text-align: left;
    padding-left: 0.2rem;
    margin-bottom: 0.4rem;
  }

  .beautySalon .category ul{
    display: -webkit-flex; /* Safari */
    display: flex;
    flex-wrap: wrap;
  }
  .beautySalon .category ul li{
    flex: 0 0 25%;
    padding: 0.2rem;

  }
  .beautySalon .category ul li div{
    border-radius: 0.15rem;
    background: #f0f0f0;
    height: 1.5rem;
    line-height: 1.5rem;
    overflow: hidden;
  }
  .beautySalon .category ul li input[name=isSelectArea]{
    opacity: 0;
  }
   .beautySalon .category ul li input[name=isSelectArea]:checked+div{
     background: #08bae3
  }

  .beautySalon .partingLine{
    height:2px;
    width:100%;
    background:#c0c0c0;
    overflow:hidden;
  }
  /*向上弹出框*/
  /*.abot{
    position:absolute;
    top:2.5rem;
    left:0;
    right:0;
    bottom: 0;
    width: 100%;
    z-index: 1;
    background: grey
  }*/

  .beautySalon footer{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2.5rem;
    line-height: 2.5rem;
    display: -webkit-flex; /* Safari */
    display: flex;
    z-index: 2;
  }
  .beautySalon footer .cancel{
    font-family: PingFangSC;
    font-size: 0.75rem;
    letter-spacing: 3px;
    color: #666666;
    background-color: #e6e6e6;
    flex: 1;
  }
  .beautySalon footer .ok{
    background-color: #08bae3;
    font-family: PingFangSC;
    font-size: 0.75rem;
    letter-spacing: 3px;
    color: #ffffff;
    flex: 1;
  }
</style>
