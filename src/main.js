import vue from 'vue'
import App from './App.vue'

//Vue.config.productionTip = false
vue.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/words'
    : '/',
  chainWebpack: config => {
    config.vue
      .test(/\.scss$/).use(['vue-style-loader', 'css-loader', 'sass-loader',]).end()
      .test('/\.js$/').use('babel-loader')
  },
  productionTip: false
}

new vue({
  render: h => h(App),
}).$mount('#app')
