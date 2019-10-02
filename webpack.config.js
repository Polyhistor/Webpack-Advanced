const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
    publicPath: "build/"
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "style.css"
    })
  ],

  module: {
    rules: [
      { use: "babel-loader", test: /\.js$/ },
      // #1 we extract the rule for css files from the library
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
              publicPath: "../"
            }
          },
          "css-loader"
        ]
      },
      {
        // #1 match agains any name that contains either jpg, jpeg, png, gif, or SVG
        // #2 the order that you pass elements to use array is important,
        // the one on the far right will be called and used first
        test: /\.(jpe?g|png|gif|svg)$/,

        use: [
          {
            loader: "url-loader",
            options: { limit: 40000 }
          },
          "image-webpack-loader"
        ]
      }
    ]
  }
  // #2 and then we are telling the plugin to store all the results in style.css.... bear in mind that plugins in webpack are for differnet purpose.
  // rather than preprocessing, they do store the processed elements in another file
};

module.exports = config;
