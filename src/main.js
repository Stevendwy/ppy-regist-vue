import Vue from 'vue'
import App from './App.vue'
import store from './component/store'
import axios from 'axios'

Vue.prototype.$axios = axios

new Vue({
  el: '#app',
  store,
  template: '<App />',
  components: { App }
})
