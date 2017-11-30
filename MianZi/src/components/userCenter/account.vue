<template>
  <div class="account">
      <ul class="info">
        <li><router-link to="/loginPwd">修改登录密码 <span class="lr"><i class="arrow"></i></span></router-link></li>
        <li><router-link to="/setPayPwd">卡支付密码设置 <span class="lr"><i class="arrow"></i></span></router-link></li>
        <li><router-link to="/payPwd">修改支付密码 <span class="lr"><i class="arrow"></i></span></router-link></li>
      </ul>
  </div>
</template>

<script>

export default {
  name: 'hello',
  data () {
    return {
      title: this.$route.name,
      headImg: ''
    }
  },
  components: {
      
  },
  mounted(){
    
  },
  methods: {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import '../../assets/css/userCenter/index.scss'
</style>
