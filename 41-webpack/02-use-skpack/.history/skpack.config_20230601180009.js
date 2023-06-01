let path = require("path");
let lessLoader = require('./loader/less-loader.js');
let styleLoader = require('./loader/style-loader.js');
console.log('sss', lessLoader);
module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"), // __dirname - 当前文件所在的目录的绝对路径
        filename: "bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                // use: ["style-loader", "css-loader", "less-loader"],
                use: [
                    styleLoader, 
                    lessLoader,
                //     path.resolve(__dirname, "loader", "style-loader.js"),
                //     path.resolve(__dirname, "loader", "less-loader.js"),
                ],
            },
        ],
    },
};
