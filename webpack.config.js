const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const dotenv = require("dotenv-webpack");
require('dotenv').config({ path: './.env' }); 

console.log('MicroApp1 URL:', process.env.REACT_APP_MICROAPP_1_URL);

module.exports = {
  entry: "./src/index.tsx",
  mode: "development",
  devServer: {
    port: 3000,
    open: true,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "ts-loader",
          options: {
            transpileOnly: true, // Deshabilita la verificación completa de tipos
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i, // Procesa archivos CSS
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i, // Procesa imágenes y archivos similares
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "shell",
      remotes: {
        microApp1: `microApp1@${process.env.REACT_APP_MICROAPP_1_URL}/remoteEntry.js`,
      },
      filename: "remoteEntry.js",
      shared: {
        react: {
          singleton: true,
          eager: true,
          requiredVersion: '^18.3.1',
        },
        'react-dom': {
          singleton: true,
          eager: true,
          requiredVersion: '^18.3.1',
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      favicon: './public/favicon.ico', // Asegúrate de que el favicon esté incluido aquí
    }),
    new dotenv(), // Esto cargará las variables de entorno definidas en un archivo .env
  ],
};
