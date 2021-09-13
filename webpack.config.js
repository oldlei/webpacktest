const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')//导出单文件
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");//优化 替代 "style-loader"
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const devMode = process.env.NODE_ENV !== 'production'
module.exports = {
    entry: {
        // vendor: ["jquery", "other-lib"], // 公共库
        index: './src/js/index',
        one: './src/js/one'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "static/js/[name].js"
    },
    module: {
        rules: [
            //miniCssExtractPlugin 打包独立css  ； postcss  兼容
            //postcss-preset-env 
            // { test: /\.css$/, use: [miniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'] }, // 从右到左
            //{ test: /\.less$/, use: [miniCssExtractPlugin.loader, 'css-loader', 'less-loader'] },
            { test: /\.(c|sc|sa)ss$/, use: [MiniCssExtractPlugin.loader, 'css-loader', "postcss-loader", 'sass-loader'] },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.(jpg|jpeg|png|gif|svg)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'static/images/[name]-[hash:3][ext][query]'
                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 9 * 1024
                    }
                }
            },
            {
                test: /\.(ttf|woff2?)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'static/font/[name]-[hash:3][ext][query]'
                },
            },
            {
                //排除
                exclude: /\.(js|json|html|css|less|scss|png|gif|jpg|jpeg|ttf|woff2?)$/,
                loader: 'file-loader',
                options: {
                    // outputPath: 'other',
                    // publicPath: './other',
                    name: '[name].[ext]'
                }
            },
            // {
            // 	//eslint语法检测
            // 	test: /\.js$/,
            // 	exclude: /node_modules/,
            // 	loader: 'eslint-loader',
            // 	options: {
            // 		fix: true //自动修复
            // 	}

            // }
        ]
    },
    // optimization: {
    // 	minimizer: [ //优化压缩css
    // 		// For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
    // 		// `...`,
    // 		new CssMinimizerPlugin({}),
    // 	],
    // 	minimize: true
    // },
    plugins: [
        new MiniCssExtractPlugin({
            filename: devMode ? 'css/[name].css' : 'css/[name].[hash].css',
            chunkFilename: devMode ? 'css/[id].css' : 'css/[id].[hash].css',
        }),
        new HtmlWebpackPlugin({
            title: '首页',
            //filename: 'html/index.html', // 输出
            filename: 'index.html', // 输出
            template: 'src/html/index.html',
            chunks: ['index'],
            minify: {
                //collapseWhitespace: true, // 空格
                // removeComments: true  // 注释
            },
            inject: true,
            hash: true
        }),
        new HtmlWebpackPlugin({
            filename: 'one.html', // 输出
            template: 'src/html/one.html',
            chunks: ['one'],
            minify: {
                //collapseWhitespace: true, // 空格
                // removeComments: true  // 注释
            },
            inject: true,
            hash: true
        }),
        new CleanWebpackPlugin()



    ],
    optimization: {
        minimizer: [ //优化压缩css
            // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line

            new CssMinimizerPlugin({}),
        ],
        minimize: true
    },
    mode: 'development',
    // target: "web",//webpack5 需要加上这个才能自动刷新
    // devServer: {
    // 	port: 3001,
    // 	compress: true,
    // 	open: true
    // }
}