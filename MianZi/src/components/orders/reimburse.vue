<template>
    <div class="reimburse">
        <div class="top">
            退款规则
            <span class="ArrowSpan">
                <router-link :to='{path:"rule"}'>
                    <i class="arrow"></i>
                </router-link>
            </span>
        </div>
        <div style="width:100%;height:0.5rem;background-color:#f2f2f2;"></div>
        <div class="info">
            <div class="tit">退款原因</div>
            <p @click="toggle(1,'与技师（或门店）达成一致，取消订单')" :class="{active:isInfo===1}">与技师（或门店）达成一致，取消订单
                <span>
                    <img v-if="isInfo===1" src="../../assets/image/icon/orders/tick02.png" alt="">
                </span>
            </p>
            <p @click="toggle(2,'我想换个门店（或服务地址）')" :class="{active:isInfo===2}">我想换个门店（或服务地址）
                <span><img v-if="isInfo===2" src="../../assets/image/icon/orders/tick02.png" alt=""></span>
            </p>
            <p @click="toggle(3,'我不想要这个服务（或商品）')" :class="{active:isInfo===3}">我不想要这个服务（或商品）
                <span><img v-if="isInfo===3" src="../../assets/image/icon/orders/tick02.png" alt=""></span>
            </p>
            <p @click="toggle(4,'其他')" :class="{active:isInfo===4}">其他
                <span><img v-if="isInfo===4" src="../../assets/image/icon/orders/tick02.png" alt=""></span>
            </p>
            <textarea maxlength="200" v-if="isInfo===4" v-model="textval" placeholder="请填写取消原因，以帮助我们改进服务，您可以输入200字。" class="info"></textarea>
        </div>
        <div class="sub" @click="sub">确认提交</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            info: "",
            isInfo: "",
            orderNo: "",
            textval: "",
            text: ""
        }
    },
    created() {
        this.orderNo = this.$route.query.orderNo;
    },
    methods: {
        toggle(num, str) {
            if (num === 4) {

            } else {
                this.text = str;
            }
            this.isInfo = num;
        },
        // 申请退款
        retreat() {
            var url = this.fn.wyl + "orders/applyRefund";
            var _this = this;
            this._ajax({
                url: url,
                method: 'post',
                data: {
                    orderNo: this.orderNo,
                    returnReason: this.text
                },
                callback(db) {
                    if (db.errorCode === '200') {
                        _this.fn.tip("申请成功");
                        _this.$router.push({ path: 'orders', query: { type: '2' } })
                    }
                }
            })
        },
        sub() {
            if (this.isInfo === 4) {
                this.text = this.textval;
            }
            this.retreat()

        }
    }
}
</script>

<style scoped lang="scss">
.reimburse {
    text-align: left;
    .top {
        position: relative;
        padding: 0.75rem;
        span {
            position: absolute;
            top: 0.6rem;
            right: 0.75rem;
        }
    }
    .info {
        padding: 0 0.75rem;
        .tit {
            padding: 0.75rem 0;
            border-bottom: 1px solid #e6e6e6;
        }
        >p {
            padding: 0.7rem 0;
            border-bottom: 1px solid #e6e6e6;
            position: relative;
            color: #666666;
            font-size: 0.6rem;
            span {
                position: absolute;
                display: inline-block;
                width: 1rem;
                height: 1rem;
                border-radius: 50%;
                border: 1px solid #999;
                top: 0.6rem;
                right: 0px;
                img {
                    width: 60%;
                    height: 60%;
                    margin-top: 20%;
                    margin-left: 20%;
                }
            }
            &.active {
                span {
                    background-color: #11abcf;
                    border: 1px solid #11abcf;
                }
            }
        }
        textarea.info {
            height: 3rem;
            background-color: #ccc;
            width: 100%;
            padding: 0.3rem;
        }
    }
    .sub {
        width: 80%;
        margin: 0 auto;
        margin-top: 0.2rem;
        height: 2rem;
        line-height: 2rem;
        background-color: #11abcf;
        text-align: center;
        color: #fff;
        border-radius: 1rem;
    }
}
</style>