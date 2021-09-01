const path = require('path')
const htmlwebpackplugin = require('html-webpack-plugin')
const { resolve } = require('path')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const devMode = process.env.NODE_ENV !== 'production'
module.exports = {
	entry: {
		// vendor: [], // 公共库


		index: './src/js/index.js',
		one: './src/js/one.js',
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: "[name].js"
	},

	module: {
		rules: [
			{ test: /\.css$/, use: [miniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'] }, // 从右到左
			{ test: /\.less$/, use: [miniCssExtractPlugin.loader, 'css-loader', 'less-loader'] },
			{ test: /\.(sc|sa|c)ss$/, use: [miniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'] },
			{
				test: /\.(jpg|jpeg|png|gif)$/, loader: 'url-loader',//css中的图片
				options: {
					outputPath: 'images/',
					publicPath: './images/',
					limit: 1024 * 6, //6k一下转base64
					name: '[name].[ext]' //'[hash].[ext]'
				}
			},
			{
				test: /\.html$/,
				loader: 'html-loader'
			},
			{
				exclude: /\.(js|json|html|css|less|scss|png|gif|jpg|jpeg)$/,
				loader: 'file-loader',
				options: {
					outputPath: 'font',
					publicPath: './font',
					name: '[name]-[hash:4].[ext]'
				}
			},
			{
				//eslint语法检测
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'eslint-loader',
				options: {
					fix: true //自动修复
				}

			}
		]
	},
	optimization: {
		minimizer: [ //优化压缩css
			// For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
			// `...`,
			new CssMinimizerPlugin({}),
		],
		minimize: true
	},
	plugins: [
		new htmlwebpackplugin({ //   ({})默认创建一个空的html，自动引入打包输出的所有资源
			filename: 'index.html', // 输出
			template: 'src/html/index.html',
			chunks: ['index'],
			minify: {
				collapseWhitespace: true, // 空格
				removeComments: true  // 注释
			},
			inject: true,
			hash: true
		}),
		new htmlwebpackplugin({
			filename: 'one.html',
			template: 'src/html/one.html',
			chunks: ['one'],
			inject: true,
			hash: true
		}),
		new miniCssExtractPlugin({ //兼容
			filename: devMode ? '[name].css' : '[name].[hash].css',
			chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
		})
	],
	mode: 'development',
	target: "web",//webpack5 需要加上这个才能自动刷新
	devServer: {
		port: 3001,
		compress: true,
		open: true
	}
}