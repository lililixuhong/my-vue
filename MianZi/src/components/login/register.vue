<template>
  <div class="loginin">
    <div class="header">
      <div class="left lf">
        <router-link :to="'/login/loginin?redirect=' + prevUrl">
          <i class="arrow"></i>
        </router-link>
      </div>
      <h1>{{title}}</h1>
    </div>
    <div class="am-login" style="padding-top: 6.5rem;">
      <div class="account">
        <span>手机号</span>
        <input style="width: 7.5rem;" type="text" placeholder="输入手机号" maxlength="11" v-model="tel">
        <i v-if="tel" class="del-btn" v-del="tel"></i>
        <div class="getAuth"><input v-getCode :name="tel" value="获取验证码" type="button" @click="getCode"></div>
      </div>
      <div class="auth">
        <span>验证码</span>
        <input type="text" placeholder="输入验证码" maxlength="6" v-model="auth">
        <i v-if="auth" class="del-btn" v-del="auth"></i>
      </div>
      <div class="password">
        <span>设置密码</span>
        <input type="password" placeholder="数字与英文混合，6位以上" maxlength="20" v-model="pwd">
        <i v-if="pwd" class="del-btn" v-del="pwd"></i>
      </div>
      <div class="protoct">
        <!-- <i class="agree" @click="Agree($event)"></i> -->
        <div class="protoctContent">
          <span class="yijian">注册即代表您同意</span>
          <router-link to="/login/protoct">《面子用户协议》</router-link>
        </div>
      </div>
      <div :class="ableNext ? 'submit ok' : 'submit'" style="margin-bottom: 4rem;" v-btn @click="registe">注册</div>
    </div>
    <div class="otherLogin">
      <router-link :to="'/login/loginin?redirect=' + prevUrl">已有账号，去登录</router-link>
    </div>
  </div>
</template>

<script>

export default {
  name: 'hello',
  data() {
    return {
      title: this.$route.name,
      ableNext: false,
      tel: '',
      auth: '',
      pwd: '',
      isAgree: false,
      prevUrl: this.$route.query.redirect
    }
  },
  components: {

  },
  mounted() {

  },
  methods: {
    registe() {
      var _this = this;

      if (_this.ableNext) {

        if (!_this.fn.is_tel(_this.tel)) return _this.fn.tip('手机号有误');
        if (!_this.fn.is_pwd(_this.pwd)) return _this.fn.tip('密码格式错误');

        _this._ajax({
          url: _this.fn.xqq + "register",
          method: 'post',
          data: {
            mobilePhone: _this.tel,
            pwd: _this.pwd,
            code: _this.auth
          },
          callback(db) {
            if (db.errorCode == 200) {
              // _this.$router.push({ path: '/login/loginin' });

              _this._ajax({
                url: _this.fn.wyl + "login",
                method: 'post',
                data: {
                  mobilePhone: _this.tel,
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
            } else {
              _this.fn.tip(db.msg)
            }
          }
        })
      }
    },
    Agree(e) {
      this.isAgree = !this.isAgree;
      var el = e.target;
      if (this.isAgree) {
        el.style.border = "1px solid #11abcf";
        el.style.backgroundColor = "#11abcf";
      } else {
        el.style.backgroundColor = "#fff";
        el.style.border = "1px solid #999";
      }
    },
    getCode() {
      var vm = this;
      if (!this.fn.is_tel(this.tel)) {
        this.fn.tip("手机号码有误")
        return
      }
      this._ajax({
        url: this.fn.xqq + "getCode",
        method: 'post',
        data: {
          tel: this.tel
        },
        callback(db) {
          if (db.errorCode == 200) {
            vm.fn.tip('验证码发送成功')
          } else {
            vm.fn.tip(db.msg)
          }
        }
      })


    }
  },
watch: {
tel() { this.ableNext = this.fn.authFn([this.tel, this.auth, this.pwd]) },
auth() { this.ableNext = this.fn.authFn([this.tel, this.auth, this.pwd]) },
pwd() { this.ableNext = this.fn.authFn([this.tel, this.auth, this.pwd]) },

}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import '../../assets/css/login.scss';
.yijian {
  color: #000;
}
</style>
