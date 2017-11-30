<template>
    <div class="account">
        <ul class="info">
            <li>旧密码 <input type="password" placeholder="请输入原密码" v-model="oldPwd"></li>
            <li>新密码 <input type="password" placeholder="请输入新密码" v-model="pwd"></li>
            <li>再次输入 <input type="password" placeholder="再次输入新密码" v-model="rePwd"></li>
        </ul>
        <p class="tips">密码由6-20位英文字母、数字或符号组成</p>
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
            oldPwd: '',
            pwd: '',
            rePwd: ''
        }
    },
    components: {

    },
    mounted() {

    },
    methods: {
        set() {
            var self = this;
            if (!self.ableNext) {
                return false;
            }
            if (self.pwd != self.rePwd) {
                self.fn.tip('两次密码输入不一致');
                return false;
            }
            self._ajax({
                url: self.fn.wyl + "member/updatePwd",
                method: 'post',
                data: {
                    oldPwd: self.oldPwd,
                    newPwd: self.rePwd
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
        rePwd() { this.ableNext = this.fn.authFn([this.rePwd, this.pwd, this.oldPwd]) },
        oldPwd() { this.ableNext = this.fn.authFn([this.rePwd, this.pwd, this.oldPwd]) },
        pwd() { this.ableNext = this.fn.authFn([this.rePwd, this.pwd, this.oldPwd]) }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../../assets/css/userCenter/index.scss'
</style>
