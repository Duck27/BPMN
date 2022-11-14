var path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/app.js",
  output: {
    path: path.resolve(__dirname, "views"),
    filename: "app.bundled.js",
    sourceMapFilename: "app.bundled.js.map",
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.bpmn$/,
        type: "asset/source",
      },
    ],
  },
};
