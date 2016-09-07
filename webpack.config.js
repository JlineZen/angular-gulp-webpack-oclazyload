var webpack = require('webpack');     //引入webpack
var path = require('path');           //引入node path
var context = path.join(__dirname, '/src');    //项目主目录
var VendorChunkPlugin = require('webpack-vendor-chunk-plugin');  //第三方vendor插件打包
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');    //防止ng依赖出错

module.exports = {
    context: context,
    entry:  {  
        app: "./app.js",  //入口文件
        vendor: ['angular', 'angular-ui-router', 'oclazyload']  //第三方插件
    },
    output: {
        path: path.join(__dirname, './dist/js'),//打包输出文件目录地址
        filename: "bundle.js"
    },

    module: {
        /* webpack 加载器 */
        loaders: [ 
            {
                test: /\.html$/,
                loader: "html"  //html文件加载器
            },
            {
                test: /\.css$/,
                loader: "style!css"  //css文件加载器
            }//,
            //{
            //  test: /\.jpg$/,
            //  loader: "file-loader"
            //},
            //{
            //  test: /\.png$/,
            //  loader: "url-loader?mimetype=image/png"
            //}
        ],
    },
    /*webpack 插件*/
    plugins: [
        new ngAnnotatePlugin({   //防止ng依赖出错
            add: true
        }),
        new webpack.optimize.UglifyJsPlugin({  //webpack内置js压缩
            output: {
                comments: false  //删除注释
            },
            compress: {
                warnings: false  //不显示warnings
            },
            sourceMap: false,
            mangle: false
        }),
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),  //第三方插件打包插件
        new VendorChunkPlugin('vendor')  //防止vendor重复依赖
    ],

    resolve: {  //预先加载node_modules
        modulesDirectories: [ 
          'node_modules'
        ]
    } 
};