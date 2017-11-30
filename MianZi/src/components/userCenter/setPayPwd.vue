<template>
    <div class="account">
        <ul class="info">
            <li>支付密码 <input type="password" maxlength="6" placeholder="请输入6位数字支付密码" v-model="pwd"></li>
            <li>确认密码 <input type="password" maxlength="6" placeholder="请输入6位数字支付密码" v-model="rePwd"></li>
        </ul>
        <div v-btn :class="{ok: ableNext, sure: true}" @click="set">确定</div>
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
            rePwd: ''
        }
    },
    components: {

    },
    mounted() {

    },
    methods: {
        checkPwd(value) {
            var reg = new RegExp("^[0-9]*$");
            if (!reg.test(value) || value.length != 6) {
                this.fn.tip('只能输入6位的纯数字');
                this.ableNext = false;
                return false;
            } else {
                return true;
            }
        },
        set() {

            if (!this.checkPwd(this.pwd)) {
                return
            }
            if (!this.checkPwd(this.rePwd)) {
                return
            }

            var self = this;

            if (!self.ableNext) {
                return false;
            }
            if (self.pwd != self.rePwd) {
                self.fn.tip('两次密码输入不一致');
                return false;
            }

            self._ajax({
                url: self.fn.wyl + "member/setPaypwd",
                method: 'post',
                data: {
                    payPwd: self.rePwd
                },
                callback(db) {
                    if (db.errorCode == 200) {
                        self.fn.tip('设置成功');
                        var timer = setTimeout(() => {
                            // self.$router.go(-1);
                            self.$router.push({ path: '/UserCenter' });
                            // /UserCenter
                            clearTimeout(timer);
                        }, 2000)
                    } else {
                        self.fn.tip(db.msg);
                        var timer = setTimeout(() => {
                            self.$router.go(-1);
                            clearTimeout(timer);
                        }, 3000)
                    }
                }
            })

        }
    },
    watch: {
        rePwd() { this.ableNext = this.fn.authFn([this.rePwd, this.pwd]) },
        pwd() { this.ableNext = this.fn.authFn([this.rePwd, this.pwd]) }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../../assets/css/userCenter/index.scss'
</style>
