// vue.config.js [the real one.]
// already inported 'vue' in main.js
{
    exports = {
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
}