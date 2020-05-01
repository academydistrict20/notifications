import Vue from 'vue'
import App from './App.vue'
import VuePortal from '@linusborg/vue-simple-portal'

Vue.config.productionTip = false
Vue.use(VuePortal, {
  name: 'portal' // optional, use to rename component
})
new Vue({
  render: h => h(App)
}).$mount('#app')
