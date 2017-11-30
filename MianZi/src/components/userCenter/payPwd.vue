<template>
    <div class="account">
        <ul class="info">
            <li>旧密码 <input type="password" maxlength="6" placeholder="请输入6位原数字支付密码" v-model="oldPwd"></li>
            <li>新密码 <input type="password" maxlength="6" placeholder="请输入6位数字支付密码" v-model="pwd"></li>
            <li>再次输入 <input type="password" maxlength="6" placeholder="请再次输入新的支付密码" v-model="rePwd"></li>
        </ul>
        <div v-btn :class="{ok: ableNext, sure: true}" @click="set">确定</div>
        <router-link to="/findPayPwd" class="forgotPwd">忘记支付密码？</router-link>
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
            oldPwd: '',
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
            var self = this;

            if (!this.checkPwd(this.pwd)) {
                return
            }
            if (!this.checkPwd(this.oldPwd)) {
                return
            }
            if (!this.checkPwd(this.rePwd)) {
                return
            }


            if (!self.ableNext) {
                return false;
            }
            if (self.pwd != self.rePwd) {
                self.fn.tip('两次密码输入不一致');
                return false;
            }
            self._ajax({
                url: self.fn.wyl + "member/updatePaypwd",
                method: 'post',
                data: {
                    oldPayPwd: self.oldPwd,
                    newPayPwd: self.rePwd
                },
                callback(db) {
                    if (db.errorCode == 200) {
                        self.fn.tip('修改成功');
                        var timer = setTimeout(() => {
                            self.$router.go(-1);
                            clearTimeout(timer);
                        }, 3000)
                    } else {
                        self.fn.tip(db.msg);
                    }
                }
            })

        }
    },
    watch: {
        oldPwd() { this.ableNext = this.fn.authFn([this.rePwd, this.pwd, this.oldPwd]) },
        rePwd() { this.ableNext = this.fn.authFn([this.rePwd, this.pwd, this.oldPwd]) },
        pwd() { this.ableNext = this.fn.authFn([this.rePwd, this.pwd, this.oldPwd]) }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../../assets/css/userCenter/index.scss'
</style>
