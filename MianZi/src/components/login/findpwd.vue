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
        <input style="width: 7.5rem" type="text" maxlength="11" placeholder="输入注册手机号" v-model="tel">
        <i v-if="tel" class="del-btn" v-del="tel"></i>
        <div class="getAuth"><input value="获取验证码" :name="tel" v-getCode type="button" @click="getCode"></div>
      </div>
      <div class="auth">
        <span>验证码</span>
        <input type="text" maxlength="6" placeholder="输入验证码" v-model="auth">
        <i v-if="auth" class="del-btn" v-del="auth"></i>
      </div>
      <div class="auth">
        <span style="width: 4.5rem;">输入密码</span>
        <input type="password" placeholder="设置新密码" maxlength="20" v-model="pwd" style="width: 10rem;">
        <i v-if="pwd" class="del-btn" v-del="pwd"></i>
      </div>
      <div class="auth">
        <span style="width: 4.5rem;">重复输入密码</span>
        <input type="password" placeholder="再次输入密码" maxlength="20" v-model="repwd" style="width: 10rem;">
        <i v-if="repwd" class="del-btn" v-del="repwd"></i>
      </div>
      <div :class="ableNext ? 'submit ok' : 'submit'" style="margin-bottom: 4rem;" v-btn @click="next">提交</div>
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
      repwd: '',
      prevUrl: this.$route.query.redirect
    }
  },
  components: {

  },
  mounted() {

  },
  methods: {
    next() {
      var _this = this;
      if (_this.ableNext) {
        if (_this.pwd != _this.repwd) {
          _this.fn.tip('两次密码输入不一致');
          return false
        }
        _this._ajax({
          url: _this.fn.xqq + "retrievePwd",
          method: 'post',
          data: {
            mobilePhone: _this.tel,
            pwd: _this.pwd,
            code: _this.auth
          },
          callback(db) {
            if (db.errorCode == 200) {
              _this.fn.tip('修改成功');
              var timer = setTimeout(() => {
                _this.$router.push({ path: '/login/loginin', query: { redirect: _this.prevUrl } });
                clearTimeout(timer);
              }, 3000)
            } else {
              _this.fn.tip(db.msg)
            }
          }
        })
      }
    },
    getCode() {
      var _this = this;
      if (!_this.fn.is_tel(this.tel)) {
        _this.fn.tip("手机号码有误")
        return
      }
      _this._ajax({
        url: _this.fn.xqq + "getCode",
        method: 'post',
        data: {
          tel: _this.tel
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
    tel() { this.ableNext = this.fn.authFn([this.tel, this.auth, this.pwd, this.repwd]) },
    auth() { this.ableNext = this.fn.authFn([this.tel, this.auth, this.pwd, this.repwd]) },
    pwd() { this.ableNext = this.fn.authFn([this.tel, this.auth, this.pwd, this.repwd]) },
    repwd() { this.ableNext = this.fn.authFn([this.tel, this.auth, this.pwd, this.repwd]) }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../../assets/css/login.scss'
</style>
