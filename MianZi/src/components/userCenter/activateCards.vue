<template>
    <div class="account">
        <ul class="info">
            <li>卡号 <input type="text" placeholder="请输入会员卡号" v-model="code"></li>
            <li>卡密 <input type="text" placeholder="请刮开背面验证密码" v-model="auth"></li>
            <!-- <li>支付密码 <input type="password" placeholder="请输入6位数字支付密码" v-model="pwd"></li> -->
        </ul>
        <div v-btn :class="{ok: ableNext, sure: true}" @click="active">确定</div>
        <Dialog v-if="dialogT" :msg="dialogTxtT.msg" :btn="dialogTxtT.btn" :okBtn="dialogTxtT.okBtn" :cancelBtn="dialogTxtT.cancelBtn" @sure="suresT" @cancel="cancels">

        </Dialog>
    </div>
</template>

<script>

export default {
    name: 'hello',
    data() {
        return {
            title: this.$route.name,
            ableNext: false,
            pwd: '',
            code: '',
            auth: '',
            dialogT: false,
            dialogTxtT: {
                btn: '',
                okBtn: '去设置',
                cancelBtn: '取消',
                msg: '未设置支付密码，请先去账户与安全中去设置！'
            }
        }
    },
    components: {

    },
    mounted() {

    },
    methods: {
        suresT() {
            this.dialogT = false;
            this.$router.push({ path: '/setPayPwd' });
        },
        cancels() {
            this.dialogT = false;
        },
        active() {
            var self = this;
            if (!self.ableNext) {
                return false;
            }
            self._ajax({
                url: self.fn.wyl + "card/activity",
                method: 'post',
                data: {
                    cardNumber: self.code,
                    password: self.auth,
                },
                callback(db) {
                    if (db.errorCode == 200) {
                        self.fn.tip('激活成功');
                        var timer = setTimeout(() => {
                            self.$router.push({ path: '/UserCenter' });
                            clearTimeout(timer);
                        }, 3000)
                    } else if (db.errorCode == 899) {
                        self.fn.tip('激活成功。');
                        var timer = setTimeout(function() {
                            self.dialogT = true;
                            clearTimeout(timer)
                        }, 3000)
                    } else {
                        self.fn.tip(db.msg)
                    }
                }
            })
        }
    },
    watch: {
        code() { this.ableNext = this.fn.authFn([this.auth, this.code]) },
        auth() { this.ableNext = this.fn.authFn([this.auth, this.code]) },

        /**
         *   code() { this.ableNext = this.fn.authFn([this.auth, this.pwd, this.code]) },
        auth() { this.ableNext = this.fn.authFn([this.auth, this.pwd, this.code]) },
        pwd() { this.ableNext = this.fn.authFn([this.auth, this.pwd, this.code]) }
         * **/
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../../assets/css/userCenter/index.scss'
</style>
