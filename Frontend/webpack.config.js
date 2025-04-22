// webpack.config.js
module.exports = {
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader',
            'postcss-loader' // This must be present
          ]
        }
      ]
    }
  }