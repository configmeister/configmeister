module.exports = {
	'transpileDependencies': [
		'vuetify'
	],
	chainWebpack: config => {
		config.module
			.rule('graphql')
			.test(/\.graphql$/)
			.use('webpack-graphql-loader')
			.loader('webpack-graphql-loader')
			.end()
	}
};
