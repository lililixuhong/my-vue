<template>
    <div class="footer disFlex">
        <router-link :class="select == 1 ? 'selected flexItem' : 'flexItem'" to="/">
            <i class="first"></i>
            <p>首页</p>
        </router-link>
        <router-link :class="select == 2 ? 'selected flexItem' : 'flexItem'" to="/beautySalon">
            <i class="second"></i>
            <p>店铺</p>
        </router-link>
        <router-link :class="select == 3 ? 'selected flexItem' : 'flexItem'" :to="{path:'orders',query:{type:''}}">
            <i class="third"></i>
            <p>订单</p>
        </router-link>
        <router-link :class="select == 4 ? 'selected flexItem' : 'flexItem'" to="/UserCenter">
            <i class="forth"></i>
            <p>我的</p>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'hello',
    props: [
        'select'
    ],
    data() {
        return {

        }
    },
    mounted() {

    },
    methods: {

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.footer {
    position: fixed;
    width: 100%;
    max-width: 800px;
    padding: 0.3rem 0;
    background: #fafafa;
    border-top: .05rem solid #e7e7e7;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 0);
    a {
        font-size: .75rem;
        color: #666;
        text-align: center;
        i {
            display: inline-block;
            width: 1.2rem;
            height: 1.212rem;
        }
        p {
            font-size: .5rem;
            margin-top: -0.2rem;
        }
        .first {
            background: url(../../../assets/image/icon/beauty-b.png) no-repeat center center;
            background-size: 83.333333%;
        }
        .second {
            background: url(../../../assets/image/icon/store-b.png) no-repeat center center;
            background-size: 83.333333%;
        }
        .third {
            background: url(../../../assets/image/icon/order-b.png) no-repeat center center;
            background-size: 83.333333%;
        }
        .forth {
            background: url(../../../assets/image/icon/mine-b.png) no-repeat center center;
            background-size: 83.333333%;
        }
        &.selected {
            color: #08acd0;
            .first {
                background: url(../../../assets/image/icon/beauty.png) no-repeat center center;
                background-size: 83.333333%;
            }
            .second {
                background: url(../../../assets/image/icon/store.png) no-repeat center center;
                background-size: 83.333333%;
            }
            .third {
                background: url(../../../assets/image/icon/order.png) no-repeat center center;
                background-size: 83.333333%;
            }
            .forth {
                background: url(../../../assets/image/icon/mine.png) no-repeat center center;
                background-size: 83.333333%;
            }
        }
    }
}
</style>
