<!--提交订单页-->
<template>
    <div class="submitOrder">
        <!--<header>
                    <div class="left lf">
                        <span @click="$router.back(-1)">《</span>
                    </div>
                    <h3>提交订单</h3>
                </header>-->

        <!--门店信息&服务时间-->
        <section>
            <div class="storeAddress" @click="gotoShopList">
                <div class="storeAddressTitle">门店</div>
                <div class="storeAddressContent">
                    <div>
                        <span>{{office.name}}</span>
                    </div>
                    <div>{{office.address | removeProvinceAndCity}}</div>
                </div>
                <div class="storeAddressIcon">
                    <span>
                        <i class="arrow"></i>
                    </span>
                </div>
            </div>
            <div class="serviceTime">
                <div>服务时间</div>
                <div>下单后可预约服务时间</div>
            </div>
        </section>

        <!--服务商品信息-->
        <section class="commodityInformation">

            <div class="gateItemShell">
                <div class="gateImg">
                    <img :src="purchaseNowData.goodImages" alt="">
                </div>
                <div class="gateTop lineHidden">
                    {{purchaseNowData.name}}
                </div>
                <div class="gateBot lineHidden">
                    <span>￥</span>{{purchaseNowData.price}}</div>
            </div>

            <div class="remarks">
                <h3>备注</h3>
                <textarea v-model="remarks" rows="4" cols="50">
                </textarea>
            </div>
        </section>

        <!--底部-->
        <footer>
            <div class="paymentContent">
                <span class="paymentTitle">待支付：</span>
                <span class="paymentSymbol">￥</span>
                <span class="paymentMoney">{{purchaseNowData.price}}</span>
            </div>
            <div class="confirmPayment" @click="confirmPayment">提交订单</div>
        </footer>
    </div>
</template>

<script>
module.exports = {
    data: function() {
        return {
            defaultShop: {},//默认要显示的门店信息
            greeting: "hello",
            purchaseNowData: {
                goodImages: ""
            },//立即购买数据
            goodsId: "",//商品id
            office: {},//被选中的门店信息
            remarks: "",//备注信息
            currlo: "",//经度
            currla: "",//纬度
            location: {},//定位信息
            sortName: "distance"//排序名，（soldSum销量desc，默认），（grade级别desc）
        }
    },
    created() {
        this.remarks = localStorage.getItem("submit_order_remarks") == null ? '' : localStorage.getItem("submit_order_remarks");
        this.goodsId = this.fn.getcookie("user_select_goodId");
        // 获取本地经纬度和地址
        this.location = this.fn.getLocation();
        this.currla = this.location.currla;
        this.currlo = this.location.currlo;
        // 获取服务信息数据
        this.purchaseNow();
        // 获取最近门店信息（头部默认显示）
        if (this.$route.query.office) {
            // 用户选中的门店
            this.office = JSON.parse(this.$route.query.office);
        } else {
            this.getNearbyShop();
        }
    },
    methods: {
        // 获取最近门店信息（头部默认显示）
        getNearbyShop() {
            var _this = this;
            var data = {
                name: "",//条件搜索之——美容院名称
                areaId: "",//区域编码
                sortName: _this.sortName,//排序名，（soldSum销量desc，默认），（grade级别desc）,(distance距离asc)	
                longitude: _this.currlo,//经度
                latitude: _this.currla,//纬度
                curPage: 1,//当前页码
                pageSize: 10//页面大小
            };
            _this._ajax({
                url: _this.fn.xqq + "office/findPage",
                method: 'post',
                data: data,
                callback(db) {
                    if (db.errorCode == 200) {
                        if (db.datas.officeList) {
                            _this.office = db.datas.officeList[0];
                        }
                    } else {
                        _this.fn.tip(db.msg)
                    }
                }
            })
        },
        // 获取服务信息数据
        purchaseNow() {
            var _this = this;
            _this._ajax({
                url: _this.fn.wyl + "orders/purchaseNow",
                method: 'post',
                data: { goodsId: _this.goodsId },
                callback(db) {
                    if (db.errorCode == 200) {
                        _this.purchaseNowData = db.datas;
                        _this.purchaseNowData.goodImages = _this.purchaseNowData.goodImages.split("|")[0];
                    } else {
                        _this.fn.tip(db.msg);
                        // _this.$router.push({ path: '/' });
                    }
                }
            })
        },
        // 去门店列表页
        gotoShopList() {
            localStorage.setItem("submit_order_remarks", this.remarks);//存储用户输入的备注信息，跳转回来再取
            this.$router.push({ path: "/shopList" });
        },
        // 确认购买
        confirmPayment() {
            var _this = this;
            var data = {
                goodsId: _this.goodsId || "",
                officeId: _this.office.id || "",
                remarks: _this.remarks || ""
            }
            _this._ajax({
                url: _this.fn.wyl + "orders/subOrders",
                method: 'post',
                data: data,
                callback(db) {
                    if (db.errorCode == 200) {
                        _this.$router.push({ path: "/payment", query: { amountTotal: db.datas.amountTotal, orderNo: db.datas.orderNo, id: db.datas.id } });
                    } else {
                        _this.fn.tip(db.msg)
                    }
                }
            })
        }
    }
}
</script>

<style scoped lang="scss">
@import '../../assets/css/common.scss';
.submitOrder {
    background: $theme-background-gray;
}

