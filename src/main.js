import vue from 'vue'
import App from './App.vue'

//Vue.config.productionTip = false

new vue({
  render: h => h(App),
}).$mount('#app')
