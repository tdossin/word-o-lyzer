const path = require('path');
console.warn('aw shitxxxx');

const config = {
    entry: './src/index.js',
    resolve: {
        descriptionFiles: ['package.json'],
        modules: ['/node_modules']
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'main.js'
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ],
    mode: 'development',
    rules: [
        // ... other rules omitted

        // this will apply to both plain `.scss` files
        // AND `<style lang="scss">` blocks in `.vue` files
        {
            test: /\.scss$/,
            use: [
                'vue-style-loader',
                'css-loader',
                'sass-loader'
            ]
        }
    ]
};

module.exports = config;