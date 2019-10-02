const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js"
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
      }
    ]
  }
  // #2 and then we are telling the plugin to store all the results in style.css.... bear in mind that plugins in webpack are for differnet purpose.
  // rather than preprocessing, they do store the processed elements in another file
};

module.exports = config;
