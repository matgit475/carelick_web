const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = (env) => {
  return {
    entry: "./src/index.tsx",
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(jpg|jpeg|png|gif)$/i,
          type: "asset/resource", // Handles image files
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "dist"),
      publicPath: "/",
    },
    plugins: [
      new Dotenv({
        path:
          env.production == "true" ? "./.env.production" : "./.env.development", // Load the correct .env file based on the mode
      }),
    ],
    mode: env.production ? "production" : "development",
    devtool: "source-map", // Best for dev with fast rebuilds
    devServer: {
      static: {
        directory: path.join(__dirname, "dist"),
      },
      compress: true,
      port: 8000,
      historyApiFallback: true,
      hot: true,
    },
    performance: {
      hints: false,
    },
  };
};
