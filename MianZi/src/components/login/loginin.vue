<template>
    <div class="loginin">
        <div class="header">
            <div class="left lf">
                <span class="closeLogin" @click="closelogin"></span>
            </div>
            <h1>{{title}}</h1>
        </div>

        <div class="am-login">
            <div class="account">
                <span>账号</span>
                <input type="text" maxlength="11" autocomplete="off" placeholder="输入手机号/账号" v-model="account">
                <i v-if="account" class="del-btn" v-del="account"></i>
            </div>
            <div class="password">
                <span>密码</span>
                <input type="password" maxlength="20" autocomplete="off" placeholder="输入密码" v-model="pwd">
                <i v-if="pwd" class="del-btn" v-del="pwd"></i>
            </div>
            <div class="shortcut">
                <router-link :to="'/login/phone?redirect=' + prevUrl" class="register">快捷登录</router-link>
            </div>
            <div :class="{submit: true, ok: ableNext}" @click="logining" v-btn>登录</div>
            <div class="otherHandle clear">
                <router-link :to="'/login/register?redirect=' + prevUrl" class="register">免费注册</router-link>
                <router-link :to="'/login/findpwd?redirect=' + prevUrl" class="forgot">忘记密码？</router-link>
            </div>
        </div>
        <!-- <div class="otherLogin">
                                    <p>其他登录方式</p>
                                    <div class="loginBtnList disFlex">
                                        <div class="flexItem loginBtn">
                                            <i></i>
                                        </div>
                                        <div class="flexItem loginBtn"></div>
                                        <div class="flexItem loginBtn"></div>
                                    </div>
                                </div> -->
    </div>
</template>

<script>

export default {
    name: 'hello',
    data() {
        return {
            title: this.$route.name,
            ableNext: false,
            account: '',
            pwd: '',
            prevUrl: this.$route.query.redirect,
            originUrl: ''
        }
    },
    components: {
    },

    mounted() {
        
    },
    methods: {
        logining() {
            let _this = this;
            if (_this.ableNext) {
                _this._ajax({
                    url: _this.fn.wyl + "login",
                    method: 'post',
                    data: {
                        mobilePhone: _this.account,
                        pwd: _this.pwd
                    },
                    callback(db) {
                        if (db.errorCode == 200) {
                            _this.fn.addcookie('key', db.datas.token, 7);
                            _this.fn.addcookie('headImg', db.datas.headImg, 7);
                            _this.fn.addcookie('nickname', db.datas.nickname, 7);
                            if (_this.prevUrl) {
                                _this.$router.push({ path: _this.prevUrl });
                            } else {
                                _this.$router.push({ path: '/' });
                            }
                        } else {
                            _this.fn.tip(db.msg)
                        }
                    }
                })
            }
        },
        closelogin() {
            if (/login/g.test(this.originUrl) || this.originUrl) {
                this.$router.push({ path: '/' });
            } else {
                this.$router.go(-1);
            }
        }
    },
    beforeRouteEnter(to, from, next) {
        next( el => {
            el.originUrl = from.path;
        });
    },
    watch: {
        account() { this.ableNext = this.fn.authFn([this.account, this.pwd]) },
        pwd() { this.ableNext = this.fn.authFn([this.account, this.pwd]) }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../../assets/css/login.scss'
</style>
