var webpack = require('webpack');
var path = require('path');
var context = path.join(__dirname, './src');
var VendorChunkPlugin = require('webpack-vendor-chunk-plugin');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

module.exports = {
    context: context,
    entry: {
        app: './src/app.js',
        vendor: ['angular', 'angular-ui-router', 'oclazyload']
    },
    output: {
        path: path.join(__dirname, './dist/js'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loaders: 'style!css'
            },
            {
                test: /\.html$/,
                loaders: 'html'
            },
            {
				test: /\.jpg$/,
				loader: "file-loader"
			},
			{
				test: /\.png$/,
				loader: "url-loader?mimetype=image/png"
			}
        ]
    },
    plugins: [
        new ngAnnotatePlugin({
            add: true
        }),
        new webpack.optimize.UglifyJsPlugin({
	      	output: {
	        	comments: false,
	      	},
	      	compress: {
	        	warnings: false
	      	},
	      	sourceMap: false,
	      	mangle: false
	    }),
	    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    	new VendorChunkPlugin('vendor')
    ],
    resolve: {
	    modulesDirectories: [
	      'node_modules'
	    ]
	} 
};