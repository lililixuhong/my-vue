<template>
    <div class="server">
        <div style="position:fixed;top:0;left:0;width:100%;s">
            <div :class="{mask:isUp}" @click="synthesize"></div>
            <div class="topSearch" v-if="isTop">
                <div class="searchInput">
                    <i @click="search"></i><input v-model="searchShop" type="text" placeholder="补水、美白、抗皱">
                </div>
                <div @click="search" class="searchBtn">搜索</div>
            </div>
            <div class="top">
                <div class="moveNav">
                    <div id="severNav" class="nav disFlex">
                        <div class="navItem" v-for="(item,index) in navList" :key="index">
                            <span @click="toggle(index,item)" :class="{active:isActive===index}">{{item.name}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="filtrate">
                <div class="filtrateTop disFlex">
                    <div class="flexItem zunhe" @click="synthesize">综合排序
                        <div>
                            <div class="upIcon" :class="{IconBottom:isUp}"></div>
                            <div style="height:0.5rem;"></div>
                            <div class="downIcon" :class="{IconTop:!isUp}"></div>
                        </div>
                    </div>
                    <div @click="sales" class="flexItem">销量优先</div>
                    <div @click="togglePrice" class="flexItem Price">价格
                        <div>
                            <div class="upIcon" :class="{isTop:topPrice}"></div>
                            <div style="height:2px;"></div>
                            <div class="downIcon" :class="{isBottom:bottomPrice}"></div>
                        </div>
                    </div>
                    <div class="flexItem selectIcon" @click="filtrate">筛选
                        <img src="../../assets/image/icon/homepage/filtrate.png" alt="">
                    </div>
                </div>
                <div class="dropDown">
                    <div class="content" :class="{up:isUp}">
                        <div v-if="isUp">
                            <div @click="toggleItemColor" class="item" :class="{itemColor:isItemColor}">
                                最新上架
                                <img v-if="isItemColor" src="../../assets/image/icon/homepage/tick.png" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div style="width:100%;height:6.6rem;"></div>
        <div class="serverList">
            <!-- storeDetail -->
            <div @click="toServerDetails(item)" v-for="(item, index) in shopSercerList" :key="index">
                <div class="shopImg">
                    <img v-lazyload="item.imgSrc" alt="">
                </div>
                <p>{{item.name}}</p>
                <div class="serverShopPrice ">
                    <span class="price">￥{{item.price}}</span>

                    <span class="delPrice">{{item.marketPrice}}</span>
                </div>
                <!-- <div class="saleNum clear">
                                                                                                        <span class="fr">销量：{{item.saleNum}}</span>
                                                                                                    </div> -->
            </div>

        </div>
        <div class="nodata" v-if="nodata">查无服务</div>
        <div style="width:100%;height:2rem"></div>
        <!-- 左侧弹出的筛选项目 -->
        <div class="leftConten" :class="{upLeft:isLeft}">
            <div class="condition">
                <div class="tit">
                    价格区间
                </div>
                <div class="price">
                    <input v-model="minPrice" type="text" maxlength="8" placeholder="最低价格">
                    <span>——</span>
                    <input v-model="maxPrice" type="text" maxlength="8" placeholder="最高价格">
                </div>
                <div class="tit serverTime">
                    服务时长
                </div>
                <div class="price serverTime">
                    <span class="disFlex-center " @click="toggleTime(30)" :class="{spanColor:serverTime===30}">30分钟以下</span>
                    <span class="disFlex-center" @click="toggleTime(60)" :class="{spanColor:serverTime===60}">30分钟到1小时</span>
                    <span class="disFlex-center" @click="toggleTime(90)" :class="{spanColor:serverTime===90}">1个小时以上</span>
                </div>
                <div class="buttomBtn disFlex">
                    <span class="flexItem right" @click="reset">重置</span>
                    <span class="flexItem left" @click="sure">确定</span>
                </div>
            </div>
        </div>
        <div :class="{bigmask:isLeft}" @click="filtrate"></div>
        <Loading v-if="$store.getters.loading"></Loading>
    </div>
</template>

<script>
export default {
    data() {
        return {
            searchShop: "",
            isActive: "",
            queryIndex: '',
            navList: [],
            isUp: false,
            isLeft: false,
            nodata: false,

            isItemColor: false,
            shopSercerList: [],

            // 筛选条件
            serverTypeId: "",
            pageNumber: "",
            currentPage: 1,
            saleNum: "",
            price: "",
            newGoods: "",
            serverTime: '',
            minPrice: "",
            maxPrice: "",
            isTop: true,
            topPrice: "",
            bottomPrice: ""

        }
    },
    created() {
        if (this.$route.query.index != undefined) {
            this.isActive = this.$route.query.index - 0;
            this.serverTypeId = this.$route.query.id;
        }
        this.getNavList()
        this.getShopServerList()
    },
    mounted() {
        var _this = this;
        // 注册下拉公洞
        _this.downScroll()
    },
    destroyed() {
        window.onscroll = null;
    },
    watch: {
        minPrice(news, old) {
            this.minPrice = parseInt(news) ? parseInt(news) : '';
        },
        maxPrice(news, old) {
            this.maxPrice = parseInt(news) ? parseInt(news) : '';
        }
    },
    methods: {
        top() {
            var _this = this;
            var scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
            console.log(scrolltop)
            if (scrolltop > 50) {
                _this.isTop = false;
            } else {
                _this.isTop = true;
            }
        },
        //  跳转至服务详情
        toServerDetails(item) {
            this.$router.push({ path: 'storeDetail', query: { serverId: item.id } })
        },
        search() {
            this.isActive = "";
            // 切换最新文字的状态
            this.isItemColor = false;
            // 销量
            this.saleNum = '';
            // 当前页
            this.currentPage = 1;
            // 服务列表页
            this.shopSercerList = [];
            // 价格
            this.price = "";
            // 最新人气
            this.newGoods = "";
            // 服务分类id
            this.serverTypeId = '';
            this.getShopServerList();

        },
        // 下拉公洞
        downScroll() {
            window.onscroll = this.foo
        },
        foo() {
            this.top()
            var _this = this;
            // 浏览器 窗口高度
            var windowHeight = document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.clientHeight;
            if (_this.getScrollTop() + windowHeight == _this.getScrollHeight()) {

                if (_this.pageNumber < _this.currentPage && _this.pageNumber != "") {
                    _this.fn.tip("没有服务啦亲")
                } else {
                    _this.getShopServerList()
                }
            }
        },
        //滚动条在Y轴上的滚动距离
        getScrollTop() {
            var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
            if (document.body) {
                bodyScrollTop = document.body.scrollTop;
            }
            if (document.documentElement) {
                documentScrollTop = document.documentElement.scrollTop;
            }
            scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
            return scrollTop;
        },
        //文档的总高度
        getScrollHeight() {
            var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
            if (document.body) {
                bodyScrollHeight = document.body.scrollHeight;
            }
            if (document.documentElement) {
                documentScrollHeight = document.documentElement.scrollHeight;
            }
            scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
            return scrollHeight;
        },
        // 滑动导航栏
        getNavList() {
            var _this = this;
            this._ajax({
                url: this.fn.wyl + "server/serverTypeList",
                method: 'post',
                data: {},
                callback(db) {
                    if (db.errorCode === '200') {
                        _this.navList = db.datas;
                        // 定位导航栏
                        _this.move()
                        // 注册滑动导航
                        //_this.slideNav()
                    } else {
                        _this.fn.tip("服务器繁忙")
                    }
                }
            })
        },
        // 服务数据ajax
        getShopServerList() {
            var _this = this;
            this._ajax({
                url: this.fn.wyl + "server/serverList",
                method: 'post',
                data: {
                    pageNo: this.currentPage,
                    pageSize: 10,
                    categoryId: this.serverTypeId,
                    saleNum: this.saleNum,
                    price: this.price,
                    newGoods: this.newGoods,
                    name: this.searchShop,
                    totalTime: this.serverTime,
                    minPrice: this.minPrice,
                    maxPrice: this.maxPrice
                },
                callback(db) {

                    if (db.datas.list.length === 0) {
                        _this.nodata = true;
                    } else {
                        _this.nodata = false;
                    }

                    if (db.errorCode === '200') {
                        _this.currentPage += 1;
                        _this.pageNumber = Math.ceil(db.datas.count / db.datas.pageSize);

                        _this.shopSercerList = _this.shopSercerList.concat(db.datas.list);
                        _this.shopSercerList.forEach(function(val, index) {
                            if (val.images === null) {
                                val.imgSrc = "";
                                return
                            }
                            if (val.images.indexOf("|") == -1) {
                                val.imgSrc = val.images;
                            } else {
                                val.imgSrc = val.images.split('|')[0]
                            }
                        });
                    } else {
                        _this.fn.tip("服务器繁忙")
                    }
                }
            })
        },
        toggle(index, item) {
            // 切换最新文字的状态
            this.isItemColor = false;
            this.isActive = index;
            this.shopSercerList = [];
            // 筛选的参数
            this.serverTypeId = item.id;
            // this.$router.push({ query: { id: item.id, index: index } })
            this.currentPage = 1;
            this.saleNum = '';
            this.price = "";
            this.newGoods = "";
            this.searchShop = "";
            this.serverTime = '';
            this.minPrice = '';
            this.maxPrice = '';
            this.topPrice = this.bottomPrice = "";
            this.getShopServerList();
        },
        toggleTime(time) {
            this.serverTime = time;
        },
        // 综合排序下拉切换
        toggleItemColor() {
            this.isItemColor = !this.isItemColor;
            this.isUp = !this.isUp;
            this.newShop()
        },
        // 定位到当前激活的导航栏
        move() {
            var index = this.$route.query.index - 0;
            this.$nextTick(() => {
                if (index <= 3) {
                    return
                }
                var el = document.querySelector('#severNav');
                el.scrollLeft = index * window.screen.width / 4;
            })
        },
        // 滑动导航栏
        slideNav() {

            var maxSpace, minSpace;
            //  计算得到移动的项目的宽度
            var navItemSpace = this.fn.htmlSize() * 4.6875;
            maxSpace = (this.navList.length - 4) * navItemSpace + 50;

            minSpace = 50;

            var el = document.querySelector('#severNav');
            var startX, endX, space, elLeft;

            // 记录滑动开始的位置  和  导航栏的初始位置
            el.addEventListener("touchstart", function(e) {
                elLeft = parseInt(el.style.left);
                if (isNaN(elLeft)) {
                    elLeft = 0;
                }
                startX = e.targetTouches[0].clientX
            }, false)

            el.addEventListener("touchend", function(e) {
                var left = isNaN(parseInt(el.style.left)) ? 0 : parseInt(el.style.left)
                // 滑动结束后 导航栏如果超出预定的最大和最小位置  让导航栏回复原来位置
                if (-(left) >= (maxSpace - 50)) {

                    el.style.left = -(maxSpace - 50) + "px";
                }
                else if (left > 0) {
                    el.style.left = "0px";
                }
            }, false)

            el.addEventListener("touchmove", function(e) {
                // 组织浏览器滚动条的默认行为
                e.preventDefault();
                //  计算出滑动距离
                endX = startX - e.targetTouches[0].clientX;
                // 滑动距离 大于0 时 向左滑动
                if (endX > 0) {
                    var left = isNaN(parseInt(el.style.left)) ? 0 : parseInt(el.style.left)
                    if (-(left) >= maxSpace) {
                        return
                    }
                    el.style.left = elLeft + (-endX) + "px";
                }
                // 滑动距离 小于0 时 向右滑动
                if (endX < 0) {
                    var left = isNaN(parseInt(el.style.left)) ? 0 : parseInt(el.style.left)
                    if ((left) >= minSpace) {
                        return
                    }
                    el.style.left = elLeft + (-endX) + "px";
                }
            }, false)
        },
        synthesize() {
            this.isUp = !this.isUp;
            this.bottomPrice = this.topPrice = '';
        },
        filtrate() {
            this.isLeft = !this.isLeft;
            this.bottomPrice = this.topPrice = '';
        },
        reset() {
            this.serverTime = '';
            this.minPrice = '';
            this.maxPrice = '';
        },
        // 确定筛选
        sure() {
            this.isLeft = !this.isLeft;
            // if (this.serverTime === '' && (this.minPrice === '' || this.maxPrice === "")) {
            //     return
            // }

            // 切换最新文字的状态
            this.isItemColor = false;
            this.isActive = '';
            this.serverTypeId = '';
            this.searchShop = "";
            this.saleNum = "";
            this.currentPage = 1;
            this.shopSercerList = [];
            this.price = "";
            this.newGoods = "";
            this.getShopServerList();
        },
        // 销量优先
        sales() {
            // 切换最新文字的状态
            this.bottomPrice = this.topPrice = '';
            this.isItemColor = false;
            this.searchShop = "";
            this.saleNum = 1;
            this.currentPage = 1;
            this.shopSercerList = [];
            this.price = "";
            this.newGoods = "";
            this.serverTime = '';
            this.minPrice = '';
            this.maxPrice = '';
            this.getShopServerList();
        },
        // 价格排序
        togglePrice() {
            // 切换最新文字的状态
            // bottomPrice topPrice


            if (this.topPrice === '') {
                this.topPrice = false;
            } else {
                this.topPrice = this.topPrice ? false : true;
            }
            if (this.bottomPrice === '') {
                this.bottomPrice = true;
            } else {
                this.bottomPrice = this.bottomPrice ? false : true;
            }
            this.isItemColor = false;
            this.searchShop = "";
            this.saleNum = "";
            this.currentPage = 1;
            this.shopSercerList = [];
            this.price = this.price === 1 ? 0 : 1;
            this.newGoods = "";
            this.serverTime = '';
            this.minPrice = '';
            this.maxPrice = '';
            this.getShopServerList();
        },
        // 综合排序里面的最新上架
        newShop() {
            this.saleNum = "";
            this.searchShop = "";
            this.currentPage = 1;
            this.shopSercerList = [];
            this.price = "";
            this.newGoods = 1;
            this.serverTime = '';
            this.minPrice = '';
            this.maxPrice = '';
            this.getShopServerList();
        }
    }
}
</script>

<style scoped lang="scss">
@import '../../assets/css/homepage/server.scss';
.server {
    .topSearch {
        position: relative;
        z-index: 300;
        background-color: #fff;
        .searchInput {
            display: inline-block;
            height: 1.5rem;
            width: 14rem;
            background: #f2f2f2;
            border-radius: 1.5rem;
            margin: .5rem 0;
            line-height: 1.5rem;
            position: relative;
            i {
                position: absolute;
                left: .3rem;
                top: 0;
                width: 1.5rem;
                height: 1.5rem;
                background: url(../../assets/image/icon/homepage/search.png) no-repeat center center;
                background-size: 45% 45%;
            }
            input {
                height: 1.4rem;
                background: transparent;
                color: #999;
                width: 10rem;
                font-size: .6rem;
            }
        }
    }
}

.searchBtn {
    position: absolute;
    top: 0.65rem;
    right: 0.5rem;
}
</style>
