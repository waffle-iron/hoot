module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: './build',
    filename: 'app.bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loaders: ['style', 'css?modules', 'sass']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel?cacheDirectory'
      },
      {
        test: /\.(jpg|png)$/,
        loaders: [
          'url?limit=10000'
        ]
      },
      {
        test: /\.json$/,
        exclude: /node_modules/,
        loader: 'json'
      },
      {
        test: /(README|LICENSE)/,
        loader: 'ignore'
      }
    ]
  }
}
