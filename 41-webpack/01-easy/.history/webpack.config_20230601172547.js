const path = require("path");
const myLoader = require("./loader/my-loader.js");
console.log("路径::", path.resolve(__dirname, "dist"));
module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [myLoader, "style-loader", "css-loader", "less-loader"],
            },
        ],
    },
};