.submitOrder section {
    /*height: 5.5rem;*/
    background: #ffffff;
    padding-left: 0.75rem;
}

.submitOrder section:first-child {
    margin-bottom: 0.5rem;
}



/*服务地址*/

.submitOrder section .storeAddress {
    display: flex;
    height: 4.275rem;
    border-bottom: 0.025rem solid #e6e6e6;
}



/*服务时间*/

.submitOrder section .serviceTime {
    height: 2.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.submitOrder section .serviceTime div:first-child {
    margin-right: 0.75rem;
    font-family: PingFangSC;
    font-size: 0.75rem;
    font-weight: 7.5rem;
    color: #333333;
}

.submitOrder section .serviceTime div:last-child {
    margin-right: 0.75rem;
    font-family: PingFangSC;
    font-size: 0.6rem;
    font-weight: 7.5rem;
    color: #cccccc;
}

.submitOrder section .storeAddress .storeAddressTitle {
    flex: 0 0 10%;
    line-height: 4.275rem;
    font-family: PingFangSC;
    font-size: 0.75rem;
    font-weight: 7.5rem;
    text-align: left;
    color: #333333;
}

.submitOrder section .storeAddress .storeAddressContent {
    flex: 0 0 80%;
    text-align: right;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
}

.submitOrder section .storeAddress .storeAddressContent div {
    flex: 1;
    width: 100%;
}

.submitOrder section .storeAddress .storeAddressContent div:first-child {
    position: relative;
    font-size: 0.7rem;
    font-weight: 800;
    color: $theme-blue;
}

.submitOrder section .storeAddress .storeAddressContent div:first-child>span {
    position: absolute;
    right: 0;
    bottom: 0;
}

.submitOrder section .storeAddress .storeAddressContent div:last-child {
    vertical-align: bottom;
    font-family: PingFangSC;
    font-size: 0.65rem;
    font-weight: 7.5rem;
    color: #666666;
    padding-top: 0.35rem;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 10rem;
}

.submitOrder section .storeAddress .storeAddressIcon {
    flex: 0 0 10%;
    line-height: 4.275rem;
    padding-right: 0.45rem;
}



/*商品信息部分*/

.submitOrder .commodityInformation {
    height: 14.6rem;
    /*display: flex;*/
}

.submitOrder .commodityInformation .gateItemShell {
    height: 4.05rem;
    display: flex;
}

.submitOrder .commodityInformation .gateItemShell {
    border-bottom: 0.025rem solid #e6e6e6;
    padding: .75rem 0;
}

.submitOrder .commodityInformation .gateItemShell .gateImg {
    flex: 0 0 2.475rem;
    height: 2.475rem;
}

.submitOrder .commodityInformation .gateItemShell .gateBot {
    flex: 0 0 3.475rem;
    text-align: right;
    padding-right: 0.75rem;
    font-family: PingFangSC;
    font-size: 0.75rem;
    font-weight: 7.5rem;
    color: $price-color;
}

.submitOrder .commodityInformation .gateItemShell .gateTop {
    flex: 1 1 auto;
    padding-left: 0.575rem;
    /*height: 2rem;*/
    font-family: PingFangSC;
    font-size: 0.75rem;
    font-weight: 500;
    letter-spacing: 0.07rem;
    color: #333333;
    text-align: left;
}



/*备注信息*/

.submitOrder .commodityInformation .remarks {
    height: 1.525rem;
    padding-top: 0.8rem;
    padding-right: 0.75rem;
}

.submitOrder .commodityInformation .remarks h3 {
    font-family: PingFangSC;
    font-size: 0.75rem;
    font-weight: 7.5rem;
    color: #333333;
}

.submitOrder .commodityInformation .remarks textarea {
    margin-top: 0.65rem;
    font-family: PingFangSC;
    font-size: 0.6rem;
    font-weight: 7.5rem;
    color: #666666;
    border: 0.025rem solid #e6e6e6;
    -webkit-appearance: none;
}

.submitOrder .lineHidden {
    white-space: normal;
    width: 12rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: box;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}

.submitOrder .remarks h3 {
    text-align: left;
}

.submitOrder .remarks textarea {
    height: 5rem;
    width: 100%;
    border: 0.025rem solid gray;
}

.submitOrder footer {
    position: fixed;
    bottom: 0px;
    left: 0px;
    right: 0px;
    height: 2.45rem;
    line-height: 2.45rem;
    background: #ffffff;
    display: flex;
}

.submitOrder footer div {
    flex: 1;
}

.submitOrder footer div:first-child {
    background: #ffffff;
    flex: 0 0 70.93333333333334%;
}

.submitOrder footer .confirmPayment {
    background-color: $theme-blue;
    font-family: PingFangSC;
    font-size: 0.75rem;
    font-weight: 7.5rem;
    color: #ffffff;
}

.submitOrder footer .paymentContent {
    text-align: right;
    padding-right: 0.75rem;
    font-family: PingFangSC;
    font-size: 0.8rem;
    font-weight: 7.5rem;
    color: #333333;
}

.submitOrder footer .paymentContent .paymentSymbol {
    color: $price-color;
    font-weight: $font-weight;
}

.submitOrder footer .paymentContent .paymentMoney {
    color: $price-color;
    font-weight: $font-weight;
}
</style>