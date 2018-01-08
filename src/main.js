import Vue from 'vue'
import App from './App.vue'
import store from './component/store'

new Vue({
  el: '#app',
  store,
  template: '<App />',
  components: { App }
})
