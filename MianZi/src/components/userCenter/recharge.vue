<template>
    <div class="account">
        <ul class="info">
            <li @click="selectCard">充值
                <span class="lr">{{cardName}}
                    <i class="arrow"></i>
                </span>
            </li>
            <li>充值金额
                <!-- <input type="text" placeholder="请输入充值金额，如100、200等" v-model="money" @blur="inputMoney">
                                                                                                            <span>元</span> -->

            </li>
            <!-- <li>支付密码 <input type="password" placeholder="请输入支付密码" v-model="payPwd"></li> -->
        </ul>
        <div class="money">
            <div :class="{isActive:isActive===1}" @click="togglePrice(100,1)">100元</div>
            <div :class="{isActive:isActive===2}" @click="togglePrice(300,2)">300元</div>
            <div :class="{isActive:isActive===3}" @click="togglePrice(500,3)">500元</div>
            <div :class="{isActive:isActive===4}" @click="togglePrice(1000,4)">1000元</div>
            <div :class="{isActive:isActive===5}" @click="togglePrice(3000,5)">3000元</div>
            <div :class="{isActive:isActive===6}" @click="togglePrice(5000,6)">5000元</div>
            <!--<div :class="{isActive:isActive===7}" @click="togglePrice(0.01,7)">0.01元(测试)</div>-->
        </div>
        <div class="payTypeTit">支付方式</div>
        <div :class="{payType: true, choose: selected}" @click="select">
            <i class="wechat-icon"></i>
            <span>微信支付</span>
            <i class="selected"></i>
        </div>
        <div v-btn :class="{ok: ableNext, sure: true}" @click="recharge">充值</div>

        <Dialog v-if="dialog" :msg="dialogTxt.msg" :btn="dialogTxt.btn" :okBtn="dialogTxt.okBtn" :cancelBtn="dialogTxt.cancelBtn" @sure="sures" @cancel="cancels">
            <div slot="dialogHtml" class="pop">
                <p class="title">选择会员卡
                    <i class="close" @click="cancels"></i>
                </p>
                <ul class="cardsList">
                    <li v-for="(item, index) in cardList" :key="index" @click="xuan(index)">
                        {{item.cardName}}
                        <i class="gou" v-if="cardInd == index"></i>
                    </li>
                </ul>
            </div>
        </Dialog>

        <Dialog v-if="dialogT" :msg="dialogTxtT.msg" :btn="dialogTxtT.btn" :okBtn="dialogTxtT.okBtn" :cancelBtn="dialogTxtT.cancelBtn" @sure="suresT" @cancel="cancels">

        </Dialog>
    </div>
