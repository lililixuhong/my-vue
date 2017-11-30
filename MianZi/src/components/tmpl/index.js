import dialogComponent from './dialog/dialog.vue'
import footerComponent from './footer/footer.vue'
import loadingComponent from './loading/loading.vue'
import myLoading from './hgtloading.vue'
import slide from './slide.vue'
const tmpl = {
  install: function (Vue) {
    Vue.component('Dialog', dialogComponent)
    Vue.component('Footer', footerComponent)
    Vue.component('Loading', loadingComponent)
    Vue.component('myLoading', myLoading)
    Vue.component("slide", slide)
  } //'Loading'这就是后面可以使用的组件的名字，install是默认的一个方法
};
export default tmpl;
