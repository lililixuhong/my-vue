<template>
    <div class="qrcodes">
        <div class="code">
            <qrcode :value="qrcode" v-if="qrcode" :options="{ size: 170 }"></qrcode>
        </div>
        <div>No.{{num}}</div>
        <p class="tips">扫码支付</p>
    </div>
</template>

<script>
import Qrcode from 'vue-qrcode'

export default {
    name: 'hello',
    data() {
        return {
            id: '',
            num: '',
            key: '',
            deductionMoney: '',
            qrcode: ''
        }
    },
    components: {
        qrcode: Qrcode
    },
    mounted() {
        this.id = this.$route.params.id;
        this.num = this.$route.params.num;
        this.key = this.$route.params.key;
        this.deductionMoney = this.$route.params.d;
        this.qrcode = `cardId=${this.id};
                        cardNumber=${this.num};
                        key=${this.key};
                        deductionMoney=${this.deductionMoney};`;
    },
    methods: {

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../../assets/css/userCenter/index.scss'
</style>
