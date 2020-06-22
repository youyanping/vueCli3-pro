// vue.config.js
const utils = require('./vue.util')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const HappyPack = require('happypack')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const webpack = require('webpack')

module.exports = {
    /* 部署应用包时的基本 URL。用法和 webpack 本身的 output.publicPath 一致，
    但是 Vue CLI 在一些其他地方也需要用到这个值，所以请始终使用 publicPath
    而不要直接修改 webpack 的 output.publicPath */
    publicPath:"",
    outputDir:"dist",  //当运行 vue-cli-service build 时生成的生产环境构建文件的目录,请始终使用 outputDir 而不要修改 webpack 的 output.path
    assetsDir:"",
    indexPath:"index.html", //指定生成的 index.html 的输出路径 (相对于 outputDir)
    filenameHashing:true, //控制缓存
    //multi-page 模式下构建应用,每个“page”应该有一个对应的 JavaScript 入口文件
    pages:utils.pages(),
    /*pages:{
        home: {
            // page 的入口
            entry: 'src/pages/home/main.js',
            // 模板来源
            template: 'src/pages/home/home.html',
            // 在 dist/index.html 的输出
            filename: 'home.html',
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: 'home Page',
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks: ['chunk-vendors', 'chunk-common', 'home']
        },
        user:{
            // page 的入口
            entry: 'src/pages/user/main.js',
            // 模板来源
            template: 'src/pages/user/shopList.html',
            // 在 dist/index.html 的输出
            filename: 'shopList.html',
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: 'user Page',
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks: ['chunk-vendors', 'chunk-common', 'user']
        }
    },*/
    lintOnSave: process.env.NODE_ENV !== 'production', //是否在代码保存时进行eslint检测,开发环境编译时显示编译警告，但不报错，生产环境不启用
    productionSourceMap:false, // 是否在构建生产包时生成sourceMap文件，false将提高构建速度
    devServer: {
        host: '0.0.0.0',
        port: 8081, // 端口
        index:'home.html',
        //proxy: 'http://localhost:8080' //如果你的前端应用和后端 API 服务器没有运行在同一个主机上，你需要在开发环境下将 API 请求代理到 API 服务器
    },
    chainWebpack: config => {
        const jsRule = config.module.rule('js');
        jsRule.uses.clear();
        jsRule.use('happypack/loader?id=babel')
            .loader('happypack/loader?id=babel')
            .end();
    },
    configureWebpack: {
        plugins: [
            new ParallelUglifyPlugin({
                cacheDir: '.cache/',
                uglifyJS:{
                    output: {
                        comments: false
                    },
                    warnings: false,
                    compress: {// 也可将此参数设置为false，构建速度会有提升
                        drop_debugger: true,
                        drop_console: false
                    }
                }
            }),
            new HappyPack({
                id:'babel',
                loaders:['babel-loader?cacheDirectory=true'],
                threadPool:happyThreadPool
            }),
            new webpack.DllReferencePlugin({
                context: process.cwd(),//与DllPlugin中的context保持一致
                /*这个地址对应webpack.dll.conf.js中生成的那个json文件的路径，这样webpack打包的时候
                会检测当前文件中的映射，不会把已经存在映射的包再次打包进bundle.js */
                manifest: require('./public/vendor/vendor-manifest.json')
            }),
            /*new UglifyJsPlugin({
                uglifyOptions: {
                    warnings: false,
                    compress: {
                        drop_console: false
                    }
                },
            }),*/
        ]
    }
}