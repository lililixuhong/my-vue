<template>
  <div class="set">
    <ul class="info">
      <li class="first">头像
        <span class="lr">
          <label for="uploadImg"><img class="headImg" :src="info.headImg" alt=""></label>
          <i class="arrow"></i>
          <input type="file" class="uploadImg" id="uploadImg" @change="uploadImg">
        </span>
      </li>
      <li @click="showLeft">用户昵称
        <span class="lr">{{info.nickname}}
          <i class="arrow"></i>
        </span>
      </li>
      <li>手机账号
        <span class="lr">{{info.mobilePhone}}
          <!-- <i class="arrow"></i> -->
        </span>
      </li>
      <li @click="showLeftSex">性别
        <span class="lr">{{info.sex == 2 ? '女' : '男'}}
          <i class="arrow"></i>
        </span>
      </li>
    </ul>
    <div class="loginout" @click="loginout">退出登录</div>

    <!-- 左边弹出框 -->
    <div :class="{left: typeLeft, aleft: true}">
      <!--头部-->
      <div class="header" style="position:static">
        <div class="left lf" @click="hideLeft">
          <i class="arrow"></i>返回</div>
        <h1>{{popTxt}}</h1>
      </div>
      <div class="content" v-if="nicknameM">
        <input type="text" class="nickname" v-model="nickname" maxlength="11" :placeholder="info.nickname">
      </div>
      <div class="content" v-if="!nicknameM">
        <div class="chooseSex">
          <input type="radio" name="sex" id="man" value="1" v-model="sex">
          <label for="man">男</label>
        </div>
        <div class="chooseSex">
          <input type="radio" name="sex" id="woman" value="2" v-model="sex">
          <label for="woman">女</label>
        </div>
      </div>
      <div v-btn class="sure ok" @click="sureChange">确认</div>
    </div>
  </div>
</template>

<script>
import Axios from 'axios'

export default {
  name: 'hello',
  data() {
    return {
      title: '个人设置',
      info: '',
      typeLeft: false,
      popTxt: '',
      nicknameM: '',
      nickname: '',
      sex: ''
    }
  },
  components: {

  },
  mounted() {
    var self = this;
    self._ajax({
      url: self.fn.wyl + 'member/getMemberInfo',
      data: {},
      method: 'post',
      callback(db) {
        if (db.errorCode == 200) {
          self.info = db.datas;
        } else {
          self.fn.tip(db.msg);
        }
      }
    })
  },
  methods: {
    showLeft() {
      this.typeLeft = true;
      this.nicknameM = true;
      this.popTxt = '修改昵称'
    },
    showLeftSex() {
      this.typeLeft = true;
      this.nicknameM = false;
      this.popTxt = '修改性别'
    },
    hideLeft() {
      this.typeLeft = false;
      this.nickname = '';
      this.sex = '';
    },
    sureChange() {
      var self = this;
      self._ajax({
        url: self.fn.wyl + 'member/updateMemberInfo',
        data: {
          nickname: self.nickname,
          sex: self.sex
        },
        method: 'post',
        callback(db) {
          if (db.errorCode == 200) {
            self.nickname && (self.info.nickname = self.nickname);
            self.sex && (self.info.sex = self.sex);
            self.typeLeft = false;
          } else {
            self.fn.tip(db.msg);
          }
        }
      })
    },
    uploadImg(e) {
      var self = this;
      let file = e.target.files[0];
      let Param = new FormData(); //创建form对象
      Param.append('headImg', file);//通过append向form对象添加数据
      Param.append('token', self.fn.getcookie('key'));//通过append向form对象添加数据
      let config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      };  //添加请求头
      self.$store.dispatch('loading');
      Axios.post(self.fn.wyl + 'member/updateHeadImg', Param, config)
        .then(res => {
          self.$store.dispatch('hideloading');
          var data = res.data;
          if (data.errorCode == 200) {
            self.info.headImg = data.datas;
          } else {
            self.fn.tip(data.msg);
          }
        })
    },
    loginout() {
      var self = this;
      self._ajax({
        url: self.fn.xqq + "logOut",
        method: 'post',
        data: {},
        callback(db) {
          if (db.errorCode == 200) {
            self.fn.delCookie('key');
            self.fn.delCookie('nickname');
            self.fn.delCookie('headImg');
            self.fn.tip('退出成功');
            var timer = setTimeout(() => {
              self.$router.push({ path: '/' });
              clearTimeout(timer);
            }, 3000)
          } else {
            self.fn.tip(db.msg)
          }
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../../assets/css/userCenter/index.scss';
.chooseSex {
  input {
    -moz-appearance: radio;
    -webkit-appearance: radio;
    appearance: radio;
  }
}
</style>
