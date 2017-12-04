import Vue from 'vue'
import App from './component/App.vue'

new Vue({
  el: '#app',
  template: `
    <div>
      <App />
    </div>
  `,
  components: { App }
})