</template>
<script>
// wapPay
export default {
    name: 'hello',
    data() {
        return {
            title: this.$route.name,
            ableNext: false,
            money: '',
            dialog: false,
            dialogT: false,
            selected: true,
            cardInd: 0,
            cardId: '',
            cardList: [],
            cardName: '',
            payPwd: '',
            dialogTxt: {
                btn: '',
                okBtn: '',
                cancelBtn: '',
                msg: ''
            },
            dialogTxtT: {
                btn: '',
                okBtn: '去设置',
                cancelBtn: '取消',
                msg: '未设置支付密码，请先去账户与安全中去设置！'
            },
            isActive: 0,
            amountTotal: ''
        }
    },
    components: {

    },
    mounted() {
        var self = this;
        self._ajax({
            url: self.fn.wyl + 'card/cardList',
            data: {},
            method: 'post',
            callback(db) {
                if (db.errorCode == 200) {
                    self.cardList = db.datas;
                    if (self.cardList.length) {
                        self.cardName = self.cardList[0].cardName;
                        self.cardId = self.cardList[0].id;
                    } else {
                        self.fn.tip('您还没有会员卡！');
                        var timer = setTimeout(() => {
                            self.$router.go(-1);
                            clearTimeout(timer);
                        }, 3000)

                    }
                } else {
                    self.fn.tip(db.msg);
                }
            }
        })

    },
    methods: {
        togglePrice(price, num) {
            this.amountTotal = price;
            this.isActive = num;
        },
        suresT() {
            this.dialogT = false;
            this.$router.push({ path: '/setPayPwd' });
        },
        select() {
            this.selected = !this.selected;
        },
        selectCard() {
            this.dialog = true;
        },
        sures() {
            this.dialog = false;
            this.cardName = this.cardList[this.cardInd].cardName;
            this.cardId = this.cardList[this.cardInd].id;
        },
        cancels() {
            this.dialog = false;
            this.dialogT = false;
        },
        xuan(ind) {
            this.cardInd = ind;
        },
        inputMoney() {
            // if (this.money % 100 != 0) {
            //     this.fn.tip('请输入整数充值金额,如100、200等');
            // }
        },
        recharge() {
            var self = this;
            if (!self.ableNext) return;
            self._ajax({
                url: self.fn.xqq + 'pay/wapPay',
                data: {
                    orderNo: "",
                    payType: "4",
                    cardId: self.cardId,
                    callBackUrl: location.origin + location.pathname + "#/cardDetail/" + self.cardId,
                    cancelUrl: location.origin + location.pathname + '#/UserCenter',
                    amountTotal: self.amountTotal,
                },
                method: 'post',
                callback(db) {
                    //  return
                    // 微信支付（优化）
                    if (db.errorCode == 200) {
                        // self.fn.tip(db.msg, "12rem");
                        location.href = db.datas.payUrl;
                    } else {
                        self.fn.tip(db.msg, "12rem");
                    }
                }
            })


            // var self = this;
            // if (!self.ableNext) return;
            // self._ajax({
            //     url: self.fn.xqq + 'pay/subCardRecharge',
            //     data: {
            //         amountTotal: self.money,
            //         cardId: self.cardId,
            //         callBackUrl: location.href,
            //         cardPwd: self.payPwd
            //     },
            //     method: 'post',
            //     callback(db) {
            //         if (db.errorCode == 200) {
            //             let dbs = db.datas;
            //             // 微信js调起支付接口
            //             function onBridgeReady() {
            //                 WeixinJSBridge.invoke('getBrandWCPayRequest', {
            //                     "appId": dbs.appId,     // 公众号名称，由商户传入      
            //                     "timeStamp": dbs.timeStamp,         //时间戳，自1970年以来的秒数      
            //                     "nonceStr": dbs.nonceStr, //随机串      
            //                     "package": dbs.package,     //统一订单号  
            //                     "signType": dbs.signType,         //微信签名方式：      
            //                     "paySign": dbs.paySign //支付签名  
            //                 }, function(res) {
            //                     // console.log(res.err_msg, 'WXpay');
            //                     self.money = '';
            //                     self.payPwd = '';
            //                     self.selected = '';
            //                     if (res.err_msg == "get_brand_wcpay_request：ok") {

            //                     }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
            //                 });
            //             }
            //             if (typeof WeixinJSBridge == "undefined") {
            //                 if (document.addEventListener) {
            //                     document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
            //                 } else if (document.attachEvent) {
            //                     document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
            //                     document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
            //                 }
            //             } else {
            //                 onBridgeReady();
            //             }
            //         } else if (db.errorCode == 998) {
            //             location.href = db.datas;
            //         } else if (db.errorCode == 899) {
            //             this.dialogT = true;
            //         } else {
            //             self.fn.tip(db.msg);
            //         }
            //     }
            // })

        }
    },
    watch: {
        amountTotal() { this.ableNext = this.fn.authFn([this.amountTotal, this.selected]) },
        selected() { this.ableNext = this.fn.authFn([this.amountTotal, this.selected]) },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../../assets/css/userCenter/index.scss';

.account {
    .info {
        li {
            input {
                width: 12rem;
                padding-right: .5rem;
                margin-right: 0;
            }
            &:last-child {
                border: none;
            }
            span {
                position: absolute;
                right: .5rem;
                color: #000;
            }
        }
    }
    .money {
        padding: 0.5rem .75rem;
        padding-top: 0;
        display: flex; // align-items: c
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        background-color: #fff;
        >div {
            height: 2.45rem;
            width: 5.4rem;
            background-color: #f5f5f5;
            margin-bottom: 0.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #333333;
            border-radius: 0.1rem;
            &.isActive {
                background-color: #08bae3;
                color: #fff;
            }
        }
    }
    .payTypeTit {
        text-align: left;
        padding-left: .75rem;
        font-size: .65rem;
        color: #999;
        line-height: 2rem;
    }
    .payType {
        text-align: left;
        padding-left: .75rem;
        background: #fff;
        line-height: 3rem;
        &.choose {
            .selected {

                background: url(../../assets/image/icon/userCenter/dui.png) no-repeat center;
                background-size: 100%;
                border: none;
            }
        }
        .wechat-icon {
            display: inline-block;
            width: .8rem;
            height: .8rem;
            background: url(../../assets/image/icon/userCenter/wechat-icon.png) no-repeat center;
            background-size: contain;
            vertical-align: middle;
            margin-right: .5rem;
        }
        .selected {
            width: 1rem;
            height: 1rem;
            display: inline-block;
            border: .05rem solid #e6e6e6;
            border-radius: 50%;
            float: right;
            margin-right: .75rem;
            margin-top: 1.2rem;
        }
    }
    .pop {
        text-align: left;
        .title {
            border-bottom: .05rem solid #e6e6e6;
            padding-bottom: .5rem;
            .close {
                float: right;
                width: 1.2rem;
                height: 1.2rem;
                background: url(../../assets/image/icon/close.png) no-repeat center center;
                background-size: 60%;
            }
        }
        .cardsList {
            max-height: 10rem;
            overflow-y: auto;
            li {
                padding-left: .5rem;
                font-size: .65rem;
                color: #666;
                border-bottom: .05rem solid #e6e6e6;
                line-height: 2.5rem;
                &:last-child {
                    border: none;
                }
                .gou {
                    float: right;
                    width: 1rem;
                    height: 1rem;
                    background: url(../../assets/image/icon/homepage/tick.png) no-repeat center center;
                    background-size: 60%;
                    margin-top: .8rem;
                }
            }
        }
    }
}
</style>
