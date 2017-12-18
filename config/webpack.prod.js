const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin"); //分离css
const UglifyJSPlugin = require('uglifyjs-webpack-plugin'); //压缩js
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); //压缩
const HtmlWebpackPlugin = require('html-webpack-plugin'); //编译html
module.exports = {
    //入口文件
    entry: {
        index: [
            path.join(__dirname, '../src/public/scripts/index.es'),
            path.join(__dirname, '../src/public/scripts/addNum.js')

        ],
        tag: [
            path.join(__dirname, '../src/public/scripts/tag.es'),
            path.join(__dirname, '../src/public/scripts/star.es')
        ]
    },
    //输出文件
    output: {
        filename: 'public/scripts/[name]-[hash:5].js',
        publicPath:'http://192.168.30.175:3000/',        //将静态资源放在本地ip，模拟放在cdn上
        path: path.join(__dirname, '../build')
    },
    // loader资源处理
    module: {
        rules: [{
                test: /\.es$/,
                exclude: /(node_modules|bower_components)/, //排除
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'stage-0']
                    }
                }
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    //如果需要，可以在 sass-loader 之前将 resolve-url-loader 链接进来
                    use: ['css-loader', 'less-loader']
                })
            }
        ]
    },
    //插件
    plugins: [
        //当运行上线版本
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"prod"'
            }
        }),
        //输出css文件：
        new ExtractTextPlugin('public/styles/[name]-[hash:5].css'),
        //压缩js
        new UglifyJSPlugin({
            uglifyOptions: {
                compress: {
                    warnings: true
                },
                output: {
                    comments: false,
                },
                warnings: false
            }
        }),
        //压缩css
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { discardComments: { removeAll: true } },
            canPrint: true
        }),
        //提取公共文件
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            // ( 公共chunk(commnons chunk) 的名称)
            filename: "public/scripts/conmmons/[name]-[hash:5].min.js",
        }),
        //编译layout.html
        new HtmlWebpackPlugin({ // Also generate a test.html
            filename: './views/layout.html', //输出
            template: 'src/widget/layout.html', //输入模板
            inject: false //模板中不注入静态资源
        }),
        //编译index.js
        new HtmlWebpackPlugin({ // Also generate a test.html
            filename: './views/index.html', //输出
            template: 'src/views/index.js', //输入模板
            inject: false, //模板中不注入静态资源
            chunks: ['vendor', 'index', 'tag']
        }),
        //编译index.html——因为views/index.js中有使用index.html所以index.html也需要编译
        new HtmlWebpackPlugin({ // Also generate a test.html
            filename: './widget/index.html', //输出
            template: 'src/widget/index.html', //输入模板
            inject: false, //模板中不注入静态资源
        }),
        //star.js
        new HtmlWebpackPlugin({ // Also generate a test.html
            filename: './views/star.html', //输出
            template: 'src/views/star.js', //输入模板
            inject: false, //模板中不注入静态资源
            chunks: ['vendor', 'index', 'tag'] //添加块
        }),
        //star.html——因为views/index.js中有使用index.html所以index.html也需要编译
        new HtmlWebpackPlugin({ // Also generate a test.html
            filename: './widget/star.html', //输出
            template: 'src/widget/star.html', //输入模板
            inject: false, //模板中不注入静态资源
        }),
    ]
}