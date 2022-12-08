const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyPlugin = require("copy-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    mode:"development",
    entry:"./src/main.js",
    output:{
        path:path.resolve(__dirname,"./dist"),
        filename:"js/app-[contenthash:5].js",
        assetModuleFilename:"assets/[hash:5][ext]",
        chunkFilename:"js/chunk-[contenthash:5].js",
        clean:true
    },
    target:"web",
    devtool:"source-map",
    devServer:{
        port:8080,
        proxy:{
            "/api":{
                target:"https://study.duyiedu.com",
                changeOrigin:true
            }
        }
    },
    resolve:{
        alias:{
            "@":path.resolve(__dirname,"src")
        }
    },
    stats:"errors-only",
    module:{
        rules:[
            {
                test:/\.(css|less)$/i,
                use:[
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    "less-loader"
                ]
            },
            {
                test:/\.(mp3|mp4)$/,
                type:"asset/resource"
            },
            {
                test:/\.(gif|png|webp|svg|jpg|jpeg|bmp)$/,
                type:"asset",
                parser:{
                    dataUrlCondition:{
                        maxSize:1024
                    }
                }
            },
            {
                test:/\.js$/,
                exclude:/node_modules/,
                use:"babel-loader"
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:path.resolve(__dirname,"public/index.html")
        }),
        new MiniCssExtractPlugin({
            filename:"css/[name]-[contenthash:5].css"
        }),
        new CopyPlugin({
            patterns: [
                {
                  from: path.resolve(__dirname, "public"),
                  to: "./",
                  globOptions: {
                    //不复制指定文件
                    ignore: ["**/*.html"],
                  },
                },
              ],
        })
        
    ]

}