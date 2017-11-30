<template>
  <div class="loginin">
    <div class="header">
        <div class="left lf">
            <span @click="$router.back(-1)"><i class="arrow"></i></span>
        </div>
      <h1>{{title}}</h1>
    </div>
    <div class="am-login" style="padding-top: 6.5rem;">
        <div class="account">
            <span style="width: 4rem;">新密码</span>
            <input type="text" placeholder="设置新密码" maxlength="20" v-model="newPwd" style="width: 11rem;">
            <i v-if="newPwd" class="del-btn" v-del="newPwd"></i>
        </div>
        <div class="password">
            <span style="width: 4rem;">重复新密码</span>
            <input type="text" placeholder="再次输入密码" maxlength="20" v-model="againPwd" style="width: 11rem;">
            <i v-if="againPwd" class="del-btn" v-del="againPwd"></i>
        </div>
        <div :class="ableNext ? 'submit ok' : 'submit'" style="margin-bottom: 4rem;" v-btn @click="submit">提交</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'hello',
  data () {
    return {
      title: '',
      ableNext: false,
      newPwd: '',
      againPwd: ''
    }
  },
  components: {
      
  },
  mounted(){
    this.title = this.$route.name;
  },
  methods: {
    submit(){
      if(this.ableNext){
        this.$router.push({ path: '/login/loginin', params: { userId: 123 }})
      }
    }
  },
  watch: {
    newPwd(){this.ableNext = this.fn.authFn([this.newPwd,this.againPwd])},
    againPwd(){this.ableNext = this.fn.authFn([this.newPwd,this.againPwd])}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import '../../assets/css/login.scss'
</style>
