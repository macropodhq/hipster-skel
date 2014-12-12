var webpack = require('webpack');

var release = (process.env.NODE_ENV === 'production');

var plugins = [
  new webpack.NormalModuleReplacementPlugin(/^react$/, 'react/addons'),
];

var jsxLoader = ['jsx'];

if (release)  {
  plugins.push(new webpack.DefinePlugin({
    'process.env': {
      // This has effect on the react lib size
      'NODE_ENV': JSON.stringify('production'),
    },
  }));

  plugins.push(new webpack.optimize.DedupePlugin());
  plugins.push(new webpack.optimize.UglifyJsPlugin());
} else {
  jsxLoader = ['react-hot', 'jsx?harmony'];
}

var config = module.exports = {
  debug: !release,
  cache: !release,
  devtool: !release && 'inline-source-map',
  entry: {
    'app': './app',
},
  output: {
    path: __dirname + '/dist',
    filename: '[name].js',
  },
  plugins: plugins,
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss'],
  },
  module: {
    loaders: [
    { test: /\.js$/, loaders: ['jsx?harmony'] },
    { test: /\.jsx$/, loaders: jsxLoader },
    {
      test: /\.scss$/,
      loaders: [
      'style-loader',
      'css-loader',
      'autoprefixer-loader',
      'sass-loader?includePaths[]=./app/base/style,includePaths[]=./node_modules'
      ],
    },
    { test: /\.css$/,   loader: 'style-loader!css-loader' },
    { test: /\.png$/,   loader: 'url-loader' },
    { test: /\.woff$/,  loader: 'url-loader?mimetype=application/font-woff' },
    { test: /\.ttf$/,   loader: 'url-loader?' },
    { test: /\.eot$/,   loader: 'url-loader?' },
    { test: /\.svg$/,   loader: 'raw-loader?' },
    ],
  },
};
