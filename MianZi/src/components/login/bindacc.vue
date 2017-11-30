<template>
  <div class="loginin">
    <div class="header">
        <div class="left lf">
            <span @click="$router.back(-1)"><i class="arrow"></i></span>
        </div>
      <h1>{{title}}</h1>
    </div>
    <div class="am-login">
        <div class="account">
            <span>账号</span>
            <input type="text" placeholder="输入手机号/艾美账号" v-model="account">
            <i v-if="account" class="del-btn" v-del="account"></i>
        </div>
        <div class="password">
            <span>密码</span>
            <input type="password" placeholder="输入密码" v-model="pwd">
            <i v-if="pwd" class="del-btn" v-del="pwd"></i>
        </div>
        <div :class="ableNext ? 'submit ok' : 'submit'" @click="binding" v-btn>绑定</div>
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
      account: '',
      pwd: ''
    }
  },
  components: {
      
  },
  mounted(){
    this.title = this.$route.name;
  },
  methods: {
    binding(){
        if(this.ableNext){
            this.closelogin();
        }
    }
  },
  watch: {
    account(){this.ableNext = this.fn.authFn([this.account,this.pwd])},
    pwd(){this.ableNext = this.fn.authFn([this.account,this.pwd])}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import '../../assets/css/login.scss'
</style>
