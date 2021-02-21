const path = require("path");
const webpack = require("webpack");
const autoprefixer = require("autoprefixer");
const precss = require("precss");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	mode: "development",

	entry: {
		main: "./src/app",
	},
	output: {
		filename: "[name].[contenthash].bundle.js",
	},

	resolve: {
		extensions: [".tsx", ".ts", ".js"],
	},
	target: "web",
	devtool: "inline-source-map",
	devServer: {
		open: true,
		publicPath: "/",
	},

	plugins: [
		new webpack.ProgressPlugin(),
		new HtmlWebpackPlugin({
			template: "index.html",
		}),
	],

	module: {
		rules: [
			{
				test: /\.(tsx|ts|jsx|js)$/,
				include: [path.resolve(__dirname, "src")],
				use: [
					{
						loader: "babel-loader",
						options: {
							plugins: ["syntax-dynamic-import"],
							presets: [
								"@babel/preset-env",
								"@babel/preset-react",
								"@babel/preset-typescript",
							],
						},
					},
				],
			},
			{
				test: /.css$/,
				include: [path.resolve(__dirname, "src")],
				use: [
					{
						loader: "style-loader",
					},
					{
						loader: "css-loader",
						options: {
							importLoaders: 1,
							sourceMap: true,
						},
					},
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								plugins: [
									[
										"postcss-preset-env",
										{
											// Options
										},
									],
									"precss",
									"autoprefixer",
								],
							},
						},
					},
				],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: "asset/resource",
			},
		],
	},
};
