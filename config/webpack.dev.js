const path = require('path');
const webpack = require('webpack');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin'); //编译html
const Manifest= require('webpack-manifest');//离线缓存
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
        path: path.join(__dirname, '../build'),
        filename: 'public/scripts/[name].js'
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

        //当运行开发版本
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"dev"'
            }
        }),
        //检测文件变化自动刷新浏览器
        new LiveReloadPlugin({ appendScriptTag: true }),
        //输出css文件：
        new ExtractTextPlugin('public/styles/[name].css'),
        //提取公共文件
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            // ( 公共chunk(commnons chunk) 的名称)
            filename: "public/scripts/conmmons/vendor.min.js",
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
            chunks: ['vendor', 'index', 'tag'] //添加块
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
        //离线缓存
        new Manifest({
            cache: [//需要离线缓存的文件
                '../public/styles/vendor.css',
                '../public/scripts/conmmons/vendor.min.js',
                '../public/scripts/index.js',
                '../public/scripts/tag.js',
            ],
            //Add time in comments. 
            timestamp: true,
            // 生成的文件名字，选填 
            // The generated file name, optional. 
            filename: 'cache.manifest',
            // 注意*星号前面用空格隔开 
            network: [//当离线缓存是禁用所有
                '*'
            ],
            // 注意中间用空格隔开 
            // fallback: ['/ /404.html'],
            // manifest 文件中添加注释 
            // Add notes to manifest file. 
            headcomment: 'Performance optimization',
            master: ['../views/index.html']
        })
    ],

}