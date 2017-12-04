import Vue from 'vue'
import App from './component/App.vue'
import rHeader from './component/Header.vue'
import Bottom from './component/Bottom.vue'

new Vue({
  el: '#app',
  template: `
    <div>
      <rHeader />
      <App />
      <Bottom />
    </div>
  `,
  components: { App, rHeader, Bottom }
})