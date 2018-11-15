// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import 'iview/dist/styles/iview.css'
import './../src/assets/css/coverIview.css'
import './../src/assets/css/normal.css'
import {
  Row,
  Col,
  Icon,
  Card,
  Input,
  Button,
  LoadingBar,
  CellGroup,
  Cell,
  Spin,
  BackTop,
  Carousel,
  CarouselItem,
  Checkbox,
  Notice,
  Message,
  Modal
} from 'iview'

Vue.component('Row', Row)
Vue.component('Col', Col)
Vue.component('Icon', Icon)
Vue.component('Card', Card)
Vue.component('Input', Input)
Vue.component('Button', Button)
Vue.component('CellGroup', CellGroup)
Vue.component('Cell', Cell)
Vue.component('Spin', Spin)
Vue.component('BackTop', BackTop)
Vue.component('Carousel', Carousel)
Vue.component('CarouselItem', CarouselItem)
Vue.component('Checkbox', Checkbox)
Vue.component('Notice', Notice)
Vue.component('Message', Message)
Vue.component('Modal', Modal)


axios.defaults.baseURL = 'http://localhost:2333'
Vue.prototype.$http = axios
Vue.prototype.$Loading = LoadingBar
Vue.prototype.$Notice = Notice
Vue.prototype.$Message = Message
Vue.prototype.$IVIEW = {}

Notice.config({
  top: 200,
  duration: 2
});

Vue.config.productionTip = false



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})


