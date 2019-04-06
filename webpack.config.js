const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
	mode: "development",
	entry: "./source/index.js",
	output: {
		path: __dirname + "/dist",
		filename: "bundle.js"
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: "./source/index.html",
			minify: false
		})
	]
};

module.exports = config;
