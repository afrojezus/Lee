var webpack = require("webpack");
const ElectronPackager = require("webpack-electron-packager");
const path = require("path");

module.exports = {
  target: "electron",

  entry: {
    app: ["webpack/hot/only-dev-server", "./src/renderer.js"]
  },

  output: {
    path: path.resolve(__dirname, "public/built"),
    filename: "bundle.js",
    publicPath: "http://localhost:8080/built/"
  },

  devServer: {
    contentBase: path.resolve(__dirname, "public"),
    publicPath: "http://localhost:8080/built/"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        query: {
          presets: ["react", "es2015", "es2017", "env"],
          plugins: ["transform-class-properties"]
        }
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "sass-loader"
          }
        ]
      },
      {
        test: /\.node$/,
        use: "node-loader"
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            }
          },
          {
            loader: "postcss-loader"
          }
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        loaders: [
          "file-loader?hash=sha512&digest=hex&name=[hash].[ext]",
          "image-webpack-loader"
        ]
      }
    ]
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};
