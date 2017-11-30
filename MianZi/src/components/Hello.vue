<template>
  <transition>
    <div class="hello">
      <Loading v-if="$store.getters.loading"></Loading>
      <h1>{{ msg }}</h1>
      <h2>Essential Links</h2>
      <ul>
        <li>
          <a href="https://vuejs.org" target="_blank">Core Docs</a>
        </li>
        <li>
          <a href="https://forum.vuejs.org" target="_blank">Forum</a>
        </li>
        <li>
          <a href="https://gitter.im/vuejs/vue" target="_blank">Gitter Chat</a>
        </li>
        <li>
          <a href="https://twitter.com/vuejs" target="_blank">Twitter</a>
        </li>
        <br>
        <li>
          <a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a>
        </li>
      </ul>
      <h2>Ecosystem</h2>
      <ul>
        <li>
          <a href="http://router.vuejs.org/" target="_blank">vue-router</a>
        </li>
        <li>
          <a href="http://vuex.vuejs.org/" target="_blank">vuex</a>
        </li>
        <li>
          <a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a>
        </li>
        <li>
          <a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a>
        </li>
      </ul>
  
      <!-- CheckBox -->
      <div>
        <div>
          <input type='checkbox' :checked="checkboxData.length == checkboxModel.length" v-check-all="checkboxData" checkArr="checkboxModel">全选
          <div v-for='(checkb, index) in checkboxData' :key="index">
            <input type='checkbox' name='checkboxinput' v-model='checkboxModel' :value='checkb.id'>{{checkb.value}}
          </div>
        </div>
      </div>
  
      <!-- select -->
      <select v-model="selected">
        <option v-for="(option, index) in options" :key="index" :value="option.value">
          {{ option.text }}
        </option>
      </select>
      <span>Selected: {{ selected }}</span>
  
      <!-- filter -->
      <div>
        <input type="text" v-model="search">
        <!-- <div v-for="opt in sum" :key="opt">{{opt.val | sum}}</div> -->
        <div v-for="(opt, index) in searchData" :key="index">{{opt.name}} 价格： {{opt.price}}</div>
      </div>

      <div id="allmap"></div>
  
      <Footer :select="1"></Footer>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'hello',
  data() {
    return {
      date: '日期',
      msg: 'Welcome to Your Vue.js App',
      checkboxData: [{
        id: '1',
        value: '苹果'
      }, {
        id: '2',
        value: '荔枝'
      }, {
        id: '3',
        value: '香蕉'
      }, {
        id: '4',
        value: '火龙果'
      }],
      checkboxModel: ['1', '3', '4'],
      selected: 'A',
      options: [
        { text: 'One', value: 'A' },
        { text: 'Two', value: 'B' },
        { text: 'Three', value: 'C' }
      ],
      sum: [
        { name: '苹果', price: 25, category: "水果" },
        { name: '香蕉', price: 15, category: "水果" },
        { name: '雪梨', price: 65, category: "水果" },
        { name: '宝马', price: 2500, category: "汽车" },
        { name: '奔驰', price: 10025, category: "汽车" },
        { name: '柑橘', price: 15, category: "水果" },
        { name: '奥迪', price: 25, category: "汽车" }],
      search: ''
    }
  },
  computed: {
    searchData() {
      var search = this.search;

      if (search) {
        return this.sum.filter(function (product) {
          return Object.keys(product).some(function (key) {
            return String(product[key]).toLowerCase().indexOf(search) > -1
          })
        })
      }

      return this.sum;
    }
  },
  mounted() {
    this._ajax({
      url: 'http://meet.amyun.cn/api/sign/signStatistics',
      data: { meet_id: 1 },
      callback(db) {
        console.log(db)
      },
      fail(err) {
        console.log(err)
      }
    });

    
    new BMap.Geolocation().getCurrentPosition(function (position) {  
      var currla = position.latitude;
      var currlo = position.longitude;

      console.log(position);
      var map = new BMap.Map("allmap");    // 创建Map实例
      var point = new BMap.Point(currlo, currla);
      map.centerAndZoom(point, 15);  // 初始化地图,设置中心点坐标和地图级别
      map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
      map.setCurrentCity("深圳");          // 设置地图显示的城市 此项是必须设置的
      var marker = new BMap.Marker(point);// 创建标注
      map.addOverlay(marker);             // 将标注添加到地图中
      map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
                    
    });


    // websocket
    // this.testWebSocket();
  },
  methods: {
    testWebSocket() {
      let wsUri = "ws://echo.websocket.org/";
      let websocket = new WebSocket(wsUri);

      websocket.onopen = function (evt) { console.log(evt, 'open') };
      websocket.onerror = function (evt) { console.log(evt, 'error') };
      websocket.onmessage = function (evt) { console.log(evt, 'message') };
      websocket.onclose = function (evt) { console.log(evt, 'close') };
      console.log(websocket);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.hello {
  padding: 2.5rem 0;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
  li {
    display: inline-block;
    margin: 10px 20px;
    a {
      color: #42b983;
    }
  }
}
#allmap {
  width: 100%;
  height: 20rem;
}

select,
input {
  border: .05rem solid #ccc;
}
</style>
