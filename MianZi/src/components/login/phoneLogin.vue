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
    <div class="am-login">
      <div class="account phone">
        <span>手机号</span>
        <input style="width: 7.5rem" type="text" autocomplete="off" placeholder="输入手机号" maxlength="11" v-model="account">
        <i v-if="account" class="del-btn" v-del="account"></i>
        <div class="code"><input id="verifyCode" v-getCode :name="account" value="获取验证码" type="button" @click="getCode"></div>
      </div>
      <div class="password">
        <span>验证码</span>
        <input type="text" autocomplete="off" placeholder="输入验证码" maxlength="6" v-model="code">
        <i v-if="code" class="del-btn" v-del="code"></i>
      </div>
      <div :class="ableNext ? 'submit ok' : 'submit'" @click="logining" v-btn>登录</div>
      <div class="otherHandle clear">
        <router-link :to="'/login/register?redirect=' + prevUrl" class="register">免费注册</router-link>
        <router-link :to="'/login/findpwd?redirect=' + prevUrl" class="forgot">忘记密码？</router-link>
      </div>
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
      account: '',
      code: '',
      prevUrl: this.$route.query.redirect
    }
  },
  components: {
  },

  mounted() {

  },
  methods: {
    logining() {
      var _this = this;
      if (_this.ableNext) {
        _this._ajax({
          url: _this.fn.xqq + "login",
          method: 'post',
          data: {
            mobilePhone: _this.account,
            code: _this.code
          },
          callback(db) {
            if (db.errorCode == 200) {
              _this.fn.addcookie('key', db.datas.token, 7);
              _this.$router.push({ path: _this.$route.query.redirect });
            } else {
              _this.fn.tip(db.msg)
            }
          }
        })
      }
    },
    // closelogin() {
    //   this.$router.go(-1);
    // },
    getCode() {
      var _this = this;
      if (!_this.fn.is_tel(_this.account)) {
        _this.fn.tip("手机号码有误")
        return
      }
      _this._ajax({
        url: _this.fn.xqq + "getCode",
        method: 'post',
        data: {
          tel: _this.account
        },
        callback(db) {
          if (db.errorCode == 200) {
            _this.fn.tip('验证码发送成功')
          } else {
            _this.fn.tip(db.msg)
          }
        }
      })
    }
  },
  watch: {
    account() { this.ableNext = this.fn.authFn([this.account, this.code]) },
    code() { this.ableNext = this.fn.authFn([this.account, this.code]) }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../../assets/css/login.scss';
.phone {
  position: relative;
  .code {
    position: absolute;
    border-left: 1px solid #e6e6e6;
    padding-left: 1rem;
    right: 1rem;
    top: 0.5rem;
    >input#verifyCode {
      width: auto;
      line-height: normal;
      color: #11abcf;
      background: none;
    }
  }
}
</style>
