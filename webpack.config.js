var path = require("path");

console.log(__dirname);

module.exports = {
  context: __dirname,
  entry: __dirname + "/src/frontend/app.jsx",
  output: {
    path: path.join(__dirname, 'src', 'public'),
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: [/\.jsx?$/, /\.js?$/],
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  devtool: 'source-maps',
  resolve: {
    extensions: ["", ".js", ".jsx" ]
  }
};
