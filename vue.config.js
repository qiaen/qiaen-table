let entry = "./test/main.js";
let filename = "build.js";

if (process.env.NODE_ENV !== "development") {
	entry = "./src/index.js";
	filename = "te-line.min.js";
}
module.exports = {
	pages: {
		index: {
			// page 的入口
			entry,
			// 在 dist/index.html 的输出
			filename: 'index.html'
		}
	},
	devServer: {
		host: process.env.HOST,
		port: process.env.PORT && Number(process.env.PORT),
		open: false,
		overlay: {
			warnings: false,
			errors: true
		}
	},
	configureWebpack: {},
	css: {
		// 组件的样式是否另外打包成单独的css文件。默认为true
		extract: false
	},
	productionSourceMap: false,
}